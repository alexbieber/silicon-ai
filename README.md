<p align="center">
  <img src="client/src/assets/logo.png" alt="Silicon AI" width="80" height="80" />
</p>

<h1 align="center">Silicon AI</h1>
<p align="center">
  <strong>Open-source text-to-image generation.</strong> Run it yourself. No sign-up, no lock-in.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

<p align="center">
  <a href="https://github.com/alexbieber/silicon-ai/actions/workflows/ci.yml"><img src="https://github.com/alexbieber/silicon-ai/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" alt="Node 18+" />
</p>

---

## Screenshot

<p align="center">
  <img src="docs/screenshot.png" alt="Silicon AI app" width="800" />
</p>

<p align="center">
  <em>Add <code>docs/screenshot.png</code> (e.g. 800×450) to show the app UI here.</em>
</p>

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| **No sign-up** | Users get prompt → image → download. No accounts. |
| **Multiple models** | Stable Diffusion XL, SD 3 Medium, SDXL Turbo, BRIA 2.3. |
| **Full controls** | Prompt, negative prompt, steps, CFG scale, seed. |
| **Server-secure** | Credentials stay on the server; the client never sees them. |
| **Self-host or deploy** | Node.js app. Run locally or on Vercel, Railway, Render, etc. |
| **Modern stack** | React 18, TypeScript, Vite, Tailwind CSS, Express. |

---

## 🚀 Quick Start

**Prerequisites:** Node.js 18+

```bash
# Clone
git clone https://github.com/alexbieber/silicon-ai.git
cd silicon-ai

# Install dependencies
npm install

# Configure (required for image generation)
cp .env.example .env
# Edit .env and set the value described in .env.example

# Build frontend and start server
npm run build
npm start
```

Open **http://localhost:3000**. Enter a prompt and generate.

---

## ⚙️ Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `NVAPI_KEY` | Yes | Value required for the image generation backend. Set in `.env` or your host’s environment. Do not commit `.env`. |
| `PORT` | No | Server port (default: `3000`). |

See `.env.example` for the exact variable name and a safe placeholder.

---

## 🌐 Deployment

Build and start commands:

- **Build:** `npm run build`
- **Start:** `npm start`

Set `NVAPI_KEY` (and optionally `PORT`) in your host’s environment (e.g. Vercel → Settings → Environment Variables, Railway → Variables, Render → Environment).

| Platform | Notes |
|----------|--------|
| **Vercel** | Use Node server or serverless API; set env vars in project settings. |
| **Railway** | Deploy as Node app; add variables in the dashboard. |
| **Render** | Web Service, Node; set environment in the service. |

---

## 📁 Project Structure

```
silicon-ai/
├── client/                 # React + TypeScript + Vite + Tailwind
│   ├── src/
│   │   ├── assets/         # Logo and static assets
│   │   ├── App.tsx
│   │   ├── api.ts          # API client
│   │   ├── GenerateForm.tsx
│   │   └── ResultPanel.tsx
│   ├── public/             # Static files (logo, favicon) → copied to dist
│   └── dist/               # Production build (generated)
├── public/                 # Fallback static UI
├── docs/                   # Screenshots and extra docs
├── server.js               # Express server and API
├── .env.example            # Config template (do not commit .env)
└── package.json
```

---

## 🛠 Development

| Command | Description |
|---------|-------------|
| `npm start` | Run production server (serves `client/dist` or `public/`) |
| `npm run dev` | Run server with auto-restart on file changes |
| `npm run build` | Install client deps and build React app → `client/dist` |
| `npm run dev:client` | Vite dev server with HMR at http://localhost:5173 (proxies `/api` to backend) |

**Frontend hot-reload:** Run `npm start` in one terminal and `npm run dev:client` in another; open http://localhost:5173.

---

## 🤝 Contributing

We welcome contributions. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for how to report bugs, suggest features, and submit pull requests.

---

## 📄 License

MIT. See [LICENSE](LICENSE) for details.
