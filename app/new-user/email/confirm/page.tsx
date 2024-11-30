import Link from 'next/link';
import paths from '@/paths';
import SavingsIcon from '@mui/icons-material/Savings';

export default function EmailVerificationConfirmPage() {
    return (
        <div className="bg-white m-0 p-0 min-h-screen">
            {/* Header */}
            <header className="max-w-screen-2xl mx-auto border-b-2 border-solid border-gray-200 flex items-center h-[56px]">
                <div className='px-2 py-2 flex items-center mx-2'>
                    <Link
                        href={paths.default()}
                        className='cursor-pointer mr-4'
                    >
                        <SavingsIcon sx={{ fontSize: 32 }} className='text-zinc-700' />
                    </Link>
                    <h1 className="italic text-2xl font-[700] text-zinc-700 mr-8">
                        HAB
                    </h1>
                </div>
            </header>
            <div className={`w-full bg-shinchan bg-cover bg-no-repeat h-[calc(100vh-56px)]`}>
                <div className='flex items-center justify-center h-full'>
                    <div className='sm:w-[480px] w-full sm:rounded-ms sm:px-5 sm:py-3 px-3 py-2 bg-white flex flex-col items-center'>
                        <h2 className='text-xl font-[700] text-slate-800'>
                            Confirmation is sent!
                        </h2>
                        <p className='text-base font-[500] text-slate-800 sm:mt-3 mt-8'>
                            Confirmation email is sent to your email address. Check your email box soon before the verification token gets invalid!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}