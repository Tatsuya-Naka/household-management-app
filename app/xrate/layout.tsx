import Header from "@/components/header/header";
import HeaderLoading from "@/components/header/header_loading";
import { Suspense } from "react";

export default function XRateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Suspense fallback={<HeaderLoading page="xrate" />}>
        <Header page="xrate" />
        <main className='max-w-[1560px]  pr-[81px] min-h-[calc(100%-180px)]'>
          {children}
        </main>
      </Suspense>
    </div>
  )
}