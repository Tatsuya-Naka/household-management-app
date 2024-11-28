"use client";

import * as actions from "../../app/actions";
import SignInEmailFormStates from "./signin-email-form-state";
import { useActionState } from "react";

export default function SignInFormEmail() {
    const [formState, action] = useActionState(actions.signin, { errors: {} });

    return (
        <form className='w-full mx-0 flex flex-col sm:justify-center gap-4 h-full' action={action}>
            <SignInEmailFormStates formState={formState} />
        </form>
    )
}