import { AxiosError } from "axios";

const getErrorMessage = (error: AxiosError) => {
  const errData = error?.response?.data as {
    message: string | null | undefined;
  };
  if (errData && errData.message) {
    return errData.message;
  }
  return "An Error Occured";
};

export default getErrorMessage;
