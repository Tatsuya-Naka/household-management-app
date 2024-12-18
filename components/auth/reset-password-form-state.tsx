"use client";

import { ResetState } from "@/app/actions/reset";
import { useFormStatus } from "react-dom";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface ResetPasswordStateProps {
    formState: ResetState;
}

export default function ResetPasswordState({formState}: ResetPasswordStateProps) {
    const {pending} = useFormStatus();

    return (
        <>
            <label className='text-base'>
                <span className={`${formState.errors.email ? "text-red-500" : "text-slate-800"}`}>Your Email</span>
                <input
                    name="email"
                    type='email'
                    placeholder='email@example.com'
                    disabled={pending}
                    className={`w-full border-2 border-gray-400/50 border-solid rounded-lg px-3 py-2 text-base outline-none`}
                />
                {formState.errors.email &&
                    <p className="text-base text-red-500">{formState.errors.email}</p>
                }
            </label>
            {formState.errors._form && !pending &&
                <div className="my-3 px-3 py-2 bg-red-500/50 text-red-500 text-base rounded-md font-[500] flex items-center">
                    <WarningAmberIcon className="mr-2"/>
                    <span>{formState.errors._form}</span>
                </div>
            }
            {formState.success?.isSuccess && !pending &&
                <div className="my-3 px-3 py-2 bg-green-500/50 text-green-800 text-base rounded-md font-[500] flex items-center">
                    <CheckCircleOutlineIcon className="mr-2"/>
                    <span>{formState.success.message}</span>
                </div>
            }
            <button
                type="submit"
                className={`mt-8 ${pending ? "bg-green-700/50" : "bg-green-700 hover:bg-green-700/50"} text-white font-[500] rounded-md w-full px-3 py-2`}
                disabled={pending}
            >
                Send verification email
            </button>
        </>
    )
}