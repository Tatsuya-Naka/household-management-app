"use server";

import { auth } from "@/auth";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    "use server";
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ message: "Invalid Access" }, { status: 404 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const imageId = formData.get("imageId") as string;
    if (!file) {
        return NextResponse.json({message: "Missing file"}, {status: 400});
    }

    try {
        if (process.env.AUTH_AWSS3_BUCKET_TEMP && process.env.AUTH_NEWRECORD_PATH && imageId) {
            const params = new PutObjectCommand({
                Bucket: process.env.AUTH_AWSS3_BUCKET_TEMP,
                Key: `${process.env.AUTH_NEWRECORD_PATH}/${session.user.id}/${imageId}`,
                ContentType: file.type,
            });

            const presignedurl = await getSignedUrl(s3, params, {expiresIn: 60});

            const response = await fetch(presignedurl, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type,
                },
                body: file,
            });

            if (!response.ok) {
                return NextResponse.json({message: "Internal Server Error"}, {status: 500});
            }

            if (process.env.AWSS3_REGION) {
                const imageUrl = `https://${process.env.AUTH_AWSS3_BUCKET_TEMP}.s3.${process.env.AWSS3_REGION}.amazonaws.com/${process.env.AUTH_NEWRECORD_PATH}/${session.user.id}/${imageId}`;
                return NextResponse.json({ message: "Success", url: imageUrl, fileType: file.type }, { status: 200 });
            }
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });

    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({message: err.message}, {status: 400});
        } else {
            return NextResponse.json({message: "Something Wrong"}, {status: 400});
        }
    }
}