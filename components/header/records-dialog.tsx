"use client";
import paths from "@/paths";
import Link from "next/link";
import { useState } from "react";
import SavingsIcon from '@mui/icons-material/Savings';
import { cn } from '@/lib/utils';
import Icons, { IconsProps } from '@/components/header/icons';
import { GoGraph } from "react-icons/go";
import { FiDatabase } from "react-icons/fi";

export default function RecordsDialog({image, page}: IconsProps) {
    const [mouse, setMounse] = useState(false);

    return (
        <div className="relative z-20">
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
                        <li className='mr-5' onMouseEnter={() => setMounse(false)}>
                            <Link
                                href={paths.home()}
                                className={`${page==="dashboard" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                            >
                                Dashboard
                            </Link>
                        </li>
                        {/* See the dialog under this with full width and height might be determined in advance to look nice. */}
                        <li className='mr-5 relative z-10' onMouseEnter={() => setMounse(true)}>
                            <Link
                                href={paths.recordsPageUrl()}
                                className={`${page==="records" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                            >
                                Records
                            </Link>
                        </li>
                        <li className='mr-5' onMouseEnter={() => setMounse(false)}>
                            <Link
                                href={paths.newRecordPageUrl()}
                                className={`${page==="new-record" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                            >
                                Register
                            </Link>
                        </li>
                        <li className='mr-5' onMouseEnter={() => setMounse(false)}>
                            <Link
                                href={paths.xrate()}
                                className={`${page==="xrate" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                            >
                                X-Rates
                            </Link>
                        </li>
                        <li className='mr-5' onMouseEnter={() => setMounse(false)}>
                            <Link
                                href={paths.communityPageUrl()}
                                className={`${page==="community" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                            >
                                Community
                            </Link>
                        </li>
                        <li className='' onMouseEnter={() => setMounse(false)}>
                            <Link
                                href={paths.settingPageUrl()}
                                className={`${page==="setting" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                            >
                                Setting
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* notification, color change, setting, userIcon */}
                <Icons image={image} />
            </div>
            {mouse &&
                <div className="flex items-center justify-center w-full " onMouseEnter={() => setMounse(true)} onMouseLeave={() => setMounse(false)}>
                    <div className="bg-white shadow-xl rounded-md border-2 border-slate-400/50 border-solid px-2 py-1 w-full mx-10">
                        <div className="flex gap-10">
                            <div className="flex flex-col items-start">
                                <h2 className="text-lg font-[700] mb-3">
                                    <GoGraph size={24} className="inline-block mr-2"/>
                                    Gragh/Chart
                                </h2>
                                <div className="ml-4 flex flex-col items-start">
                                    <Link
                                        href={paths.recordsIncomeUrl()}
                                        className="hover:underline hover:underline-offset-4 text-base font-[500] mb-2"
                                    >
                                        Income
                                    </Link>
                                    <Link
                                        href={paths.recordsExpensesUrl()}
                                        className="hover:underline hover:underline-offset-4 text-base font-[500] mb-2"
                                    >
                                        Expenses
                                    </Link>
                                    <Link
                                        href={paths.recordsSavingsUrl()}
                                        className="hover:underline hover:underline-offset-4 text-base font-[500] mb-2"
                                    >
                                        Savings
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start h-full">
                                <h2 className="text-lg font-[700] mb-3">
                                    <FiDatabase size={24} className="inline-block mr-2"/>
                                    Data
                                </h2>
                                <div className="ml-4 flex flex-col items-start">
                                    <Link
                                        href={paths.recordsListsPageUrl()}
                                        className="hover:underline hover:underline-offset-4 text-base font-[500] mb-2"
                                    >
                                        Records
                                    </Link>
                                    {/* <Link
                                        href="/"
                                        className="hover:underline hover:underline-offset-4 text-base font-[500] mb-2"
                                    >
                                        Database
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}