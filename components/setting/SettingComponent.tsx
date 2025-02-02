'use client';

import { getIcons } from "@/type/currency";
import type { Session } from "next-auth";
import Image from "next/image";
import { IoMdArrowDropup } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { LuSave } from "react-icons/lu";

interface SettingComponentProps {
  session: Session | null;
}

export default function SettingComponent({ session }: SettingComponentProps) {
  // TODO: action to save the settinf
  
  return (
    <div className="w-full h-full shadow-md rounded-lg">
      <form className="px-5 py-3 relative">
        <div className="grid grid-cols-2 gap-5 my-10 mx-5">
          {/* Name */}
          <div className="col-span-1">
            <label className="flex flex-col items-start gap-1">
              <span className="text-sm font-medium">Name</span>
              <input type="text" defaultValue={session?.user.name || ""} className="w-full border-2 border-slate-400/50 rounded-md p-2 outline-none" />
            </label>
          </div>
          {/* Currency Type */}
          <div className="col-span-1 w-full flex items-center justify-center">
            <div className="w-full mr-5">
              <label className="flex flex-col items-start gap-1">
                <span className="text-sm font-medium">Currency Type</span>
                <div className="w-full flex items-center justify-center gap-5">
                  <div className="w-full border-2 border-slate-400/50 rounded-md p-2 outline-none flex items-center gap-3" >
                    <span>{getIcons(session?.user.currency || "")}</span>
                    {session?.user.currency}
                  </div>
                  {/* Select Currency Button */}
                  <div className="w-[80px] shadow-md rounded-md p-2">
                    <button className="w-full h-full flex items-center justify-center">
                      <IoMdArrowDropup size={32} />
                    </button>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Icon */}
          <div className="col-span-1">
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm font-medium">Icon</span>
              <div className="w-full flex items-center gap-5">
                {/* Icon image */}
                <div className="w-[40px] h-[40px] rounded-md ">
                  {session && session.user.image ?
                    <Image src={session.user.image} alt="icon" width={40} height={40} className="rounded-md" />
                  : 
                    <FaRegUserCircle size={40} className="rounded-md" />
                  }
                </div>

                {/* Income select button */}
                <label>
                  <span className="p-2 rounded-lg bg-transparent border-2 border-slate-400/50 hover:bg-slate-400/50 cursor-pointer transition duration-150 ease-in-out delay-75">Select Your Icon</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="col-span-1 w-full flex items-center justify-center">
            <div className="w-full mr-5">
              <label className="flex flex-col items-start gap-1">
                <span className="text-sm font-medium">Location</span>
                <div className="w-full flex items-center justify-center gap-5">
                  <div className="w-full border-2 border-slate-400/50 rounded-md p-2 outline-none flex items-center gap-3" >
                    <span>{getIcons(session?.user.location || "")}</span>
                    {session?.user.location}
                  </div>
                  {/* Select Location Button */}
                  <div className="w-[80px] shadow-md rounded-md p-2">
                    <button className="w-full h-full flex items-center justify-center">
                      <IoMdArrowDropup size={32} />
                    </button>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Saving button */}
        <div className="absolute top-5 right-5 left-auto bottom-0">
          <button className="p-2 rounded-full bg-transparent hover:bg-emerald-200/50 cursor-pointer transition duration-150 ease-in-out delay-75"
            type="submit"
          >
            <LuSave size={32} className="text-emerald-400" />
          </button>
        </div>
      </form>
    </div>
  )
}