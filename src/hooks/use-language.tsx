"use client";
import { useAuth } from "@/hooks/use-auth";
import { Language } from "@/types/response-type";
import { useQuery } from "@tanstack/react-query";

export const useLanguages = () => {
  const { api } = useAuth();
  return useQuery({
    staleTime: Infinity,
    queryKey: ["languages"],

    queryFn: async () => {
      const response = await api.get("/users/languages");
      return response.data.data as Language[];
    },
  });
};
