"use client";
import { generateDateFormat } from "@/data/date";
import paths from "@/paths";
import { Day } from "@/type/calendar";
import CurrencyIcon from "@/type/currency";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
import { Session } from "next-auth";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import ChartSection from "./chart";
import RecordContainer from "./record-container";
import { MdSort } from "react-icons/md";

interface RecordsIncomeProps {
    session: Session | null;
}

export default function RecordsIncome({ session }: RecordsIncomeProps) {
    // get query data
    const params = useSearchParams();
    const [from, setFrom] = useState({
        calendar: false,
        date: params.get("from") ? dayjs(params.get("from")).toDate() : new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    });
    const [to, setTo] = useState({
        calendar: false,
        date: params.get("to") ? dayjs(params.get("to")).toDate() : new Date(Date.now())
    });
    const [chartType, setChartType] = useState({
        chart: "bar", type: "default"
    });
    const [showCalendar, setShowCalendar] = useState(false);

    const handleCalendarDate = (date: Dayjs | null) => {
        if (!date) return;

        if ((!from.calendar || (from.calendar && to.calendar))) {
            setFrom({
                calendar: true,
                date: date.toDate()
            });
            setTo((prev) => ({
                ...prev,
                calendar: false,
            }));
        } else if (from.calendar && !to.calendar) {
            setTo({
                calendar: true,
                date: from.date
            });
            setFrom({
                calendar: true,
                date: date.toDate()
            });
        } else {
            setTo({
                calendar: true,
                date: date?.toDate(),
            });
        }
    };

    const handleSubmitCalendarDate = () => {
        redirect(`${paths.recordsPageUrl()}?from=${dayjs(from.date)}&to=${dayjs(to.date)}`);
    }

    return (
        <>
            {/* Income & Rate by numbers */}
            <div className="absolute -top-[60px] left-auto right-24 w-[420px] h-[120px] bg-white rounded-lg shadow-md px-4 py-2">
                <div className="w-full h-full grid grid-rows-[auto_20px]">
                    <div className="flex items-center">
                        <div className="text-4xl text-slate-800 font-[700]">
                            <span className="mr-3"><CurrencyIcon currencyType={session?.user.currency || ""} /></span>
                            0
                        </div>
                    </div>
                    <div className="text-base font-[500]">
                        <span className={`text-red-500`}>-100% reduced</span>
                    </div>
                </div>
            </div>

            {/* Graph & Data with Edits and Deletes */}
            <div className="absolute top-0 w-full left-0 right-0">
                <div className="pt-12 px-5">
                    <h2 className="text-4xl font-[700] text-slate-800 mb-3">Income</h2>
                    <div className="grid grid-cols-[1fr_1fr] w-full">
                        {/* Graph */}
                        <div className="grid grid-rows-[80px_auto] ml-2 mr-5">
                            {/* Bar, Line, & Mix, calendar */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className={`${chartType.chart === "bar" ? "underline underline-offset-4 font-[700]" : "font-[500] hover:underline hover:underline-offset-4 "} text-xl text-slate-800 mr-10`}
                                        onClick={() => setChartType((prev) => ({ ...prev, chart: "bar" }))}
                                    >
                                        Bar
                                    </button>

                                    <button
                                        type="button"
                                        className={`${chartType.chart === "line" ? "underline underline-offset-4 font-[700]" : "font-[500] hover:underline hover:underline-offset-4 "} text-xl text-slate-800 mr-10`}
                                        onClick={() => setChartType((prev) => ({ ...prev, chart: "line" }))}
                                    >
                                        Line
                                    </button>

                                    <button
                                        type="button"
                                        className={`${chartType.chart === "mix" ? "underline underline-offset-4 font-[700]" : "font-[500] hover:underline hover:underline-offset-4 "} text-xl text-slate-800 mr-10`}
                                        onClick={() => setChartType((prev) => ({ ...prev, chart: "mix" }))}
                                    >
                                        Mix
                                    </button>
                                </div>

                                {/* Calendar Display */}
                                <div className="relative z-10 shrink-0 flex items-center justify-end">
                                    <div className="rounded-md bg-gray-400/50 px-3 py-1 text-slate-800 cursor-pointer" onClick={() => setShowCalendar(true)}>
                                        <div className="flex items-center">
                                            <label className="flex flex-col items-start mr-5 cursor-pointer">
                                                <span className="text-xs">
                                                    From
                                                </span>
                                                <p className="text-base font-[600]">
                                                    {generateDateFormat(from.date)}
                                                </p>
                                            </label>
                                            <label className="flex flex-col items-start cursor-pointer">
                                                <span className="text-xs">
                                                    To
                                                </span>
                                                <p className="text-base font-[600]">
                                                    {generateDateFormat(to.date)}
                                                </p>
                                            </label>
                                        </div>
                                    </div>
                                    {showCalendar &&
                                        <div className="absolute top-[48px] right-0 left-auto  bg-white rounded-md shadow-md p-2">
                                            <form className="flex flex-col items-center" action={handleSubmitCalendarDate}>
                                                {/* Calendar */}
                                                <div className="flex items-center">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateCalendar
                                                            value={(from.calendar || to.calendar) ? dayjs(from.date) : null}
                                                            onChange={handleCalendarDate}
                                                            showDaysOutsideCurrentMonth
                                                            displayWeekNumber
                                                            slots={{ day: Day }}
                                                            slotProps={{
                                                                day: () =>
                                                                    ({
                                                                        selectedDay: dayjs(from.date),
                                                                        hoveredDay: dayjs(to.date),
                                                                    }) as Partial<PickersDayProps<Dayjs>>
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                                <div className="flex items-center gap-2 w-full -mt-10 z-10">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCalendar(false)}
                                                        className="w-full bg-gray-500 rounded-md px-2 py-1 text-white hover:bg-gray-500/50 text-base"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="w-full bg-red-500 rounded-md px-2 py-1 text-white hover:bg-red-500/50 text-base"
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    }
                                </div>
                            </div>

                            {/* Graph */}
                            <ChartSection chart={chartType.chart} type={chartType.type} />
                        </div>

                        {/* Records with Edits & Deletes */}
                        <div className="h-[500px] overflow-y-scroll flex flex-col justify-start items-center gap-3 w-full relative">
                            {/* Sort */}
                            <div className="sticky z-10 w-full top-2 text-right">
                                <button
                                    className="bg-white/30 rounded-md shadow-md mr-2 hover:bg-gray-300/30 p-1"
                                    type="button"
                                >
                                    <MdSort size={32} className="fill-slate-800" />
                                </button>
                            </div>

                            {/* Record Edit & Delete */}
                            <div className="absolute top-0 left-0 right-0">
                                <div className="flex flex-col justify-start items-center gap-3">
                                    <RecordContainer recordId={"12"} currency={session?.user.currency || ""} content="income" resource={"Employee"} category={"Salary"} amount={1200.23} editUrl={"#"} />

                                    <RecordContainer recordId={"12"} currency={session?.user.currency || ""} content="income" resource={"Employee"} category={"Salary"} amount={1200.23} editUrl={"#"} />

                                    <RecordContainer recordId={"12"} currency={session?.user.currency || ""} content="income" resource={"Employee"} category={"Salary"} amount={1200.23} editUrl={"#"} />

                                    <RecordContainer recordId={"12"} currency={session?.user.currency || ""} content="income" resource={"Employee"} category={"Salary"} amount={1200.23} editUrl={"#"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}