"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AssistantHeader } from "@/components/recruiter/assistant/AssistantHeader";
import { ChatArea } from "@/components/recruiter/assistant/ChatArea";
import { ChatInput } from "@/components/recruiter/assistant/ChatInput";
import { HistorySidebar } from "@/components/recruiter/assistant/HistorySidebar";
import { useConversations } from "@/hooks/chat/useConversations";
import { useChatThread } from "@/hooks/chat/useChatThread";

export default function RecruiterAssistantPage() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const threadId = searchParams.get("thread");

  const { conversations, activeId, setActiveId, isLoading: isConversationsLoading } =
    useConversations();

  const { messages, isThinking, isLoadingMessages, sendMessage } =
    useChatThread(threadId);

  function handleNewConversation() {
    const newThreadId = crypto.randomUUID();

    setActiveId("");
    router.push(`/recruiter/assistant?thread=${newThreadId}`);
  }

  function handleSelectConversation(id: string) {
    setActiveId(id);
    router.push(`/recruiter/assistant?thread=${id}`);

    if (window.innerWidth < 1024) {
      setIsHistoryOpen(false);
    }
  }

  return (
    <section className="flex h-[calc(100vh-80px)] w-full overflow-hidden">
      <div className="flex flex-1 flex-col bg-[#050505] overflow-hidden">
        <AssistantHeader
          threadTitle={conversations.find((c) => c.id === activeId)?.title || "New Chat"}
          isHistoryOpen={isHistoryOpen}
          onToggleHistory={() => setIsHistoryOpen((prev) => !prev)}
        />

        {!isLoadingMessages && (
          <>
            <ChatArea messages={messages} isThinking={isThinking} />
            <ChatInput onSendMessage={sendMessage} disabled={isThinking} />
          </>
        )}
      </div>

      <HistorySidebar
        loading={isConversationsLoading}
        conversations={conversations}
        activeId={activeId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        isOpen={isHistoryOpen}
        setIsHistoryOpen={setIsHistoryOpen}
      />
    </section>
  );
}