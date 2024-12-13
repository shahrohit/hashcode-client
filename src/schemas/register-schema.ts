import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().email("Email is Required"),
  username: z.string().min(1, "Username is Required"),
  password: z.string().min(8, "Password Should have minimum 8 characters"),
  country: z.string().optional(),
});
export type TRegister = z.infer<typeof registerSchema>;

export default registerSchema;
