"use client";
import { cn } from '@/lib/utils';
import { FormHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

interface EditRecordButtonProps extends FormHTMLAttributes<HTMLButtonElement> {
    action: (payload: FormData) => void;
    onClick: () => void;
}

export default function EditRecordButton({action, children, onClick, className, ...props}: EditRecordButtonProps) {
    const {pending} = useFormStatus();

    return (
        <button
            {...props}
            type="submit"
            formAction={action}
            onClick={onClick}
            className={cn(className, `w-full rounded-lg px-3 py-2 text-white font-[700] ${pending && "cursor-not-allowed"}`)}
            disabled={pending}
        >
            {children}
        </button>
    )
}