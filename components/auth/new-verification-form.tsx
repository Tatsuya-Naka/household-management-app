"use client";

import { useSearchParams } from "next/navigation";

export default function VerificationForm() {
    const param = useSearchParams();
    const token = param.get("token");
    console.log(token);
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="sm:w-[480px] w-full bg-white/50 sm:rounded-lg sm:px-5 sm:py-3 px-3 py-2">
                
            </div>
        </div>
    )
}