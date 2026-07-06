"use client";

import { useEffect, useState } from "react";

import { AssistantHeader } from "@/components/recruiter/assistant/AssistantHeader";
import { ChatArea } from "@/components/recruiter/assistant/ChatArea";
import { ChatInput } from "@/components/recruiter/assistant/ChatInput";
import { HistorySidebar } from "@/components/recruiter/assistant/HistorySidebar";
import { threadId } from "worker_threads";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

export default function RecruiterAssistantPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isThinking, setIsThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [threadId,setThreadId] = useState("873f84d4-0253-434b-acea-d9ef782f2ef7")

  useEffect(() => {
    // fetchConversations();
  }, []);


  useEffect(() => {
    if (threadId) {
      console.log("fetching..")
      fetchMessages(threadId);
    }
  }, [threadId]);

  async function fetchConversations() {
    try {
      setIsLoading(true);

      const res = await fetch(`${BACKEND_URL}/chatbot/conversations/`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to load conversations");

      const data = await res.json();

      setConversations(data);

      if (data.length > 0) {
        setActiveId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchMessages(threadId: string) {
    try {
      const res = await fetch(
        `${BACKEND_URL}/chatbot/thread/${threadId}/messages`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to load messages");

      const data = await res.json();
      setIsLoading(false)
      setMessages(data.messages ?? []);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSendMessage(text: string) {
    if (!activeId || isThinking) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setIsThinking(true);

      const res = await fetch(`${BACKEND_URL}/chatbot/chat`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thread_id: activeId,
          message: text,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const assistant = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: assistant.id,
          role: "assistant",
          content: assistant.content,
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <section className="flex h-[calc(100vh-80px)] w-full overflow-hidden">
      <div className="flex flex-1 flex-col bg-[#050505] overflow-hidden">
        <AssistantHeader
          threadTitle={
            conversations.find((c) => c.id === activeId)?.title || "New Chat"
          }
          isHistoryOpen={isHistoryOpen}
          onToggleHistory={() => setIsHistoryOpen((prev) => !prev)}
        />

        {!isLoading && (
          <>
            <ChatArea
              messages={messages}
              isThinking={isThinking}
            />

            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isThinking}
            />
          </>
        )}
      </div>

      <HistorySidebar
        conversations={conversations}
        activeId={activeId}
        onSelectConversation={setActiveId}
        onNewConversation={() => {}}
        isOpen={isHistoryOpen}
        setIsHistoryOpen = {setIsHistoryOpen}
      />
    </section>
  );
}