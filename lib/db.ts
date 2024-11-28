import { PrismaClient } from "@prisma/client";

const CreatePrismaClient = () => 
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

    const globalForPrisma = globalThis as unknown as {
        prisma: ReturnType<typeof CreatePrismaClient> | undefined;
    };

    export const db = globalForPrisma.prisma ?? CreatePrismaClient();

    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;