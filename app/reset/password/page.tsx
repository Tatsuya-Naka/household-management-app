import { MdOutlineAlternateEmail } from "react-icons/md";
import ResetPasswordForm from '@/components/auth/reset-password-form';
import Link from "next/link";
import paths from "@/paths";
import { IoIosArrowRoundBack } from "react-icons/io";

export default async function ResetPasswordPage() {
    return (
        <div className='sm:w-[580px] w-full sm:px-6 sm:py-8 px-4 py-5 bg-blue-500/50 rounded-lg flex flex-col'>
            <div className="flex items-center justify-between">
                <div className='grid grid-cols-[40px_auto]'>
                    <MdOutlineAlternateEmail size={32} className='fill-green-800' />
                    <h2 className='text-xl font-[700] text-slate-800'>
                        Reset your password
                    </h2>
                </div>
                <Link 
                    href={paths.logInUrl()}
                    className="hover:text-slate-800/50 hover:border-slate-800/50 cursor-pointer border-b-2 border-slate-800 border-solid text-slate-800 text-base"
                >
                    <IoIosArrowRoundBack size={24} className="inline-block"/>
                    <span>Login Page</span>
                </Link>
            </div>
            <ResetPasswordForm />
        </div>
    )
}