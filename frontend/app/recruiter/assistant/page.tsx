"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AssistantHeader } from "@/components/recruiter/assistant/AssistantHeader";
import { ChatArea } from "@/components/recruiter/assistant/ChatArea";
import { ChatInput } from "@/components/recruiter/assistant/ChatInput";
import { HistorySidebar } from "@/components/recruiter/assistant/HistorySidebar";
import SearchBar from "@/components/common/SearchBar";
import { useConversations } from "@/hooks/recruiter/chat/useConversations";
import { useChatThread } from "@/hooks/recruiter/chat/useChatThread";

export default function RecruiterAssistantPage() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const threadId = searchParams.get("thread");

  const skipNextThreadLoad = useRef(false);

  const {
    conversations,
    activeId,
    setActiveId,
    isLoading: isConversationsLoading,
    refetch,
    deleteConversation
  } = useConversations(search);

  const {
    messages,
    isThinking,
    isLoadingMessages,
    sendMessage,
    setMessages
  } = useChatThread(threadId, skipNextThreadLoad);

  function createNewConversation() {
    const id = crypto.randomUUID();

    skipNextThreadLoad.current = true;

    setActiveId("");

    router.replace(`/recruiter/assistant?thread=${id}`);

    return id;
  }

  async function handleSendMessage(text: string) {
    const isNewConversation = !threadId;
    const id = threadId ?? createNewConversation();

    await sendMessage(id, text);

    if (isNewConversation) {
      await refetch();
    }
  }

  function handleNewConversation() {
    setMessages([]);
    router.replace("/recruiter/assistant");
  }

  function handleSelectConversation(id: string) {
    skipNextThreadLoad.current = false;

    setActiveId(id);

    router.push(`/recruiter/assistant?thread=${id}`);

    if (window.innerWidth < 1024) {
      setIsHistoryOpen(false);
    }
  }

  return (
    <section className="flex h-[calc(100vh-80px)] w-full overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden bg-[#050505]">
        <AssistantHeader
          threadTitle={
            conversations.find((c) => c.id === activeId)?.title ?? "New Chat"
          }
          isHistoryOpen={isHistoryOpen}
          onToggleHistory={() => setIsHistoryOpen((prev) => !prev)}
        />

        <ChatArea
          messages={messages}
          isThinking={isThinking}
          isLoading={isLoadingMessages}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isThinking}
        />
      </div>

      <div
        className={
          isHistoryOpen
            ? "fixed right-0 top-20 z-50 flex h-[calc(100vh-80px)] w-80 flex-col lg:relative lg:top-0 lg:z-auto"
            : "hidden lg:flex lg:w-16 lg:flex-col"
        }
      >
        {isHistoryOpen && (
          <div className="border-l  border-white/5 bg-[#080808] [&>div]:w-full p-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search conversations..."
            />
          </div>
        )}

        <HistorySidebar
          conversations={conversations}
          loading={isConversationsLoading}
          activeId={activeId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onDeleteConversation={deleteConversation}
          isOpen={isHistoryOpen}
          setIsHistoryOpen={setIsHistoryOpen}
        />
      </div>
    </section>
  );
}