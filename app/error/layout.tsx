import paths from "@/paths";
import Link from "next/link";
import SavingsIcon from '@mui/icons-material/Savings';

export default async function ErrorLayout({ children }: { children: React.ReactNode }) {
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
            <div className={`w-full bg-shinchan bg-cover bg-no-repeat h-[calc(100vh-56px)] flex items-center justify-center`}>
                {children}
            </div>
        </div>
    )
}