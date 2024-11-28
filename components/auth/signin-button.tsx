"use client";
import { FormHTMLAttributes } from 'react';

interface SigninbuttonProps extends FormHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function SignInButton({ children, ...props }: SigninbuttonProps) {
    return (
        <button type="button"
            className="hover:bg-gray-100 w-full bg-transparent border-[1px] shadow-lg border-solid border-zinc-700 rounded-lg px-2 py-1.5 flex items-center"
            {...props}
        >
            {children}
        </button>
    )
}