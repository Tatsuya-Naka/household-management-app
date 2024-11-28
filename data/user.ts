"use server";

import { db } from "@/lib/db";

export async function getUserById(id: string) {
    "use server";
    const user = await db.user.findUnique({
        where: {
            id,
        }
    });

    if (!user) return null;
    return user;
};

export async function getUserByEmail(email: string) {
    "use server";
    const user = await db.user.findUnique({
        where: {
            email,
        }
    });

    if (!user) return null;
    return user;
};