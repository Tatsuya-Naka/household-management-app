import { auth } from "@/auth";
import { MdOutlineSavings } from "react-icons/md";
import RecordsSavings from "./savings-container";

export default async function RecordsMainSavings() {
    const session = await auth();
    
    return (
        <div className="relative w-full px-5">
            <div className="absolute -top-10 left-32 right-auto w-[80px] h-[80px] bg-white rounded-lg shadow-md p-3">
                <MdOutlineSavings className="w-full h-full fill-slate-800" />
            </div>

            <RecordsSavings session={session}/>
        </div>
    )
}