'use client';

import { deleteAccount } from "@/server/delete_account";
import Image from "next/image";
import { useState } from "react";

export default function AccountCoponent() {
  // TODO: click button then show pop up screen to confirm the action
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>();
  const handleDeleteButton = () => { 
    setIsClicked((prev) => !prev) 
    setErrors(undefined);
  }
  const handleDeleteAccount = async () => {
    setErrors(undefined);
    const response = await deleteAccount();
    setErrors(response.errors._state);
  }

  const deleteConfirmComponent = () => {
    return (
      <div className="relative z-[999]">
        <div className="inset-0 fixed z-10 bg-white/50" />
        <div className="inset-0 fixed z-50 flex items-center justify-center w-full h-full">
          <div className="shadow-xl border-2 border-solid border-slate-400/30 rounded-lg bg-white">
            <div className="px-5 py-3 flex flex-col items-start">
              {/* Title */}
              <div className="mb-5 flex items-center justify-between w-full">
                <h3 className="font-bold text-2xl text-slate-800">Delete account confirmation</h3>
                <button type="button" onClick={handleDeleteButton}
                  className="rounded-md bg-transparent hover:bg-slate-400/40 transtion duration-75 delay-75 ease-in-out p-2"
                >
                  <Image
                    src="/close_button.svg"
                    alt="close button"
                    width={24}
                    height={24}
                    className="fill-slate-800 "
                  />
                </button>
              </div>
              {/* description */}
              <div className="mb-3">
                <p className="text-slate-800 font-[500] text-lg">
                  You are trying to delete your account now.
                </p>
                <p className="text-slate-800 font-[500] text-lg">
                  Do you want to delete your account?
                </p>
                <p className="text-red-500 font-[500] text-basis">
                  (※ Once you delete your account, you cannot see your all records and information any more)
                </p>
              </div>
              {/* Botton */}
              <div className="w-full text-center">
                {/* Delete button */}
                {errors && <div className="mb-3 w-full bg-red-200 text-red-500 rounded-lg px-3 py-3 font-bold">{errors}</div>}
                <button
                  type="button"
                  className="w-full bg-red-500 hover:bg-red-500/40 text-xl text-white rounded-md px-3 py-2 outline-none"
                  onClick={handleDeleteAccount}
                >Delete account</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }

  return (
    <div className="w-full h-full shadow-md rounded-lg">
      <div className="px-5 py-5 relative flex flex-col gap-5">
        <div className="w-full h-full flex justify-start">
          <h2 className="text-2xl font-bold">Account Setting</h2>
        </div>
        <div className="flex flex-col gap-3 h-full">
          <div className="w-full rounded-lg bg-emerald-500/20">
            <p className="px-4 py-2 text-lg font-[500] text-emerald-500">
              Delete your account by clicking the button below.
            </p>
          </div>
          <div className="w-full text-center">
            <button type="button" className="rounded-lg hover:bg-sky-500 transition duration-150 delay-75 bg-sky-500/50 px-4 py-2 text-lg font-[700] text-white"
              onClick={handleDeleteButton}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {isClicked && deleteConfirmComponent()}
    </div>
  )
}
