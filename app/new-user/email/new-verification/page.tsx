import VerificationForm from "@/components/auth/new-verification-form";

export default async function NewVerificationPage() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-tr from-slate-400 to-cyan-400">
            <VerificationForm />
        </div>
    )
}