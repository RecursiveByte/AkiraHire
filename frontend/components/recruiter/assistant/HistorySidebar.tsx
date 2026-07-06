"use client";

import { useState, useEffect } from "react";

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

interface HistorySidebarProps {
  conversations: Conversation[];
  activeId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  isOpen: boolean;
  setIsHistoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HistorySidebar({
  conversations,
  activeId,
  onSelectConversation,
  onNewConversation,
  isOpen,
  setIsHistoryOpen,
}: HistorySidebarProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsHistoryOpen(true);
      } else {
        setIsHistoryOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside
      className={`transition-all duration-300 ease-in-out border-l border-white/5 bg-[#080808] h-full flex flex-col shrink-0
        ${
          isOpen
            ? "flex w-80 fixed lg:relative right-0 top-20 lg:top-0 z-50 lg:z-auto h-[calc(100vh-80px)] shadow-2xl lg:shadow-none"
            : "hidden lg:flex lg:w-16"
        }
      `}
    >
      <div
        className={`p-4 border-b border-white/5 ${
          isOpen ? "space-y-4" : "flex flex-col items-center gap-4"
        }`}
      >
        {isOpen && (
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Conversations</h2>

            <button
              onClick={() => setIsHistoryOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <span className="msi text-[20px]">close</span>
            </button>
          </div>
        )}

        {isOpen ? (
          <button
            onClick={onNewConversation}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-98 cursor-pointer"
          >
            <span className="msi text-[18px]">add</span>
            New Conversation
          </button>
        ) : (
          <button
            onClick={onNewConversation}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 cursor-pointer"
            title="New Conversation"
          >
            <span className="msi text-[20px]">add</span>
          </button>
        )}

        {isOpen && (
          <div className="relative flex items-center animate-fade-in">
            <span className="msi absolute left-3 text-[18px] text-white/40">
              search
            </span>
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/1 py-2 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:border-white/20 focus:outline-none transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 text-white/40 hover:text-white"
              >
                <span className="msi text-[16px]">close</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* History List */}
      <div
        className={`chat-scroll flex-1 overflow-y-auto p-2 ${
          !isOpen ? "flex flex-col items-center gap-2" : ""
        }`}
      >
        {isOpen && (
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-white/30 animate-fade-in">
            Recent Sessions
          </div>
        )}

        <div
          className={`space-y-1 w-full ${
            !isOpen ? "flex flex-col items-center" : ""
          }`}
        >
          {filteredConversations.length > 0
            ? filteredConversations.map((c) => {
                const isActive = c.id === activeId;

                if (!isOpen) {
                  return (
                    <button
                      key={c.id}
                      onClick={() => onSelectConversation(c.id)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? "bg-white/10 text-white border-l-2 border-white"
                          : "text-white/40 hover:bg-white/5 hover:text-white"
                      }`}
                      title={c.title}
                    >
                      <span
                        className={`msi text-[20px] ${
                          isActive ? "text-white" : ""
                        }`}
                      >
                        forum
                      </span>
                    </button>
                  );
                }

                return (
                  <button
                    key={c.id}
                    onClick={() => onSelectConversation(c.id)}
                    className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all cursor-pointer animate-fade-in ${
                      isActive
                        ? "bg-white/10 text-white border-l-2 border-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`msi mt-0.5 text-[18px] ${
                        isActive ? "text-white" : "text-white/40"
                      }`}
                    >
                      forum
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate leading-normal">
                        {c.title}
                      </p>
                      <p className="mt-0.5 text-[9px] text-white/30 font-medium">
                        {c.updatedAt}
                      </p>
                    </div>
                  </button>
                );
              })
            : isOpen && (
                <div className="p-4 text-center text-xs text-white/30 animate-fade-in">
                  No conversations found
                </div>
              )}
        </div>
      </div>
    </aside>
  );
}
