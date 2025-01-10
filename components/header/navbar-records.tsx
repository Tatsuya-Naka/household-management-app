"use server"
import { auth } from '@/auth';
import RecordsDialog from '@/components/header/records-dialog';
import paths from '@/paths';
import Link from 'next/link';

export default async function ProcessingHeaderNav() {
    const session = await auth();
    return (
        <div className='max-w-[1560px] relative z-[80] mx-auto h-full'>
            <RecordsDialog id={session?.user.id} name={session?.user.name} image={session?.user.image} page="records" />

            <Link className="absolute bottom-0 right-32 left-auto font-[700] z-[999] bg-white rounded-lg shadow-md px-3 py-2 cursor-pointer hover:text-slate-800/50 text-slate-500" 
                href={paths.recordsListsAppliedPageUrl()}
            >
                Applied records list
            </Link>
        </div>
    )
}