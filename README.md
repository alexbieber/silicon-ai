# Silicon AI

A local website for **text-to-image** generation. Your API key is stored only on the server and never sent to the browser.

## Tech stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express

## Features

- **Text-to-image**: Describe an image; get a generated image.
- **Multiple models**: Stable Diffusion XL, SD 3 Medium, SDXL Turbo, BRIA 2.3 (when available on your key).
- **Controls**: Prompt, negative prompt, steps, CFG scale, seed.
- **Download**: Save the result as JPEG with a prompt-based filename.

## Setup

1. **Install backend dependencies**

   ```bash
   npm install
   ```

2. **API key**

   Add your key to `.env`:

   ```
   NVAPI_KEY=your-nvapi-key-here
   ```

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
- **Frontend with hot reload**: run the API server on port 3000 (`npm start`), then in another terminal run `npm run dev:client` and open [http://localhost:5173](http://localhost:5173). The Vite dev server proxies `/api` to the backend.

## Security

- **Do not commit `.env`** — it is in `.gitignore`.
- The frontend never sees your API key; all requests go through your server.

## Scripts

- `npm start` — run server (serves built client from `client/dist` or `public/`)
- `npm run dev` — run server with auto-restart
- `npm run build` — install client deps and build React app to `client/dist`
- `npm run dev:client` — run Vite dev server (proxy to API on port 3000)
