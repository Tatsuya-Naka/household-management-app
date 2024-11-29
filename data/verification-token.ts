import { db } from "@/lib/db";

export const getVerificationTokenByToken = async(token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: {
                id: token,
            }
        })
    } catch {
        return null;
    }
};

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: {
                email: email,
            }
        })
        return verificationToken
    } catch {   
        return null;
    }
};