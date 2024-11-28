import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import { LogInSchema } from "./schemas/login";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Google,
        Twitter,
        Apple,
        Credentials({
            async authorize(credentials) {
                const validatedFields = LogInSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const {email, password} = validatedFields.data || {};

                    const existingUser = await getUserByEmail(email);
                    if (!existingUser || !existingUser.password) return null;
                    
                    const passwordHashed = await bcrypt.compare(
                        password,
                        existingUser.password,
                    );

                    if (passwordHashed) return existingUser;
                }
                return null;
            }
        }),
    ]
} satisfies NextAuthConfig