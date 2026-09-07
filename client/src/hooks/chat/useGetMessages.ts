import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import type { GetMessagesResponse } from "@/types/message";
import type { ApiError } from "@/types/axios";

const getMessages = async (chatId: string): Promise<GetMessagesResponse> => {
  const response = await api.get(`/messages/${chatId}`);
  return response.data;
};

export const useGetMessages = (chatId?: string) => {
  return useQuery<GetMessagesResponse, ApiError>({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId!),
    enabled: !!chatId,
  });
};
