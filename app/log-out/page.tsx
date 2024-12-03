import Link from 'next/link';
import paths from '@/paths';
import SavingsIcon from '@mui/icons-material/Savings';
import { signOut } from '@/auth';

export default async function LogOutPage() {
    return (
        <div className="bg-white m-0 p-0 min-h-screen text-center">
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

            <div className="max-w-screen-xl lg:mx-auto md:mx-5 mx-0 my-0 flex items-center justify-center min-h-[calc(100vh-56px)]">
                    <div className='sm:w-[480px] w-full flex flex-col items-start justify-center bg-transparent rounded-lg shadow-md px-2 py-5 text-base text-slate-800'>
                        <h2 className='text-2xl font-[700] mb-5'>Logout Page</h2>
                        <p>You are trying to logout now</p>
                        <p>Do you want to leave now??</p>
                        <form className='flex items-center mt-5 w-full'
                            action={async() => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <button
                                type="submit"
                                className="px-3 py-2 mr-2 bg-red-600 w-full hover:bg-red-600/50 text-white rounded-md font-[700]"
                            >
                                LogOut
                            </button>
                            <Link
                                href={paths.home()}
                                className="px-3 py-2 w-full  bg-gray-800 hover:bg-gray-800/50 text-white rounded-md font-[700]"
                            >
                                Back to Dashboard
                            </Link>
                        </form>
                    </div>
                </div>
        </div>
    )
}