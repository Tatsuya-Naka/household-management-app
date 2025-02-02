import { auth } from "@/auth"
import RecordsDialog from "./records-dialog";

export default async function Header() {
    const session = await auth();

    return (
        <div className="w-full px-5 py-3 h-[180px] bg-gradient-to-b from-sky-400 via-teal-200 to-emerald-400">
            <div className='max-w-[1560px] relative z-[80] mx-auto h-full'>
                <RecordsDialog id={session?.user.id} name={session?.user.name} image={session?.user.image} page="xrate" />
            </div>
        </div>
    )
}