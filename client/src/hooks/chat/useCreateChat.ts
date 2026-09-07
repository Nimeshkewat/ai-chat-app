import { api } from "@/api";
import type { ApiError } from "@/types/axios";
import type { CreateChatResponse } from "@/types/chat";
import { useMutation } from "@tanstack/react-query";

const createNewChat = async (title: string): Promise<CreateChatResponse> => {
  const response = await api.post("/chats", { title });
  return response.data;
};

export const useCreateNewChat = () => {
  return useMutation<CreateChatResponse, ApiError, string>({
    mutationFn: createNewChat,
  });
};
