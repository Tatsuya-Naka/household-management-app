import { generateDateFormat } from "@/data/date";
import { RiCloseLine } from "react-icons/ri";
import { CiImageOff } from "react-icons/ci";
import { RiArrowGoBackLine } from "react-icons/ri";
import Link from "next/link";

export default async function NewRecordConfirmPage() {
    return (
        <div className="max-w-full bg-orange-200/50 min-h-screen">
            <header className="max-w-[1560px] h-[56px] relative z-10 px-5 py-3 flex items-center justify-between border-b-2 border-white border-solid mx-auto">
                <h1 className="text-slate-800 font-[700] text-2xl">
                    Confirmation - Register Expenses&apos; Records
                </h1>
                <button
                    type="button"
                    className="p-1 rounded-md hover:bg-white cursor-pointer"
                >
                    <RiCloseLine size={32} />
                </button>
            </header>

            <main className='max-w-[1560px] h-[calc(100vh-56px)] mx-auto'>
                <div className="grid grid-cols-[2fr_1fr] gap-2 px-5 py-8 h-full">
                    {/* Dates, Type, Genre, Currency, Country items*/}
                    <div className="grid grid-rows-[1fr_3fr] h-full gap-3">
                        <div className="border-2 border-black border-solid rounded-md grid grid-cols-2 bg-white/50 h-full">
                            <div className="grid grid-cols-[110px_auto] border-b-2 border-black border-solid">
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white rounded-tl-">
                                    Dates
                                </div>

                                <div className="px-2 text-xl font-[700] border-r-2 border-black py-1 border-solid">
                                    {generateDateFormat(new Date())}
                                </div>
                            </div>

                            <div className="grid grid-cols-[110px_auto] border-b-2 border-black border-solid">
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white rounded-tl-">
                                    Type
                                </div>

                                <div className="px-2 text-xl font-[700] py-1">
                                    Expenses
                                </div>
                            </div>

                            <div className="grid grid-cols-[110px_auto] border-b-2 border-black border-solid">
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white rounded-tl-">
                                    Currency
                                </div>

                                <div className="px-2 text-xl font-[700] border-r-2 border-black py-1 border-solid">

                                </div>
                            </div>

                            <div className="grid grid-cols-[110px_auto] border-b-2 border-black border-solid">
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white rounded-tl-">
                                    Genre
                                </div>

                                <div className="px-2 text-xl font-[700] py-1">

                                </div>
                            </div>

                            <div className="grid grid-cols-[110px_auto] ">
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white rounded-tl-">
                                    Country
                                </div>

                                <div className="px-2 text-xl font-[700] py-1">

                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="border-2 border-black border-solid rounded-md bg-white/50">
                            <div className="grid grid-cols-[2fr_2fr_2fr_1fr_1fr] bg-black text-xl text-white font-[500] px-2 py-1">
                                <span>Item</span>
                                <span>Category</span>
                                <span>Sub-category</span>
                                <span>Amount</span>
                                <span>Cost</span>
                            </div>
                            <div className="overflow-y-scroll no-scrollbar h-[450px]">
                                <div className="text-xl grid grid-cols-[2fr_2fr_2fr_1fr_1fr] bg-transparent text-slate-800 font-[600] px-2 py-1">
                                    <span>Orange</span>
                                    <span>Food</span>
                                    <span>Food</span>
                                    <span>0</span>
                                    <span>$ 0.4</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image, Comment, check, button */}
                    <div className="grid grid-rows-[20px_320px_180px_80px_auto] gap-3 h-full">
                        <div className="flex items-center justify-end">
                            <Link
                                href="/"
                                className="border-b-2 border-slate-800 border-solid hover:opacity-60 cursor-pointer flex items-center gap-2"
                            >
                                <RiArrowGoBackLine size={24} />
                                <span>Back to the form page</span>
                            </Link>
                        </div>
                        <div className="w-full h-full bg-gray-500 flex items-center justify-center rounded-md gap-2">
                            <CiImageOff size={48} className="fill-white" />
                            <span className="font-[700] text-white text-xl">No Content</span>
                        </div>

                        <div className="w-full h-[180px] overflow-y-scrollbar no-scrollbar">
                            <div className="bg-white/50 rounded-md p-2 h-full">

                            </div>
                        </div>

                        <div className="w-full flex flex-col justify-center gap-2 h-full">
                            <span className="text-xl font-[600] text-black">Check (Optional)</span>
                            <div className="w-full flex items-center justify-between text-lg font-[500]">
                                <label className="w-full">
                                    
                                </label>

                                <label className="w-full">
                                    Regular Cost
                                </label>
                            </div>
                        </div>

                        <div className="relative z-0">
                            <div className="absolute bottom-0 right-0 left-0 z-0 flex justify-between gap-2">
                                <button
                                    type="submit"
                                    className="w-full px-2 py-1 bg-red-500 hover:bg-red-500/50 text-white rounded-md font-[600] text-xl"
                                >
                                    Submit
                                </button>
                                <button
                                    type="submit"
                                    className="w-full px-2 py-1 bg-gray-500 hover:bg-gray-500/50 text-white rounded-md font-[600] text-xl"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}