import { FaPersonRunning } from "react-icons/fa6";
import { Suspense } from "react";
import RecordsProcessingComponent from "./component";
import Link from "next/link";
import paths from "@/paths";

interface RecordsProcessingHomeProps {
    search: string;
    page: number;
}

export default async function RecordsProcessingHome({ search, page }: RecordsProcessingHomeProps) {
    return (
        <div className="relative w-full px-5 z-10">
            <div className="absolute -top-10 left-32 right-auto w-[80px] h-[80px] bg-white rounded-lg shadow-md p-3">
                <FaPersonRunning className="w-full h-full fill-slate-800" />
            </div>

            <Link className="absolute -top-5 right-32 left-auto font-[700] z-[999] bg-white rounded-lg shadow-md px-3 py-2 cursor-pointer hover:text-slate-800/50 text-slate-500" 
                href={paths.recordsListsAppliedPageUrl()}
            >
                Applied records list
            </Link>

            <Suspense>
                <RecordsProcessingComponent search={search} page={page} />
            </Suspense>
        </div>
    )
}