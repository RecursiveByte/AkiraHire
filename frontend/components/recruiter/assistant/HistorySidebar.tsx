"use client";

import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

interface HistorySidebarProps {
  conversations: Conversation[];
  loading: boolean;
  activeId: string;

  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;

  isOpen: boolean;
  setIsHistoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HistorySidebar({
  conversations,
  loading,
  activeId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isOpen,
  setIsHistoryOpen,
}: HistorySidebarProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: conversations.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isOpen ? 72 : 52),
    overscan: 6,
  });

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
  }, [setIsHistoryOpen]);

  return (
    <aside
      className={`border-l border-white/5 bg-[#080808] transition-all duration-300 ${
        isOpen
          ? "fixed right-0 top-20 z-50 flex h-[calc(100vh-80px)] w-80 flex-col shadow-2xl lg:relative lg:top-0 lg:z-auto lg:h-full lg:shadow-none"
          : "hidden lg:flex lg:w-16 lg:flex-col"
      }`}
    >
      {/* Header */}
      <div className="border-b border-white/5 p-4">
        {isOpen && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Conversations</h2>

            <button
              onClick={() => setIsHistoryOpen(false)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span className="msi text-[20px]">close</span>
            </button>
          </div>
        )}

        <button
          onClick={onNewConversation}
          className={`flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 ${
            isOpen ? "w-full gap-2 py-3" : "mx-auto h-10 w-10"
          }`}
        >
          <span className="msi text-[20px]">add</span>

          {isOpen && (
            <span className="text-sm font-medium">New Conversation</span>
          )}
        </button>
      </div>

      {/* Conversation List */}
      <div ref={parentRef} className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            Loading conversations...
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            No conversations found.
          </div>
        ) : (
          <div
            className="relative w-full"
            style={{
              height: rowVirtualizer.getTotalSize(),
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const conversation = conversations[virtualRow.index];
              const isActive = conversation.id === activeId;

              return (
                <div
                  key={conversation.id}
                  ref={rowVirtualizer.measureElement}
                  data-index={virtualRow.index}
                  className="absolute left-0 top-0 w-full"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {!isOpen ? (
                    <button
                      onClick={() => onSelectConversation(conversation.id)}
                      className={`mx-auto mb-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/40 hover:bg-white/5 hover:text-white"
                      }`}
                      title={conversation.title}
                    >
                      <span className="msi">forum</span>
                    </button>
                  ) : (
                    <div className="group relative mb-2">
                      {/* Conversation Button */}
                      <button
                        onClick={() => onSelectConversation(conversation.id)}
                        className={`flex w-full items-center gap-3 rounded-xl p-3 pr-12 text-left transition ${
                          isActive
                            ? "border-l-2 border-white bg-white/10 text-white"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="msi text-[18px]">forum</span>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {conversation.title}
                          </p>
                        </div>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => onDeleteConversation(conversation.id)}
                        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-white/40 opacity-100 transition-all duration-200 hover:bg-red-500/15 hover:text-red-400 "
                        title="Delete conversation"
                      >
                        <span className="msi text-[18px]">delete</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
