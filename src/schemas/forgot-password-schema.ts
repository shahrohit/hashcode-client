import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type TForgotPassword = z.infer<typeof forgotPasswordSchema>;

export default forgotPasswordSchema;
