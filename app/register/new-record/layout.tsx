"use client";
import CancelButton from "@/components/new-record/cancel-button";
import RecordsDialogForRegister from "@/components/new-record/records-dialog";
import { SessionProvider } from "next-auth/react";

export default function NewRecordPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-full">
            <header className="w-full px-5 py-3 h-[180px] bg-gradient-to-b from-sky-400 via-teal-200 to-emerald-400">
                <div className='max-w-[1560px] relative z-[80] mx-auto h-full'>
                    <SessionProvider>
                        <RecordsDialogForRegister page="new-record" />
                    </SessionProvider>

                    {/* If I click this, z-index should be z-10 */}
                    <CancelButton />
                </div>
            </header>

            <main className='max-w-[1560px]  pr-[81px] min-h-[calc(100%-180px)] mx-auto'>
                {children}
            </main>
        </div>
    )
}