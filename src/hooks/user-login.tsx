import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { BACKEND_URL } from "@/config/config";
import { useAuth } from "@/hooks/use-auth";
import { TLogin } from "@/schemas/login-schema";
import getErrorMessage from "@/utils/get-error-msg";

export const useLogin = () => {
  const { setUser } = useAuth();
  const mutation = useMutation({
    mutationFn: async (credentails: TLogin) => {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        credentails,
        { withCredentials: true }
      );

      return response.data;
    },
    onSuccess: () => {
      toast.success("Logged in");
      window.location.reload();
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error));
      setUser(null);
    },
  });
  return mutation;
};

export const useLogout = () => {
  const { setUser } = useAuth();
  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post(
        `${BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      setUser(null);
      toast.success("Logged Out");
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error));
    },
  });
  return mutation;
};
