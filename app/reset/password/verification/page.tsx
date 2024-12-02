import ChangePasswordForm from "@/components/auth/change-password";
import { Suspense } from "react";

export default async function ResetPasswordVerificationPage() {
    return (
        <div>
            <Suspense>
                <ChangePasswordForm />
            </Suspense>
        </div>
    )
}