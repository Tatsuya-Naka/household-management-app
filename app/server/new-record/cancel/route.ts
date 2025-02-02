"use server";

import { auth } from "@/auth";
import { s3 } from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    "use server";
    try {
        const body = await req.json();
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json({message: "Invalid Access"}, {status: 404});
        }

        // TODO: delete the image object on S3 temporary bucket using imageObjectId and session.user.id
        const userId = session.user.id;
        const imageObjectId = body.imageId;
        if (!userId || !imageObjectId) {
            return NextResponse.json({message: "Missing data"}, {status: 400});
        }

        if (!process.env.AUTH_AWSS3_BUCKET_TEMP && !process.env.AUTH_NEWRECORD_PATH) {
            return NextResponse.json({message: "Internal Server Error"}, {status: 500});
        }

        const command = new DeleteObjectCommand({
            Bucket: process.env.AUTH_AWSS3_BUCKET_TEMP,
            Key: `${process.env.AUTH_NEWRECORD_PATH}/${userId}/${imageObjectId}`,
        });
        
        await s3.send(command);

    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({message: err.message}, {status: 500})
        } else {
            return NextResponse.json({message: "Something Wrong"}, {status: 500})
        }
    }
    
    return NextResponse.json({message: "Success"}, {status: 200});
}