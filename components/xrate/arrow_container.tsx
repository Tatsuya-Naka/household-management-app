
'use client';
import { HiArrowNarrowRight } from "react-icons/hi";

export default function ArrowContainer() {

    return (
        <div className="w-[80px] bg-white rounded-lg shadow-2xl p-3 flex items-center justify-center flex-col">
            <HiArrowNarrowRight size={24} className={`fill-slate-800 cursor-pointer transition duration-150 delay-75 ease-in`} />
        </div>
    )
}