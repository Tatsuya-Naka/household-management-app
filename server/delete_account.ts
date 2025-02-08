"use server";

import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";

interface DeleteAccountProps {
    errors: {
        _state?: string[];
    },
    success?: {
        isSuccess: true,
        message: string[],
    }
}

export const deleteAccount = async(): Promise<DeleteAccountProps> => {
    "use server";
    const session = await auth();
    if (!session || !session.user) {
        return { errors: { _state: ["Invalid Access"] } }
    }

    try {
        await db.user.delete({ where: { id: session.user.id } });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { errors: { _state: [err.message] } }
        } else {
            return { errors: { _state: ["Something wrong"] } }
        }
    }

    await signOut()

    return {
        errors: {},
        success: { isSuccess: true, message: ["Success"] }
    }
}