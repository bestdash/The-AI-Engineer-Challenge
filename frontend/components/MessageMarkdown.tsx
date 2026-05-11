import type { ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

export type MessageMarkdownVariant = "user" | "assistant";

type MessageMarkdownProps = {
  content: string;
  variant: MessageMarkdownVariant;
};

/** Flatten markdown code children to a plain string for block vs inline heuristics. */
function codeTextContent(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(codeTextContent).join("");
  }
  return "";
}

/**
 * Renders coach/user text as Markdown inside chat bubbles (**bold**, lists, etc.).
 * Uses `react-markdown` (no raw HTML). Block `code` fences are detected via `language-*`
 * classes or multiline content; inline code uses a compact pill style.
 */
export function MessageMarkdown({ content, variant }: MessageMarkdownProps) {
  const isUser = variant === "user";

  const components: Components = {
    p: ({ children, ...props }) => (
      <p className="my-2 first:mt-0 last:mb-0 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }) => (
      <strong
        className={isUser ? "font-semibold text-cream" : "font-semibold text-ink"}
        {...props}
      >
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className={isUser ? "italic text-cream/95" : "italic text-ink-soft"} {...props}>
        {children}
      </em>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="my-2 ml-0 list-disc space-y-1 pl-5 first:mt-0 last:mb-0 marker:text-current"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="my-2 ml-0 list-decimal space-y-1 pl-5 first:mt-0 last:mb-0 marker:text-current"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed [&>p]:my-1" {...props}>
        {children}
      </li>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className={
          isUser
            ? "font-medium text-cream underline decoration-cream/70 underline-offset-2 hover:decoration-cream"
            : "font-medium text-terracotta underline decoration-terracotta/40 underline-offset-2 hover:text-terracotta-deep"
        }
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    code: ({ className, children, ...props }) => {
      const text = codeTextContent(children);
      const hasLanguage = Boolean(className?.includes("language-"));
      const isLikelyBlock = hasLanguage || text.includes("\n");

      if (isLikelyBlock) {
        return (
          <code
            className={`block w-full whitespace-pre-wrap break-words font-mono text-[0.88em] leading-relaxed ${
              isUser ? "text-cream" : "text-ink"
            } ${className ?? ""}`}
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code
          className={
            isUser
              ? "rounded-md bg-terracotta-deep/35 px-1.5 py-0.5 font-mono text-[0.9em] text-cream"
              : "rounded-md bg-sand px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
          }
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className={`my-2 overflow-x-auto rounded-2xl p-3 text-[0.9em] first:mt-0 last:mb-0 ${
          isUser ? "bg-terracotta-deep/30 [&>code]:bg-transparent" : "bg-parchment [&>code]:bg-transparent"
        }`}
        {...props}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className={`my-2 border-l-4 pl-3 italic first:mt-0 last:mb-0 ${
          isUser ? "border-cream/50 text-cream/95" : "border-sage/80 text-ink-soft"
        }`}
        {...props}
      >
        {children}
      </blockquote>
    ),
    h1: ({ children, ...props }) => (
      <h1
        className={`mt-3 mb-2 text-lg font-semibold first:mt-0 ${isUser ? "text-cream" : "text-ink"}`}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className={`mt-3 mb-2 text-base font-semibold first:mt-0 ${isUser ? "text-cream" : "text-ink"}`}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className={`mt-2 mb-1 text-[0.95rem] font-semibold first:mt-0 ${isUser ? "text-cream" : "text-ink"}`}
        {...props}
      >
        {children}
      </h3>
    ),
  };

  return (
    <div className="min-w-0 break-words">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
