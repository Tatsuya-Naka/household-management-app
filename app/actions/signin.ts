"use server";
import bcrypt from "bcryptjs";
import { SignInSchema } from "@/schemas/signin";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export interface SignInState {
    errors: {
        email?: string[];
        password?: string[];
        confirm?: string[];
        name?: string[];
        currency?: string[];
        location?: string[];
        _form?: string[];
    },
    success?: {
        isSuccess?: boolean;
        message?: string[];
    }
};

export async function signin(formState: SignInState, formData: FormData): Promise<SignInState> {
    "use server";
    const validatedFieds = SignInSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirm: formData.get("confirm"),
        name: formData.get("name"),
        currency: formData.get("currency"),
        location: formData.get("location"),
    });

    if (!validatedFieds.success) {
        return {
            errors: validatedFieds.error.flatten().fieldErrors,
        };
    }

    const {email, password, name, currency, location} = validatedFieds.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {
            errors: {
                _form: ["Email already in use!"]
            }
        };
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name, 
            currency,
            location,
        }
    });

    

    return {
        errors: {},
        success: {
            isSuccess: true,
            message: ["Successfully Sign-in!!"]
        }
    };
}