import { auth } from "@/auth";
import { GiPayMoney } from "react-icons/gi";
import RecordsExpenses from "./expenses-container";

export default async function RecordsMainExpenses() {
    const session = await auth();
    
    return (
        <div className="relative w-full px-5">
            <div className="absolute -top-10 left-32 right-auto w-[80px] h-[80px] bg-white rounded-lg shadow-md p-3">
                <GiPayMoney className="w-full h-full" />
            </div>

            <RecordsExpenses session={session}/>
        </div>
    )
}