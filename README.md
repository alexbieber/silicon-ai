# Silicon AI

**Enterprise-grade text-to-image generation.** Ship a polished, secure image generation experience with no user sign-up—your infrastructure, your control.

[![CI](https://github.com/alexbieber/silicon-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/alexbieber/silicon-ai/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Overview

Silicon AI is a production-ready web application that turns natural language into images. Deploy it as a public tool, an internal service, or a white-label product. Credentials stay on the server; users get a fast, minimal interface with no accounts required.

| Feature | Description |
|--------|-------------|
| **Zero-friction UX** | No sign-up, no login. Prompt → image → download. |
| **Multiple models** | Stable Diffusion XL, SD 3 Medium, SDXL Turbo, BRIA 2.3. |
| **Full control** | Prompt, negative prompt, steps, CFG scale, seed. |
| **Secure by design** | Server-side credential handling; nothing exposed to the client. |
| **Deploy anywhere** | Node.js + static assets. Runs on Vercel, Railway, Render, or any Node host. |

**Logo:** The mark combines a hexagonal crystal lattice (silicon—the element at the heart of modern compute) with a single path through it (the neural link / circuit), representing where silicon and intelligence meet.

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/alexbieber/silicon-ai.git
cd silicon-ai
npm install

# Configure (copy .env.example to .env and set the required value)
cp .env.example .env

# Build frontend and run
npm run build
npm start
```

Open **http://localhost:3000**. You’re live.

---

## Project Structure

```
silicon-ai/
├── client/                 # React + TypeScript + Vite + Tailwind
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api.ts          # Data layer
│   │   ├── GenerateForm.tsx
│   │   └── ResultPanel.tsx
│   └── dist/               # Production build (generated)
├── public/                 # Fallback static UI
├── server.js               # Express API and static serving
├── .env.example            # Config template (do not commit .env)
└── package.json
```

---

## Deployment

### Environment

Create a `.env` file (or set environment variables in your host’s dashboard):

- **Required:** The value referenced in `.env.example`. Do not commit `.env` or expose it to the client.

### Recommended hosts

| Platform | Notes |
|----------|--------|
| **Vercel** | Add server as serverless API routes or use Node server preset; set env vars in Project Settings. |
| **Railway** | One-click Node deploy; set env vars in Variables. |
| **Render** | Web Service, Node; set env in Environment. |

Build command: `npm run build`  
Start command: `npm start`

---

## Development

| Command | Purpose |
|---------|--------|
| `npm start` | Run production server (serves `client/dist` or `public/`) |
| `npm run dev` | Run server with auto-restart |
| `npm run build` | Install client deps and build React app → `client/dist` |
| `npm run dev:client` | Vite dev server with HMR at :5173 (proxies `/api` to backend) |

For frontend hot-reload: run `npm start` in one terminal, `npm run dev:client` in another, then open http://localhost:5173.

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Delivery:** Static assets + REST API; credential never sent to the browser  

---

## License

MIT. See [LICENSE](LICENSE) for details.
