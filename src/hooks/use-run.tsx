import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { toast } from "sonner";

export const useRun = () => {
  const { api } = useAuth();
  const mutation = useMutation({
    mutationFn: async (data: {
      id: string | null;
      problem: string;
      language: string;
      code: string;
      testcases: string[];
    }) => {
      const response = await api.post(`/submissions/run`, {
        ...data,
        type: "run",
        timestamp: new Date().toISOString(),
      });

      return response.data;
    },
    onSuccess: () => {
      toast("Running");
    },
    onError: () => {
      toast.error("Error");
    },
  });
  return mutation;
};
