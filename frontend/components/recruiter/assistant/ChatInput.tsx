"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;
    onSendMessage(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-white/5 bg-[#050505] p-6 shrink-0">
      <div className="mx-auto max-w-4xl space-y-4 ">
        {/* Input Bar */}
        <div className="glass-card  relative flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.01] p-3 focus-within:border-white/20 transition-colors">

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
            className="flex-1 max-h-36 min-h-[36px] resize-none bg-transparent py-2 text-sm text-white placeholder-white/40 focus:outline-none"
            disabled={disabled}
          />

          <div className="flex items-center gap-1.5">

            <button
              onClick={handleSubmit}
              disabled={!input.trim() || disabled}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black hover:bg-white/90 disabled:bg-white/10 disabled:text-white/30 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            >
              <span className="msi text-[20px]">arrow_upward</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

