import { TLogin } from "@/schemas/login-schema";
import { BASE_URL } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";

export const useLogin = () => {
  const router = useRouter();

  const { setUser } = useAuth();
  const mutation = useMutation({
    mutationFn: async (credentails: TLogin) => {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentails, {
        withCredentials: true,
      });

      return response.data;
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      setUser(null);
    },
  });
  return mutation;
};
