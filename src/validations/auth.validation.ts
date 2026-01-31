import { z } from "zod";

export const credentialsSchema = z.object({
  username: z.string().min(3).max(50),
  password: z
    .string()
    .min(12)
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain special character")
});