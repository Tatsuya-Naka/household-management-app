import RecordsAppliedHome from "@/components/records/lists/applied/applied";
import { Suspense } from "react";

interface RecordsAppliedHomeProps {
    searchParams: Promise<{
        search: string;
        page: string;
    }>
}

export default async function RecordsAppliedListsPage({ searchParams }: RecordsAppliedHomeProps) {
    const query = await searchParams;
    const search = query?.search || "";
    const page = Number(query?.page || 1);

    return (
        <div className="w-full">
            <Suspense>
                <RecordsAppliedHome search={search} page={page}/>
            </Suspense>
        </div>
    )
}