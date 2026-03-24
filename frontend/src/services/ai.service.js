import { axiosInstance } from "../config/axiosInstance";

export const sendChatMessage = (message) => {
  return axiosInstance.post("/chat", { message });
};