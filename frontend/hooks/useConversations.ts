"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AssistantService } from "@/services/assistantService";
import type { AssistantConversation } from "@/types/assistant.types";

interface UseConversationsResult {
  conversations: AssistantConversation[];
  activeId: string;
  setActiveId: (id: string) => void;
  isLoading: boolean;
  refetch: () => void;
}

export function useConversations(): UseConversationsResult {
  const [conversations, setConversations] = useState<AssistantConversation[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await AssistantService.getConversations();
      setConversations(data);

      if (data.length > 0) {
        setActiveId((prev) => prev || data[0].id);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load conversations";
      toast.error(message, {
        action: { label: "Retry", onClick: fetchConversations },
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return { conversations, activeId, setActiveId, isLoading, refetch: fetchConversations };
}