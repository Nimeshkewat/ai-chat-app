export interface Message {
  _id: string;
  chat: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface SendMessageResponse {
  success: boolean;
  messages: [Message, Message];
}

export interface GetMessagesResponse {
  success: boolean;
  messages: Message[];
}
