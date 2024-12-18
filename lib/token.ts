import {v4 as uuid} from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "./db";

export const generateVerificationToken = async(email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1hour (3600 * 1000ms)

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    });

    return verificationToken;
}