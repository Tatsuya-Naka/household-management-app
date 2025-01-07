"use server"

import HeaderNav from "@/components/header/navbar"
import { Suspense } from "react"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-full ">
            <header className="w-full px-5 py-3 h-[180px] bg-gradient-to-b from-sky-400 via-teal-200 to-emerald-400">
                <Suspense>
                    <HeaderNav />
                </Suspense> 
            </header>

            <main className='max-w-[1560px] min-h-[calc(100%-180px)] mx-auto'>
                {children}
            </main>
        </div>
    )
}