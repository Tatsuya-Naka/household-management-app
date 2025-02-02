"use client";

import { useEffect, useState } from "react";
import XRateCard from "./xrate_card";
import ArrowContainer from "./arrow_container";
import { getXRate } from "@/app/server/xrate/xrate";
import xrateCalc from "./xrate_calc";

interface TradingContainerProps {
  currencyType: string;
  to: string;
  inputNum: number;
}

export default function TradingContainer({ currencyType, to, inputNum }: TradingContainerProps) {
  // TODO: get trading data from database
  const [today, setToday] = useState<{from: number, to: number}>({from: 1, to: 1});
  const [value, setValue] = useState<{from: number, to: number}>({from: 1, to: 1});
  const [num, setNum] = useState<number>(inputNum);

  useEffect(() => {
    (async () => {
      try {
        const data = await getXRate(currencyType, to);
        setToday({from: data[data.length - 1].from, to: data[data.length - 1].to});
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.error(err);
        }
      }
    })()
  }, [currencyType, to]);

  const handleSubmitFrom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = Number(formData.get("num"));
    setNum(input);
    setValue((prev) => ({...prev, from: input, to: Math.round((xrateCalc(today.from, today.to) * input) * 100) / 100}))
  }

  useEffect(() => {
    if (today) {
      setValue({from: inputNum, to: Math.round((xrateCalc(today.from, today.to) * inputNum) * 100) / 100});
    }
  }, [today]);

  return (
    <div className="flex items-center space-x-8 mx-auto w-full justify-center">
      {/* trading1 */}
      <XRateCard currencyType={currencyType} to={to} inputNum={num} onSubmit={handleSubmitFrom} defaultValue={value?.from} />
      {/* Arrow */}
      <ArrowContainer />
      {/* trading2 */}
      <XRateCard currencyType={currencyType} to={to} inputNum={num} defaultValue={value?.to} notTextAllowed={true} />
    </div>
  )
}