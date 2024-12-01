"use client";

import { useSearchParams } from "next/navigation";
import ChangePasswordState from "./change-password-state";
import { useActionState } from "react";
import * as actions from "@/app/actions"

export default function ChangePasswordForm() {
    const search = useSearchParams();
    const token = search.get("token");
    const [formState, action] = useActionState(actions.resetPasswordVerification.bind(null, token), {errors: {}});

    return (
        <div className="flex items-center justify-center h-full">
            <div className="sm:w-[480px] w-full bg-white rounded-lg py-8 px-5 flex flex-col">
                <form className="flex flex-col" action={action}>
                    <ChangePasswordState formState={formState}/>
                </form>
            </div>
        </div>
    )
}