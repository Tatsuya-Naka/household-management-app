import DashboardContainer from "@/components/dashboard/dashboard-container";
import { Suspense } from "react";

export default async function DashboardPage() {
    return (
        <div className="">
            {/* Dashboard Page */}
            <Suspense fallback={"...Loading"}>
                <DashboardContainer />
            </Suspense>
        </div>
    )
}