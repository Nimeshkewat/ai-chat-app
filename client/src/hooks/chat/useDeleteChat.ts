import { api } from "@/api";
import type { ApiError } from "@/types/axios";
import type { DeleteChatResponse } from "@/types/chat";
import { useMutation } from "@tanstack/react-query";

const deleteChat = async (chatId: string): Promise<DeleteChatResponse> => {
  const response = await api.delete(`/chats/${chatId}`);
  return response.data;
};

export const useDeleteChat = () => {
  return useMutation<DeleteChatResponse, ApiError, string>({
    mutationFn: deleteChat,
  });
};
