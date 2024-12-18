import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { toast } from "sonner";
import { TUserSubmission } from "@/types/types";
import useSubmissionStore from "@/store/submission-store";

export const useSubmission = () => {
  const { user, api } = useAuth();
  const mutation = useMutation({
    mutationFn: async (data: {
      socketKey: string | null;
      problem: string;
      language: string;
      code: string;
    }) => {
      const response = await api.post(`/submissions/submit`, {
        ...data,
        type: "submit",
        username: user?.username,
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

export const useUserSubmission = () => {
  const { user, api } = useAuth();
  const { problemId } = useSubmissionStore();
  return useQuery({
    queryKey: ["submissions", problemId],

    queryFn: async () => {
      if (!user?.username) {
        toast.error("Please Login to view the submissions");
        return;
      }
      const response = await api.get(
        `/submissions/${user?.username}/${problemId}`
      );
      return response.data.data as TUserSubmission[];
    },
  });
};
