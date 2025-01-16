"use client";
import { cn } from '@/lib/utils';
import paths from '@/paths';
import { Session } from "next-auth";
import { useState } from "react";
import SavingsIcon from '@mui/icons-material/Savings';
import { GoGraph } from "react-icons/go";
import { FiDatabase } from "react-icons/fi";
import Icons from '@/components/header/icons';
import { IoIosClose } from "react-icons/io";
import { redirect } from 'next/navigation';
import { useFormStatus } from 'react-dom';

interface EditRecordNav {
    session: Session | null;
    page: string;
}

export default function EditRecordNav({ session, page }: EditRecordNav) {
    const [mouse, setMouse] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [route, setRoute] = useState(paths.recordsListsPageUrl());
    const {pending} = useFormStatus();

    const handleCancelForm = async () => {
        // Cancel Form
        // TODO: If users post a new or update the image, remove it from AWS S3 or keep it for 10 mins then automatically deleted in AWS S3
        redirect(route);
    };

    const handleDeleteForm = async() => {
        // TODO: delete record 
    }

    return (
        <div className='max-w-[1560px] relative z-[80] mx-auto h-full'>

            <div className="relative z-20">
                <div className='flex items-center justify-between'>
                    {/* Icon, name, pages title */}
                    <div className='flex items-center w-full'>
                        {/* Icon, name */}
                        <div className='flex items-center text-2xl'>
                            <SavingsIcon sx={{ fontSize: 32, color: "black", marginRight: "1rem" }} />
                            <h1 className={cn("italic text-2xl font-[700] text-slate-800 mr-8")}>
                                HAB
                            </h1>
                        </div>

                        {/* Sub pages titles */}
                        <ul className='w-full flex items-center justify-start'>
                            <li className='mr-5' onMouseEnter={() => setMouse(false)}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCancel(true);
                                        setRoute(paths.home())
                                    }}
                                    className={`${page === "dashboard" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                                >
                                    Dashboard
                                </button>
                            </li>
                            {/* See the dialog under this with full width and height might be determined in advance to look nice. */}
                            <li className='mr-5 relative z-10' onMouseEnter={() => setMouse(true)}>
                                <button
                                    onClick={() => {
                                        setCancel(true);
                                        setRoute(paths.recordsPageUrl())
                                    }}
                                    className={`${page === "records" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                                >
                                    Records
                                </button>
                            </li>
                            <li className='mr-5' onMouseEnter={() => setMouse(false)}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCancel(true);
                                        setRoute(paths.newRecordPageUrl())
                                    }}
                                    className={`${page === "new-record" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                                >
                                    Register
                                </button>
                            </li>
                            <li className='mr-5' onMouseEnter={() => setMouse(false)}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCancel(true);
                                        setRoute(paths.communityPageUrl())
                                    }}
                                    className={`${page === "xrate" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                                >
                                    X-Rates
                                </button>
                            </li>
                            <li className='mr-5' onMouseEnter={() => setMouse(false)}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCancel(true);
                                        setRoute(paths.communityPageUrl())
                                    }}
                                    className={`${page === "community" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                                >
                                    Community
                                </button>
                            </li>
                            <li className='' onMouseEnter={() => setMouse(false)}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCancel(true);
                                        setRoute(paths.settingPageUrl())
                                    }}
                                    className={`${page === "setting" ? "bg-white/50" : "bg-transparent hover:underline hover:underline-offset-4"} text-xl text-slate-800 font-[700] px-2 py-1 rounded-md cursor-pointer`}
                                >
                                    Setting
                                </button>
                            </li>
                        </ul>
                    </div>
                    {/* notification, color change, setting, userIcon */}
                    <Icons id={session?.user.id} name={session?.user.name} image={session?.user.image} />
                </div>
                {mouse &&
                    <div className="flex items-center justify-center w-full " onMouseEnter={() => setMouse(true)} onMouseLeave={() => setMouse(false)}>
                        <div className="bg-white shadow-xl rounded-md border-2 border-slate-400/50 border-solid px-2 py-1 w-full mx-10">
                            <div className="flex gap-10">
                                <div className="flex flex-col items-start">
                                    <h2 className="text-lg font-[700] mb-3">
                                        <GoGraph size={24} className="inline-block mr-2" />
                                        Gragh/Chart
                                    </h2>
                                    <div className="ml-4 flex flex-col items-start">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCancel(true);
                                                setRoute(paths.recordsIncomeUrl())
                                            }}
                                            className="hover:underline hover:underline-offset-4 text-base font-[500] mb-2"
                                        >
                                            Income
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCancel(true);
                                                setRoute(paths.recordsExpensesUrl())
                                            }}
                                            className="hover:underline hover:underline-offset-4 text-base font-[500] mb-2"
                                        >
                                            Expenses
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCancel(true);
                                                setRoute(paths.recordsSavingsUrl())
                                            }}
                                            className="hover:underline hover:underline-offset-4 text-base font-[500] mb-2"
                                        >
                                            Savings
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start justify-start h-full">
                                    <h2 className="text-lg font-[700] mb-3">
                                        <FiDatabase size={24} className="inline-block mr-2" />
                                        Data
                                    </h2>
                                    <div className="ml-4 flex flex-col items-start">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCancel(true);
                                                setRoute(paths.recordsListsPageUrl())
                                            }}
                                            className="hover:underline hover:underline-offset-4 text-base font-[500] mb-2"
                                        >
                                            Records
                                        </button>
                                        {/* <button
                                        type="button"
                                        href="/"
                                        className="hover:underline hover:underline-offset-4 text-base font-[500] mb-2"
                                    >
                                        Database
                                    </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {/* Mouse */}
            <button
                type="button"
                className="absolute z-10 bottom-3 right-32 left-auto px-5 py-1.5 rounded-md bg-gray-500 hover:bg-gray-500/50 text-white text-base"
                onClick={() => setCancel(true)}
            >
                Cancel
            </button>
            <button
                type="button"
                className="absolute z-10 bottom-3 right-3 left-auto px-5 py-1.5 rounded-md bg-red-500 hover:bg-red-500/50 text-white text-base"
                onClick={() => setDeleting(true)}
            >
                Delete
            </button>
            {cancel &&
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
                                    onClick={() => setCancel(false)}
                                    className={`p-0.5 rounded-lg ${pending ? "cursor-not-allowed" : "cursor-pointer hover:bg-emerald-500/50 group"}`}
                                    disabled={pending}
                                >
                                    <IoIosClose size={32} className="group-hover:fill-emerald-800 fill-slate-800" />
                                </button>
                            </div>
                            {/* body */}
                            <div className="flex flex-col items-start justify-center my-5">
                                <p className="text-base text-slate-700 tracking-wide">
                                    You have not yet saved your update.
                                    Do you want to cancel this now?
                                </p>
                            </div>
                            {/* Body */}
                            <form className="w-full flex items-center justify-between">
                                <button
                                    type="button"
                                    className={`w-full mr-2 bg-gray-600 hover:bg-gray-600/50 text-white font-[600] rounded-md px-2 py-1 ${pending ? "cursor-not-allowed bg-gray-600/50" : "cursor-pointer bg-gray-600 hover:bg-gray-600/50"}`}
                                    onClick={() => setCancel(false)}
                                    disabled={pending}
                                >
                                    No, keep working
                                </button>
                                <button
                                    type="button"
                                    className={`w-full text-white font-[600] rounded-md px-2 py-1 ${pending ? "cursor-wait bg-red-600/50" : "cursor-pointer bg-red-600 hover:bg-red-600/50"}`}
                                    onClick={handleCancelForm}
                                    disabled={pending}
                                >
                                    Yes, not saving
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {deleting &&
                <div className="relative z-[999]">
                    <div className="inset-0 fixed bg-black/50 "></div>
                    <div className="inset-0 fixed z-10 flex items-center justify-center">
                        <div className="sm:w-[480px] w-full bg-white rounded-lg px-4 py-3 shadow-xl flex flex-col items-start">
                            <div className="flex items-center justify-between w-full">
                                <h2 className="text-xl font-[700] text-slate-800">
                                    Delete confirmation
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setDeleting(false)}
                                    className={`p-0.5 rounded-lg ${pending ? "cursor-not-allowed" : "cursor-pointer hover:bg-emerald-500/50 group"}`}
                                    disabled={pending}
                                >
                                    <IoIosClose size={32} className="group-hover:fill-emerald-800 fill-slate-800" />
                                </button>
                            </div>
                            {/* body */}
                            <div className="flex flex-col items-start justify-center my-5">
                                <p className="text-base text-slate-700 tracking-wide">
                                    You are trying to delete your record.
                                    Do you want to delete this now?
                                </p>
                            </div>
                            {/* Body */}
                            <form className="w-full flex items-center justify-between">
                                <button
                                    type="button"
                                    className={`w-full mr-2 bg-gray-600 hover:bg-gray-600/50 text-white font-[600] rounded-md px-2 py-1 ${pending ? "cursor-not-allowed bg-gray-600/50" : "cursor-pointer bg-gray-600 hover:bg-gray-600/50"}`}
                                    onClick={() => setDeleting(false)}
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
                                    Yes, delete this
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}