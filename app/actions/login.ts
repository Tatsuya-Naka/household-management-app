"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import paths from "@/paths";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LogInSchema } from "@/schemas/login";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export interface LoginState {
    errors: {
        email?: string[];
        password?: string[];
        _form?: string[];
    },
    success?: {
        isSuccess?: boolean;
        message?: string[];
    }
};



export async function login(formState: LoginState, formData: FormData): Promise<LoginState> {
    "use server";

    const validatedFields = LogInSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const {email, password} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            errors: {
                _form: ["You must signin first"]
            }
        };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (err: unknown) {
        if (err instanceof AuthError) {
            switch(err.type) {
                case "CredentialsSignin":
                    return {
                        errors: {
                            _form: ["Invalid Credentials"]
                        }
                    };
                default:
                    return {
                        errors: {
                            _form: [err.message]
                        }
                    }
            }
        } else {
            return {
                errors: {
                    _form: ["Something wrong"]
                }
            };
        }
    }

    redirect(paths.home());

    return {
        errors: {},
        success: {
            isSuccess: true,
            message: ["Successfully logged in!"]
        },
    };
}