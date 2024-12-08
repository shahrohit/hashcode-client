import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is Required"),
});

export type TLogin = z.infer<typeof loginSchema>;

export default loginSchema;
