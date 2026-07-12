"use client";

import ReactMarkdown from "react-markdown";

import { AssistantMessage } from "@/types/assistant.types";

interface ChatMessageProps {
  message: AssistantMessage;
}

export function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser = message.role === "user";

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
         <ReactMarkdown >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}