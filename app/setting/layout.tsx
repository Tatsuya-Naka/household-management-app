import Header from "@/components/header/header";
import HeaderLoading from "@/components/header/header_loading";
import { Suspense } from "react";
import { MdOutlineSettingsAccessibility } from "react-icons/md";

export default function SettingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Suspense fallback={<HeaderLoading page="setting" />}>
        <Header page="setting" />
        <main className='max-w-[1560px]  pr-[81px] min-h-[calc(100%-180px)]'>
          <div className="relative">
            {/* Icon */}
            <div className="absolute -top-10 left-32 right-auto w-[80px] h-[80px] bg-white rounded-lg shadow-2xl p-3">
              <MdOutlineSettingsAccessibility className="w-full h-full" />
            </div>
            {/* Body */}
            <div className="w-full min-h-[calc(100vh-180px)] mx-auto pb-5">
              {children}
            </div>
          </div>
        </main>
      </Suspense>
    </div>
  )
}