import { auth } from "@/auth";
import TradingContainer from "@/components/xrate/trading_container";
import { FcNeutralTrading } from "react-icons/fc";
import { getXRate } from "../server/xrate/xrate";
import XRateGraph from "@/components/xrate/xrateGraph";

interface XRatePageProps {
  searchParams: Promise<{
    currencyType: string;
    to: string;
    inputNum: number;
  }>;
}

export default async function XRatePage({ searchParams }: XRatePageProps) {
  const session = await auth();
  const { currencyType, to, inputNum } = await searchParams;
  const data = await getXRate(currencyType || session?.user.currency || "USD", to || "JPY");

  return (
    <div className="relative z-[999]">
      <div className="w-full -mt-16 pl-32 flex items-center h-full space-x-20 mb-5">
        {/* Icon */}
        <div className="w-[80px] h-[80px] bg-white rounded-lg shadow-2xl p-3 z-10 flex-shrink-0">
          <FcNeutralTrading className="w-full h-full z-10" />
        </div>
        <div className="flex items-center gap-10 z-10 w-full mx-auto justify-center">
          {/* Container */}
          <TradingContainer currencyType={currencyType || session?.user.currency || "USD"} to={to || "JPY"} inputNum={Number(inputNum) || 1} />
        </div>
      </div>
      <div className="w-full px-4 py-2 min-h-[calc(100vh-340px)] flex items-center justify-center">
        {/* TODO: Graph */}
        <XRateGraph data={data} currency={to || "JPY"} />    
      </div>
    </div >
  )
}