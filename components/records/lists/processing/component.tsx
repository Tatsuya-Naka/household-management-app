import { IoIosOptions } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { GiJapan } from "react-icons/gi";
import { MdSort } from "react-icons/md";
import { TbLineDotted } from "react-icons/tb";
import Link from "next/link";
import { getRecordsProcessingData } from "@/data/records";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import paths from "@/paths";
import RecordBox from "../applied/record-box";

interface RecordsProcessingHomeProps {
    search: string;
    page: number;
}

export default async function RecordsProcessingComponent({ search, page }: RecordsProcessingHomeProps) {
    const records = await getRecordsProcessingData(search, page);

    return (
        <div className="min-h-[calc(100vh-180px)] pt-10 px-5">
            <div className="grid grid-rwos-[80px_auto_80px] gap-5 w-full h-full">
                {/* Search, Sort, Option */}
                <div className="flex items-center justify-self-end">
                    <div className="w-full flex items-center gap-2">
                        {/* Search */}
                        {/* TODO: search backend */}
                        <form className="relative flex flex-1">
                            <input
                                type="text"
                                name="search"
                                className={`bg-transparent w-full inline-block pl-10 pr-36 leading-relaxed py-1 px-2 text-base resize-y border-2 border-solid border-slate-800 rounded-md outline-none `}
                                placeholder="grocery"
                            />

                            <button
                                type="submit"
                                className={`bg-transparent absolute right-auto h-full rounded-l-md inline-block text-center hover:bg-gray-300/30 transition delay-150 ease-in`}
                            >
                                <IoIosSearch size={32} className="fill-slate-800 pl-1 pt-1" />
                            </button>

                            <Link
                                href="https://github.com/Tatsuya-Naka"
                                className="absolute right-2 left-auto top-1.5 text-sm text-slate-800 flex items-center"
                            >
                                Powered by <GiJapan size={24} className="fill-slate-800" /> Tatsuya
                            </Link>
                        </form>

                        {/* Sort */}
                        <button className="bg-white/50 hover:bg-gray-300/30 border-2 border-solid border-slate-800 rounded-md shadow-md p-1"
                            type="button"
                        >
                            <MdSort size={24} className="text-slate-800" />
                        </button>

                        {/* Option */}
                        <button className="bg-white/50 hover:bg-gray-300/30 border-2 border-solid border-slate-800 rounded-md shadow-md p-1"
                            type="button"
                        >
                            <IoIosOptions size={24} className="text-slate-800" />
                        </button>
                    </div>
                </div>

                {/* Grid records */}
                <div className="min-h-[calc(100vh-340px)] grid grid-cols-4 gap-4">

                    {/* Income */}
                    {(records.data && records.data.length > 0) && records.data.map((record, key) => (
                        <RecordBox key={key} data={record} />
                    ))}

                </div>

                {/* Page numbers */}
                <div className="flex flex-col items-center justify-center w-full pb-10">
                    <div className="flex items-center justify-center w-full gap-3 mb-3">
                        {(page !== 1 && page + 3 <= records.count) &&
                            <div className="flex items-center gap-3 ">
                                <Link className="bg-white/50 w-8 text-base text-slate-800 hover:bg-gray-300/30 text-center border-2 border-solid border-slate-800 rounded-md shadow-md p-1"
                                    href={`${paths.recordsListsProcessingPageUrl()}?search=${search}&page=1`}
                                >
                                    {1}
                                </Link>
                                <div className="relative px-5">
                                    <div className="absolute top-0 right-0 left-0">
                                        <TbLineDotted size={32} className="text-slate-800" />
                                    </div>
                                </div>
                            </div>
                        }
                        {(page + 3 > records.count && page != 1) &&
                            <Link className="bg-white/50 w-8 text-base text-slate-800 hover:bg-gray-300/30 text-center border-2 border-solid border-slate-800 rounded-md shadow-md p-1"
                                href={`${paths.recordsListsProcessingPageUrl()}?search=${search}&page=1`}
                            >
                                {1}
                            </Link>
                        }
                        <Link className="bg-slate-800 text-white w-8 text-base hover:bg-slate-800/50 text-center border-2 border-solid border-slate-800 hover:border-slate-800/50 rounded-md shadow-md p-1"
                            href={`${paths.recordsListsProcessingPageUrl()}?search=${search}&page=${page}`}
                        >
                            {page}
                        </Link>
                        {page + 1 <= records.count &&
                            <Link className="bg-white/50 w-8 text-base text-slate-800 hover:bg-gray-300/30 text-center border-2 border-solid border-slate-800 rounded-md shadow-md p-1"
                                href={`${paths.recordsListsProcessingPageUrl()}?search=${search}&page=${page + 1}`}
                            >
                                {page + 1}
                            </Link>
                        }
                        {page + 2 <= records.count &&
                            <Link className="bg-white/50 w-8 text-base text-slate-800 hover:bg-gray-300/30 text-center border-2 border-solid border-slate-800 rounded-md shadow-md p-1"
                                href={`${paths.recordsListsProcessingPageUrl()}?search=${search}&page=${page + 2}`}
                            >
                                {page + 2}
                            </Link>
                        }
                        {page + 3 <= records.count &&
                            <>
                                <div className="relative px-5">
                                    <div className="absolute top-0 right-0 left-0">
                                        <TbLineDotted size={32} className="text-slate-800" />
                                    </div>
                                </div>
                                <button className="bg-white/50 w-8 text-base text-slate-800 hover:bg-gray-300/30 border-2 border-solid border-slate-800 rounded-md shadow-md p-1"
                                    type="button"
                                >
                                    {records.count}
                                </button>
                            </>
                        }
                    </div>

                    <div className="flex items-center gap-2">
                        {(1 < page && page <= records.count) &&
                            <Link className={`bg-gray-500/50 rounded-full px-3 py-2 text-base flex items-center text-slate-800 font-[600]
                        group hover:bg-gray-500/30 transition-all delay-75 ease-in`}
                                href={`${paths.recordsListsProcessingPageUrl()}?search=${search}&page=${page - 1}`}
                            >
                                <MdOutlineArrowBackIosNew size={12} className="fill-slate-800 group-hover:fill-slate-800/50 mr-2 transition" />
                                <span className="text-slate-800 transition group-hover:text-slate-800/50 text-sm">Back</span>
                            </Link>
                        }

                        {page < records.count &&
                            <Link className={`bg-gray-500/50 rounded-full px-3 py-2 text-base flex items-center text-slate-800 font-[600]
                        group hover:bg-gray-500/30 transition-all delay-75 ease-in`}
                                href={`${paths.recordsListsProcessingPageUrl()}?search=${search}&page=${page + 1}`}
                            >
                                <span className="text-slate-800 transition group-hover:text-slate-800/50 text-sm mr-2">Next</span>
                                <MdOutlineNavigateNext size={12} className="fill-slate-800 group-hover:fill-slate-800/50 transition" />
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}