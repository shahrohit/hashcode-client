import { BACKEND_URL } from "@/config/config";

export const handleGoogleAuth = () => {
  window.open(`${BACKEND_URL}/auth/google`, "_self");
};
