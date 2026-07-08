"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import ChatThinking from "./ChatThinking";

interface Skill {
  title: string;
  value: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  skills?: Skill[];
  footer?: string;
}

interface ChatAreaProps {
  messages: Message[];
  isThinking?: boolean;
}

export function ChatArea({ messages, isThinking = false }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="chat-scroll flex-1 overflow-y-auto px-8 py-8 bg-[#050505]">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        {messages.map((msg, id) => (
          <ChatMessage key={id} role={msg.role} message={msg.content} />
        ))}

        {isThinking && <ChatThinking />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
