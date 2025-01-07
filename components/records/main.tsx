import { auth } from "@/auth";
import { GiReceiveMoney } from "react-icons/gi";
import RecordsIncome from "./income";

export default async function RecordsMainIncome() {
    const session = await auth();
    
    return (
        <div className="relative w-full px-5">
            <div className="absolute -top-10 left-32 right-auto w-[80px] h-[80px] bg-white rounded-lg shadow-md p-3">
                <GiReceiveMoney className="w-full h-full" />
            </div>

            <RecordsIncome session={session}/>
        </div>
    )
}