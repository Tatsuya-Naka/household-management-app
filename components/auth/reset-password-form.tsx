"use client";
import * as actions from "@/app/actions";
import { useActionState } from "react";
import ResetPasswordState from "./reset-password-form-state";

export default function ResetPasswordForm() {
    const [formState, action] = useActionState(actions.reset, {errors: {}});

    return (
        <form className='mt-3' action={action}>
            <ResetPasswordState formState={formState} />
        </form>
    )
}