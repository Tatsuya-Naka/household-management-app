import { auth } from '@/auth';
import RecordsDialog from '@/components/header/records-dialog';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <div className="max-w-full ">
            <header className="w-full px-5 py-3 h-[180px] bg-gradient-to-b from-sky-400 via-teal-200 to-emerald-400">
                <div className='max-w-[1560px] relative z-[80] mx-auto h-full'>
                    <RecordsDialog id={session?.user.id} name={session?.user.name} image={session?.user.image} />

                    {/* If I click this, z-index should be z-10 */}
                    <button
                        type="button"
                        className="absolute z-0 bottom-2 right-2 left-auto px-5 py-1.5 rounded-md bg-black hover:bg-black/50 text-white text-base"
                    >
                        Quick
                    </button>
                </div>
            </header>

            <main className='max-w-[1560px]  pr-[81px] min-h-[calc(100%-180px)]'>
                {children}
            </main>
        </div>
    )
}