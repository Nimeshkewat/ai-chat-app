import { api } from "@/api";
import type { UpdateProfileResponse } from "@/types/auth";
import type { ApiError } from "@/types/axios";
import { useMutation } from "@tanstack/react-query";

const updateProfile = async (
  formDat: FormData,
): Promise<UpdateProfileResponse> => {
  const response = await api.patch("/users/update", formDat);
  return response.data;
};

export const useUpdateProfile = () => {
  return useMutation<UpdateProfileResponse, ApiError, FormData>({
    mutationFn: updateProfile,
  });
};
