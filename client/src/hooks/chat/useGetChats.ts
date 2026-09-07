import { api } from "@/api";
import type { ApiError } from "@/types/axios";
import type { GetChatsResponse } from "@/types/chat";
import { useQuery } from "@tanstack/react-query";

const getChats = async (): Promise<GetChatsResponse> => {
  const response = await api.get("/chats");
  return response.data;
};

export const useGetChats = () => {
  return useQuery<GetChatsResponse, ApiError>({
    queryKey: ["chats"],
    queryFn: getChats,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
