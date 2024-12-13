import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AUTH_AWSS3_ID || "",
        secretAccessKey: process.env.AUTH_AWSS3_SECRET || "",
    },
    region: process.env.AWSS3_REGION || "",
});