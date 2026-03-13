# Silicon AI

Text-to-image generation. Visitors use the tool with no sign-up; the server handles generation securely.

## Tech stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express

## Features

- **Text-to-image**: Describe an image; get a generated image.
- **Multiple models**: Stable Diffusion XL, SD 3 Medium, SDXL Turbo, BRIA 2.3 (when available).
- **Controls**: Prompt, negative prompt, steps, CFG scale, seed.
- **Download**: Save the result as JPEG with a prompt-based filename.

## Setup

1. **Install backend dependencies**

   ```bash
   npm install
   ```

2. **Configure server**

   Copy `.env.example` to `.env` and set the required value. Do not commit `.env`.

3. **Build the frontend** (first time or after pulling)

   ```bash
   npm run build
   ```

   This installs client deps and builds the React app into `client/dist`.

4. **Run the server**

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000). The server serves the built React app from `client/dist`; if that folder is missing, it falls back to the legacy static `public/` page.

## Development

- **Backend only** (use existing built frontend): `npm run dev`
- **Frontend with hot reload**: run the server on port 3000 (`npm start`), then in another terminal run `npm run dev:client` and open [http://localhost:5173](http://localhost:5173). The Vite dev server proxies `/api` to the backend.

## Security

- **Do not commit `.env`** — it is in `.gitignore`.
- The credential is only used on the server; the frontend never receives it.

## Scripts

- `npm start` — run server (serves built client from `client/dist` or `public/`)
- `npm run dev` — run server with auto-restart
- `npm run build` — install client deps and build React app to `client/dist`
- `npm run dev:client` — run Vite dev server (proxy to backend on port 3000)
