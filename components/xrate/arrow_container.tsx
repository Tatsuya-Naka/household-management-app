
'use client';
import { HiArrowNarrowRight } from "react-icons/hi";

interface ArrowContainerProps {
    onClick: () => void;
    arrow: boolean;
}
export default function ArrowContainer({onClick, arrow}: ArrowContainerProps) {

    return (
        <div className="w-[80px] bg-white rounded-lg shadow-2xl p-3 flex items-center justify-center flex-col cursor-pointer" onClick={onClick}>
            <HiArrowNarrowRight size={24} className={`fill-slate-800 cursor-pointer transition duration-150 delay-75 ease-in ${arrow ? "rotate-180" : "rotate-0"}`} />
        </div>
    )
}