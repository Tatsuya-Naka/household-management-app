"use client";

import { useEffect, useState } from "react";
import XRateCard from "./xrate_card";
import ArrowContainer from "./arrow_container";
import { getXRate } from "@/app/server/xrate/xrate";
import { XRateType } from "@/type/xrate";

interface TradingContainerProps {
  currencyType: string;
  to: string;
}

export default function TradingContainer({ currencyType, to }: TradingContainerProps) {
  // TODO: get trading data from database
  const [trading, setTreading] = useState<XRateType[]>();
  const [arrowChange, setArrowChange] = useState(false);
  const [today, setToday] = useState<{from: number, to: number}>();
  const [value, setValue] = useState<{from: number, to: number}>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getXRate(currencyType, to);
        setTreading(data);
        setToday({from: data[0].from, to: data[0].to});
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
    const value = formData.get("num");
  }

  const handleSubmitTo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("num");
  }

  const handleArrowClick = () => {
    setArrowChange((prev) => !prev);
  }

  useEffect(() => {
    if (today) {
      setValue({from: 1, to: (Math.round((Math.round(today.to * 100) / 100) / ((Math.round(today.from * 100) / 100)) * 100)) / 100});
    }
  }, [today]);

  return (
    <div className="flex items-center space-x-8 mx-auto w-full justify-center">
      {/* trading1 */}
      <XRateCard currencyType={currencyType} onSubmit={handleSubmitFrom} defaultValue={value?.from} />
      {/* Arrow */}
      <ArrowContainer onClick={handleArrowClick} arrow={arrowChange} />
      {/* trading2 */}
      <XRateCard currencyType={to} onSubmit={handleSubmitTo} defaultValue={value?.to} />
    </div>
  )
}