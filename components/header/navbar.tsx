"use server"
import { auth } from '@/auth';
import RecordsDialog from '@/components/header/records-dialog';

export default async function HeaderNav() {
    const session = await auth();
    return (
        <div className='max-w-[1560px] relative z-[80] mx-auto h-full'>
            <RecordsDialog id={session?.user.id} name={session?.user.name} image={session?.user.image} page="records" />
        </div>
    )
}