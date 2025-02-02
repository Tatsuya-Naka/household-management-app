"use client";
import { generateDateFormat } from "@/data/date";
import { countries } from "@/type/country";
import CurrencyIcon, { currencies, getIcons } from "@/type/currency";
import { EditItemsType, EditRecordType } from "@/type/records"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useActionState, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { v4 as uuid } from "uuid";
import EditRecordImage from "../record-image";
import * as actions from "@/app/actions";
import EditRecordButton from "./button";

interface EditRecordsFormProps {
    record: EditRecordType | undefined | null;
};

export default function EditRecordsForm({ record }: EditRecordsFormProps) {
    const [dateToggle, setDateToggle] = useState(false);
    const [date, setDate] = useState(dayjs(record?.dateString).toDate() || new Date());
    const [currency, setCurrency] = useState<{ name: string, toggle: boolean }>({ name: record?.currency.name || "AUD", toggle: false });
    const [country, setCountry] = useState<{ name: string, toggle: boolean }>({ name: record?.country.name || "Australia", toggle: false });
    const [items, setItems] = useState<EditItemsType[]>(record?.Items || []);
    const [incomeStatus, setIncomeStatus] = useState<{ status: boolean, cat: string }>({ status: record?.income_status === "paid" ? true : false, cat: record?.income_status || "" });
    const [position, setSPosition] = useState<string>(record?.income_status === "paid" ? "left-[calc(90%-30px)]" : record?.income_status === "pending" ? "left-[calc(10%-30px)]" : "left-[calc(50%-30px)]");
    const [regular, setRegular] = useState<{ unit: string | null | undefined, num: number | null | undefined }>({ unit: record?.regular_unit, num: record?.regular_num });
    const [payment, setPayment] = useState<string | null | undefined>(record?.payment_method);
    const [isSubmitted, setIsSubmitted] = useState<{ isApplied: boolean, isSaved: boolean }>({ isApplied: false, isSaved: false });
    const [imageCondition, setImageCondition] = useState<{isStored: boolean, isDeleted: boolean, imageUrl: string}>({isStored: false, isDeleted: false, imageUrl: ""});
    // TODO: save the record editted using useActionForm
    const [formState, action] = useActionState(actions.appliedToRecords.bind(null, {
        type: record?.type.name, currency: currency.name, country: country.name, date: date, regular_unit: regular.unit, items, recordId: record?.id, payment,
        status: incomeStatus.cat, isSubmitted: isSubmitted.isApplied, imageCondition,
    }), { errors: {} });
    console.log({formState: formState});

    // TODO: used for error handling but because of the build just write this

    const handleDateChange = (newDate: Dayjs) => {
        setDate(newDate.toDate());
    };

    const displayCurrency = (name: string) => {
        return (
            <li key={name}
                onClick={() => setCurrency((prev) => ({ ...prev, name }))}
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
                onClick={() => setCountry((prev) => ({ ...prev, name }))}
                className="w-full flex items-center gap-3 cursor-pointer px-1 py-0.5 hover:bg-gray-200 rounded-t-lg border-b-2 border-gray-200 border-solid"
            >
                {getIcons(name)}
                {name}
            </li>
        )
    };

    const handleDeleteRow = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };
    // EditItemsType = {id: string, item: string, category: {name: string}, subcategory: {name: string} | null, amount: number, cost: number};
    const handleAddRow = () => {
        setItems((prev) => [...prev, {
            id: uuid(), item: "", category: { name: "" }, subcategory: { name: "" }, amount: 0, cost: 0
        }]);
    }

    return (
        <form
            className="grid grid-cols-[2fr_1fr] w-full gap-3"
            onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
                if (e.key === "Enter") e.preventDefault();
            }}
        >
            <div className="flex flex-col gap-3 pt-10">
                {/* Dates & Type */}
                <div className="grid grid-cols-3 gap-2 ml-5 mb-2">
                    {/* Dates */}
                    {/* <label className={`text-base w-full font-[500] ${errors.date ? "text-red-500" : "text-slate-800"} col-span-1 relative`}> */}
                    <label className={`text-base w-full font-[500] text-slate-800 col-span-1 relative`}>
                        Dates
                        {/* <div className={`cursor-pointer w-full ${errors.date ? "bg-red-500/30 text-500" : "bg-white text-slate-800"} border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700] tracking-wide`} */}
                        <div className={`cursor-pointer w-full bg-white text-slate-800 border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700] tracking-wide`}
                            onClick={() => setDateToggle((prev) => !prev)}
                        >
                            {generateDateFormat(date, "new-register")}
                        </div>
                        {dateToggle &&
                            <div className="absolute top-15 right-0 left-0 w-full flex items-center bg-white z-10 flex-col gap-2">
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar
                                            onChange={handleDateChange}
                                            value={dayjs(date)}
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
                                    // disabled={isSubmitting} during submitting process
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        }
                    </label>

                    {/* Type */}
                    <label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                        {/* <span className={`${errors.type ? "text-red-500" : "text-slate-800"} text-base`}> */}
                        <span className={`text-slate-800 text-base`}>
                            Types
                        </span>
                        {/* <div className={`w-full flex items-center justify-between ${errors.type ? "text-red-500 bg-red-500/30" : "bg-white text-slate-800"} border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}> */}
                        <div className={`w-full flex items-center justify-between bg-white text-slate-800 border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}>
                            <p className="capitalize">
                                {record?.type.name}
                            </p>
                        </div>
                    </label>

                    {/* Currency */}
                    <label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                        {/* <span className={`${errors.currency ? "text-red-500" : "text-slate-800"} text-base`}> */}
                        <span className={`text-slate-800 text-base`}>
                            Currency
                        </span>
                        {/* <div className={`w-full flex items-center justify-between ${errors.currency ? "text-red-500 bg-red-500/30" : "bg-white text-slate-800"} border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}> */}
                        <div className={`w-full flex items-center justify-between bg-white text-slate-800 border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}>
                            <div className="flex items-center gap-2">
                                {getIcons(currency.name)}
                                <p>{currency.name}</p>
                            </div>
                            <button
                                className="cursor-pointer"
                                type="button"
                                onClick={() => setCurrency((prev) => ({ ...prev, toggle: !prev.toggle }))}
                            // disabled={isSubmitting}
                            >
                                <GoTriangleDown size={24} className={`${currency.toggle ? "rotate-180" : "rotate-0"} transition duration-150 delay-75`} />
                            </button>
                        </div>
                        {currency.toggle &&
                            <div className="absolute w-full top-15 right-0 left-0 z-10">
                                <div className="bg-white hover:bg-white border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1">
                                    <ul key="1">
                                        {currencies
                                            .filter((name) => name != currency.name)
                                            .map((name) => displayCurrency(name))}
                                    </ul>
                                </div>
                            </div>
                        }
                    </label>
                </div>

                {/* Genre & Country */}
                <div className="grid grid-cols-2 gap-2 ml-5 mb-2">
                    {record?.type.name === "income" &&
                        // Resorce
                        < label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                            {/* <span className={`${errors.resource ? "text-red-500" : "text-slate-800"} text-base`}> */}
                            <span className={`text-slate-800 text-base`}>
                                Resource
                            </span>
                            <input
                                name="resource"
                                type="text"
                                // disabled={isSubmitting}
                                defaultValue={record.incomeresource?.name || ""}
                                // className={`outline-none w-full flex items-center justify-between ${errors.resource ? "text-red-500 bg-red-500/30" : "bg-white text-slate-800"} border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}
                                className={`outline-none w-full flex items-center justify-between bg-white text-slate-800 border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}
                            />
                            {/* {errors.resource && <div className="text-red-500 text-sm">{errors.resource.message}</div>} */}
                        </label>
                    }
                    {record?.type.name === "expenses" &&
                        // Genre
                        < label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                            {/* <span className={`${errors.genre ? "text-red-500" : "text-slate-800"} text-base`}> */}
                            <span className={`text-slate-800 text-base`}>
                                Genre
                            </span>
                            <input
                                name="genre"
                                type="text"
                                // disabled={isSubmitting}
                                defaultValue={record?.genre || ""}
                                // className={`outline-none w-full flex items-center justify-between ${errors.genre ? "text-red-500 bg-red-500/30" : "bg-white text-slate-800"} border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}
                                className={`outline-none w-full flex items-center justify-betweenbg-white text-slate-800 border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}
                            // onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            //     if (e.key === "Enter") {
                            //         setGenreToggle(false);
                            //     }
                            // }}
                            />
                            {/* {errors.genre && <div className="text-red-500 text-sm">{errors.genre.message}</div>} */}
                            {/* {genreToggle &&
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
                            } */}
                        </label>
                    }

                    {/* Country */}
                    <label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                        {/* <span className={`${errors.country ? "text-red-500" : "text-slate-800"} text-base`}> */}
                        <span className={`text-slate-800 text-base`}>
                            Country
                        </span>
                        {/* <div className={`w-full flex items-center justify-between ${errors.country ? "bg-red-500/30 text-red-500" : "bg-white text-slate-800"} border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}> */}
                        <div className={`w-full flex items-center justify-between bg-white text-slate-800 border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}>
                            <div className="flex items-center gap-2">
                                {getIcons(country.name)}
                                <p>{country.name}</p>
                            </div>
                            <button
                                className="cursor-pointer"
                                type="button"
                                onClick={() => setCountry((prev) => ({ ...prev, toggle: !prev.toggle }))}
                            // disabled={isSubmitting}
                            >
                                <GoTriangleDown size={24} className={`${country.toggle ? "rotate-180" : "rotate-0"} transition duration-150 delay-75`} />
                            </button>
                        </div>
                        {country.toggle &&
                            <div className="absolute w-full top-15 right-0 left-0 z-10">
                                <div className="bg-white hover:bg-white border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1">
                                    <ul key="2">
                                        {countries
                                            .filter((name) => name != country.name)
                                            .map((name) => displayCountry(name))}
                                    </ul>
                                </div>
                            </div>
                        }
                    </label>
                </div>

                {record?.type.name === "income" &&
                    <div className="grid grid-cols-2 gap-2 ml-5 mb-2">
                        {/* Amount */}
                        < label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                            {/* <span className={`${errors.income_amount ? "text-red-500" : "text-slate-800"} text-base`}> */}
                            <span className={`text-slate-800 text-base`}>
                                Amount
                            </span>
                            {/* <div className={`${errors.income_amount ? "bg-red-500/30 text-red-500" : "bg-white text-slate-800"} font-[700] w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 flex items-center`}> */}
                            <div className={`bg-white text-slate-800 font-[700] w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 flex items-center`}>
                                <div className="w-4">
                                    <CurrencyIcon currencyType={currency.name} />
                                </div>
                                <input
                                    type="number"
                                    step={0.01}
                                    // disabled={isSubmitting}
                                    name="income_amount"
                                    defaultValue={record.income_amount || 0}
                                    className="w-full outline-none"
                                />
                            </div>
                            {/* {errors.income_amount?.message && <div className="text-sm text-red-500">{errors.income_amount.message}</div>} */}
                        </label>

                        {/* Category */}
                        < label className="text-base w-full font-[500] text-slate-800 col-span-1 relative">
                            {/* <span className={`${errors.income_category ? "text-red-500" : "text-slate-800"} text-base`}> */}
                            <span className={`text-slate-800 text-base`}>
                                Category
                            </span>
                            <input
                                name="income_category"
                                type="text"
                                // disabled={isSubmitting}
                                defaultValue={record.incomecategory?.name}
                                // className={`outline-none w-full flex items-center justify-between ${errors.income_category ? "bg-red-500/30 text-red-500" : "bg-white text-slate-800"} border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}
                                className={`outline-none w-full flex items-center justify-between bg-white text-slate-800 border-gray-500/50 border-2 border-solid rounded-lg px-2 py-1 text-base font-[700]`}
                            />
                            {/* {errors.income_category && <div className="text-red-500 text-sm">{errors.income_category.message}</div>} */}
                        </label>
                    </div>
                }

                {record?.type.name === "income" &&
                    <div className="grid grid-cols-2 gap-2 ml-5 mb-2">
                        <div className="flex flex-col items-start ">
                            <span className="text-base font-[500] text-slate-800">Status</span>
                            <div className="w-2/3 bg-white/50 rounded-3xl h-[50px] text-xl flex items-center">
                                <div className="relative h-full w-full bg-white/50 rounded-3xl flex items-center justify-between px-2 ">
                                    <label className={`text-lg rounded-l-xl ${(incomeStatus.cat === "pending") ? "bg-blue-500/50" : "bg-green-500/50"} text-slate-800/50 w-full px-2 cursor-pointer`}
                                        onClick={() => {
                                            setIncomeStatus({ status: true, cat: "paid" });
                                            setSPosition("left-[calc(90%-30px)]");
                                        }}
                                    >
                                        <span className={`${(incomeStatus.cat === "pending") ? "opacity-0" : "opacity-100"} ${(incomeStatus.cat === "paid") && "text-slate-800"} text-lg`}>
                                            Paid
                                        </span>
                                        <input
                                            type="checkbox"
                                            hidden
                                            className="w-full"
                                        // checked={incomeStatus.status}
                                        // disabled={isSubmitting}
                                        />
                                    </label>
                                    <div
                                        className={`absolute ${position} z-10 top-0 h-[50px] w-[60px] bg-orange-700 rounded-3xl cursor-pointer`}
                                        onClick={() => {
                                            setIncomeStatus({ status: false, cat: "" });
                                            setSPosition("left-[calc(50%-30px)]");
                                        }}
                                    />
                                    <label className={`text-lg rounded-r-xl ${(incomeStatus.cat === "paid") ? "bg-green-500/50" : "bg-blue-500/50"} text-slate-800/50 w-full px-2 text-end cursor-pointer`}
                                        onClick={() => {
                                            setIncomeStatus({ status: false, cat: "pending" });
                                            setSPosition("left-[calc(10%-30px)]");
                                        }}
                                    >
                                        <span className={`${(incomeStatus.cat === "paid") ? "opacity-0" : "opacity-100"} ${(incomeStatus.cat === "pending") && "text-slate-800"} text-lg`}>Pending</span>
                                        <input
                                            type="checkbox"
                                            hidden
                                            className="w-full"
                                        // checked={pending}
                                        // disabled={isSubmitting}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start ">
                            <span className="text-base font-[500] text-slate-800">Regular Income (Optional)</span>
                            <div className="flex items-center justify-evenly">
                                <button
                                    type="button"
                                    className={`bg-transparent ${(regular.unit && regular.unit === "hourly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setRegular((prev) => ({ unit: prev.unit !== "hourly" ? "hourly" : "", num: undefined }));
                                    }}
                                // disabled={isSubmitting}
                                >
                                    Hourly
                                </button>
                                <span className="text-slate-800/50 font-xl mx-2">/</span>
                                <button
                                    type="button"
                                    className={`bg-transparent ${(regular.unit === "weekly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setRegular((prev) => ({ unit: prev.unit !== "weekly" ? "weekly" : "", num: undefined }));
                                    }}
                                >
                                    Weekly
                                </button>
                                <span className="text-slate-800/50 font-xl mx-2">/</span>
                                <button
                                    type="button"
                                    className={`bg-transparent ${(regular.unit === "monthly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setRegular((prev) => ({ unit: prev.unit !== "monthly" ? "monthly" : "", num: undefined }));
                                    }}
                                // disabled={isSubmitting}
                                >
                                    Monthly
                                </button>
                                <span className="text-slate-800/50 font-xl mx-2">/</span>
                                <button
                                    type="button"
                                    className={`bg-transparent ${(regular.unit === "yearly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setRegular((prev) => ({ unit: prev.unit !== "yearly" ? "yearly" : "", num: undefined }));
                                    }}
                                // disabled={isSubmitting}
                                >
                                    Yearly
                                </button>

                            </div>

                            {(regular.unit) &&
                                <input
                                    type="number"
                                    defaultValue={regular.num || 0}
                                    className="text-lg w-1/6 px-2 py-1 text-slate-800 bg-orange-700/30 rounded-lg outline-none mt-2"
                                    name="regular_num"
                                // disabled={isSubmitting}
                                />
                            }
                        </div>
                    </div>
                }

                {/* Item, Cateogry, SubCategory, Amount, Cost */}
                {(record?.type.name === "expenses") &&
                    <div className="flex items-center flex-col ml-5">
                        <div className="grid grid-cols-[2fr_2fr_2fr_1fr_1fr_auto] gap-2 mb-4 font-semibold text-slate-800 w-full pr-11">
                            <span className="">Item</span>
                            <span className="">Category</span>
                            <span>Sub-category</span>
                            <span className="">Amount</span>
                            <span className="">Cost</span>
                        </div>
                        <div className="overflow-y-scroll max-h-[calc(100vh-450px)] w-full">

                            {items.map((item) => (
                                <div key={item.id} className="flex items-center mb-2 gap-2 text-base w-full ">
                                    <div className="grid grid-cols-[2fr_2fr_2fr_1fr_1fr_auto] gap-2">
                                        <input
                                            type="text"
                                            // disabled={isSubmitting}
                                            name='item'
                                            defaultValue={item.item}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItems((prev) => prev.map((prevItem) =>
                                                prevItem.id === item.id ? { ...prevItem, item: e.target.value } : prevItem,
                                            ))}
                                            // className={`w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 ${errors.items?.[index]?.item ? "bg-red-500/30" : "bg-white"}`}
                                            className={`w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 bg-white`}
                                        />

                                        <input
                                            type="text"
                                            name="category"
                                            defaultValue={item.category.name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItems((prev) => prev.map((prevItem) =>
                                                prevItem.id === item.id ? { ...prevItem, category: { name: e.target.value } } : prevItem,
                                            ))}
                                            // disabled={isSubmitting}
                                            // className={`w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 ${errors.items?.[index]?.category ? "bg-red-500/30" : "bg-white"}`}
                                            className={`w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 bg-white`}
                                        />
                                        <input
                                            type="text"
                                            name="sub_category"
                                            defaultValue={item.subcategory?.name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItems((prev) => prev.map((prevItem) =>
                                                prevItem.id === item.id ? { ...prevItem, subcategory: { name: e.target.value } } : prevItem,
                                            ))}
                                            // disabled={isSubmitting}                                           
                                            // className={`w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 ${errors.items?.[index]?.subcategory ? "bg-red-500/30" : "bg-white"}`}
                                            className={`w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 bg-white`}
                                        />
                                        <input
                                            type="number"
                                            name="amount"
                                            defaultValue={item.amount}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItems((prev) => prev.map((prevItem) =>
                                                prevItem.id === item.id ? { ...prevItem, amount: Number(e.target.value) } : prevItem,
                                            ))}
                                            // disabled={isSubmitting}                                            
                                            // className={`w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 ${errors.items?.[index]?.amount ? "bg-red-500/30" : "bg-white"}`}
                                            className={`w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 bg-white`}
                                        />
                                        {/* <div className={`w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 flex items-center ${errors.items?.[index]?.cost}`}> */}
                                        <div className={`w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1 flex items-center`}>
                                            <div className="w-4">
                                                <CurrencyIcon currencyType={currency.name} />
                                            </div>
                                            <input
                                                type="number"
                                                name="cost"
                                                defaultValue={item.cost}
                                                step={0.01}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItems((prev) => prev.map((prevItem) =>
                                                    prevItem.id === item.id ? { ...prevItem, cost: Number(e.target.value) } : prevItem,
                                                ))}
                                                // disabled={isSubmitting}
                                                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeRow(row.id, "cost", e.target.value)}
                                                className="w-full outline-none"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="p-1 rounded-md bg-gray-200 hover:bg-gray-200/50 "
                                        onClick={() => handleDeleteRow(item.id)}
                                    // disabled={isSubmitting}
                                    >
                                        <BsTrash size={24} className="" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddRow}
                                // disabled={isSubmitting}
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
                {/* Record Image */}
                <EditRecordImage object={record?.object} setImageCondition={setImageCondition} />

                <label className="w-full">
                    <span className="font-[600] text-base text-slate-800">Comment</span>
                    <textarea
                        className="mb-3 h-[80px] resize-none w-full outline-none border-2 border-gray-500/50 border-solid rounded-lg px-2 py-1"
                        name="comment"
                        defaultValue={record?.comment || ""}
                    // disabled={isSubmitting}
                    />
                </label>

                {record?.type.name === "expenses" &&
                    <div className="flex flex-col gap-2 w-full mb-3">
                        <div className="flex flex-col items-start ">
                            <span className="text-base font-[500] text-slate-800">Payment Method</span>
                            <div className="flex items-center justify-evenly">
                                <button
                                    type="button"
                                    className={`bg-transparent ${(payment === "cash") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setPayment((prev) => prev !== "cash" ? "cash" : "")
                                    }}
                                // disabled={isSubmitting}
                                >
                                    Cash
                                </button>
                                <span className="text-slate-800/50 font-xl mx-2">/</span>
                                <button
                                    type="button"
                                    className={`bg-transparent ${(payment === "card") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setPayment((prev) => prev !== "card" ? "card" : "")

                                    }}
                                // disabled={isSubmitting}
                                >
                                    Card
                                </button>
                                <span className="text-slate-800/50 font-xl mx-2">/</span>
                                <button
                                    type="button"
                                    className={`bg-transparent ${(payment === "other") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setPayment((prev) => prev !== "other" ? "other" : "")
                                    }}
                                // disabled={isSubmitting}
                                >
                                    Other
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col items-start ">
                            <span className="text-base font-[500] text-slate-800">Regular Income (Optional)</span>
                            <div className="flex items-center justify-evenly">
                                <button
                                    type="button"
                                    className={`bg-transparent ${(regular.unit && regular.unit === "hourly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setRegular((prev) => ({ unit: prev.unit !== "hourly" ? "hourly" : "", num: undefined }));
                                    }}
                                // disabled={isSubmitting}
                                >
                                    Hourly
                                </button>
                                <span className="text-slate-800/50 font-xl mx-2">/</span>
                                <button
                                    type="button"
                                    className={`bg-transparent ${(regular.unit === "weekly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setRegular((prev) => ({ unit: prev.unit !== "weekly" ? "weekly" : "", num: undefined }));
                                    }}
                                >
                                    Weekly
                                </button>
                                <span className="text-slate-800/50 font-xl mx-2">/</span>
                                <button
                                    type="button"
                                    className={`bg-transparent ${(regular.unit === "monthly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setRegular((prev) => ({ unit: prev.unit !== "monthly" ? "monthly" : "", num: undefined }));
                                    }}
                                // disabled={isSubmitting}
                                >
                                    Monthly
                                </button>
                                <span className="text-slate-800/50 font-xl mx-2">/</span>
                                <button
                                    type="button"
                                    className={`bg-transparent ${(regular.unit === "yearly") ? "text-slate-800 " : "hover:text-slate-800 text-slate-800/50"} font-[700] text-lg`}
                                    onClick={() => {
                                        setRegular((prev) => ({ unit: prev.unit !== "yearly" ? "yearly" : "", num: undefined }));
                                    }}
                                // disabled={isSubmitting}
                                >
                                    Yearly
                                </button>
                                <div className="ml-2">
                                    {(regular.unit) &&
                                        <input
                                            type="number"
                                            defaultValue={regular.num || 0}
                                            className="text-lg w-1/2 px-2 text-slate-800 bg-orange-700/30 rounded-lg outline-none "
                                            name="regular_num"
                                        // disabled={isSubmitting}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="flex items-center w-full gap-2">
                    <EditRecordButton action={action} onClick={() => setIsSubmitted({ isApplied: true, isSaved: false })} className={`${(isSubmitted.isApplied || isSubmitted.isSaved) ? "bg-red-600/50" : "bg-red-600"} hover:bg-red-600/50`}>
                        Applied
                    </EditRecordButton>
                    <EditRecordButton action={action} onClick={() => setIsSubmitted({ isApplied: false, isSaved: true })} className={`${(isSubmitted.isSaved || isSubmitted.isApplied) ? "bg-gray-400/50" : "bg-gray-400"} hover:bg-gray-400/50`}>
                        Save
                    </EditRecordButton>
                </div>
            </div>
        </form>
    )
}