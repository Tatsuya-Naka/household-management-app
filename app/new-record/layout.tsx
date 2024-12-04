import RecordsDialog from "@/components/header/records-dialog";
import { auth } from "@/auth";
import CancelButton from "@/components/new-record/cancel-button";

export default async function NewRecordPageLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <div className="max-w-full">
            <header className="w-full px-5 py-3 h-[180px] bg-gradient-to-b from-sky-400 via-teal-200 to-emerald-400">
                <div className='max-w-[1560px] relative z-[80] mx-auto h-full'>
                    <RecordsDialog id={session?.user.id} name={session?.user.name} image={session?.user.image} page="new-record" />

                    {/* If I click this, z-index should be z-10 */}
                    <CancelButton />
                </div>
            </header>

            <main className='max-w-[1560px]  pr-[81px] min-h-[calc(100%-180px)]'>
                {children}
            </main>
        </div>
    )
}