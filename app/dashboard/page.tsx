import DashboardGraph from "@/components/dashboard/graph";
import { Suspense } from "react";

export default async function DashboardPage() {
    return (
        <div className="w-full flex flex-col px-10 z-10">
            {/* Records  */}
            <div className="space-x-5 w-full -mt-16">
                <div className="space-x-5 w-full flex items-center justify-evenly">
                    {/* Income */}
                    <div className="px-3 py-5 rounded-md bg-white shadow-xl w-full">
                        <div className="flex flex-col items-start justify-center gap-3">
                            {/* title */}
                            <h3 className="text-base font-[500] text-slate-800">
                                Income
                            </h3>
                            <h2 className="text-4xl font-[700] text-slate-800">
                                $ 0.00
                            </h2>
                            <h5 className="text-sm">
                                <span className="text-green-500 px-1 py-0.5 rounded-sm">30%</span>raised
                            </h5>
                        </div>
                    </div>

                    {/* Expenses */}
                    <div className="px-3 py-5 rounded-md bg-white shadow-xl w-full">
                        <div className="flex flex-col items-start justify-center gap-3">
                            {/* title */}
                            <h3 className="text-base font-[500] text-slate-800">
                                Expenses
                            </h3>
                            <h2 className="text-4xl font-[700] text-slate-800">
                                $ 0.00
                            </h2>
                            <h5 className="text-sm">
                                <span className="text-green-500 px-1 py-0.5 rounded-sm">30%</span>raised
                            </h5>
                        </div>
                    </div>

                    {/* Savings */}
                    <div className="px-3 py-5 rounded-md bg-white shadow-xl w-full">
                        <div className="flex flex-col items-start justify-center gap-3">
                            {/* title */}
                            <h3 className="text-base font-[500] text-slate-800">
                                Savings
                            </h3>
                            <h2 className="text-4xl font-[700] text-slate-800">
                                $ 0.00
                            </h2>
                            <h5 className="text-sm">
                                <span className="text-green-500 px-1 py-0.5 rounded-sm">30%</span>raised
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* Graph */}
            <Suspense>
                <DashboardGraph />
            </Suspense>
        </div>
    )
}