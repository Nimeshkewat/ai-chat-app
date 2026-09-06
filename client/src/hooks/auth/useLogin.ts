import type { LoginInput, LoginResponse } from "@/types/auth";
import { api } from "../../api";
import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/types/axios";

const login = async (input: LoginInput): Promise<LoginResponse> => {
  const response = await api.post("/users/login", input);
  return response.data;
};

export const useLogin = () => {
  return useMutation<LoginResponse, ApiError, LoginInput>({
    mutationFn: login,
  });
};
