import { api } from "@/api";
import type { ApiError } from "@/types/axios";
import type { UpdateChatInput, UpdateChatResponse } from "@/types/chat";
import { useMutation } from "@tanstack/react-query";

const updateChat = async ({
  chatId,
  title,
}: UpdateChatInput): Promise<UpdateChatResponse> => {
  const response = await api.patch(`/chats/${chatId}`, { title });
  return response.data;
};

export const useUpdateChat = () => {
  return useMutation<UpdateChatResponse, ApiError, UpdateChatInput>({
    mutationFn: updateChat,
  });
};
