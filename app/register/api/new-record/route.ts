"use server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {        
        const body = await req.json();
        console.log({body});
        console.log("Items: ", body.items);
        return NextResponse.json({message: "Success"}, {status: 200});
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            return NextResponse.json({message: err.message}, {status: 500});
        } else {
            console.log("Went Wrong");
            return NextResponse.json({message: "Something Went Wrong on the Server Side"}, {status: 500});
        }
    }
}