"use client";

import paths from "@/paths";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoIosClose } from "react-icons/io";

export default function CancelButton() {
    const [isClicked, setIsClicked] = useState(false);
    const { setError, getValues } = useFormContext();
    const [pending, setPending] = useState(false);
    const values = getValues();

    const handleDeleteForm = async () => {
        if (values.object) {
            try {
                setPending(true);
                console.log("Deleting...");
                const response = await fetch(paths.newRecordCancelUrl(), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
                if (!response.ok) {
                    const result = await response.json();
                    setError("root", {type: "custome", "message": result.message});
                    setPending(false);
                }
                if (response.ok) {
                    window.location.reload();
                }

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError("root", {type: "custome", "message": err.message});
                } else {
                    setError("root", {type: "custome", "message": "Something Wrong"});
                }
            }
        } else {
            window.location.reload();
        }
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
                                    className={`p-0.5 rounded-lg ${pending ? "cursor-not-allowed" : "cursor-pointer hover:bg-emerald-500/50 group"}`}
                                    disabled={pending}
                                >
                                    <IoIosClose size={32} className="group-hover:fill-emerald-800 fill-slate-800" />
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
                            <form className="w-full flex items-center justify-between">
                                <button
                                    type="button"
                                    className={`w-full mr-2 bg-gray-600 hover:bg-gray-600/50 text-white font-[600] rounded-md px-2 py-1 ${pending ? "cursor-not-allowed bg-gray-600/50" : "cursor-pointer bg-gray-600 hover:bg-gray-600/50"}`}
                                    onClick={() => setIsClicked(false)}
                                    disabled={pending}
                                >
                                    No, keep working
                                </button>
                                <button
                                    type="button"
                                    className={`w-full text-white font-[600] rounded-md px-2 py-1 ${pending ? "cursor-wait bg-red-600/50" : "cursor-pointer bg-red-600 hover:bg-red-600/50"}`}
                                    onClick={handleDeleteForm}
                                    disabled={pending}
                                >
                                    Yes, remove all
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}