"use server";
import { getUserByEmail } from "@/data/user";
import { sendVerificationResetPassword } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import paths from "@/paths";
import { redirect } from "next/navigation";
import * as z from "zod";
export interface ResetState {
    errors: {
        email?: string[];
        _form?: string[];
    },
    success?: {
        isSuccess?: boolean;
        message?: string[];
    }
};

const ResetSchema = z.object({
    email: z.string().email(),
});

export async function reset(formSate: ResetState, formData: FormData): Promise<ResetState> {
    const validatedFields = ResetSchema.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields || !validatedFields.data) {
        return {
            errors: {
                email: ["Invalid email"]
            }
        };
    }

    const {email} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            errors: {
                _form: ["User does not exist"]
            }
        };
    }

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationResetPassword(verificationToken.email, verificationToken.token);

    redirect(paths.verificationPasswordSentPage());

    return {
        errors: {},
        success: {
            isSuccess: true,
            message: ["Successfully sent!"],
        }
    };
}