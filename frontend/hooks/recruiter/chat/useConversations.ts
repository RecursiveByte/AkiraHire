"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { AssistantService } from "@/services/assistant.service";
import type { AssistantConversation } from "@/types/assistant.types";

interface UseConversationsResult {
  conversations: AssistantConversation[];
  activeId: string;
  setActiveId: (id: string) => void;
  isLoading: boolean;
  refetch: () => Promise<void>;
  deleteConversation: (threadId: string) => Promise<void>;
}

export function useConversations(): UseConversationsResult {
  const [conversations, setConversations] = useState<AssistantConversation[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await AssistantService.getConversations();

      setConversations(data);

      if (data.length > 0) {
        setActiveId((prev) => prev || data[0].id);
      }
    } catch (err) {
      toast.error("Failed to load conversations.", {
        description:
          err instanceof Error ? err.message : "Please try again.",
        action: {
          label: "Retry",
          onClick: () => {
            void refetch();
          },
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, []);


  const deleteConversation = async (threadId: string) => {
    try {
      await AssistantService.deleteConversation(threadId);
  
      toast.success("Conversation deleted.");
  
      refetch();
    } catch (err) {
      toast.error("Unable to delete conversation.", {
        description:
          err instanceof Error ? err.message : "Please try again.",
      });
    }
  };

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return {
    conversations,
    activeId,
    deleteConversation,
    setActiveId,
    isLoading,
    refetch,
  };
}