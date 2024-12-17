"use client";

import { generateDateFormat } from "@/data/date";
import { RiCloseLine } from "react-icons/ri";
import { CiImageOff } from "react-icons/ci";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import paths from "@/paths";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { NewRecordType } from "../layout";
import Link from "next/link";
import Image from "next/image";

export type Items = {
    item?: string;
    category?: string;
    subcategory?: string;
    amount: number;
    cost: number;
}

export default function NewRecordConfirmPage() {
    const router = useRouter();
    const { getValues, setValue, register, formState: { isSubmitting, errors }, handleSubmit, setError } = useFormContext<NewRecordType>();
    const values = getValues();

    const handleBackToPage = async () => {
        router.push(paths.newRecordPageUrl());
    };
    const [clickedCheck, setClickedCheck] = useState(values.regular_unit);
    const [clickedPayment, setClickedPayment] = useState(values.payment_method);

    const [sPosition, setSPosition] = useState<string>(values.status === "paid" ? "left-[calc(90%-30px)]" : values.status === "pending" ? "left-[calc(10%-30px)]" : "left-[calc(50%-30px)]");

    const [pending, setPending] = useState(false);
    const [paid, setPaid] = useState(false);

    const [isLeaving, setIsLeaving] = useState(false);
    const [isSaved, setIsSaved] = useState(true);
    const [errorMessagePopUp, setErrorMessagePopUp] = useState(errors.root ? true : false);

    // Submit the new record to db
    const onSubmit = handleSubmit(async (data) => {
        if (values.isConfirmed) {
            try {
                const response = await fetch("./api/new-record", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    const result = await response.json();
                    setError("root", { type: "custom", message: result.message });
                    setErrorMessagePopUp(true)
                }
                
                if (response.ok) router.push(paths.home());

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError("root", { type: "custom", message: err.message });
                    setErrorMessagePopUp(true);
                } else {
                    setError("root", { type: "custome", message: "Something wrong" })
                    setErrorMessagePopUp(true);
                }
            }
        }
    })

    return (
        <div className="max-w-full bg-orange-200/50 min-h-screen">
            <header className="max-w-[1560px] h-[56px] relative z-10 px-5 py-3 flex items-center justify-between border-b-2 border-white border-solid mx-auto">
                <h1 className="text-slate-800 font-[700] text-2xl">
                    Confirmation - Register {getValues("type") === "income" ? "Incomes" : "Expenses"}&apos; Records
                </h1>
                <button
                    type="button"
                    className="p-1 rounded-md hover:bg-white cursor-pointer"
                    onClick={() => setIsLeaving(true)}
                >
                    <RiCloseLine size={32} />
                </button>
            </header>

            <main className='max-w-[1560px] h-[calc(100vh-56px)] mx-auto relative' onSubmit={onSubmit}>
                {(values.type === "expenses" && errors.root?.message && errorMessagePopUp) &&
                    <div className="rounded-xl bg-red-100 px-3 py-3 text-lg text-red-500 absolute top-[100px] left-auto right-10 w-[400px] z-[999]">
                        <div className="flex flex-col items-start justify-center gap-1">
                            <div className="flex items-center justify-between w-full">
                                <h2>Error</h2>
                                <button
                                    type="button"
                                    className="p-1 rounded-md hover:bg-white cursor-pointer"
                                    onClick={() => setErrorMessagePopUp(false)}
                                >
                                    <RiCloseLine size={18} />
                                </button>
                            </div>
                            <div>
                                {errors.root.message}
                            </div>
                        </div>
                    </div>
                }
                <form className="grid grid-cols-[2fr_1fr] gap-2 px-5 py-8 h-full">
                    {/* Dates, Type, Genre, Currency, Country items*/}
                    <div className="grid grid-rows-[1fr_3fr] h-full gap-3">
                        <div className="border-2 border-black border-solid rounded-md grid grid-cols-2 bg-white/50 h-full">
                            <div className="grid grid-cols-[110px_auto] border-b-2 border-black border-solid">
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white">
                                    Dates
                                </div>

                                <div className="px-2 text-xl font-[700] border-r-2 border-black py-1 border-solid">
                                    {generateDateFormat(values.date)}
                                </div>
                            </div>

                            <div className="grid grid-cols-[110px_auto] border-b-2 border-black border-solid">
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white">
                                    Type
                                </div>

                                <div className="px-2 text-xl font-[700] py-1 capitalize">
                                    {values.type}
                                </div>
                            </div>

                            <div className="grid grid-cols-[110px_auto] border-b-2 border-black border-solid">
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white">
                                    Currency
                                </div>

                                <div className="px-2 text-xl font-[700] border-r-2 border-black py-1 border-solid">
                                    {values.currency}
                                </div>
                            </div>

                            <div className="grid grid-cols-[110px_auto] border-b-2 border-black border-solid">
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white">
                                    {values.type === "income" ? "Resource" : "Genre"}
                                </div>

                                <div className="px-2 text-xl font-[700] py-1">
                                    {values.type === "income" ? values.resource : values.genre}
                                </div>
                            </div>

                            <div className={`grid grid-cols-[110px_auto] ${values.type === "income" && "border-b-2 border-black border-solid"}`}>
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white">
                                    Country
                                </div>

                                <div className="px-2 text-xl font-[700] border-r-2 border-black py-1 border-solid">
                                    {values.country}
                                </div>
                            </div>

                            <div className={`grid grid-cols-[110px_auto] ${values.type === "income" && "border-b-2 border-black border-solid"}`}>
                                <div className="border-r-2 border-black py-1 border-solid px-2 text-xl font-[500] bg-black/80 text-white">
                                    {values.type === "income" ? "Amount" : "Total Cost"}
                                </div>

                                <div className="px-2 text-xl font-[700] py-1">
                                    {values.currency === "USD" || values.currency === "AUD" ? "$" : values.currency === "JPY" ? "¥" : "£"} {values.type === "income" ? values.income_amount : values.total}
                                </div>
                            </div>

                            {values.type === "income" &&
                                <div className="grid grid-cols-[110px_auto]">
                                    <div className=" py-1 px-2 text-xl font-[500] bg-black/80 text-white">
                                        Category
                                    </div>

                                    <div className="px-2 text-xl font-[700] py-1">
                                        {values.income_category}
                                    </div>
                                </div>
                            }
                        </div>

                        {/* Items */}
                        {values.type === "expenses" &&
                            <div className="border-2 border-black border-solid rounded-md bg-white/50">
                                <div className="grid grid-cols-[2fr_2fr_2fr_1fr_1fr] bg-black text-xl text-white font-[500] px-2 py-1">
                                    <span>Item</span>
                                    <span>Category</span>
                                    <span>Sub-category</span>
                                    <span>Amount</span>
                                    <span>Cost</span>
                                </div>
                                <div className="overflow-y-scroll no-scrollbar h-[450px]">
                                    {values.items && values.items.map((value: Items, index: number) => {
                                        return (
                                            <div key={index} className="text-xl grid grid-cols-[2fr_2fr_2fr_1fr_1fr] bg-transparent text-slate-800 font-[600] px-2 py-1">
                                                <span>{value.item}</span>
                                                <span>{value.category}</span>
                                                <span>{value.subcategory}</span>
                                                <span>{value.amount}</span>
                                                <span>{values.currency === "USD" || values.currency === "AUD" ? "$" : values.currency === "JPY" ? "¥" : "£"} {value.cost}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }

                        {values.type === "income" &&
                            <div className="grid grid-cols-2 gap">
                                <div className="flex flex-col items-start ">
                                    <span className="text-xl font-[600] text-slate-800 mb-2">Status</span>
                                    <div className="w-2/3 bg-white/50 rounded-3xl h-[50px] text-xl flex items-center">
                                        <div className="relative h-full w-full bg-white/50 rounded-3xl flex items-center justify-between px-2 ">
                                            <label className={`text-lg rounded-l-xl ${(pending || values.status === "pending") ? "bg-blue-500/50" : "bg-green-500/50"} text-slate-800/50 w-full px-2 cursor-pointer`}
                                                onClick={() => {
                                                    setPaid(true);
                                                    setPending(false);
                                                    setSPosition("left-[calc(90%-30px)]");
                                                    setValue("status", "paid");
                                                }}
                                            >
                                                <span className={`${(pending || values.status === "pending") ? "opacity-0" : "opacity-100"} ${(paid || values.status === "paid") && "text-slate-800"}`}>Paid</span>
                                                <input
                                                    type="checkbox"
                                                    hidden
                                                    className="w-full"
                                                    checked={paid}
                                                    disabled={isSubmitting}
                                                />
                                            </label>
                                            <div
                                                className={`absolute ${sPosition} z-10 top-0 h-[50px] w-[60px] bg-white rounded-3xl cursor-pointer`}
                                                onClick={() => {
                                                    setPaid(false);
                                                    setPending(false);
                                                    setSPosition("left-[calc(50%-30px)]");
                                                    setValue("status", "");
                                                }}
                                            />
                                            <label className={`text-lg rounded-r-xl ${(paid || values.status === "paid") ? "bg-green-500/50" : "bg-blue-500/50"} text-slate-800/50 w-full px-2 text-end cursor-pointer`}
                                                onClick={() => {
                                                    setPaid(false);
                                                    setPending(true);
                                                    setSPosition("left-[calc(10%-30px)]");
                                                    setValue("status", "pending");
                                                }}
                                            >
                                                <span className={`${(paid || values.status === "paid") ? "opacity-0" : "opacity-100"} ${(pending || values.status === "pending") && "text-slate-800"}`}>Pending</span>
                                                <input
                                                    type="checkbox"
                                                    hidden
                                                    className="w-full"
                                                    checked={pending}
                                                    disabled={isSubmitting}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start ">
                                    <span className="text-xl font-[600] text-slate-800 mb-2">Regular Income (Optional)</span>
                                    <div className="flex items-center justify-evenly">
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedCheck === "hourly" || values.regular_unit === "hourly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedCheck((prev) => prev !== "hourly" ? "hourly" : "")
                                                if (values.regular_unit === "hourly") {
                                                    setValue("regular_unit", "");
                                                    setValue("regular_num", undefined);
                                                }
                                                else setValue("regular_unit", "hourly");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Hourly
                                        </button>
                                        <span className="text-slate-800/50 font-xl mx-2">/</span>
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedCheck === "weekly" || values.regular_unit === "weekly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedCheck((prev) => prev !== "weekly" ? "weekly" : "")
                                                if (values.regular_unit === "weekly") {
                                                    setValue("regular_unit", "");
                                                    setValue("regular_num", undefined);
                                                }
                                                else setValue("regular_unit", "weekly");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Weekly
                                        </button>
                                        <span className="text-slate-800/50 font-xl mx-2">/</span>
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedCheck === "monthly" || values.regular_unit === "monthly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedCheck((prev) => prev !== "monthly" ? "monthly" : "")
                                                if (values.regular_unit === "monthly") {
                                                    setValue("regular_unit", "");
                                                    setValue("regular_num", undefined);
                                                }
                                                else setValue("regular_unit", "monthly");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Monthly
                                        </button>
                                        <span className="text-slate-800/50 font-xl mx-2">/</span>
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedCheck === "yearly" || values.regular_unit === "yearly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedCheck((prev) => prev !== "yearly" ? "yearly" : "")
                                                if (values.regular_unit === "yearly") {
                                                    setValue("regular_unit", "");
                                                    setValue("regular_num", undefined);
                                                }
                                                else setValue("regular_unit", "yearly");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Yearly
                                        </button>

                                    </div>

                                    {(clickedCheck) &&
                                        <input
                                            type="number"
                                            className="text-xl w-1/6 px-2 py-1 text-slate-800 bg-white/50 rounded-lg outline-none mt-2"
                                            {...register("regular_num", { valueAsNumber: true })}
                                            disabled={isSubmitting}
                                        />
                                    }
                                </div>
                            </div>
                        }
                    </div>

                    {/* Image, Comment, check, button */}
                    <div className="grid grid-rows-[20px_320px_100px_160px_auto] gap-3 h-full">
                        <div className="flex items-center justify-end">
                            <button
                                onClick={handleBackToPage}
                                className="border-b-2 border-slate-800 border-solid hover:opacity-60 cursor-pointer flex items-center gap-2"
                            >
                                <RiArrowGoBackLine size={24} />
                                <span>Back to the form page</span>
                            </button>
                        </div>
                        <div className={`${values.object && "relative border-2 border-gray-500/30 border-solid"} w-full h-full bg-gray-500 flex items-center justify-center rounded-md gap-2`}>
                            {values.object ?
                                <div className="absolute inset-0">
                                    <Image
                                        src={values.object}
                                        alt="Record Image"
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                :
                                <>
                                    <CiImageOff size={48} className="fill-white" />
                                    <span className="font-[700] text-white text-xl">No Content</span>
                                </>
                            }
                        </div>

                        <div className="w-full h-[100px] overflow-y-scroll no-scrollbar bg-white/50 rounded-md p-2">
                            {values.comment}
                        </div>

                        {values.type === "expenses" &&
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col items-start ">
                                    <span className="text-xl font-[600] text-slate-800 mb-2">Payment Method</span>
                                    <div className="flex items-center justify-evenly">
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedPayment === "cash" || values.payment_method === "cash") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedPayment((prev) => prev !== "cash" ? "cash" : "")
                                                if (values.payment_method === "cash") setValue("payment_method", "");
                                                else setValue("payment_method", "cash");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Cash
                                        </button>
                                        <span className="text-slate-800/50 font-xl mx-2">/</span>
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedPayment === "card" || values.payment_method === "card") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedPayment((prev) => prev !== "card" ? "card" : "")
                                                if (values.payment_method === "card") setValue("payment_method", "");
                                                else setValue("payment_method", "card");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Card
                                        </button>
                                        <span className="text-slate-800/50 font-xl mx-2">/</span>
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedPayment === "other" || values.payment_method === "other") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedPayment((prev) => prev !== "other" ? "other" : "")
                                                if (values.payment_method === "other") setValue("payment_method", "");
                                                else setValue("payment_method", "other");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Other
                                        </button>

                                        {/* {(clickedPayment) &&
                                            <input
                                                type="number"
                                                className="text-xl w-[50px] text-slate-800 bg-white/50 rounded-lg outline-none ml-4 text-center"
                                                {...register("regular_num", { valueAsNumber: true })}
                                            />
                                        } */}
                                    </div>
                                </div>

                                <div className="flex flex-col items-start ">
                                    <span className="text-xl font-[600] text-slate-800 mb-2">Regular Income (Optional)</span>
                                    <div className="flex items-center justify-evenly">
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedCheck === "hourly" || values.regular_unit === "hourly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedCheck((prev) => prev !== "hourly" ? "hourly" : "")
                                                if (values.regular_unit === "hourly") setValue("regular_unit", "");
                                                else setValue("regular_unit", "hourly");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Hourly
                                        </button>
                                        <span className="text-slate-800/50 font-xl mx-2">/</span>
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedCheck === "weekly" || values.regular_unit === "weekly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedCheck((prev) => prev !== "weekly" ? "weekly" : "")
                                                if (values.regular_unit === "weekly") setValue("regular_unit", "");
                                                else setValue("regular_unit", "weekly");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Weekly
                                        </button>
                                        <span className="text-slate-800/50 font-xl mx-2">/</span>
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedCheck === "monthly" || values.regular_unit === "monthly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedCheck((prev) => prev !== "monthly" ? "monthly" : "")
                                                if (values.regular_unit === "monthly") setValue("regular_unit", "");
                                                else setValue("regular_unit", "monthly");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Monthly
                                        </button>
                                        <span className="text-slate-800/50 font-xl mx-2">/</span>
                                        <button
                                            type="button"
                                            className={`bg-transparent ${(clickedCheck === "yearly" || values.regular_unit === "yearly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-xl`}
                                            onClick={() => {
                                                setClickedCheck((prev) => prev !== "yearly" ? "yearly" : "")
                                                if (values.regular_unit === "yearly") setValue("regular_unit", "");
                                                else setValue("regular_unit", "yearly");
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Yearly
                                        </button>
                                        {(clickedCheck) &&
                                            <input
                                                type="number"
                                                className="text-xl w-[50px] text-slate-800 bg-white/50 rounded-lg outline-none ml-4 text-center"
                                                {...register("regular_num", { valueAsNumber: true })}
                                                disabled={isSubmitting}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        {(values.type === "income" && errors.root?.message) &&
                            <div className="w-full rounded-xl bg-red-500/30 px-2 py-1 text-lg text-red-500 overflow-y-scroll">
                                {errors.root.message}
                            </div>
                        }

                        <div className="relative z-0">
                            <div className="absolute bottom-0 right-0 left-0 z-0 flex justify-between gap-2">
                                <button
                                    type="submit"
                                    className={`w-full px-2 py-1 ${(isSubmitting && !isSaved) ? "cursor-wait" : (isSubmitting && isSaved) ? "cursor-not-allowed" : "cursor-pointer"} ${isSubmitting ? "bg-red-500/50" : "bg-red-500 hover:bg-red-500/50"} text-white rounded-md font-[600] text-xl`}
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        setValue("isSubmitted", true);
                                        setIsSaved(false);
                                        setValue("isConfirmed", true);
                                    }}
                                >
                                    Submit
                                </button>
                                <button
                                    type="submit"
                                    className={`w-full px-2 py-1 ${(isSubmitting && isSaved) ? "cursor-wait" : (isSubmitting && !isSaved) ? "cursor-not-allowed" : "cursor-pointer"} ${isSubmitting ? "bg-gray-500/50" : "bg-gray-500 hover:bg-gray-500/50"} text-white rounded-md font-[600] text-xl`}
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        setValue("isSubmitted", false);
                                        setIsSaved(true);
                                        setValue("isConfirmed", true);
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>

            {isLeaving &&
                <div className="relative z-[999]">
                    <div className="fixed inset-0 bg-black/50 z-10" />
                    <div className="z-[100] fixed inset-0 sm:flex sm:items-center sm:justify-center">
                        <div className="sm:w-[580px] w-full sm:h-auto h-screen flex gap-3 flex-col items-start sm:justify-cente justify-between bg-white sm:rounded-xl sm:px-4 sm:py-5 px-2 py-3">
                            <div className="w-full flex items-center justify-between">
                                <h2 className="text-xl font-[700] text-slate-800">Delete your new record</h2>
                                <button
                                    type="button"
                                    className="p-1 hover:bg-gray-500/30 rounded-md"
                                    onClick={() => setIsLeaving(false)}
                                >
                                    <RiCloseLine size={32} />
                                </button>
                            </div>
                            {/* content */}
                            <div className="tracking-wide text-slate-800 font-[600] text-base">
                                <p>You are trying to leave this confirmation page, which means your new record is going not to be saved.</p>
                                <p>Do you want to allow deleting this new record?</p>
                            </div>
                            <div className="flex items-center justify-evenly text-lg w-full gap-2">
                                <Link
                                    href={paths.home()}
                                    className="w-full px-2 py-1 bg-red-500 text-center hover:bg-red-500/50 text-white font-[700] cursor-pointer rounded-lg"
                                >
                                    Yes, leave now
                                </Link>
                                <button
                                    type="button"
                                    className="w-full px-2 py-1 bg-gray-500 text-center hover:bg-gray-500/50 text-white font-[700] rounded-lg cursor-pointer"
                                    onClick={() => {
                                        setIsLeaving(false)
                                        setValue("isConfirmed", false);
                                    }}
                                >
                                    No, back to the page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}