"use client";

import { useEffect } from "react";

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

  isOpen: boolean;
  setIsHistoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HistorySidebar({
  conversations,
  loading,
  activeId,
  onSelectConversation,
  onNewConversation,
  isOpen,
  setIsHistoryOpen,
}: HistorySidebarProps) {
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

  useEffect(() => {
    console.log(conversations);
  }, [conversations]);

  return (
    <aside
      className={`border-l border-white/5 bg-[#080808] transition-all duration-300
      ${
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
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <span className="msi text-[20px]">close</span>
            </button>
          </div>
        )}

        <button
          onClick={onNewConversation}
          className={`flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 cursor-pointer ${
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
      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            Loading conversations...
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            No conversations found.
          </div>
        ) : (
          conversations.map((conversation) => {
            const isActive = conversation.id === activeId;

            if (!isOpen) {
              return (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl transition cursor-pointer ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:bg-white/5 hover:text-white"
                  }`}
                  title={conversation.title}
                >
                  <span className="msi">forum</span>
                </button>
              );
            }

            return (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`mb-2 flex w-full items-start gap-3 rounded-xl p-3 text-left transition cursor-pointer ${
                  isActive
                    ? "border-l-2 border-white bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="msi mt-1 text-[18px]">forum</span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {conversation.title}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
