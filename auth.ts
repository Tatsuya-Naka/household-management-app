import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import paths from "./paths";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: paths.logInUrl(),
        error: paths.errorUrl(),
    },
    callbacks: {
        async session({ session, token }) {
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
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.currency = existingUser.currency;
            token.location = existingUser.location;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})