import { SignInState } from "@/app/actions/signin"
import { useFormStatus } from "react-dom";
import RotateRightSharpIcon from '@mui/icons-material/RotateRightSharp';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface SignInEmailFormStatesProps {
    formState: SignInState;
}
export default function SignInEmailFormStates({ formState }: SignInEmailFormStatesProps) {
    const { pending } = useFormStatus();
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirm: "",
        name: "",
        currency: "",
        location: "",
    });

    return (
        <>
            <label className='flex flex-col gap-2 '>
                <span className={`text-base font-[500] ${formState.errors.email ? "text-red-500" : "text-zinc-700"}`}>
                    Email
                </span>
                <input
                    name='email'
                    type="email"
                    defaultValue={form.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    disabled={pending}
                    placeholder='email@example.com'
                    className='w-full rounded-lg border-2 border-solid border-gray-200 text-base px-3 py-2 outline-none'
                />
                {formState.errors.email &&
                    <div className="text-red-500 text-sm font-[500]">{formState.errors.email}</div>
                }
            </label>
            <label className='flex flex-col gap-2 '>
                <span className={`text-base font-[500] ${formState.errors.password ? "text-red-500" : "text-zinc-700"}`}>
                    Password
                </span>
                <input
                    name='password'
                    type="password"
                    disabled={pending}
                    defaultValue={form.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder=''
                    className='w-full rounded-lg border-2 border-solid border-gray-200 text-base px-3 py-2 outline-none'
                />
                {formState.errors.password &&
                    <div className="text-red-500 text-sm font-[500]">{formState.errors.password}</div>
                }
            </label>
            <label className='flex flex-col gap-2 '>
                <span className={`text-base font-[500] ${formState.errors.confirm ? "text-red-500" : "text-zinc-700"}`}>
                    Password - Double Check
                </span>
                <input
                    name='confirm'
                    type="password"
                    disabled={pending}
                    defaultValue={form.confirm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, confirm: e.target.value }))}
                    placeholder=''
                    className='w-full rounded-lg border-2 border-solid border-gray-200 text-base px-3 py-2 outline-none'
                />
                {formState.errors.password &&
                    <div className="text-red-500 text-sm font-[500]">{formState.errors.confirm}</div>
                }
            </label>
            <label className='flex flex-col gap-2 '>
                <span className={`text-base font-[500] ${formState.errors.name ? "text-red-500" : "text-zinc-700"}`}>
                    User name
                </span>
                <input
                    name='name'
                    type="text"
                    disabled={pending}
                    defaultValue={form.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder='Hima'
                    className='w-full rounded-lg border-2 border-solid border-gray-200 text-base px-3 py-2 outline-none'
                />
                {formState.errors.name &&
                    <div className="text-red-500 text-sm font-[500]">{formState.errors.name}</div>
                }
            </label>
            <div className='flex sm:flex-row flex-col items-center justify-around w-full sm:gap-2 gap-4'>
                <label className='flex flex-col gap-2 w-full'>
                    <span className={`text-base font-[500] ${formState.errors.currency ? "text-red-500" : "text-zinc-700"}`}>
                        Preferred Currency
                    </span>
                    <input
                        name='currency'
                        type="text"
                        disabled={pending}
                        defaultValue={form.currency}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, currency: e.target.value }))}
                        placeholder='AUD'
                        className='w-full rounded-lg border-2 border-solid border-gray-200 text-base px-3 py-2 outline-none'
                    />
                    {formState.errors.currency &&
                        <div className="text-red-500 text-sm font-[500]">{formState.errors.currency}</div>
                    }
                </label>
                <label className='flex flex-col gap-2 w-full'>
                    <span className={`text-base font-[500] ${formState.errors.location ? "text-red-500" : "text-zinc-700"}`}>
                        Where you are
                    </span>
                    <input
                        name='location'
                        type="text"
                        disabled={pending}
                        defaultValue={form.location}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder='Australia'
                        className='w-full rounded-lg border-2 border-solid border-gray-200 text-base px-3 py-2 outline-none'
                    />
                    {formState.errors.location &&
                        <div className="text-red-500 text-sm font-[500]">{formState.errors.location}</div>
                    }
                </label>
            </div>
            {formState.errors._form && !pending &&
                <div className="mt-5 w-full rounded-lg bg-red-300/50 text-red-500 font-base font-[700] flex items-center gap-2 py-2 px-5">
                    <ReportGmailerrorredIcon />
                    <span>{formState.errors._form}</span>
                </div>
            }
            {formState.success?.isSuccess && formState.success.message &&
                <div className="sm:px-4 sm:py-3 px-2 py-1.5 bg-green-300/50 text-green-500 flex items-center gap-2 rounded-md">
                    <CheckCircleOutlineIcon />
                    <span>{formState.success.message}</span>
                </div>
            }
            <button
                type="submit"
                className='my-5 w-full hover:opacity-60 rounded-lg bg-gradient-to-r from-teal-400 to-green-500 px-5 py-2 text-white font-[700]'
                disabled={pending}
            >
                {pending && <RotateRightSharpIcon className="animate-spin mr-2" />}
                Register
            </button>
        </>
    )
}