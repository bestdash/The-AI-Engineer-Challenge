from typing import Literal

import anthropic
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

load_dotenv()

app = FastAPI()

# CORS so the frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

# Coach persona + style. Kept server-side so the client cannot override safety/tonality.
EMBER_SYSTEM_PROMPT = """You are Ember, a warm, grounded personal coach chatting with someone who wants support, clarity, or a gentle nudge forward.

Role and stance:
- Speak as Ember in first person. Never describe yourself as an AI, model, or chatbot, and do not break the fourth wall with meta talk about prompts or policies unless the user explicitly asks how you work.
- You are not a licensed therapist, psychiatrist, or crisis service. Do not diagnose or claim certainty about medical or mental health conditions. If someone seems in immediate danger, urge them to contact local emergency services or a crisis line, briefly and humanly, then return to listening.

How to write:
- Default to brevity: about 2–5 short sentences unless the user clearly asks to go deeper or explore more.
- One main reflective question at a time unless they asked for several.
- Mirror a phrase or idea they used so replies feel connected, without repeating their whole message back.
- Tone: calm, kind, curious, non-judgmental—like a coach who respects their pace.

Stay on purpose as a coach: help them notice patterns, name feelings, consider next small steps, or reframe—not generic web search answers unless they clearly asked for factual information."""


class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=12000)


class ChatRequest(BaseModel):
    """Full in-session transcript the model should see (no server-side persistence)."""

    messages: list[ChatTurn] = Field(..., min_length=1, max_length=80)


MAX_MESSAGES_TO_MODEL = 48


def _normalize_messages_for_anthropic(turns: list[ChatTurn]) -> list[dict]:
    """
    Anthropic requires the sequence to start with a user turn. The UI may include a
    leading assistant greeting; strip leading assistant-only prefix before calling the API.
    """
    items: list[dict[str, str]] = [
        {"role": t.role, "content": t.content.strip()} for t in turns
    ]
    start = 0
    while start < len(items) and items[start]["role"] == "assistant":
        start += 1
    trimmed = items[start:]
    if not trimmed:
        raise HTTPException(
            status_code=400,
            detail="Messages must include at least one user turn.",
        )
    if trimmed[-1]["role"] != "user":
        raise HTTPException(
            status_code=400,
            detail="The latest message must be from the user.",
        )
    if len(trimmed) > MAX_MESSAGES_TO_MODEL:
        trimmed = trimmed[-MAX_MESSAGES_TO_MODEL:]
        while trimmed and trimmed[0]["role"] == "assistant":
            trimmed = trimmed[1:]
    if not trimmed or trimmed[-1]["role"] != "user":
        raise HTTPException(
            status_code=400,
            detail="Invalid message history after trimming.",
        )
    return trimmed


@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/api/chat")
def chat(request: ChatRequest):
    if not os.getenv("ANTHROPIC_API_KEY"):
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY not configured")

    try:
        api_messages = _normalize_messages_for_anthropic(request.messages)
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=512,
            system=EMBER_SYSTEM_PROMPT,
            messages=api_messages,
        )
        return {"reply": response.content[0].text}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error calling Anthropic API: {str(e)}"
        )
