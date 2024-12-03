import SavingsIcon from '@mui/icons-material/Savings';
import { cn } from '@/lib/utils';
import paths from '@/paths';
import Link from 'next/link';
import Icons from '@/components/header/icons';
import { auth } from '@/auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <div className="max-w-full ">
            <header className="w-full px-5 py-3 h-[180px] bg-gradient-to-b from-sky-400 via-teal-200 to-emerald-400">
                <div className='max-w-[1560px] relative z-[80] mx-auto h-full'>
                    <div className='flex items-center justify-between'>
                        {/* Icon, name, pages title */}
                        <div className='flex items-center w-full'>
                            {/* Icon, name */}
                            <div className='flex items-center text-2xl'>
                                <SavingsIcon sx={{ fontSize: 32, color: "black", marginRight: "1rem" }} />
                                <h1 className={cn("italic text-2xl font-[700] text-slate-800 mr-8")}>
                                    HAB
                                </h1>
                            </div>

                            {/* Sub pages titles */}
                            <ul className='w-full flex items-center justify-start'>
                                <li className='mr-5'>
                                    <Link
                                        href={paths.home()}
                                        className={`text-xl text-slate-800 font-[700] bg-white/50 px-2 py-1 rounded-md cursor-pointer`}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                {/* See the dialog under this with full width and height might be determined in advance to look nice. */}
                                <li className='mr-5'>
                                    <Link
                                        href={paths.recordsPageUrl()}
                                        className={`text-xl text-slate-800 font-[700] bg-transparent hover:underline hover:underline-offset-4 cursor-pointer`}
                                    >
                                        Records
                                    </Link>
                                </li>
                                <li className='mr-5'>
                                    <Link
                                        href={paths.communityPageUrl()}
                                        className={`text-xl text-slate-800 font-[700] bg-transparent hover:underline hover:underline-offset-4 cursor-pointer`}
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li className='mr-5'>
                                    <Link
                                        href={paths.communityPageUrl()}
                                        className={`text-xl text-slate-800 font-[700] bg-transparent hover:underline hover:underline-offset-4 cursor-pointer`}
                                    >
                                        X-Rates
                                    </Link>
                                </li>
                                <li className='mr-5'>
                                    <Link
                                        href={paths.communityPageUrl()}
                                        className={`text-xl text-slate-800 font-[700] bg-transparent hover:underline hover:underline-offset-4 cursor-pointer`}
                                    >
                                        Community
                                    </Link>
                                </li>
                                <li className=''>
                                    <Link
                                        href={paths.settingPageUrl()}
                                        className={`text-xl text-slate-800 font-[700] bg-transparent hover:underline hover:underline-offset-4 cursor-pointer`}
                                    >
                                        Setting
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* notification, color change, setting, userIcon */}
                        <Icons id={session?.user.id} name={session?.user.name} image={session?.user.image} />
                    </div>

                    {/* If I click this, z-index should be z-10 */}
                    <button
                        type="button"
                        className="absolute z-0 bottom-3 right-0 ml-auto px-5 py-1.5 rounded-md bg-black hover:bg-black/50 text-white text-base"
                    >
                        Quick
                    </button>
                </div>
            </header>

            <main className='max-w-[1560px]  pr-[81px] min-h-[calc(100%-180px)]'>
                {children}
            </main>
        </div>
    )
}