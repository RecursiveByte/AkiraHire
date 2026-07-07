"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AssistantHeader } from "@/components/recruiter/assistant/AssistantHeader";
import { ChatArea } from "@/components/recruiter/assistant/ChatArea";
import { ChatInput } from "@/components/recruiter/assistant/ChatInput";
import { HistorySidebar } from "@/components/recruiter/assistant/HistorySidebar";
import { toast } from "sonner";

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

  const router = useRouter();
  const searchParams = useSearchParams();

  const threadId = searchParams.get("thread");

  useEffect(() => {
    fetchConversations();
  }, []);

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwidXNlcl9pZCI6Mywicm9sZSI6InJlY3J1aXRlciIsImVtYWlsIjoicmVjcnV0MUBleGFtcGxlLmNvbSIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3ODMzNjUxNzUsImV4cCI6MTc4MzM3MjM3NX0.CZmDxjGg0MOrjX6SqxdMiTyzkgjYhCA2oeuNm4yhrJw";

  useEffect(() => {
    if (threadId) {
      fetchMessages(threadId);
    } else {
      setMessages([]);
      setIsLoading(false);
    }
  }, [threadId]);

  async function fetchConversations() {
    try {
      setIsLoading(true);

      const res = await fetch(`${BACKEND_URL}/chatbot/conversations/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to load conversations");

      const data = await res.json();

      setConversations(data);

      if (data.length > 0) {
        setActiveId(data[0].id);
      }
      toast.success("data fetching successfull");
    } catch (err) {
      console.log("here");
      console.error(err);
      toast.error("something went wrong");
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
      setMessages(data.messages ?? []);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load chat history.", {
        description: "Please check your connection or try again in a moment.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendMessage(text: string) {
    if (isThinking) return;

    let currentThreadId = threadId;

    if (!currentThreadId) {
      currentThreadId = crypto.randomUUID();

      router.replace(`/recruiter/assistant?thread=${currentThreadId}`);
    }

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
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwidXNlcl9pZCI6Mywicm9sZSI6InJlY3J1aXRlciIsImVtYWlsIjoicmVjcnV0MUBleGFtcGxlLmNvbSIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3ODMzNjUxNzUsImV4cCI6MTc4MzM3MjM3NX0.CZmDxjGg0MOrjX6SqxdMiTyzkgjYhCA2oeuNm4yhrJw"}`,
        },
        body: JSON.stringify({
          thread_id: currentThreadId,
          message: text,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const assistant = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: assistant.content,
        },
      ]);
    } catch (err) {
      console.error(err);

      toast.error("Unable to send message.", {
        description: "Please try again.",
      });
    } finally {
      setIsThinking(false);
    }
  }

  function handleNewConversation() {
    const newThreadId = crypto.randomUUID();

    setMessages([]);
    setActiveId("");
    setIsThinking(false);

    router.push(`/recruiter/assistant?thread=${newThreadId}`);
  }

  function handleSelectConversation(threadId: string) {
    setActiveId(threadId);
    console.log("clicke the convero")
    setMessages([]);
    setIsThinking(false);

    router.push(`/recruiter/assistant?thread=${threadId}`);

    if (window.innerWidth < 1024) {
      setIsHistoryOpen(false);
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
            <ChatArea messages={messages} isThinking={isThinking} />

            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isThinking}
            />
          </>
        )}
      </div>

      <HistorySidebar
        loading={isLoading}
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
