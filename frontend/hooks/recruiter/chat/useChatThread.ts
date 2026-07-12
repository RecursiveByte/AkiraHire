"use client";

import {
  useCallback,
  useEffect,
  useState,
  type RefObject,
} from "react";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";
import { AssistantService } from "@/services/assistant.service";
import type { AssistantMessage } from "@/types/assistant.types";

interface UseChatThreadResult {
  messages: AssistantMessage[];
  setMessages:Dispatch<SetStateAction<AssistantMessage[]>>;
  isThinking: boolean;
  isLoadingMessages: boolean;
  sendMessage: (threadId: string, text: string) => Promise<void>;
  resetMessages: () => void;
}

export function useChatThread(
  threadId: string | null,
  skipNextThreadLoad: RefObject<boolean>
): UseChatThreadResult {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const resetMessages = useCallback(() => {
    setMessages([]);
    setIsThinking(false);
  }, []);

  const loadMessages = useCallback(async (id: string) => {
    setIsLoadingMessages(true);

    try {
      const data = await AssistantService.getMessages(id);

      setMessages(data.messages ?? []);
    } catch (err) {
      toast.error("Unable to load chat history.", {
        description:
          err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setIsLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (!threadId) {
      resetMessages();
      return;
    }

    if (skipNextThreadLoad.current) {
      skipNextThreadLoad.current = false;
      return;
    }

    void loadMessages(threadId);
  }, [threadId, loadMessages, resetMessages, skipNextThreadLoad]);

  const sendMessage = useCallback(
    async (threadId: string, text: string) => {
      if (isThinking) return;

      const userMessage: AssistantMessage = {
        role: "user",
        content: text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsThinking(true);

      try {
        await AssistantService.sendMessage(threadId, text);

        await loadMessages(threadId);
      } catch (err: any) {
        setMessages((prev) => prev.slice(0, -1));

        if (err?.response?.status === 429) {
          toast.error("Usage limit reached.", {
            description: "Please try again in a few minutes.",
          });
        } else {
          toast.error("Unable to send message.", {
            description: "Please try again.",
          });
        }
      } finally {
        setIsThinking(false);
      }
    },
    [isThinking, loadMessages]
  );

  return {
    messages,
    isThinking,
    setMessages,
    isLoadingMessages,
    sendMessage,
    resetMessages,
  };
}