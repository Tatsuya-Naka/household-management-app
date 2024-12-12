"use client";

import { useState } from "react";
import { IoIosClose } from "react-icons/io";

export default function CancelButton() {
    const [isClicked, setIsClicked] = useState(false);

    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <>
            <button
                type="button"
                className="absolute z-10 bottom-3 right-3 left-auto px-5 py-1.5 rounded-md bg-black hover:bg-black/50 text-white text-base"
                onClick={() => setIsClicked(true)}
            >
                Cancel
            </button>

            {isClicked &&
                <div className="relative z-[999]">
                    <div className="inset-0 fixed bg-black/50 "></div>
                    <div className="inset-0 fixed z-10 flex items-center justify-center">
                        <div className="sm:w-[480px] w-full bg-white rounded-lg px-4 py-3 shadow-xl flex flex-col items-start">
                            <div className="flex items-center justify-between w-full">
                                <h2 className="text-xl font-[700] text-slate-800">
                                    Cancel confirmation
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setIsClicked(false)}
                                    className="p-0.5 rounded-lg hover:bg-emerald-500/50 group cursor-pointer"
                                >
                                    <IoIosClose size={32} className="group-hover:fill-emerald-800 fill-slate-800"/>
                                </button>
                            </div>
                            {/* body */}
                            <div className="flex flex-col items-start justify-center my-5">
                                <p className="text-base text-slate-700 tracking-wide">
                                    You are trying to leave away from your work.
                                    Do you want to remove all your fillings noe??
                                </p>
                            </div>
                            {/* Body */}
                            <div className="w-full flex items-center justify-between">
                                <button
                                    type="button"
                                    className="w-full mr-2 bg-gray-600 hover:bg-gray-600/50 text-white font-[600] rounded-md px-2 py-1 cursor-pointer"
                                    onClick={() => setIsClicked(false)}
                                >
                                    No, keep working
                                </button>
                                <button
                                    type="button"
                                    className="w-full bg-red-600 hover:bg-red-600/50 text-white font-[600] rounded-md px-2 py-1 cursor-pointer"
                                    onClick={handleCancel}
                                >
                                    Yes, remove all
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}