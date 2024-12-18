import { AxiosError } from "axios";

const getErrorMessage = (error: AxiosError) => {
  const errData = error?.response?.data as {
    message: string | null | undefined;
  };
  if (errData) {
    if (error?.status === 429) {
      return "Too Many Request. Please try again later";
    } else {
      return errData?.message ?? "Something went wrong";
    }
  }
  return "An Error Occured";
};

export default getErrorMessage;
