import type { User } from "./user";

export interface Chat {
  _id: string;
  user: User;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChatResponse {
  success: boolean;
  chat: Chat;
}

export interface GetChatsResponse {
  success: boolean;
  chats: Chat[];
}

export interface GetChatResponse {
  success: boolean;
  chat: Chat;
}

export interface DeleteChatResponse {
  success: boolean;
  chat: Chat;
}

export interface UpdateChatInput {
  chatId: string;
  title: string;
}

export interface UpdateChatResponse {
  success: boolean;
  chat: Chat;
}
