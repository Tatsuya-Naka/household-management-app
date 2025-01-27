"use server";
import { auth } from "@/auth";
import { s3 } from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const imageDelete = async (recordId: string) => {
    "use server";

    const session = await auth();
    if (!session || !session.user.id) {
        return { message: "Invalid access", success: false };
    }
    const userId = session.user.id;
    if (!userId || !recordId) {
        return { message: "Missing data", success: false };
    }
    if (!process.env.AUTH_AWSS3_BUCKET || !process.env.AUTH_AWSS3_BUCKET_TEMP) {
        return { message: "Internal server error", success: false };
    }

    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.AUTH_AWSS3_BUCKET,
            Key: `${process.env.AUTH_NEWRECORD_PATH}/${userId}/${recordId}`,
        });
        await s3.send(command);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { message: err.message, success: false };
        } else {
            return { message: "Something wrong", success: false };
        }
    }

    return { message: "Success", success: true };
}