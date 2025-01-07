import RecordsMainIncome from "@/components/records/main";
import { Suspense } from "react";

export default async function RecordsPage() {
    return (
        <div className="w-full">
            <Suspense>
                <RecordsMainIncome />
            </Suspense>
        </div>
    )
}