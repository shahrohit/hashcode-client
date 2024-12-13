import { BASE_URL } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TRegister } from "@/schemas/register-schema";

export const useRegister = () => {
  // const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (credentails: TRegister) => {
      const response = await axios.post(
        `${BASE_URL}/auth/register`,
        credentails
      );

      return response.data;
    },
    onSuccess: () => {
      toast("Account Created");
      // router.push("/login");
    },
    onError: () => {
      toast.error("Erroor");
    },
  });
  return mutation;
};
