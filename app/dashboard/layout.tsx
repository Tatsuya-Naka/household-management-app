import SavingsIcon from '@mui/icons-material/Savings';
import { cn } from '@/lib/utils';
import paths from '@/paths';
import Link from 'next/link';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full">
            <header className="w-full flex items-center justify-between px-5 py-3">
                <div className='max-w-7xl flex items-center justify-between'>
                    {/* Icon, name, pages title */}
                    <div className='flex items-center w-full'>
                        {/* Icon, name */}
                        <div className='flex items-center text-2xl'>
                            <SavingsIcon sx={{ fontSize: 32, color: "white", marginRight: "1rem" }} />
                            <h1 className={cn("italic text-2xl font-[700] text-white mr-8")}>
                                HAB
                            </h1>
                        </div>

                        {/* Sub pages titles */}
                        <ul className='w-full flex items-center justify-start'>
                            <li className='mr-3'>
                                <Link
                                    href={paths.home()}
                                    className={`text-xl text-slate-800 font-[700] bg-white/50 px-2 py-1 rounded-md cursor-pointer`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            {/* See the dialog under this with full width and height might be determined in advance to look nice. */}
                            <li className='mr-3'>
                                <Link
                                    href={paths.recordsPageUrl()}
                                    className={`text-xl text-slate-800 font-[700] bg-transparent hover:underline hover:underline-offset-4 cursor-pointer`}
                                >
                                    Records
                                </Link>
                            </li>
                            <li className='mr-3'>
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
                    <div>

                    </div>
                </div>
            </header>

            <main className='w-full '>
                {children}
            </main>
        </div>
    )
}