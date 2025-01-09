import RecordsMainExpenses from "@/components/records/expenses";
import { Suspense } from "react";

export default function RecordsExpensesPage() {
    return (
        <div className="w-full">
            <Suspense>
                <RecordsMainExpenses />
            </Suspense>
        </div>
    )
}