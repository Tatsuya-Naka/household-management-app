"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";

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
    

    return {
        errors: {},
        success: {
            isSuccess: true,
            message: ["Email verified"]
        }
    };
}