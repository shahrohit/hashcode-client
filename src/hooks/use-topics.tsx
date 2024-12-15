"use client";
import { useAuth } from "@/hooks/use-auth";
import { TopicWithCount } from "@/types/response-type";
import { useQuery } from "@tanstack/react-query";

export const useTopics = () => {
  const { api } = useAuth();
  return useQuery({
    queryKey: ["topics"],

    queryFn: async () => {
      const response = await api.get("/users/topics");
      return response.data.data as TopicWithCount[];
    },
  });
};
