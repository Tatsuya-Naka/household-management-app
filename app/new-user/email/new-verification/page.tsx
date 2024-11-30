import VerificationForm from "@/components/auth/new-verification-form";
import { Suspense } from "react";

export default async function NewVerificationPage() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-tr from-slate-400 to-cyan-400">
            <Suspense>
                <VerificationForm />
            </Suspense>
        </div>
    )
}