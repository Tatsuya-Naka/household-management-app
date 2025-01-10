import { IoIosOptions } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { GiJapan } from "react-icons/gi";
import { MdSort } from "react-icons/md";
import { TbLineDotted } from "react-icons/tb";
import Link from "next/link";
import { getRecordsAppliedData } from "@/data/records";
import { PiDot } from "react-icons/pi";
import paths from "@/paths";
import RecordBox from "./record-box";

interface RecordsAppliedHomeProps {
    search: string;
    page: number;
}

export default async function RecordsAppliedComponent({ search, page }: RecordsAppliedHomeProps) {
    const records = await getRecordsAppliedData(search, page);

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
                <div className="flex items-center justify-center w-full pb-10">
                    {page !== 1 &&
                        <div className="flex items-center ">
                            <Link className="bg-slate-800 text-white w-8 text-base hover:bg-slate-800/50 text-center border-2 border-solid border-slate-800 hover:border-slate-800/50 rounded-md shadow-md p-1"
                                href={`${paths.recordsListsAppliedPageUrl()}?search=${search}&page=1`}
                            >
                                {1}
                            </Link>
                            <div className="relative px-2">
                                <PiDot size={32} className="text-slate-800 absolute right-0.5 left-1" />
                            </div>
                        </div>
                    }
                    <Link className="bg-slate-800 text-white w-8 text-base hover:bg-slate-800/50 text-center border-2 border-solid border-slate-800 hover:border-slate-800/50 rounded-md shadow-md p-1"
                        href={`${paths.recordsListsAppliedPageUrl()}?search=${search}&page=${page}`}
                    >
                        {page}
                    </Link>
                    <Link className="bg-white/50 w-8 text-base text-slate-800 hover:bg-gray-300/30 text-center border-2 border-solid border-slate-800 rounded-md shadow-md p-1"
                        href={`${paths.recordsListsAppliedPageUrl()}?search=${search}&page=${page + 1}`}
                    >
                        {page + 1}
                    </Link>
                    <button className="bg-white/50 w-8 text-base text-slate-800 hover:bg-gray-300/30 border-2 border-solid border-slate-800 rounded-md shadow-md p-1"
                        type="button"
                    >
                        {page + 2}
                    </button>
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
                </div>
            </div>
        </div>
    )
}