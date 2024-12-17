"use server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    "use server";
    // TODO: Delete command if users leave or cancel the filling form.
    console.log(req);
    return NextResponse.json({message: "Success"}, {status: 200});
}