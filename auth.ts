import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        async session({session, token}) {
            console.log("Token: ", token);
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.currency && session.user) {
                session.user.currency = token.currency as string;
            }
            if (token.location && session.user) {
                session.user.location = token.location as string;
            }
            return session;
        },
        async jwt({token}) {
            console.log("Tokne: ", token);
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.currency = existingUser.currency;
            token.location = existingUser.location;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
})