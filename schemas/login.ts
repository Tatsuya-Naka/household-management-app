import * as z from "zod";

export const LogInSchema = z.object({
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(1, {message: "Missing password"}),
});