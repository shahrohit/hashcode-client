import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TRegister } from "@/schemas/register-schema";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/config/config";
import getErrorMessage from "@/utils/get-error-msg";

export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (credentails: TRegister) => {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/send-otp`,
        credentails
      );

      return response.data;
    },
    onSuccess: (response) => {
      toast(response.message);
      router.push(`/verify?email=${response.data.email}`);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error));
    },
  });
  return mutation;
};

export const useVerify = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (body: { email: string; otp: number }) => {
      const response = await axios.post(`${BACKEND_URL}/api/auth/verify`, body);

      return response.data;
    },
    onSuccess: (response) => {
      toast(response.message);
      router.push(`/sign-in`);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error));
      if (error.status == 403) {
        router.push("/sign-up");
      }
    },
  });
  return mutation;
};
