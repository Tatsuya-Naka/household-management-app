'use client';

import { currencies, getIcons } from "@/type/currency";
import type { Session } from "next-auth";
import Image from "next/image";
import { IoMdArrowDropup } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { useActionState, useState } from "react";
import * as actions from "@/app/actions";
import ProfileSaveButton from "./ProfileSaveButton";
import { countries } from "@/type/country";

interface SettingComponentProps {
  session: Session | null;
}

export default function SettingComponent({ session }: SettingComponentProps) {
  // TODO: action to save the setting
  const [currency, setCurrency] = useState<{ type: string, isClicked: boolean }>({ type: session?.user.currency || "", isClicked: false })
  const [location, setLocation] = useState<{ name: string, isClicked: boolean }>({ name: session?.user.location || "", isClicked: false })
  const [icon, setIcon] = useState<string | null>(session?.user.image || null);
  const [formState, action] = useActionState(actions.updateProfile.bind(null, {type: currency.type, local: location.name}), { errors: {} })
  
  const handleCurrencyClick = () => {
    setCurrency({ ...currency, isClicked: !currency.isClicked })
  }

  const handleCurrencyTypeChange = (type: string) => {
    setCurrency({ type, isClicked: false });
  }

  const handleLocationClick = () => {
    setLocation({ ...location, isClicked: !location.isClicked })
  }

  const handleLocationNameChange = (name: string) => {
    setLocation({ name, isClicked: false });
  }

  const handleImageShow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const file = files[0];
      const preview = (): Promise<string> => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const img = document.createElement("img");
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const size = Math.min(img.width, img.height);
              canvas.width = size;
              canvas.height = size;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(
                  img,
                  (img.width - size) / 2,
                  (img.height - size) / 2,
                  size,
                  size,
                  0, 0,
                  size,
                  size
                );
                resolve(canvas.toDataURL());
              }
            };
            img.src = reader.result as string;
          }
          reader.readAsDataURL(file);
        })
      }
      preview().then((data) => {
        setIcon(data);
      });
    }
  }

  return (
    <div className="w-full h-full shadow-md rounded-lg">
      <form className="px-5 py-3 relative" action={action}>
        <div className="grid grid-cols-2 gap-5 my-10 mx-5">
          {/* Name */}
          <div className="col-span-1">
            <label className="flex flex-col items-start gap-1">
              <span className="text-sm font-medium">Name</span>
              <input type="text" name="name" defaultValue={session?.user.name || ""} className="w-full border-2 border-slate-400/50 rounded-md p-2 outline-none" />
            </label>
          </div>
          {/* Currency Type */}
          <div className="col-span-1 w-full flex items-center justify-center">
            <div className="w-full mr-5">
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-medium">Currency Type</span>
                <div className="w-full flex items-center justify-center gap-5">
                  <div className="w-full relative z-20">
                    {/* currency */}
                    <div className="w-full border-2 border-slate-400/50 rounded-md p-2 outline-none flex items-center gap-3" >
                      <span>{getIcons(currency.type)}</span>
                      {currency.type}
                    </div>

                    {/* drop down menu for currency */}
                    {currency.isClicked &&
                      <div className="absolute top-10 left-0 right-0 w-full rounded-md bg-white shadow-md border-2 border-slate-400/50 border-solid">
                        {currencies.map((type, index) => (
                          (type !== currency.type) && (
                            <div key={index} className={`w-full cursor-pointer hover:bg-emerald-400/50 transition duration-150 ease-in-out delay-75 border-b-2 border-slate-400/20 p-2 outline-none flex items-center gap-3`}
                              onClick={() => handleCurrencyTypeChange(type)}
                            >
                              <span>{getIcons(type)}</span>
                              {type}
                            </div>
                          )
                        ))}
                      </div>
                    }
                  </div>
                  {/* Select Currency Button */}
                  <div className="w-[80px] shadow-md rounded-md p-2">
                    <button className="w-full h-full flex items-center justify-center" type="button" onClick={handleCurrencyClick}>
                      <IoMdArrowDropup size={32} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Icon */}
          <div className="col-span-1">
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm font-medium">Icon</span>
              <div className="w-full flex items-center gap-5">
                {/* Icon image */}
                <div className="w-[40px] h-[40px] rounded-md ">
                  {icon ?
                    <Image src={icon} alt="icon" width={40} height={40} className="rounded-full" />
                    :
                    <FaRegUserCircle size={40} className="rounded-md" />
                  }
                </div>

                {/* Income select button */}
                <label>
                  <span className="p-2 rounded-lg bg-transparent border-2 border-slate-400/50 hover:bg-slate-400/50 cursor-pointer transition duration-150 ease-in-out delay-75">Select Your Icon</span>
                  <input type="file" name="icon" accept="image/*" className="hidden" onChange={handleImageShow}/>
                </label>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="col-span-1 w-full flex items-center justify-center">
            <div className="w-full mr-5">
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-medium">Location</span>
                <div className="w-full flex items-center justify-center gap-5">
                  <div className="w-full relative z-10">
                    <div className="w-full border-2 border-slate-400/50 rounded-md p-2 outline-none flex items-center gap-3" >
                      <span>{getIcons(location.name)}</span>
                      {location.name}
                    </div>

                    {/* drop down menu for location */}
                    {location.isClicked &&
                      <div className="absolute top-10 left-0 right-0 w-full rounded-md bg-white shadow-md border-2 border-slate-400/50 border-solid">
                        {countries.map((country, index) => (
                          (country !== location.name) && (
                            <div key={index} className="w-full cursor-pointer hover:bg-emerald-400/50 transition duration-150 ease-in-out delay-75 border-b-2 border-slate-400/20 p-2 outline-none flex items-center gap-3"
                              onClick={() => handleLocationNameChange(country)}
                            >
                              <span>{getIcons(country)}</span>
                              {country}
                            </div>
                          )
                        ))}
                      </div>
                    }
                  </div>
                  {/* Select Location Button */}
                  <div className="w-[80px] shadow-md rounded-md p-2">
                    <button className="w-full h-full flex items-center justify-center" type="button" onClick={handleLocationClick}>
                      <IoMdArrowDropup size={32} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saving button */}
        <div className="absolute top-5 right-5 left-auto bottom-0">
          <ProfileSaveButton />
        </div>
      </form>
    </div>
  )
}