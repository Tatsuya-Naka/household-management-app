import { auth } from "@/auth";
import TradingContainer from "@/components/xrate/trading_container";
import { FcNeutralTrading } from "react-icons/fc";

interface XRatePageProps {
  searchParams: {
    currencyType: string;
    to: string;
  };
}

export default async function XRatePage({ searchParams }: XRatePageProps) {
  const session = await auth();
  const { currencyType, to } = await searchParams;
  
  return (
    <div className="relative z-[999]">
      <div className="w-full -mt-16 pl-32 flex items-center h-full space-x-20">
        {/* Icon */}
        <div className="w-[80px] h-[80px] bg-white rounded-lg shadow-2xl p-3 z-10 flex-shrink-0">
          <FcNeutralTrading className="w-full h-full z-10" />
        </div>
        <div className="flex items-center gap-10 z-10 w-full mx-auto justify-center">
          {/* Container */}
          <TradingContainer currencyType={currencyType || session?.user.currency || "USD"} to={to || "JPY"} />
        </div>
      </div>
      <div>
        Xrate
      </div>
    </div >
  )
}