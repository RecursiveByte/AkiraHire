export interface AssistantMessage {
    id: string;
    role: "assistant" | "user";
    content: string;
  }
  
  export interface AssistantConversation {
    id: string;
    title: string;
    updatedAt: string;
  }
  
  export interface SendMessageResponse {
    content: string;
  }
  
  export interface GetMessagesResponse {
    messages: AssistantMessage[];
  }