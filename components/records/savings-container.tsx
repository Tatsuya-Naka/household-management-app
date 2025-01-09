"use client";
import { generateDateFormat } from "@/data/date";
import paths from "@/paths";
import { CalendarExpensesGroupType, CalendarIncomeGroupResourceType, CalendarIncomeGroupType, CalendarSavingsGraphCombineType, CalendarSavingsGraphType, Day } from "@/type/calendar";
import CurrencyIcon from "@/type/currency";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
import { Session } from "next-auth";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdSort } from "react-icons/md";
import { CalendarFixingRecordsSavingsCombine, CalendarFixingSavingsRecords } from "@/data/calendar";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, ComposedChart, PieChart, Pie } from "recharts";
import { currencyTypeString } from "@/data/currency";
import { IoIosOptions } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

interface RecordsIncomeProps {
    session: Session | null;
}

type CustomTooltipProps = {
    payload?: { payload: CalendarSavingsGraphType }[]; // `payload` from Recharts passed in
};

type CustomeTooltipCompProps = {
    payload?: { payload: CalendarSavingsGraphCombineType }[];
};

type CustomTooltipIncomeResourceProps = {
    payload?: { payload: CalendarIncomeGroupResourceType }[];
};

export default function RecordsSavings({ session }: RecordsIncomeProps) {
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
    const [data, setData] = useState<{
        isFetched: boolean,
        total: number,
    }>({
        isFetched: false,
        total: 0,
    });
    const [calendarData, setCalendarData] = useState<{ current: CalendarSavingsGraphType[], combined: CalendarSavingsGraphCombineType[] }>({
        current: [],
        combined: [],
    });
    const [rate, setRate] = useState<number>(0);
    const [graphOption, setGraphOption] = useState(false);

    const [catGroup, setCatGroup] = useState<{
        current: {
            income: CalendarIncomeGroupType;
            expenses: CalendarExpensesGroupType;
        },
        prev: {
            income: CalendarIncomeGroupType;
            expenses: CalendarExpensesGroupType;
        }
    }>();

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
        redirect(`${paths.recordsSavingsUrl()}?from=${dayjs(from.date)}&to=${dayjs(to.date)}`);
    };

    // CustomToolTip
    const CustomeToolTip = (({ payload }: CustomTooltipProps) => {
        if (payload && payload.length > 0) {
            const { label, savings } = payload[0].payload;

            return (
                <div className="bg-white border-2 border-slate-800 border-solid rounded-md px-3 py-2 flex flex-col items-start">
                    <h3 className="text-base font-[700] text-slate-800">{label}</h3>
                    <p className="text-base font-[700] text-[#ffaf33]">saved: {savings}</p>
                </div>
            )
        }
        return null;
    });

    const CustomToolTipComp = (({ payload }: CustomeTooltipCompProps) => {
        if (payload && payload.length > 0) {
            const { dateCurr, currSavings, datePrev, prevSavings } = payload[0].payload;

            return (
                <div className="bg-white border-2 border-slate-800 border-solid rounded-md px-3 py-2 flex flex-col items-start">
                    <h3 className="text-base font-[700] text-slate-800">Amount</h3>
                    <p className="text-base font-[700] text-[#ffaf33]">{dateCurr}: {currSavings}</p>
                    <p className="text-base font-[700] text-[#c6ae8b]">{datePrev}: {prevSavings}</p>
                </div>
            )
        }
    });

    const CustomToolTipIncomeResource = (({ payload }: CustomTooltipIncomeResourceProps) => {
        if (payload && payload.length > 0) {
            const { resource, rate } = payload[0].payload;

            return (
                <div className="bg-white border-2 border-slate-800 border-solid rounded-md px-2 py-1 flex flex-col items-start">
                    <h3 className="text-base font-[700] text-slate-800">{resource}</h3>
                    <p className="text-base font-[700] text-[#ffaf33]">{rate}%</p>
                </div>
            )
        }
        return null;
    });

    useEffect(() => {
        const fetchData = async () => {
            const duration = (new Date(to.date)).setHours(0, 0, 0, 0) - (new Date(from.date)).setHours(0, 0, 0, 0);
            const fixed = ({
                from: (new Date(from.date)).setHours(0, 0, 0, 0),
                to: (new Date(to.date)).setHours(0, 0, 0, 0) + 86400000 - 1,
                prevFrom: (new Date(from.date)).setHours(0, 0, 0, 0) - duration - 86400000,
                prevTo: (new Date(to.date)).setHours(0, 0, 0, 0) - duration - 1,
            });
            const response = await fetch(paths.recordsSavingsFetchUrl(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: fixed.from,
                    to: fixed.to,
                    prevFrom: fixed.prevFrom,
                    prevTo: fixed.prevTo,
                }),
            });

            const result = await response.json();

            setData((prev) => ({ ...prev, isFetched: true }));
            const { total: currentTotal, data: currentData, income: incomeGroup, expenses: expensesGroup }: { total: number, data: CalendarSavingsGraphType[], income: CalendarIncomeGroupType, expenses: CalendarExpensesGroupType } = CalendarFixingSavingsRecords({ income: result.income.current, expenses: result.expenses.current, from: fixed.from, to: fixed.to });
            const { total: prevTotal, data: prevData, income: prevIncomeGroup, expenses: prevExpensesGroup }: { total: number, data: CalendarSavingsGraphType[], income: CalendarIncomeGroupType, expenses: CalendarExpensesGroupType } = CalendarFixingSavingsRecords({ income: result.income.prev, expenses: result.expenses.prev, from: fixed.prevFrom, to: fixed.prevTo });
            const calcRate = Number((((currentTotal - prevTotal) / Math.abs(prevTotal)) * 100).toFixed(2));

            // Calc rate
            setRate(calcRate);
            setData((prev) => ({ ...prev, total: currentTotal }));

            const { data: combinedData }: { data: CalendarSavingsGraphCombineType[] } = CalendarFixingRecordsSavingsCombine({ current: currentData, prev: prevData });

            setCalendarData({ current: currentData, combined: combinedData });
            setCatGroup({
                current: { income: incomeGroup, expenses: expensesGroup },
                prev: { income: prevIncomeGroup, expenses: prevExpensesGroup, }
            });
        }

        if (!data.isFetched) {
            fetchData()
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        console.log(err.message);
                    } else {
                        console.log("Internal Server Error");
                    }
                });
            setData((prev) => ({ ...prev, isFetched: true }));
        }

    }, [data, from, to]);

    return (
        <>
            {/* Income & Rate by numbers */}
            <div className="absolute -top-[60px] left-auto right-24 w-[420px] h-[120px] bg-white rounded-lg shadow-md px-4 py-2">
                <div className="w-full h-full grid grid-rows-[auto_20px]">
                    <div className="flex items-center">
                        <div className="text-4xl text-slate-800 font-[700]">
                            <span className="mr-3"><CurrencyIcon currencyType={session?.user.currency || ""} /></span>
                            {data.total}
                        </div>
                    </div>
                    <div className="text-base font-[500]">
                        <span className={`${rate < 0 ? "text-green-500" : "text-red-500"}`}>{rate}% {rate < 0 ? "reduced" : "increased"}</span>
                    </div>
                </div>
            </div>

            {/* Graph & Data with Edits and Deletes */}
            <div className="absolute top-0 w-full left-0 right-0">
                <div className="pt-12 px-5">
                    <h2 className="text-4xl font-[700] text-slate-800 mb-3">Savings</h2>
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
                                <div className="flex items-center gap-4">
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

                                    {/* graph type change */}
                                    <button className="bg-white/50 hover:bg-gray-300/30 border-2 border-solid border-slate-800 rounded-md shadow-md p-2"
                                        onClick={() => setGraphOption(true)}
                                    >
                                        <IoIosOptions size={24} className="text-slate-800" />
                                    </button>
                                </div>
                            </div>

                            {/* Graph */}
                            <div className="bg-white rounded-md w-full px-2 py-1">
                                {chartType.chart === "bar" ?
                                    (chartType.type === "default" ?
                                        < BarChart width={700} height={400} className="w-full" data={calendarData.current}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey={"date"} />
                                            <YAxis label={{ value: `${session?.user.currency}[${currencyTypeString(session?.user.currency || "").currency}]`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                            <Tooltip content={<CustomeToolTip />} />
                                            {/* <Tooltip /> */}
                                            {/* <Legend /> */}
                                            <Bar dataKey={"savings"} fill="#ffaf33" />
                                        </BarChart>
                                        :
                                        < BarChart width={700} height={400} className="w-full" data={calendarData.combined}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey={"label"} />
                                            <YAxis label={{ value: `${session?.user.currency}[${currencyTypeString(session?.user.currency || "").currency}]`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                            <Tooltip content={<CustomToolTipComp />} />
                                            <Bar dataKey={"prevSavings"} fill="#c6ae8b" />
                                            <Bar dataKey={"currSavings"} fill="#ffaf33" />
                                        </BarChart>
                                    )
                                    :
                                    chartType.chart === "line" ?
                                        (chartType.type === "default" ?
                                            < LineChart width={700} height={400} className="w-full" data={calendarData.current}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey={"date"} />
                                                <YAxis label={{ value: `${session?.user.currency}[${currencyTypeString(session?.user.currency || "").currency}]`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                                <Tooltip content={<CustomeToolTip />} />
                                                {/* <Tooltip /> */}
                                                {/* <Legend /> */}
                                                <Line type="monotone" dataKey={"savings"} stroke="#ffaf33" strokeWidth={3} />
                                            </LineChart>
                                            :
                                            < LineChart width={700} height={400} className="w-full" data={calendarData.combined}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey={"label"} />
                                                <YAxis label={{ value: `${session?.user.currency}[${currencyTypeString(session?.user.currency || "").currency}]`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                                <Tooltip content={<CustomToolTipComp />} />
                                                <Line type="monotone" dataKey={"prevSavings"} stroke="#f0dec4" strokeWidth={3} />
                                                <Line type="monotone" dataKey={"currSavings"} stroke="#ffaf33" strokeWidth={3} />
                                            </LineChart>
                                        )
                                        :
                                        (chartType.type === "default" ?
                                            < ComposedChart width={700} height={400} className="w-full" data={calendarData.current}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey={"date"} />
                                                <YAxis label={{ value: `${session?.user.currency}[${currencyTypeString(session?.user.currency || "").currency}]`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                                <Tooltip content={<CustomeToolTip />} />
                                                {/* <Tooltip /> */}
                                                {/* <Legend /> */}
                                                <Bar dataKey={"savings"} fill="#ffaf33" />
                                                <Line type="monotone" dataKey={"savings"} stroke="#ffaf33" strokeWidth={3} />
                                            </ComposedChart>
                                            :
                                            < ComposedChart width={700} height={400} className="w-full" data={calendarData.combined}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey={"label"} />
                                                <YAxis label={{ value: `${session?.user.currency}[${currencyTypeString(session?.user.currency || "").currency}]`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                                <Tooltip content={<CustomToolTipComp />} />
                                                <Bar dataKey={"prevSavings"} fill="#c6ae8b" />
                                                <Bar dataKey={"currSavings"} fill="#ffaf33" />
                                                <Line type="monotone" dataKey={"prevSavings"} stroke="#f0dec4" strokeWidth={3} />
                                                <Line type="monotone" dataKey={"currSavings"} stroke="#ffaf33" strokeWidth={3} />
                                            </ComposedChart>
                                        )
                                }
                            </div>
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
                                    {/* TODO: when I click one of resources/categories, I can see the details (categories/subcategories) */}
                                    {chartType.type === "default" ?
                                        // current 
                                        <PieChart width={680} height={500}>
                                            <Tooltip content={<CustomToolTipIncomeResource />} />
                                            <Pie data={catGroup?.current.income.resource} dataKey="rate" cx="50%" cy="50%" outerRadius={230} fill="#ffaf33" />
                                        </PieChart>
                                        :
                                        // Comp
                                        <PieChart width={680} height={500}>
                                            <Tooltip content={<CustomToolTipIncomeResource />} />
                                            <Pie data={catGroup?.current.income.resource} dataKey="rate" cx="50%" cy="50%" outerRadius={140} fill="#ffaf33" />
                                            <Pie data={catGroup?.prev.income.resource} dataKey="rate" cx="50%" cy="50%" innerRadius={150} outerRadius={230} fill="#f0dec4" />
                                        </PieChart>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {graphOption &&
                <div className="relative z-[999]">
                    <div className="inset-0 fixed bg-white/50" />
                    <div className="inset-0 fixed flex items-center justify-center">
                        <div className="sm:w-[480px] w-full bg-white rounded-md border-2 border-solid border-slate-800 px-4 py-3 flex flex-col items-start">
                            {/* Title */}
                            <h2 className="text-xl font-[700] text-slate-800 mb-5">Graph Type Change</h2>
                            <div className="grid grid-cols-[1fr_1fr] gap-2 w-full">
                                {/* Default */}
                                <button className={`${chartType.type === "default" ? "bg-green-500/30 hover:bg-green-300/30" : "bg-slate-500/30 hover:bg-slate-300/30"} flex items-center gap-2 px-2 py-1 rounded-full`}
                                    type="button"
                                    onClick={() => {
                                        setChartType((prev) => ({ ...prev, type: "default" }));
                                        setGraphOption(false);
                                    }}
                                >
                                    {chartType.type === "default" && <FaCheck size={24} className="text-green-500 group-hover:text-green-500/50" />}
                                    <p className={`${chartType.type === "default" ? "text-green-500 group-hover:text-green-500/50" : "text-slate-800 group-hover:text-slate-800/50"} text-lg`}>Default</p>
                                </button>

                                {/* Comparison */}
                                <button className={`${chartType.type === "comparison" ? "bg-green-500/30 hover:bg-green-300/30" : "bg-slate-500/30 hover:bg-slate-300/30"} flex items-center gap-2 px-2 py-1 rounded-full`}
                                    type="button"
                                    onClick={() => {
                                        setChartType((prev) => ({ ...prev, type: "comparison" }));
                                        setGraphOption(false);
                                    }}
                                >
                                    {chartType.type === "comparison" && <FaCheck size={24} className="text-green-500 group-hover:text-green-500/50" />}
                                    <p className={`${chartType.type === "comparison" ? "text-green-500 group-hover:text-green-500/50" : "text-slate-800 group-hover:text-slate-800/50"} text-lg`}>Comparison</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}