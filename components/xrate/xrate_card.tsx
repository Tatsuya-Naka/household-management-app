"use client";
import CurrencyIcon from "@/type/currency";
import { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";

interface XRateCardProps {
    currencyType: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    defaultValue?: number;
}
export default function XRateCard({ currencyType, onSubmit, defaultValue }: XRateCardProps) {
    const [value, setValue] = useState(defaultValue || 1.00);
    return (
        <div className="w-[320px] bg-white rounded-lg shadow-2xl px-3 py-4 flex items-start flex-col">
            {/* CurrencyType Selection */}
            <div className={`rounded-lg bg-transparent hover:bg-slate-400/20 cursor-pointer mb-3`}>
                <div className="flex items-center gap-2  px-2 py-1 ">
                    <h3 className="font-[700] text-lg text-slate-800">{currencyType}</h3>
                    <IoMdArrowDropup size={24} className="fill-slate-800" />
                </div>
            </div>

            {/* Currency Rate */}
            {/* TODO: after enter currencytype and detect submit from input, calculate it */}
            <form onSubmit={onSubmit} className="w-full flex items-center space-x-2 justify-end">
                <div className="text-3xl font-[500] text-slate-800 mr-2">
                    {CurrencyIcon({ currencyType })}
                </div>
                <div className="border-2 border-solid border-slate-800 rounded-lg">
                    <input type="number" name="num" defaultValue={defaultValue} step={0.01} className="w-full h-full px-2 text-2xl font-[500] py-1.5 outline-none rounded-lg" />
                </div>
            </form>
        </div>
    )
}