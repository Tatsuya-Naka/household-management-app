import { MdOutlineAlternateEmail } from "react-icons/md";
import ResetPasswordForm from '@/components/auth/reset-password-form';

export default async function ResetPasswordPage() {
    return (
        <div className='sm:w-[480px] w-full sm:px-6 sm:py-8 px-4 py-5 bg-blue-500/50 rounded-lg flex flex-col'>
            <div className='grid grid-cols-[80px_auto]'>
                <MdOutlineAlternateEmail size={32} className='fill-green-800' />
                <h2 className='text-xl font-[700] text-slate-800'>
                    Reset your password
                </h2>
            </div>
            <ResetPasswordForm />
        </div>
    )
}