import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { toast } from "sonner";
import useSubmissionStore from "@/store/submission-store";

export const useSubmission = () => {
  const { api } = useAuth();
  const { id } = useSubmissionStore();
  const mutation = useMutation({
    mutationFn: async (data: {
      problem: string;
      language: string;
      code: string;
    }) => {
      console.log(id);
      const response = await api.post(`/submissions/submit`, {
        ...data,
        id: id!,
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
