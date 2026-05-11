# Mental Coach — Next.js frontend

A calm, **soft-organic** chat UI for your FastAPI mental coach. Creamy neutrals, sage and terracotta accents, roomy layout, and message bubbles that feel a little like handwritten notes—without sacrificing readability on phones.

## What you need

- **Node.js 18+** (20+ recommended) and npm
- The **FastAPI** app running locally (see repo root `README.md`): by default it listens on port **8000** and exposes `POST /api/chat`

## Run it locally

1. **Start the backend** (from the repository root, not `frontend/`):

   ```bash
   uv sync
   export ANTHROPIC_API_KEY=sk-ant-...
   uv run uvicorn api.index:app --reload
   ```

   Confirm `http://127.0.0.1:8000/` responds (for example `{"status":"ok"}`).

2. **Install frontend dependencies**:

   ```bash
   cd frontend
   npm install
   ```

3. **(Optional)** Point the UI at a different chat URL—copy the example env file and edit:

   ```bash
   cp .env.example .env.local
   # Set NEXT_PUBLIC_CHAT_API_URL if your API is not at http://127.0.0.1:8000/api/chat
   ```

4. **Start Next.js**:

   ```bash
   npm run dev
   ```

5. Open **http://localhost:3000** in your browser and chat away.

## Scripts

| Command        | Purpose                          |
| -------------- | -------------------------------- |
| `npm run dev`  | Development server (hot reload)  |
| `npm run build` | Production build               |
| `npm run start` | Run production build             |
| `npm run lint` | ESLint (`next/core-web-vitals`) |

## Deploying on Vercel

Set **`NEXT_PUBLIC_CHAT_API_URL`** in the Vercel project to a **public HTTPS** chat endpoint. Browsers cannot call `http://127.0.0.1:8000` from the internet; for production you will need a hosted API (or a secure tunnel during demos).

## Troubleshooting

- **“Could not reach the coach server”** — the UI could not open a network connection. Start `uvicorn`, check the URL in the header matches your API, and try again.
- **CORS** — the sample backend already allows all origins; if you fork the API, keep CORS enabled for your frontend origin.
