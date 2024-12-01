"use client";

import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { useFormStatus } from "react-dom";
import RotateRightSharpIcon from '@mui/icons-material/RotateRightSharp';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { LoginState } from '@/app/actions/login';
import Link from 'next/link';
import paths from '@/paths';

interface LoginFormStatusProps {
    formState: LoginState;
}

export default function LogInFormStatus({formState}: LoginFormStatusProps) {
    const { pending } = useFormStatus();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : "";

    return (
        <>
            <label className='flex flex-col items-start gap-2'>
                <span className={`sm:text-base text-sm ${formState.errors.email ? "text-red-500" : "text-zinc-700"}`}>Email</span>
                <input
                    type="email"
                    name="email"
                    disabled={pending}
                    defaultValue={form.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className='sm:text-lg text-base font-[300] border-[1px] border-zinc-700 border-solid w-full px-2 py-1 sm:rounded-lg rounded-md outline-none'
                    placeholder='email@example.com'
                />
                {formState.errors.email &&
                    <div className="text-red-500 text-sm font-[500]">{formState.errors.email}</div>
                }
            </label>
            <label className='flex flex-col items-start gap-2'>
                <span className={`sm:text-base text-sm ${formState.errors.password ? "text-red-500" : "text-zinc-700"}`}>Password</span>
                <input
                    type="password"
                    name="password"
                    disabled={pending}
                    defaultValue={form.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    className='sm:text-lg text-base font-[300] border-[1px] border-zinc-700 border-solid w-full px-2 py-1 sm:rounded-lg rounded-md outline-none'
                    placeholder='Password...'
                />
                {formState.errors.password &&
                    <div className="text-red-500 text-sm font-[500]">{formState.errors.password}</div>
                }
            </label>
            <div className="">
                <Link
                    href={paths.resetPasswordUrl()}
                    className="text-base text-slate-800 hover:underline underline-offset-4 cursor-pointer"
                >
                    Forget password?
                </Link>
            </div>
            {(urlError || formState.errors._form) && !pending &&
                <div className="sm:px-4 sm:py-3 px-2 py-1.5 bg-red-300/50 text-red-500 flex items-center gap-2 rounded-md">
                    <ReportGmailerrorredIcon />
                    <span>{urlError || formState.errors._form}</span>
                </div>
            }
            {formState.success?.isSuccess && formState.success.message &&
                <div className="sm:px-4 sm:py-3 px-2 py-1.5 bg-green-300/50 text-green-500 flex items-center gap-2 rounded-md">
                    <CheckCircleOutlineIcon />
                    <span>{urlError || formState.success.message}</span>
                </div>
            }
            <button
                type="submit"
                disabled={pending}
                className='w-full tracking-[1px] border-lg bg-sky-400 hover:bg-sky-200 sm:px-4 sm:py-3 px-2 py-1.5 rounded-md sm:text-lg text-base text-white font-[500]'
            >
                {pending && <RotateRightSharpIcon className="animate-spin mr-2" />}
                Login with Email
            </button>
        </>
    )
}