import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { toast } from "sonner";

export const useRun = () => {
  const { user, api } = useAuth();
  const mutation = useMutation({
    mutationFn: async (data: {
      socketKey: string | null;
      problem: string;
      language: string;
      code: string;
      testcases: string[];
    }) => {
      const response = await api.post(`/submissions/run`, {
        ...data,
        type: "run",
        username: user?.username,
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
