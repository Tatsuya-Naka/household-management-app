import RecordsMainSavings from "@/components/records/savings";
import { Suspense } from "react";

export default function RecordsSavingsPage() {
    return (
        <div className="w-full">
            <Suspense>
                <RecordsMainSavings />
            </Suspense>
        </div>
    )
}