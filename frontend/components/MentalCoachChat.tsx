"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { MessageMarkdown } from "@/components/MessageMarkdown";

/** One row in the transcript. */
export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

/** Label above assistant bubbles — matches header branding; not uppercased so the name reads naturally. */
const ASSISTANT_DISPLAY_NAME = "Ember";

/** One turn sent to `POST /api/chat` (matches FastAPI `ChatTurn`). */
type ApiChatTurn = {
  role: "user" | "assistant";
  content: string;
};

const DEFAULT_CHAT_URL = "http://127.0.0.1:8000/api/chat";

function getChatApiUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_CHAT_API_URL?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_CHAT_URL;
}

/**
 * Builds the in-session transcript for the API. Strips a leading assistant-only prefix so
 * the first turn is always `user`, which matches Anthropic's expectations.
 */
function buildApiTranscript(prior: ChatMessage[], latestUserText: string): ApiChatTurn[] {
  const combined: ApiChatTurn[] = [
    ...prior.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: latestUserText },
  ];
  let start = 0;
  while (start < combined.length && combined[start].role === "assistant") {
    start += 1;
  }
  return combined.slice(start);
}

/**
 * POSTs the full transcript to FastAPI and returns the assistant `reply` string.
 * Throws with a human-readable message suitable for UI when the backend misbehaves.
 */
async function postChatMessage(messages: ApiChatTurn[]): Promise<string> {
  const url = getChatApiUrl();
  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
  } catch (err) {
    const isTypeError = err instanceof TypeError;
    const hint =
      "Could not reach the coach server. Start the API with `uv run uvicorn api.index:app --reload` from the repo root, then refresh.";
    if (isTypeError) {
      throw new Error(hint);
    }
    throw new Error("Something went wrong while contacting the server. Please try again.");
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error(
      response.ok
        ? "The server replied, but the response was not valid JSON."
        : `The server returned ${response.status} with a non-JSON body.`,
    );
  }

  if (!response.ok) {
    const detail =
      typeof payload === "object" &&
      payload !== null &&
      "detail" in payload &&
      typeof (payload as { detail: unknown }).detail === "string"
        ? (payload as { detail: string }).detail
        : `Request failed (${response.status}).`;
    throw new Error(detail);
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    typeof (payload as { reply?: unknown }).reply !== "string"
  ) {
    throw new Error("The server response did not include a string `reply` field.");
  }

  return (payload as { reply: string }).reply;
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Soft leaf accents (inline SVG) — minimal organic decoration. */
function OrganicBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.14]"
      aria-hidden
    >
      <svg
        className="absolute -right-8 -top-6 h-48 w-48 text-sage rotate-12"
        viewBox="0 0 120 120"
        fill="currentColor"
      >
        <path d="M98 18c-18 8-32 24-40 44-6 14-8 30-6 46 2 12 6 22 12 30-10-6-18-16-22-28-8-22-4-46 10-64 14-18 34-28 46-28z" />
        <path d="M72 8C54 20 42 38 36 58c-4 14-4 30 2 44 4 10 10 18 18 24-12-8-20-20-24-34-6-24 0-48 16-66 8-8 18-14 24-16z" />
      </svg>
      <svg
        className="absolute -left-10 bottom-10 h-40 w-40 text-terracotta -rotate-6"
        viewBox="0 0 120 120"
        fill="currentColor"
      >
        <path d="M22 88c16-10 28-26 34-44 4-12 6-26 4-40-2-10-6-18-12-24 10 6 18 16 22 28 8 22 2 46-14 62-8 8-18 14-24 18z" />
      </svg>
    </div>
  );
}

