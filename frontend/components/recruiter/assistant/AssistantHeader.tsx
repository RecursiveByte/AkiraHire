"use client";

import { ASSETS } from "@/constants/assets";

interface AssistantHeaderProps {
  threadTitle?: string;
  isHistoryOpen: boolean;
  onToggleHistory: () => void;
}

export function AssistantHeader({
  threadTitle,
  isHistoryOpen,
  onToggleHistory,
}: AssistantHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.01] px-8 py-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="glass-card h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <img
            src={ASSETS.AKIRA_LOGO}
            alt="Akira AI"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-geist text-sm font-bold tracking-tight text-white">
            Akira AI Assistant
          </h2>

          <div className="mt-0.5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />

            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">
              {threadTitle || "Core Intelligence 4.0"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleHistory}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
          title={isHistoryOpen ? "Hide History" : "Show History"}
        >
          <span className="msi text-[20px]">
            {isHistoryOpen ? "menu_open" : "history"}
          </span>
        </button>
      </div>
    </div>
  );
}
