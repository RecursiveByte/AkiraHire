"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import ChatThinking from "./ChatThinking";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatAreaProps {
  messages: Message[];
  isThinking?: boolean;
  isLoading?: boolean;
}

export function ChatArea({
  messages,
  isThinking = false,
  isLoading = false,
}: ChatAreaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  return (
    <div
    ref={containerRef}
      className="chat-scroll flex-1 overflow-y-auto bg-[#050505] px-8 py-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        {isLoading && messages.length === 0 ? (
          <div className="flex h-full items-center justify-center py-12 text-sm text-white/40">
            Loading conversation...
          </div>
        ) : (
          <>
            {messages.map((message, id) => {
              if (
                message.role === "assistant" &&
                message.content.trim() === ""
              ) {
                return null;
              }

              return <ChatMessage key={id} message={message} />;
            })}

            {isThinking && <ChatThinking />}
          </>
        )}

      </div>
    </div>
  );
}
