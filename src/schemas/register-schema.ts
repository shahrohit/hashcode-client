import { z } from "zod";

const registerSchema = z.object({
  username: z.string().trim().min(1, "User name is required"),
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});
export type TRegister = z.infer<typeof registerSchema>;

export default registerSchema;
