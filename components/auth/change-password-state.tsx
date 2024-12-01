"use client";

import { ResetPasswordVerificationState } from "@/app/actions/verification";
import { useFormStatus } from "react-dom";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from "react";

interface ChangePasswordStateProps {
    formState: ResetPasswordVerificationState;
}
export default function ChangePasswordState({ formState }: ChangePasswordStateProps) {
    const { pending } = useFormStatus();
    const [form, setForm] = useState({
        password: "",
    });

    return (
        <>
            <label className="text-base mb-5">
                <span className={`${formState.errors.email ? "text-red-500" : "text-slate-800"}`}>New password</span>
                <input
                    name="password"
                    type="password"
                    defaultValue={form.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({...prev, password: e.target.value}))}
                    disabled={pending}
                    className="w-full border-2 border-gray-500/30 border-solid px-3 py-2 rounded-md outline-none"
                    placeholder="newpassword..."
                />
                {formState.errors.email &&
                    <p className="text-base text-red-500">{formState.errors.email}</p>
                }
            </label>
            <label className="text-base mb-5">
                <span className={`${formState.errors.confirm ? "text-red-500" : "text-slate-800"}`}>Confirm</span>
                <input
                    name="confirm"
                    type="password"
                    disabled={pending}
                    className="w-full border-2 border-gray-500/30 border-solid px-3 py-2 rounded-md outline-none"
                    placeholder="same password"
                />
                {formState.errors.confirm &&
                    <p className="text-base text-red-500">{formState.errors.confirm}</p>
                }
            </label>
            {formState.errors._form && !pending &&
                <div className="my-3 px-3 py-2 bg-red-500/50 text-red-500 text-base rounded-md font-[500] flex items-center">
                    <WarningAmberIcon className="mr-2" />
                    <span>{formState.errors._form}</span>
                </div>
            }
            {formState.success?.isSuccess && !pending &&
                <div className="my-3 px-3 py-2 bg-green-500/50 text-green-800 text-base rounded-md font-[500] flex items-center">
                    <CheckCircleOutlineIcon className="mr-2" />
                    <span>{formState.success.message}</span>
                </div>
            }
            <button
                type="submit"
                className={`${pending ? "bg-black/50" : "bg-black hover:bg-black/50"} text-white px-3 py-2 rounded-md w-full text-base font-[500]`}
                disabled={pending}
            >
                Change your password
            </button>
        </>
    )
}