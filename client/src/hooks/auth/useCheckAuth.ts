import type { CheckAuthResponse } from "@/types/auth";
import { api } from "../../api";
import { useQuery } from "@tanstack/react-query";
import type { ApiError } from "@/types/axios";

const checkAuth = async (): Promise<CheckAuthResponse> => {
  const response = await api.get("/users/check-auth");
  return response.data;
};

export const useCheckAuth = () => {
  return useQuery<CheckAuthResponse, ApiError, undefined>({
    queryKey: ["check-auth"],
    queryFn: checkAuth,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
