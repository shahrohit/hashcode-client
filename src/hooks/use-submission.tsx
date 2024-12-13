import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { toast } from "sonner";

export const useSubmission = () => {
  const { api } = useAuth();
  const mutation = useMutation({
    mutationFn: async (data: {
      id: string | null;
      problem: string;
      language: string;
      code: string;
    }) => {
      const response = await api.post(`/submissions/submit`, {
        ...data,
        type: "submit",
        timestamp: new Date().toISOString(),
      });

      return response.data;
    },
    onSuccess: () => {
      toast("Judging");
    },
    onError: () => {
      toast.error("Error");
    },
  });
  return mutation;
};
