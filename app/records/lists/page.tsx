import { PiListStarDuotone } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BiTaskX } from "react-icons/bi";
import Link from "next/link";
import { GiClick } from "react-icons/gi";
import paths from "@/paths";

export default function RecordsListsPage() {
    return (
        <div className="w-full">
            <div className="relative w-full px-5">
                <div className="absolute -top-10 left-32 right-auto w-[80px] h-[80px] bg-white rounded-lg shadow-md p-3">
                    <PiListStarDuotone className="w-full h-full fill-slate-800" />
                </div>

                {/* Contents: saved or processing */}
                <div className="min-h-[calc(100vh-180px)] flex items-center justify-center relative">
                    <div className="absolute top-20 left-10 right-auto">
                        <div className="flex flex-col items-start">
                            <h2 className="text-slate-800 font-[800] text-3xl">Records Lists</h2>
                            <h4 className="text-lg text-slate-500 font-[600]">Check and update your records</h4>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr] gap-5">
                        <Link
                            href={paths.recordsListsAppliedPageUrl()}
                            className="cursor-pointer shadow-md rounded-md bg-white px-3 py-2 flex items-center justify-between relative group transition-all duration-150 ease-in"
                        >
                            <div className="w-[480px] h-[240px] rounded-md bg-gray-500/50 flex items-center justify-center mr-2 group-hover:bg-gray-500/30 transition">
                                No Image
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="text-xl text-slate-800 font-[700] mb-5 transtion group-hover:text-slate-800/50">Applied Records</h3>
                                <p className="text-lg text-slate-800 font-[500] transtion group-hover:text-slate-800/50">
                                    Can see the record lists that have already applied to your total income/expenses.

                                </p>
                            </div>
                            <div className="absolute top-10 right-10 left-auto">
                                <FaRegCircleCheck size={32} className="fill-emerald-500 animate-bounce transtion group-hover:fill-emerald-500/50" />
                            </div>
                            <div className="absolute bottom-5 right-5 left-auto">
                                <GiClick size={32} className="fill-slate-500 transtion group-hover:fill-slate-500/50" />
                            </div>
                        </Link>

                        <Link
                            href={paths.recordsListsProcessingPageUrl()}
                            className="cursor-pointer shadow-md rounded-md bg-white px-3 py-2 flex items-center justify-between relative group transition-all duration-150 ease-in"
                        >
                            <div className="w-[480px] h-[240px] rounded-md bg-gray-500/50 flex items-center justify-center mr-2 group-hover:bg-gray-500/30 transition">
                                No Image
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="text-xl text-slate-800 font-[700] mb-5 transtion group-hover:text-slate-800/50">Processing Records</h3>
                                <p className="text-lg text-slate-800 font-[500] transtion group-hover:text-slate-800/50">
                                    Can see the record lists that have not yet applied to your total income/expenses.
                                    if your record has been finalized, update it now!!
                                </p>
                            </div>
                            <div className="absolute top-10 right-10 left-auto">
                                <BiTaskX size={32} className="fill-red-500 animate-bounce transtion group-hover:fill-red-500/50" />
                            </div>

                            <div className="absolute bottom-5 right-5 left-auto">
                                <GiClick size={32} className="fill-slate-500 transtion group-hover:fill-slate-500/50" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}