export function MentalCoachChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: newId(),
      role: "assistant",
      content:
        "Hi — I'm Ember, and I'm here with you. What's on your mind today? Share as much or as little as feels right.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const formId = useId();

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending, scrollToBottom]);

  /**
   * Sends the current draft to the FastAPI coach. Clears the draft on success.
   * Shared by the form submit and Enter-to-send on the textarea.
   */
  const sendMessage = useCallback(
    async (event?: FormEvent) => {
      event?.preventDefault();
      const trimmed = draft.trim();
      if (!trimmed || isSending) return;

      setError(null);
      const userMessage: ChatMessage = { id: newId(), role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMessage]);
      setDraft("");
      setIsSending(true);

      try {
        const transcript = buildApiTranscript(messages, trimmed);
        const reply = await postChatMessage(transcript);
        setMessages((prev) => [
          ...prev,
          { id: newId(), role: "assistant", content: reply },
        ]);
      } catch (err) {
        // Roll back the optimistic user bubble and restore the draft so retry is painless.
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
        setDraft(trimmed);
        const message =
          err instanceof Error ? err.message : "Something unexpected happened.";
        setError(message);
      } finally {
        setIsSending(false);
      }
    },
    [draft, isSending, messages],
  );

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-gradient-to-b from-cream via-parchment/60 to-sand/40">
      <OrganicBackdrop />

      <header className="relative z-10 border-b border-sand/80 bg-cream/85 px-4 py-6 shadow-soft backdrop-blur-sm sm:px-8 sm:py-7">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-terracotta sm:text-6xl md:text-7xl">
            Ember
          </h1>
          <p className="mt-3 font-sans text-base font-medium text-sage sm:text-lg">
            Warm conversations, real growth
          </p>
          <p className="mt-4 max-w-2xl text-pretty font-sans text-sm leading-relaxed text-ink-soft sm:text-base">
            Hi, I&apos;m Ember. Your personal coach, here whenever you need me. This is your safe space
            — come as you are, say what&apos;s real, and let&apos;s turn whatever you&apos;re carrying
            into something that moves you forward.
          </p>
        </div>
      </header>

      <main
        ref={listRef}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 overflow-y-auto px-4 py-6 sm:px-8"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {error && (
          <div
            role="alert"
            className="animate-fade-in rounded-panel border border-terracotta/35 bg-cream px-4 py-3 text-sm text-terracotta-deep shadow-soft"
          >
            <p className="font-medium">We couldn’t complete that message.</p>
            <p className="mt-1 text-ink-soft">{error}</p>
          </div>
        )}

        <ul className="flex flex-col gap-4 pb-28 sm:pb-32">
          {messages.map((m, index) => (
            <li
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              style={{ animationDelay: `${Math.min(index * 40, 200)}ms` }}
            >
              <div
                className={[
                  "max-w-[min(100%,28rem)] rounded-bubble px-4 py-3 text-[0.95rem] shadow-soft sm:text-base",
                  m.role === "user"
                    ? "rounded-br-md bg-terracotta text-cream shadow-lift"
                    : "rounded-bl-md border border-sand/90 bg-cream text-ink shadow-lift",
                ].join(" ")}
              >
                {m.role === "assistant" && (
                  <span className="mb-1 block text-xs font-medium tracking-wide text-sage">
                    {ASSISTANT_DISPLAY_NAME}
                  </span>
                )}
                <MessageMarkdown content={m.content} variant={m.role} />
              </div>
            </li>
          ))}

          {isSending && (
            <li className="flex justify-start animate-fade-in">
              <div className="flex max-w-[min(100%,20rem)] items-center gap-3 rounded-bubble rounded-bl-md border border-sand/90 bg-cream px-4 py-3 shadow-lift">
                <span className="text-xs font-medium uppercase tracking-wide text-sage">
                  Thinking
                </span>
                <span className="flex gap-1.5" aria-hidden>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-terracotta/70 animate-dot-pulse"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
                <span className="sr-only">Waiting for a response from {ASSISTANT_DISPLAY_NAME}.</span>
              </div>
            </li>
          )}
        </ul>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-sand/80 bg-cream/95 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] shadow-lift backdrop-blur-md sm:px-8">
        <form
          id={formId}
          onSubmit={sendMessage}
          className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-end"
        >
          <label className="sr-only" htmlFor="coach-message">
            Message to your mental coach
          </label>
          <textarea
            id="coach-message"
            name="message"
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isSending}
            placeholder="Write what you’re feeling… (Enter to send, Shift+Enter for a new line)"
            className="min-h-[3.25rem] flex-1 resize-none rounded-bubble border border-sand bg-cream px-4 py-3 text-ink shadow-soft outline-none ring-sage/40 transition placeholder:text-ink-soft/70 focus:border-sage-muted focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isSending || !draft.trim()}
            className="inline-flex shrink-0 items-center justify-center rounded-bubble bg-sage px-6 py-3 text-sm font-semibold text-ink shadow-soft transition hover:bg-sage-muted hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta disabled:cursor-not-allowed disabled:bg-sand disabled:text-ink-soft"
          >
            {isSending ? "Sending…" : "Send"}
          </button>
        </form>
      </footer>
    </div>
  );
}
