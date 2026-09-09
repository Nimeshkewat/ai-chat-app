import { api } from "@/api";
import type { LogoutResponse } from "@/types/auth";
import type { ApiError } from "@/types/axios";
import { useMutation } from "@tanstack/react-query";

const logout = async (): Promise<LogoutResponse> => {
  const response = await api.post("/users/logout");
  return response.data;
};

export const useLogout = () => {
  return useMutation<LogoutResponse, ApiError>({
    mutationFn: logout,
  });
};
