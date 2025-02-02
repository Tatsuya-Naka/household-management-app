'use client';

import paths from "@/paths";
import { currencies, getIcons } from "@/type/currency";
import { redirect } from "next/navigation";

interface SelectCurrencyTypeProps {
    selected: string;
    another: string;
    params: string;
    inputNum: number;
    setIsClicked: (isClicked: boolean) => void;
}
export default function SelectCurrencyType({ selected, another, inputNum, params, setIsClicked }: SelectCurrencyTypeProps) {
    const options = currencies.filter(option => option != selected);

    const handleClick = (option: string) => {
        setIsClicked(false);
        redirect(paths.xrate() + `?${params}=${option}&${params === "to" ? "currencyType" : "to"}=${another}&inputNum=${inputNum}`);
    }

    return (
        <div className="rounded-lg flex flex-col bg-white shadow-xl">
            {options.map((option, index) => (
                <div key={index} className={`${index === 0 ? "rounded-t-lg" : ""} ${index === options.length-1 ? "rounded-b-lg" : ""} ${(index !== options.length-1) ? "border-b-2 border-solid border-slate-400/20" : ""} px-2 py-1 flex items-cneter justify-between h-full hover:bg-slate-800/20 cursor-pointer`}
                    onClick={() => handleClick(option)}
                >
                    <p>{getIcons(option)}</p>
                    <p>{option}</p>
                </div>
            ))}
        </div>
    )
}