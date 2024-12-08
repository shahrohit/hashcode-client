"use client";
import { useAuth } from "@/hooks/use-auth";
import { Problem, ProblemView, Testcase } from "@/types/response-type";
import { useQuery } from "@tanstack/react-query";

export const useProblems = () => {
  const { api } = useAuth();
  return useQuery({
    staleTime: Infinity,
    queryKey: ["problems"],

    queryFn: async () => {
      const response = await api.get(`/users/problems`);
      return response.data.data as ProblemView[];
    },
  });
};
export const useProblemDescription = (slug: string) => {
  const { api } = useAuth();
  return useQuery({
    staleTime: Infinity,
    queryKey: ["description", slug],

    queryFn: async () => {
      const response = await api.get(`/users/problems/${slug}/description`);
      return response.data.data as Problem;
    },
  });
};
export const useProblemTestcases = (slug: string) => {
  const { api } = useAuth();
  return useQuery({
    staleTime: Infinity,
    queryKey: ["testcases", slug],

    queryFn: async () => {
      const response = await api.get(`/users/problems/${slug}/testcases`);
      return response.data.data as Testcase;
    },
  });
};
