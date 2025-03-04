import { auth } from "@/auth"
import RecordsDialog from "./records-dialog";
import { db } from "@/lib/db";

interface HeaderProps {
    page: string;
}

export default async function Header({page}: HeaderProps) {
    const session = await auth();
    const user = await db.user.findUnique({
        where: {id: session?.user.id}
    })

    return (
        <div className="w-full px-5 py-3 h-[180px] bg-gradient-to-b from-sky-400 via-teal-200 to-emerald-400">
            <div className='max-w-[1560px] relative z-[80] mx-auto h-full'>
                <RecordsDialog id={session?.user.id} name={session?.user.name} image={user?.image} page={page} />
            </div>
        </div>
    )
}