"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AssistantService } from "@/services/assistantService";
import type { AssistantMessage } from "@/types/assistant.types";

interface UseChatThreadResult {
  messages: AssistantMessage[];
  isThinking: boolean;
  isLoadingMessages: boolean;
  sendMessage: (text: string) => Promise<void>;
  resetMessages: () => void;
}

export function useChatThread(threadId: string | null): UseChatThreadResult {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const resetMessages = useCallback(() => {
    setMessages([]);
    setIsThinking(false);
  }, []);

  useEffect(() => {
    if (!threadId) {
      resetMessages();
      return;
    }

    let ignore = false;

    async function loadMessages() {
      setIsLoadingMessages(true);

      try {
        const data = await AssistantService.getMessages(threadId as string);
        if (!ignore) {
          setMessages(data.messages ?? []);
        }
      } catch (err) {
        if (!ignore) {
          const message = err instanceof Error ? err.message : "Please try again.";
          toast.error("Unable to load chat history.", { description: message });
        }
      } finally {
        if (!ignore) {
          setIsLoadingMessages(false);
        }
      }
    }

    loadMessages();

    return () => {
      ignore = true;
    };
  }, [threadId, resetMessages]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!threadId || isThinking) return;

      const userMessage: AssistantMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsThinking(true);

      try {
        const assistant = await AssistantService.sendMessage(threadId, text);

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: assistant.content,
          },
        ]);
      } catch (err) {
        toast.error("Unable to send message.", { description: "Please try again." });
      } finally {
        setIsThinking(false);
      }
    },
    [threadId, isThinking]
  );

  return { messages, isThinking, isLoadingMessages, sendMessage, resetMessages };
}