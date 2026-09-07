import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import type { SendMessageResponse } from "@/types/message";
import type { ApiError } from "@/types/axios";

const sendMessage = async ({
  chatId,
  content,
}: {
  chatId: string;
  content: string;
}): Promise<SendMessageResponse> => {
  const response = await api.post(`/messages/${chatId}`, { content });
  return response.data;
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    SendMessageResponse,
    ApiError,
    { chatId: string; content: string }
  >({
    mutationFn: sendMessage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.chatId],
      });
    },
  });
};
