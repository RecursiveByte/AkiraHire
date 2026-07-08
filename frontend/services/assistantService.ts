import { apiClient } from "@/lib/api/apiClient";

import type {
  AssistantConversation,
  GetMessagesResponse,
  SendMessageResponse,
} from "@/types/assistant.types";

export class AssistantService {
  static async getConversations(): Promise<AssistantConversation[]> {
    const { data } = await apiClient.get<AssistantConversation[]>("/chatbot/conversations/");
    return data;
  }

  static async getMessages(threadId: string): Promise<GetMessagesResponse> {
    const { data } = await apiClient.get<GetMessagesResponse>(
      `/chatbot/thread/${threadId}/messages`
    );
    return data;
  }

  static async sendMessage(threadId: string, message: string): Promise<SendMessageResponse> {
    const { data } = await apiClient.post<SendMessageResponse>("/chatbot/chat", {
      thread_id: threadId,
      message,
    });
    return data;
  }
}