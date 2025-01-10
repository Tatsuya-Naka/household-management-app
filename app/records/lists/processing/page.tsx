import RecordsProcessingHome from "@/components/records/lists/processing/processing";
import { Suspense } from "react";

interface RecordsProcessingHomeProps {
    searchParams: Promise<{
        search: string;
        page: string;
    }>
}

export default async function RecordsProcessingListsPage({ searchParams }: RecordsProcessingHomeProps) {
    const query = await searchParams;
    const search = query?.search || "";
    const page = Number(query?.page || 1);

    return (
        <div className="w-full">
            <Suspense>
                <RecordsProcessingHome search={search} page={page} />
            </Suspense>
        </div>
    )
}