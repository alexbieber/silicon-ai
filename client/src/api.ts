import { useState, useCallback, useEffect } from "react";

export type Model = { id: string; name: string };

export type GenerateParams = {
  prompt: string;
  negativePrompt?: string;
  model?: string;
  steps?: number;
  cfg_scale?: number;
  seed?: number;
};

export type GenerateResult = {
  image: string;
  finishReason?: string;
  seed?: number;
};

export function useModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchModels = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/models");
      const data = await res.json();
      setModels(data.models ?? []);
    } catch {
      setModels([{ id: "stable-diffusion-xl", name: "Stable Diffusion XL" }]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return { models, loading, refetch: fetchModels };
}

export function useGenerate() {
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (params: GenerateParams) => {
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Generation failed");
        return;
      }
      setResult({ image: data.image, finishReason: data.finishReason, seed: data.seed });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { generate, loading, result, error, clearError };
}
