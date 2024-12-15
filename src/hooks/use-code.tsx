"use client";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";

export const useCodes = (slug: string) => {
  const { api } = useAuth();
  return useQuery({
    staleTime: Infinity,
    queryKey: ["codes", slug],

    queryFn: async () => {
      const response = await api.get(`/users/problems/${slug}/codes`);
      return response.data.data as { [lang: string]: string };
    },
  });
};
