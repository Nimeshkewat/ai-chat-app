import type { RegisterInput, RegisterResponse } from "@/types/auth";
import { api } from "../../api";
import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/types/axios";

const register = async (input: RegisterInput): Promise<RegisterResponse> => {
  const { username, email, password } = input;
  const response = await api.post("/users/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const useRegiseter = () => {
  return useMutation<RegisterResponse, ApiError, RegisterInput>({
    mutationFn: register,
  });
};
