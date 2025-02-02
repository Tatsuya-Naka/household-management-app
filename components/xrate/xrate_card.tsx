"use client";
import CurrencyIcon from "@/type/currency";
import { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import SelectCurrencyType from "./select_currencytype";

interface XRateCardProps {
  currencyType: string;
  to: string;
  inputNum: number;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  defaultValue?: number;
  notTextAllowed?: boolean
}
export default function XRateCard({ currencyType, to, inputNum, onSubmit, defaultValue, notTextAllowed }: XRateCardProps) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="w-[320px] bg-white rounded-lg shadow-2xl px-3 py-4 flex items-start flex-col">
      {/* CurrencyType Selection */}
      <div className={`rounded-lg bg-transparent cursor-pointer mb-3 relative z-10`}>
        <div className="flex items-center gap-2 rounded-lg hover:bg-slate-400/20  px-2 py-1 " onClick={() => setIsClicked(!isClicked)}>
          <h3 className="font-[700] text-lg text-slate-800">{`${notTextAllowed ? to : currencyType}`}</h3>
          <IoMdArrowDropup size={24} className={`fill-slate-800  transition duration-150 delay-75 ease-in ${isClicked ? "rotate-180" : ""}`} />
        </div>
        {isClicked && (
          <div className="absolute top-10 left-0 right-0 z-10 ">
            <SelectCurrencyType selected={notTextAllowed ? to : currencyType } another={notTextAllowed ? currencyType : to } inputNum={inputNum} params={notTextAllowed ? "to" : "currencyType"} setIsClicked={setIsClicked}/>
          </div>
        )}
      </div>

      {/* Currency Rate */}
      {/* TODO: after enter currencytype and detect submit from input, calculate it */}
      <form onSubmit={onSubmit} className="w-full flex items-center space-x-2 justify-end">
        <div className="text-3xl font-[500] text-slate-800 mr-2">
          {CurrencyIcon({currencyType: notTextAllowed ? to : currencyType})}
        </div>
        {notTextAllowed ?
          <div className="rounded-lg">
            <p className="w-full h-full px-2 text-3xl font-[500] py-1.5 rounded-lg">{defaultValue}</p>
          </div>
          :
          <div className="border-2 border-solid border-slate-800 rounded-lg">
            <input type="number" name="num" defaultValue={defaultValue} step={0.01} className="w-[160px] h-full px-2 text-3xl font-[500] py-1.5 outline-none rounded-lg" />
          </div>
        }
      </form>
    </div>
  )
}