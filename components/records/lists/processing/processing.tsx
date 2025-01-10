import { FaPersonRunning } from "react-icons/fa6";
import { Suspense } from "react";
import RecordsProcessingComponent from "./component";

interface RecordsProcessingHomeProps {
    search: string;
    page: number;
}

export default async function RecordsProcessingHome({ search, page }: RecordsProcessingHomeProps) {
    return (
        <div className="relative w-full px-5">
            <div className="absolute -top-10 left-32 right-auto w-[80px] h-[80px] bg-white rounded-lg shadow-md p-3">
                <FaPersonRunning className="w-full h-full fill-slate-800" />
            </div>

            <Suspense>
                <RecordsProcessingComponent search={search} page={page} />
            </Suspense>
        </div>
    )
}