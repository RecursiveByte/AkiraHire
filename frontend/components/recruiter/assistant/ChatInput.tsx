"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  disabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  disabled = false,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async () => {
    const message = input.trim();

    if (!message || disabled) return;

    try {
      await onSendMessage(message);

      setInput("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <div className="shrink-0 border-t border-white/5 bg-[#050505] p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="glass-card relative flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.01] p-3 transition-colors focus-within:border-white/20">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);

              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask Akira to screen a candidate, draft a JD, write interview questions..."
            className="min-h-[36px] max-h-36 flex-1 resize-none bg-transparent py-2 text-sm text-white placeholder-white/40 focus:outline-none"
            disabled={disabled}
          />

          <button
            onClick={() => void handleSubmit()}
            disabled={!input.trim() || disabled}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white text-black transition-all hover:bg-white/90 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
          >
            <span className="msi text-[20px]">arrow_upward</span>
          </button>
        </div>
      </div>
    </div>
  );
}