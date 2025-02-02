import Header from "@/components/header/header";
import HeaderLoading from "@/components/header/header_loading";
import { Suspense } from "react";

export default function SettingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Suspense fallback={<HeaderLoading page="setting" />}>
        <Header page="setting" />
        <main className='max-w-[1560px]  pr-[81px] min-h-[calc(100%-180px)]'>
          {children}
        </main>
      </Suspense>
    </div>
  )
}