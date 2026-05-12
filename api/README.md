# Ember Chat API (FastAPI + Anthropic)

FastAPI backend for the **Ember** coaching chat: multi-turn conversations go to **Anthropic Claude** with a fixed **Ember** system prompt (persona, brevity, boundaries). No chat history is stored on the server—each request carries the full in-session transcript from the client.

## Prerequisites

- [`uv`](https://github.com/astral-sh/uv) (`pip install uv` if needed)
- Python **3.12** (managed by `uv` for this project)
- **`ANTHROPIC_API_KEY`** in your environment (or `.env` at the repo root via `python-dotenv`)

## Setup

From the **repository root**:

```bash
uv sync
```

Optional: activate the venv:

```bash
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

## Run the server

```bash
uv run uvicorn api.index:app --reload
```

Default: **http://127.0.0.1:8000** (or `http://localhost:8000`).

```bash
export ANTHROPIC_API_KEY=sk-ant-api03-...
```

Port in use?

```bash
lsof -ti:8000 | xargs kill -9
```

## Endpoints

### `GET /`

Health-ish ping: `{"status":"ok"}`.

### `POST /api/chat`

Sends a **message list** to Claude Haiku with the Ember system prompt.

**Request body** (JSON):

```json
{
  "messages": [
    { "role": "user", "content": "First thing on my mind is…" },
    { "role": "assistant", "content": "…" },
    { "role": "user", "content": "Follow-up from me." }
  ]
}
```

Rules enforced server-side:

- `messages` must be non-empty; each turn has `role` `"user"` or `"assistant"` and non-empty `content`.
- After normalizing, the sequence must **start with a user** turn and **end with a user** turn (leading assistant-only prefix is stripped for Anthropic).
- At most **48** turns are kept from the tail of the list.

**Response:**

```json
{ "reply": "Ember's reply as plain text." }
```

**Errors:** `400` for bad message shape; `500` for missing API key or upstream failures (detail in JSON).

## Try it with curl

Single user turn (minimal valid body):

```bash
curl -s -X POST http://127.0.0.1:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hi — just saying hello."}]}'
```

Multi-turn (second message sees the first exchange):

```bash
curl -s -X POST http://127.0.0.1:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role":"user","content":"I feel stuck at work."},
      {"role":"assistant","content":"That sounds heavy. What part feels most stuck?"},
      {"role":"user","content":"Mostly my manager — I avoid 1:1s."}
    ]
  }'
```

## Docs in the browser

With the server running:

- Swagger: http://localhost:8000/docs  
- ReDoc: http://localhost:8000/redoc  

## CORS

`CORSMiddleware` allows **`*`** origins for local dev. Tighten `allow_origins` in `api/index.py` for production.
