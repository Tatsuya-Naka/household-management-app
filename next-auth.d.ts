import NextAuth, {DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    currency: string;
    location: string;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
};