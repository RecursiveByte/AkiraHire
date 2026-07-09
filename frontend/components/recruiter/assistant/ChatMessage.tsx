"use client";

interface ChatMessageProps {
  role: "assistant" | "user";
  message: string;
}

export function ChatMessage({
  role,
  message,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full animate-fade-in ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 text-sm leading-relaxed whitespace-pre-line  shadow-sm ${
          isUser
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-bl-md border border-white/10 bg-white/3 text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}