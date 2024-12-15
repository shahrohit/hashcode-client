import { BACKEND_URL } from "@/config/config";
import { io } from "socket.io-client";

const createSocket = () => {
  return io(BACKEND_URL, {
    path: "/socket.io", // Ensure the path matches your proxy setup
    transports: ["websocket"],
  });
};

export default createSocket;
