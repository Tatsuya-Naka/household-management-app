import { GiFuji } from "react-icons/gi";
import RecordsAppliedComponent from "./component";
import { Suspense } from "react";

interface RecordsAppliedHomeProps {
    search: string;
    page: number;
}

export default async function RecordsAppliedHome({ search, page }: RecordsAppliedHomeProps) {
    return (
        <div className="relative w-full px-5">
            <div className="absolute -top-10 left-32 right-auto w-[80px] h-[80px] bg-white rounded-lg shadow-md p-3">
                <GiFuji className="w-full h-full fill-slate-800" />
            </div>

            <Suspense>
                <RecordsAppliedComponent search={search} page={page}/>
            </Suspense>
        </div>
    )
}