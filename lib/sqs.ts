import { SQSClient } from "@aws-sdk/client-sqs";
export const sqs = new SQSClient ({
    credentials: {
        accessKeyId: process.env.AUTH_AWSS3_ID || "",
        secretAccessKey: process.env.AUTH_AWSS3_SECRET || "",
    },
    region: process.env.AWSS3_REGION || "",
});
