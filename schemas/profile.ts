import * as z from "zod";

const ProfileSchema = z.object({
    name: z.string().min(5, {message: "At least 5 characters required"}),
    currency: z.enum(["AUD", "JPY", "USD", "EUR"], {
        message: "Incorrect currency type",
    }),
    location: z.enum(["Australia", "Japan", "US", "Europe"], {
        message: "Incorrect country name selected",
    }),
    icon: z.instanceof(File).optional(),
});

export default ProfileSchema;
