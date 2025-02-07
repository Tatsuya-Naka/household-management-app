"use client";

import Link from 'next/link';
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { CgDarkMode } from "react-icons/cg";
import Image from 'next/image';
import { RiProfileLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import paths from '@/paths';

export interface IconsProps {
  id?: string;
  name?: string | null | undefined;
  image?: string | null | undefined;
  page?: string;
};

export default function Icons({ image }: IconsProps) {
  const [brightness, setBrightness] = useState(true);
  const [isProfile, setIsProfile] = useState(false);

  return (
    <div className='flex items-center justify-end'>
      <Link href="/"
        className='rounded-full fill-slate-800 hover:bg-white p-2 cursor-pointer transition delay-100'
      >
        <IoMdNotificationsOutline size={24} className='' />
      </Link>
      <Link href={paths.settingPageUrl()}
        className='rounded-full fill-slate-800 hover:bg-white p-2 cursor-pointer transition delay-100'
      >
        <CiSettings size={24} className='' />
      </Link>
      <button
        className='rounded-full fill-slate-800 hover:bg-white p-2 cursor-pointer transition-all duration-150 ease-in-out'
        type="button"
        onClick={() => setBrightness((prev) => !prev)}
      >
        {brightness ? <CgDarkMode size={24} className='transition duration-150 rotate-180' /> : <CgDarkMode size={24} className='transition duration-150' />}
      </button>
      <div className='relative z-10 w-full h-full'>
        {image ?
          <button
            type="button"
            className="rounded-full flex items-center justify-center ml-2 shrink-0 w-[24px] h-[24px]"
            onClick={() => setIsProfile((prev) => !prev)}
          >
            <Image
              src={image}
              alt="Avatar"
              width={24}
              height={24}
              className='rounded-full w-full h-full shrink-0'
            />
          </button>
          :
          <button
            type="button"
            className={`rounded-full fill-slate-800 hover:bg-white ${isProfile && "bg-white"} p-2 cursor-pointer transition delay-100`}
            onClick={() => setIsProfile((prev) => !prev)}
          >
            <FaRegUserCircle size={24} className='' />
          </button>
        }
        {isProfile &&
          <div className='border-2 border-gray-500/50 border-solid absolute z-[20] top-[50px] right-0 bg-white rounded-md shadow-md px-2 py-3 text-base sm:w-[220px]'>
            <div className='flex flex-col items-start justify-center'>
              <Link
                href="/"
                className="w-full border-b-2 border-gray-300/50 border-solid inline-block px-2 py-1.5 rounded-t-md text-slate-800 font-[500] bg-white hover:bg-emerald-500/50 hover:text-emerald-600 hover:underline underline-offset-0"
              >
                <RiProfileLine className='inline-block mr-2' size={24} />
                Profile
              </Link>
              <Link
                href="/"
                className="w-full border-b-2 border-gray-300/50 border-solid inline-block px-2 py-1.5 rounded-md text-slate-800 font-[500] bg-white hover:bg-emerald-500/50 hover:text-emerald-600 hover:underline underline-offset-0"
              >
                <FaUserFriends className='inline-block mr-2' size={24} />
                Friends
              </Link>
              <Link
                href={paths.settingPageUrl()}
                className="w-full border-b-2 border-gray-300/50 border-solid inline-block px-2 py-1.5 rounded-md text-slate-800 font-[500] bg-white hover:bg-emerald-500/50 hover:text-emerald-600 hover:underline underline-offset-0"
              >
                <CiSettings className='inline-block mr-2' size={24} />
                Settings
              </Link>
              <Link
                href={paths.logOutPageUrl()}
                className="w-full inline-block px-2 py-1.5 rounded-b-md text-slate-800 font-[500] bg-white hover:bg-emerald-500/50 hover:text-emerald-600 hover:underline underline-offset-0"
              >
                <IoIosLogOut className='inline-block mr-2' size={24} />
                LogOut
              </Link>
            </div>
          </div>
        }
      </div>
    </div>
  )
}