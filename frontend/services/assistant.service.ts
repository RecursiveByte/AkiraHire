import { apiClient } from "@/lib/api/apiClient";
import { useAuthStore } from "@/store/authStore";

import type {
  AssistantConversation,
  GetMessagesResponse,
  SendMessageResponse,
} from "@/types/assistant.types";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export class AssistantService {
  static async getConversations(): Promise<AssistantConversation[]> {
    const { data } = await apiClient.get<AssistantConversation[]>(
      "/chatbot/conversations/"
    );
    return data;
  }

  static async getMessages(threadId: string): Promise<GetMessagesResponse> {
    const { data } = await apiClient.get<GetMessagesResponse>(
      `/chatbot/thread/${threadId}/messages`
    );
    return data;
  }

  static async sendMessage(
    threadId: string,
    message: string
  ): Promise<SendMessageResponse> {
    const { data } = await apiClient.post<SendMessageResponse>(
      "/chatbot/chat",
      {
        thread_id: threadId,
        message,
      }
    );
    return data;
  }

  // static async streamMessage(
    // threadId: string,
    // message: string,
    // onChunk: (content: string) => void,
    // onDone: () => void,
    // onError?: (error: Error) => void
  // ): Promise<void> {
    // try {
      // const accessToken = useAuthStore.getState().accessToken;

      // const response = await fetch(`${API_BASE}/chatbot/chat/stream`, {
        // method: "POST",
        // headers: {
          // "Content-Type": "application/json",
          // ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        // },
        // body: JSON.stringify({ thread_id: threadId, message }),
      // });

      // if (!response.ok || !response.body) {
        // throw new Error(`Stream request failed: ${response.status}`);
      // }

      // const reader = response.body.getReader();
      // const decoder = new TextDecoder();
      // let buffer = "";

      // while (true) {
        // const { done, value } = await reader.read();
        // if (done) break;

        // buffer += decoder.decode(value, { stream: true });
        // const parts = buffer.split("\n\n");
        // buffer = parts.pop() || "";

        // for (const part of parts) {
          // if (!part.startsWith("data: ")) continue;

          // const jsonStr = part.slice(6).trim();
          // if (!jsonStr) continue;

          // const data = JSON.parse(jsonStr);

          // if (data.done) {
          // onDone();
          // } else if (data.content !== undefined) {
          // onChunk(data.content);
          // }

          // if (data.done) {
            // if (data.content !== undefined) {
              // onChunk(data.content);
            // }
            // onDone();
          // } else if (data.content !== undefined) {
            // onChunk(data.content);
          // }
        // }
      // }
    // } catch (err) {
      // console.log(err);
      // onError?.(err as Error);
    // }
  // }
}
