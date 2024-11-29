import * as z from "zod";

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Minimum 8 characters required",
    }),
    confirm: z.string(),
    name: z.string().min(5, {
        message: "Minimum 5 characters required",
    }),
    currency: z.string().length(3, {
        message: "Please choose from the list",
    }),
    location: z.string().min(1, {
        message: "Invalid",
    }),
}).refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords must match",
});