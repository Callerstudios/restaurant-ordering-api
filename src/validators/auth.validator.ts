import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),

    email: z.email(),

    password: z.string().min(8),

    role: z.enum(["customer", "owner", "admin"]).default("customer"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
});
