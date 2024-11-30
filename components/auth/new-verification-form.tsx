"use client";

import { useSearchParams } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Link from "next/link";
import paths from "@/paths";
import { useState, useEffect } from "react";
import { verification } from "@/app/actions/verification";

export default function VerificationForm() {
    const param = useSearchParams();
    const token = param.get("token");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("Token: ", token);
        if (token) {
            (async () => {
                try {
                    const response = await verification(token);
                    if (response.success?.isSuccess) {
                        setSuccess(response.success.message[0]);
                    } else if (response.errors._form) {
                        setError(response.errors._form[0] || "");
                    }
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError("Something wrong");
                    }
                }
            }) ();
        } else {
            setError("Token not provided!");
        }
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="sm:w-[480px] w-full bg-white/50 sm:rounded-lg sm:px-5 sm:py-8 px-3 py-5 flex flex-col items-center">
                <h2 className="text-xl font-[700] text-slate-800">
                    Verification for your email address
                </h2>
                {!success && !error &&
                    <div className="flex items-center mt-8">
                        <GoDotFill className="animate-bounce fill-slate-800" size={32} />
                        <GoDotFill className="animate-bounce fill-slate-800" size={32} />
                        <GoDotFill className="animate-bounce fill-slate-800" size={32} />
                    </div>
                }
                {success &&
                    <>
                        <div className="flex items-center mt-8 bg-green-400/50 text-green-800 text-lg w-full justify-center rounded-md px-2 py-1">
                            <CheckCircleOutlineIcon className="mr-4" />
                            <span>{success}</span>
                        </div>
                        <div className="mt-5 flex items-center text-base">
                            <Link
                                href={paths.home()}
                                className="text-slate-800 hover:underline underline-offset-4 hover:text-green-500 cursor-pointer"
                            >
                                Click to Login
                            </Link>
                        </div>
                    </>
                }
                {error &&
                    <div className="flex items-center mt-8 bg-red-400/50 text-red-800 text-lg w-full justify-center rounded-md px-2 py-1">
                        <WarningAmberIcon className="mr-4" />
                        <span>{error}</span>
                    </div>
                }
            </div>
        </div>
    )
}