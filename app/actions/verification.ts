"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

interface VerificationState {
    errors: {
        _form?: string[];
    },
    success?: {
        isSuccess: boolean;
        message: string[]
    }
};

export async function verification(token: string): Promise<VerificationState> {
    if (!token) {
        return {
            errors: {
                _form: ["Invalid Access"]
            }
        }
    }

    const verificationToken = await getVerificationTokenByToken(token);
    if (!verificationToken) {
        return {
            errors: {
                _form: ["Invalid Access"]
            }
        };
    }

    const hasExpired = new Date(verificationToken.expires) < new Date();

    if (hasExpired) {
        return {
            errors: {
                _form: ["Token has been expired!"]
            }
        }
    }

    const existingUser = await getUserByEmail(verificationToken.email);

    if (!existingUser) {
        return {
            errors: {
                _form: ["User does not exist!"]
            }
        }
    }



    try {
        await db.user.update({
            where: {
                id: existingUser.id,
            },
            data: {
                emailVerified: new Date(),
                email: verificationToken.email,
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            };
        } else {
            return {
                errors: {
                    _form: ["Something wrong!"]
                }
            };
        }
    }

    try {
        await db.verificationToken.delete({
            where: {
                id: verificationToken.id,
            }
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            };
        } else {
            return {
                errors: {
                    _form: ["Something wrong!"]
                }
            };
        }
    }

    return {
        errors: {},
        success: {
            isSuccess: true,
            message: ["Email verified"]
        }
    };
}