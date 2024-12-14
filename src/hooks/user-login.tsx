import { TLogin } from "@/schemas/login-schema";
import { BASE_URL } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useAuth } from "./use-auth";
import { toast } from "sonner";

export const useLogin = () => {
  const { setUser } = useAuth();
  const mutation = useMutation({
    mutationFn: async (credentails: TLogin) => {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentails, {
        withCredentials: true,
      });

      return response.data;
    },
    onSuccess: () => {
      toast("Logged in");
      window.location.reload();
    },
    onError: (error: AxiosError) => {
      const errData = error?.response?.data as { message: string };
      if (!errData) {
        toast.error("Someting Went Wrong");
      } else {
        toast.error(errData.message);
      }
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
        `${BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      setUser(null);
      toast.success("Logged Out");
    },
    onError: (error: AxiosError) => {
      const errData = error?.response?.data as { message: string };
      if (!errData) {
        toast.error("Someting Went Wrong");
      } else {
        toast.error(errData.message);
      }
    },
  });
  return mutation;
};
