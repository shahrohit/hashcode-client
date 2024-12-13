"use client";
import { useAuth } from "@/hooks/use-auth";
import useSubmissionStore from "@/store/submission-store";
import { Problem, ProblemView, Testcase } from "@/types/response-type";
import { useQuery } from "@tanstack/react-query";

export const useProblems = () => {
  const { api } = useAuth();
  return useQuery({
    staleTime: Infinity,
    queryKey: ["problems"],
    retry: 0,
    queryFn: async () => {
      const response = await api.get(`/users/problems`);
      return response.data.data as ProblemView[];
    },
  });
};
export const useProblemDescription = (slug: string) => {
  const { api } = useAuth();
  const { setProblemSlug } = useSubmissionStore();
  return useQuery({
    staleTime: Infinity,
    queryKey: ["description", slug],

    queryFn: async () => {
      const response = await api.get(`/users/problems/${slug}/description`);
      const data = response.data.data as Problem;
      if (response.status === 200 && data?.slug) {
        setProblemSlug(data.slug);
      }
      return data;
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
