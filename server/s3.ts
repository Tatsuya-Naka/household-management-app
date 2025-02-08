"use server";

import { auth } from "@/auth";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface S3PostProps {
    file: File;
    name: string;
}

interface S3PostState {
    errors: {
        file?: string[];
        name?: string[];
        _form?: string[];
    },
    success?: {
        isSuccess: boolean;
        message: string;
        url: string;
    }
}

const s3_post = async ({file, name}: S3PostProps): Promise<S3PostState> => {
    "use server";
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["Invalid Access"]
            }
        }
    }
    
    try {
        if (process.env.AUTH_AWSS3_BUCKET) {
            const params = new PutObjectCommand({
                Bucket: process.env.AUTH_AWSS3_BUCKET,
                Key: `${name}/${session.user.id}`,
                ContentType: file.type,
            })

            const presignedUrl = await getSignedUrl(s3, params, {expiresIn: 60});

            const response = await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type,
                },
                body: file,
            });

            if (!response.ok) {
                return {
                    errors: {
                        file: ["Failed to upload file"]
                    }
                }
            }

            if (process.env.AWSS3_REGION) {
                const imageUrl = `https://${process.env.AUTH_AWSS3_BUCKET}.s3.${process.env.AWSS3_REGION}.amazonaws.com/${name}/${session.user.id}`;
                return {
                    errors: {},
                    success: {
                        isSuccess: true,
                        message: "File uploaded successfully",
                        url: imageUrl
                    }
                }
            }

            return {
                errors: {},
                success: {
                    isSuccess: false,
                    message: "An unknown error occurred",
                    url: ""
                }
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ["An unknown error occurred"]
                }
            }
        }
    }

    return {
        errors: {_form: ["An unknown error occurred"]},
    }
}

export { s3_post };