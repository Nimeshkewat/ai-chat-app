import { api } from "@/api";
import type { ProfileResponse } from "@/types/auth";
import type { ApiError } from "@/types/axios";
import { useQuery } from "@tanstack/react-query";

const getProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const useGetProfile = () => {
  return useQuery<ProfileResponse, ApiError>({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
