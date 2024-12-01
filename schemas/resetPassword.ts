import * as z from "zod";
export const resetPasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Minimum 8 characters required!"
    }),
    confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords must much",
});