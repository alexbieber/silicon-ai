import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const NV_BASE = "https://ai.api.nvidia.com/v1";

const MODELS = {
  "stable-diffusion-xl": "/genai/stabilityai/stable-diffusion-xl",
  "stable-diffusion-3-medium": "/genai/stabilityai/stable-diffusion-3-medium",
  "sdxl-turbo": "/genai/stabilityai/sdxl-turbo",
  "bria-2.3": "/genai/briaai/bria-2_3",
};

const clientDist = path.join(__dirname, "client", "dist");
const publicDir = path.join(__dirname, "public");

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(clientDist));
app.use(express.static(publicDir));

app.get("/api/models", (_, res) => {
  res.json({
    models: Object.keys(MODELS).map((id) => ({
      id,
      name: id.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    })),
  });
});

app.post("/api/generate", async (req, res) => {
  const apiKey = process.env.NVAPI_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server missing NVAPI_KEY. Add it to .env" });
  }

  const {
    prompt,
    negativePrompt = "",
    model = "stable-diffusion-xl",
    steps = 25,
    cfg_scale = 7,
    seed = 0,
    width = 1024,
    height = 1024,
  } = req.body;

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const modelPath = MODELS[model];
  if (!modelPath) {
    return res.status(400).json({ error: `Unknown model: ${model}` });
  }

  const text_prompts = [{ text: prompt.trim(), weight: 1 }];
  if (negativePrompt && negativePrompt.trim()) {
    text_prompts.push({ text: negativePrompt.trim(), weight: -1 });
  }

  const payload = {
    text_prompts,
    steps: Math.min(100, Math.max(5, Number(steps) || 25)),
    cfg_scale: Math.min(9, Math.max(1.01, Number(cfg_scale) || 7)),
    seed: Number(seed) || 0,
    samples: 1,
  };

  if (model === "stable-diffusion-xl") {
    payload.width = width === 1024 ? 1024 : 1024;
    payload.height = height === 1024 ? 1024 : 1024;
  }

  try {
    const url = `${NV_BASE}${modelPath}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const msg = data.message || data.error || data.detail || response.statusText;
      return res.status(response.status).json({
        error: msg,
        details: data,
      });
    }

    const artifact = data.artifacts?.[0];
    if (!artifact || !artifact.base64) {
      return res.status(502).json({
        error: "No image in API response",
        details: data,
      });
    }

    res.json({
      image: artifact.base64,
      finishReason: artifact.finishReason,
      seed: artifact.seed,
    });
  } catch (err) {
    console.error("NVIDIA API error:", err);
    res.status(502).json({
      error: err.message || "Request to NVIDIA failed",
    });
  }
});

app.get("*", (_, res) => {
  const index = path.join(clientDist, "index.html");
  const fallback = path.join(publicDir, "index.html");
  res.sendFile(fs.existsSync(index) ? index : fallback);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  if (!process.env.NVAPI_KEY) console.warn("Warning: NVAPI_KEY not set. Add it to .env to generate images.");
});
