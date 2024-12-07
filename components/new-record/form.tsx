"use client";

import { generateDateFormat } from "@/data/date";
import { useEffect, useState } from "react"
import { GoTriangleDown } from "react-icons/go";
import { US, EU, JP, AU } from 'country-flag-icons/react/3x2'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { MdOutlineAdd } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { IoReceiptOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFieldArray, useFormContext } from "react-hook-form";
import paths from "@/paths";

export default function NewRegisterForm() {
    const { data: session } = useSession();

    const router = useRouter();
    const {register, handleSubmit, control, getValues, setValue, formState: {errors}} = useFormContext();
    console.log(errors)
    const onSubmit = handleSubmit(() => {
        router.push(paths.newRecordConfirmUrl());
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "items",
    });

    const [dateToggle, setDateToggle] = useState(false);
    const [typeToggle, setTypeToggle] = useState(false);
    const [currencyToggle, setCurrencyToggle] = useState(false);
    const [countryToggle, setCountryToggle] = useState(false);
    const [genreToggle, setGenreToggle] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setValue("currency", session.user.currency);
            setValue("country", session.user.location);
        }
    }, [session?.user, setValue]);

    // const [rows, setRows] = useState<FormRow[]>([
    //     { id: uuid(), item: "", category: "", subcategory: "", amount: 0, cost: 0 }
    // ]);

    const currencies = ["AUD", "YEN", "USD", "EUR"];
    const countries = ["Australia", "Japan", "US", "Europe"];

    const getIcons = (name: string) => {
        switch (name) {
            case "AUD":
            case "Australia":
                return <AU style={{ width: "32px", height: "24px", marginRight: "2px" }} />;
            case "YEN":
            case "Japan":
                return <JP style={{ width: "32px", height: "24px", marginRight: "2px" }} />;
            case "USD":
            case "US":
                return <US style={{ width: "32px", height: "24px", marginRight: "2px" }} />;
            case "EUR":
            case "Europe":
                return <EU style={{ width: "32px", height: "24px", marginRight: "2px" }} />;
            default:
                return null;
        }
    };

    const displayCurrency = (name: string) => {
        return (
            <li key={name}
                onClick={() => setValue("currency", name)}
                className="w-full flex items-center gap-3 cursor-pointer px-1 py-0.5 hover:bg-gray-200 rounded-t-lg border-b-2 border-gray-200 border-solid"
            >
                {getIcons(name)}
                {name}
            </li>
        )
    };

    const displayCountry = (name: string) => {
        return (
            <li key={name}
                onClick={() => setValue("country", name)}
                className="w-full flex items-center gap-3 cursor-pointer px-1 py-0.5 hover:bg-gray-200 rounded-t-lg border-b-2 border-gray-200 border-solid"
            >
                {getIcons(name)}
                {name}
            </li>
        )
    };

    const handleDateChange = (newDate: Dayjs) => {
        setValue('date', newDate.toDate());
    };

    const handleAddRow = () => {
        append({ item: "", category: "", subcategory: "", amount: 0, cost: 0 })
    }

    const handleDeleteRow = (index: number) => {
        // setRows(rows.filter((row) => row.id != id));
        remove(index)
    };

    // const handleChangeRow = (id: string, field: string, value: string | number | null) => {
    //     const updateRows = rows.map((row) =>
    //         row.id == id ? { ...row, [field]: value } : row);
    //     setRows(updateRows);
    // }

    return (
        <form className="grid grid-cols-[2fr_1fr] w-full gap-3" onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
            if (e.key === "Enter") e.preventDefault();
        }}
            onSubmit={onSubmit}
        >
            <div className="flex flex-col gap-3 pt-10">
                {/* Dates & Type */}
                <div className="grid grid-cols-3 gap-2 ml-5 mb-2">
                    {/* Dates */}
                    <label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                        Dates
                        <div className="cursor-pointer w-full bg-white border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700] tracking-wide"
                            onClick={() => setDateToggle((prev) => !prev)}
                        >
                            {generateDateFormat(getValues("date"), "new-register")}
                        </div>
                        {dateToggle &&
                            <div className="absolute top-15 right-0 left-0 w-full flex items-center bg-white z-10 flex-col gap-2">
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar
                                            onChange={handleDateChange}
                                            value={dayjs(getValues("date"))}                                            
                                            showDaysOutsideCurrentMonth
                                            displayWeekNumber
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="bg-white w-full -mt-10 z-10">
                                    <button
                                        className="w-full rounded-md bg-black hover:bg-black/50 px-2 py-1 text-white z-10"
                                        type="button"
                                        onClick={() => setDateToggle(false)}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        }
                    </label>

                    {/* Type */}
                    <label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                        Types
                        <div className="w-full flex items-center justify-between bg-white border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]">
                            <p className="capitalize">{getValues("type")}</p>
                            <button
                                className="cursor-pointer"
                                type="button"
                                onClick={() => setTypeToggle((prev) => !prev)}
                            >
                                <GoTriangleDown size={24} className={`${typeToggle ? "rotate-180" : "rotate-0"} transition duration-150 delay-75`} />
                            </button>
                        </div>
                        {typeToggle &&
                            <div className="absolute w-full top-15 right-0 left-0 z-10">
                                <div className="bg-white hover:bg-white border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1">
                                    <ul>
                                        <li
                                            onClick={() => {
                                                // setType("income");
                                                setValue("type", "income");
                                            }}
                                            // onClick={async () => await setValue("type", "income")}
                                            // {...register('type')}
                                            className="w-full cursor-pointer px-1 py-0.5 hover:bg-gray-200 rounded-t-lg border-b-2 border-gray-200 border-solid"
                                        >
                                            Income
                                        </li>
                                        <li
                                            onClick={() => {
                                                setValue("type", "expenses")
                                            }}
                                            className="w-full cursor-pointer px-1 py-0.5 hover:bg-gray-200 rounded-b-lg "
                                        >
                                            Expenses
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </label>

                    {/* Currency */}
                    {(getValues("type") === "income" || getValues("type") === "expenses") &&
                        <label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                            Currency
                            <div className="w-full flex items-center justify-between bg-white border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]">
                                <div className="flex items-center gap-2">
                                    {getIcons(getValues("currency") || "")}
                                    <p>{getValues("currency")}</p>
                                </div>
                                <button
                                    className="cursor-pointer"
                                    type="button"
                                    onClick={() => setCurrencyToggle((prev) => !prev)}
                                >
                                    <GoTriangleDown size={24} className={`${currencyToggle ? "rotate-180" : "rotate-0"} transition duration-150 delay-75`} />
                                </button>
                            </div>
                            {currencyToggle &&
                                <div className="absolute w-full top-15 right-0 left-0 z-10">
                                    <div className="bg-white hover:bg-white border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1">
                                        <ul key="1">
                                            {currencies
                                                .filter((name) => name != getValues("currency"))
                                                .map((name) => displayCurrency(name))}
                                        </ul>
                                    </div>
                                </div>
                            }
                        </label>
                    }
                </div>

                {/* Genre & Country */}
                {(getValues("type") === "income" || getValues("type") === "expenses") &&
                    <div className="grid grid-cols-2 gap-2 ml-5 mb-2">
                        {getValues("type") === "income" &&
                            // Resorce
                            < label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                                Resource
                                <input
                                    // name="resource"
                                    type="text"
                                    {...register("resource")}
                                    // value={resource}
                                    className="outline-none w-full flex items-center justify-between bg-white border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]"
                                    // onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    //     setValue("resource", e.currentTarget.value);
                                    // }}
                                />
                            </label>
                        }
                        {getValues("type") === "expenses" &&
                            // Genre
                            < label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                                Genre
                                <input
                                    // name="genre"
                                    {...register("genre")}
                                    type="text"
                                    // value={genre}
                                    className="outline-none w-full flex items-center justify-between bg-white border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]"
                                    onChange={() => {
                                        // setGenre(e.currentTarget.value);
                                        setGenreToggle(true);
                                    }}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                        if (e.key === "Enter") {
                                            setGenreToggle(false);
                                        }
                                    }}
                                />
                                {genreToggle &&
                                    <div className="absolute top-15 right-0 left-0 w-full">
                                        <div className="bg-white hover:bg-white border-2 border-gray-500/50 border-solid rounded-lg">
                                            <ul className="w-full">
                                                <li
                                                    className="cursor-pointer bg-white text-gray-600 hover:text-slate-900 hover:bg-white rounded-md px-2 py-1"
                                                    onClick={() => {
                                                        // setGenre("Grocery Store");
                                                        setGenreToggle(false);
                                                    }}
                                                >
                                                    Test (not valid)
                                                </li>
                                            </ul>
                                            <div className="rounded-b-lg bg-gray-500/50 text-slate-800 font-[700] flex items-center justify-end px-2 py-0.5">
                                                <p className="text-base">Powered by @Tatsuya</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </label>
                        }

                        {/* Country */}
                        <label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                            Country
                            <div className="w-full flex items-center justify-between bg-white border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]">
                                <div className="flex items-center gap-2">
                                    {getIcons(getValues("country") || "")}
                                    <p>{getValues("country")}</p>
                                </div>
                                <button
                                    className="cursor-pointer"
                                    type="button"
                                    onClick={() => setCountryToggle((prev) => !prev)}
                                >
                                    <GoTriangleDown size={24} className={`${countryToggle ? "rotate-180" : "rotate-0"} transition duration-150 delay-75`} />
                                </button>
                            </div>
                            {countryToggle &&
                                <div className="absolute w-full top-15 right-0 left-0 z-10">
                                    <div className="bg-white hover:bg-white border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1">
                                        <ul key="2">
                                            {countries
                                                .filter((name) => name != getValues("country"))
                                                .map((name) => displayCountry(name))}
                                        </ul>
                                    </div>
                                </div>
                            }
                        </label>
                    </div>
                }

                {getValues("type") === "income" &&
                    <div className="grid grid-cols-2 gap-2 ml-5 mb-2">
                        {/* Amount */}
                        < label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                            Amount
                            <div className="font-[700] w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 flex items-center">
                                <div className="w-4">
                                    {(getValues("currency") === "USD" || getValues("currency") === "AUD") ? "$" : getValues("currency") === "YEN" ? "¥" : "£"}
                                </div>
                                <input
                                    type="number"
                                    {...register("income_amount")}
                                    step={0.01}
                                    // name="amount-income"
                                    // value={amount}
                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.currentTarget.value))}
                                    className="w-full outline-none"
                                />
                            </div>
                        </label>

                        {/* Category */}
                        < label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                            Category
                            <input
                                {...register("income_category")}
                                // name="category_income"
                                type="text"
                                // value={category}
                                className="outline-none w-full flex items-center justify-between bg-white border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]"
                                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                //     setCategory(e.currentTarget.value);
                                // }}
                            />
                        </label>
                    </div>
                }

                {/* Item, Cateogry, SubCategory, Amount, Cost */}
                {(getValues("type") === "expenses") &&
                    <div className="flex items-center flex-col ml-5">
                        <div className="grid grid-cols-[2fr_2fr_2fr_1fr_1fr_auto] gap-2 mb-4 font-semibold text-slate-800 w-full pr-11">
                            <span className="">Item</span>
                            <span className="">Category</span>
                            <span>Sub-category</span>
                            <span className="">Amount</span>
                            <span className="">Cost</span>
                        </div>
                        <div className="overflow-y-scroll max-h-[calc(100vh-450px)] w-full">
                            {errors.root && <div>{errors.root.message}</div>}
                            {fields.map((field, index) => (
                                <div key={index} className="flex items-center mb-2 gap-2 text-base w-full ">
                                    <div className="grid grid-cols-[2fr_2fr_2fr_1fr_1fr_auto] gap-2">
                                        <input
                                            type="text"
                                            {...register(`items[${index}].item`)}
                                            // name="item"
                                            // value={row.item}
                                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeRow(row.id, "item", e.target.value)}
                                            className="w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1"
                                        />
                                        <input
                                            type="text"
                                            {...register(`items[${index}].category`)}
                                            // name="category"
                                            // value={row.category}
                                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeRow(row.id, "category", e.target.value)}
                                            className="w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1"
                                        />
                                        <input
                                            type="text"
                                            {...register(`items[${index}].subcategory`)}
                                            // name="subcategory"
                                            // value={row.subcategory}
                                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeRow(row.id, "subcategory", e.target.value)}
                                            className="w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1"
                                        />
                                        <input
                                            type="number"
                                            {...register(`items[${index}].amount`)}
                                            // name="amount"
                                            // value={row.amount}
                                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeRow(row.id, "amount", e.target.value)}
                                            className="w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1"
                                        />
                                        <div className="w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 flex items-center">
                                            <div className="w-4">
                                                {(getValues("currency") === "USD" || getValues("currency") === "AUD") ? "$" : getValues("currency") === "YEN" ? "¥" : "£"}
                                            </div>
                                            <input
                                                type="number"
                                                {...register(`items[${index}].cost`)}
                                                step={0.01}
                                                // name="cost"
                                                // value={row.cost}
                                                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeRow(row.id, "cost", e.target.value)}
                                                className="w-full outline-none"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="p-1 rounded-md bg-gray-200 hover:bg-gray-200/50 "
                                        onClick={() => handleDeleteRow(index)}
                                    >
                                        <BsTrash size={24} className="" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddRow}
                                className="mt-4 w-full cursor-pointer border-2 hover:border-gray-300/50 border-gray-500/50 border-solid rounded-lg text-lg px-3 py-1"
                            >
                                <MdOutlineAdd size={24} className="mx-auto" />
                            </button>
                        </div>
                    </div>
                }
            </div>

            {/* Image, Memo, Confirm Button */}
            <div className="flex items-center pt-10 w-full flex-col ">
                <label className="mb-3 h-[240px] flex items-start justify-center bg-gradient-to-r from-sky-300 via-violet-300 to-pink-100 w-full rounded-lg cursor-pointer hover:opacity-80">
                    <div className="w-full flex items-center justify-center h-full">
                        <IoReceiptOutline size={48} className="fill-black mr-3" />
                        <span>Upload image</span>
                    </div>
                    <input
                        type="file"
                        hidden
                        {...register("object")}
                    />
                </label>
                <label className="w-full">
                    <span className="font-[600] text-base text-slate-800">Comment</span>
                    <textarea
                        className="mb-3 h-[180px] resize-none w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1"
                        {...register('comment')}
                    />
                </label>
                <button
                    type="submit"
                    className="w-full rounded-lg px-3 py-2 bg-orange-400 hover:bg-orange-400/50 text-white font-[700]"
                >
                    Confirm
                </button>
            </div>
        </form >
    )
}