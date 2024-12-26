"use client";

import { generateDateFormat } from "@/data/date";
import { useEffect, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { redirect, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";

import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';
import isSameOrAfterPlugin from 'dayjs/plugin/isSameOrAfter';
import isSameOrBeforePlugin from "dayjs/plugin/isSameOrBefore";
import paths from "@/paths";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, ComposedChart, PieChart, Pie } from "recharts";
import { IoMdArrowDropup } from "react-icons/io";
import ShowData from "./show-num";
import { Session } from "inspector/promises";
import { User } from "@prisma/client";

// TODO: Cateogry for Income and Mix and Comp each
// TODO: subCategory by cliking button ans can see it

type cateCost = {
    category: string;
    costRate: number;
}

type customUser = User & {
    currency: string;
    location: string;
}
type customSession = Session & {
    user: customUser;
}

type Data = {
    type: { name: string }, currency: { name: string }, Items: {
        category: { name: string }, subcategory: { name: string } | null, cost: number
    }[], income_amount: number | null, totalcost: number | null, payment_method: string | null, xrateId: string | null,
    incomeresource: { name: string } | null, incomecategory: { name: string } | null, dateString: string, dateCalendar: string,
};

type forGraph = {
    dateCalendar: string;
    amount: number;
    dayOfWeek: string;
    label: string;
};

type forCompGraph = {
    currString: string;
    currNum: number;
    prevString: string;
    prevNum: number;
    label: string;
};

type CustomTooltipProps = {
    payload?: { payload: forGraph }[]; // `payload` from Recharts passed in
};
type CustomeTooltipCompProps = {
    payload?: { payload: forCompGraph }[];
};

type CustomToolTipCategoryProps = {
    payload?: { payload: cateCost }[];
};

dayjs.extend(isSameOrAfterPlugin);  // Extend dayjs with the plugin
dayjs.extend(isSameOrBeforePlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
    isSelected: boolean;
}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, day }) => ({
    borderRadius: 0,
    ...(isSelected && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
    }),
    ...(day.day() === 0 && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(day.day() === 6 && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInRange = (day: Dayjs, from: Dayjs | null | undefined, to: Dayjs | null | undefined) => {
    return day.isSameOrAfter(from, "day") && day.isSameOrBefore(to, "day");
};

function Day(
    props: PickersDayProps<Dayjs> & {
        selectedDay?: Dayjs | null;
        hoveredDay?: Dayjs | null;
    },
) {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{ px: 2.5 }}
            disableMargin
            selected={false}
            isSelected={isInRange(day, selectedDay, hoveredDay)}
        />
    );
}

export default function DashboardContainer() {
    const params = useSearchParams();
    const fromDate = params.get("from");
    const toDate = params.get("to");
    const typeParams = params.get("type");
    const [from, setFrom] = useState(fromDate ? dayjs(fromDate).toDate() : new Date(Date.now() - 6 * 24 * 60 * 60 * 1000));
    const [to, setTo] = useState(toDate ? dayjs(toDate).toDate() : new Date(Date.now()));
    const [isFrom, setIsFrom] = useState(false);
    const [isTo, setIsTo] = useState(false);
    const [isFetched, setIsFetched] = useState(false);

    const [calendar, setCalendar] = useState(false);
    const [graphChange, setGraphChange] = useState("default");
    const [openGChange, setOpenGChange] = useState(false);
    const [chartType, setChartType] = useState("bar");
    const [type, setType] = useState(typeParams ? typeParams : "expenses");

    const handleDateChange = (newValue: Dayjs | null) => {
        if ((!isFrom || (isFrom && isTo)) && newValue) {
            setFrom(newValue.toDate());
            setIsFrom(true);
            setIsTo(false);
        } else if (isFrom && !isTo && newValue) {
            if (newValue.isBefore(from)) {
                setTo(from);
                setFrom(newValue.toDate());
                setIsTo(true);
                setIsFrom(true);
            } else {
                setTo(newValue.toDate());
                setIsTo(true);
            }
        }
    };

    const handleSubmit = () => {
        redirect(`${paths.home()}?from=${dayjs(from)}&to=${dayjs(to)}&type=${type}`)
    }

    const [expense, setExpense] = useState<forGraph[]>();
    const [compExpense, setCompExpense] = useState<forCompGraph[]>();
    const [income, setIncome] = useState<forGraph[]>();
    const [compIncome, setCompIncome] = useState<forCompGraph[]>();
    const [saving, setSaving] = useState<forGraph[]>();
    const [compSaving, setCompSaving] = useState<forCompGraph[]>();
    const [session, setSession] = useState<customSession>();
    const [totalExpese, setTotalExpense] = useState<number>(0);
    const [prevCompExpense, setPrevCompExpense] = useState<number>(0);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [prevCompIncome, setPrevCompIncome] = useState<number>(0);
    const [totalSaving, setTotalSaving] = useState<number>(0);
    const [prevCompSaving, setPrevCompSaving] = useState<number>(0);
    const [categoryExp, setCategoryExp] = useState<cateCost[]>();
    // const [categoryPrevExp, setCategoryPrevExp] = useState<cateCost[]>();

    useEffect(() => {
        const fetchData = async () => {
            if (!isFetched) {
                const duration = (new Date(to)).setHours(0, 0, 0, 0) - (new Date(from)).setHours(0, 0, 0, 0);
                const start = (new Date(from)).setHours(0, 0, 0, 0);
                const end = (new Date(to)).setHours(0, 0, 0, 0) + 86400000 - 1;
                const startPrev = (new Date(from)).setHours(0, 0, 0, 0) - duration - 86400000;
                const endPrev = (new Date(to)).setHours(0, 0, 0, 0) - duration - 1;
                // console.log({fromOrigin: from});
                console.log({ milliseconds: (new Date(from)).setHours(0, 0, 0, 0) });
                console.log({ from: new Date((new Date(from)).setHours(0, 0, 0, 0)) });

                const response = await fetch(paths.dashboardFetchUrl(), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        // get the end of the date & adjust times to 00:00:00
                        from: start,
                        to: end,
                        fromPrev: startPrev,
                        toPrev: endPrev,
                    })
                });
                const result = await response.json();

                // Session data
                setSession(result.session);
                // TODO: sort by date and add the date with 0 totalcost/income_amount
                // TODO: combine prev and current data for the rechart.
                const currentIncome = result.current
                    .filter((data: Data) => data.type.name === "income")
                    .sort((a: Data, b: Data) => {
                        const data1 = new Date(a.dateString).getTime();
                        const data2 = new Date(b.dateString).getTime();
                        return data1 - data2;
                    });

                const scheduleIncomeCurr: { [dateCalendar: string]: { totalIncome: number, dayOfWeek: string } } = {};

                for (let i = start; i <= end; i += 86400000) {
                    scheduleIncomeCurr[generateDateFormat(new Date(i))] = { totalIncome: 0, dayOfWeek: dayjs(i).format("ddd") };
                }

                let calcIncome = 0;
                for (let i = 0; i < currentIncome.length; i++) {
                    const data = currentIncome[i];
                    scheduleIncomeCurr[data.dateCalendar].totalIncome += data.income_amount;
                    scheduleIncomeCurr[data.dateCalendar].totalIncome = (scheduleIncomeCurr[data.dateCalendar].totalIncome * 100) / 100;
                    calcIncome += data.income_amount;
                    calcIncome = Math.round(calcIncome * 100) / 100;
                }

                const currIncomeArray = Object.entries(scheduleIncomeCurr).map(([dateCalendar, value]) => ({
                    dateCalendar,
                    amount: value.totalIncome,
                    dayOfWeek: value.dayOfWeek,
                    label: `${dateCalendar} (${value.dayOfWeek})`
                }));

                setIncome(currIncomeArray);

                const prevIncome = result.prev
                    .filter((data: Data) => data.type.name === "income")
                    .sort((a: Data, b: Data) => {
                        const data1 = new Date(a.dateString).getTime();
                        const data2 = new Date(b.dateString).getTime();
                        return data1 - data2;
                    });

                const scheduleIncomePrev: { [dateCalendar: string]: { totalIncome: number, dayOfWeek: string } } = {};

                for (let i = startPrev; i <= endPrev; i += 86400000) {
                    scheduleIncomePrev[generateDateFormat(new Date(i))] = { totalIncome: 0, dayOfWeek: dayjs(i).format("ddd") };
                }

                let calcIncomePrev = 0;
                for (let i = 0; i < prevIncome.length; i++) {
                    const data = prevIncome[i];
                    scheduleIncomePrev[data.dateCalendar].totalIncome += data.income_amount;
                    scheduleIncomePrev[data.dateCalendar].totalIncome = (scheduleIncomePrev[data.dateCalendar].totalIncome * 100) / 100;
                    calcIncomePrev += data.income_amount;
                    calcIncomePrev = Math.round(calcIncomePrev * 100) / 100;
                }

                const prevIncomeArray = Object.entries(scheduleIncomePrev).map(([dateCalendar, value]) => ({
                    dateCalendar,
                    amount: value.totalIncome,
                    dayOfWeek: value.dayOfWeek,
                    label: `${dateCalendar} (${value.dayOfWeek})`
                }));

                const calcRateIncome = Number((((calcIncome - calcIncomePrev) / calcIncomePrev) * 100).toFixed(2));
                setTotalIncome(calcIncome);
                setPrevCompIncome(calcRateIncome);

                const compIncomeArray: forCompGraph[] = [];
                for (let i = 0; i < currIncomeArray.length && i < prevIncomeArray.length; i++) {
                    const currData = currIncomeArray[i];
                    const prevData = prevIncomeArray[i];
                    compIncomeArray.push({
                        currString: currData.dateCalendar,
                        currNum: currData.amount,
                        prevString: prevData.dateCalendar,
                        prevNum: prevData.amount,
                        label: `${prevData.dateCalendar} | ${currData.dateCalendar}`
                    });
                };
                setCompIncome(compIncomeArray);

                // Current Expense Data
                const currentExpense = result.current
                    .filter((data: Data) => data.type.name === "expenses")
                    .sort((a: Data, b: Data) => {
                        const date1 = new Date(a.dateString).getTime();
                        const date2 = new Date(b.dateString).getTime();
                        return date1 - date2;
                    });

                console.log({ current: currentExpense });
                const scheduleCurrent: { [dateCalendar: string]: { totalCost: number, dayOfWeek: string } } = {};
                const categoryCurrExpense: { [dateCalendar: string]: number } = {};

                for (let i = start; i <= end; i += 86400000) {
                    scheduleCurrent[generateDateFormat(new Date(i))] = { totalCost: 0, dayOfWeek: dayjs(i).format("ddd") };
                }

                let calcExpense = 0;
                // console.log({ data: currentExpense[0].Items[0].cost });
                for (let i = 0; i < currentExpense.length; i++) {
                    const data = currentExpense[i];
                    scheduleCurrent[data.dateCalendar].totalCost += data.totalcost;
                    scheduleCurrent[data.dateCalendar].totalCost = (scheduleCurrent[data.dateCalendar].totalCost * 100) / 100;
                    calcExpense += data.totalcost;
                    calcExpense = Math.round(calcExpense * 100) / 100;
                    // Category
                    if (data.Items && data.Items.length > 0) {
                        for (let j = 0; j < data.Items.length; j++) {
                            const item = data.Items[j];
                            const category = item.category.name;
                            const cost = item.cost;
                            if (!(category in categoryCurrExpense)) {
                                categoryCurrExpense[category] = 0;
                            }
                            categoryCurrExpense[category] += cost;
                        }
                    }
                }

                const currExpenseArray = Object.entries(scheduleCurrent).map(([dateCalendar, value]) => ({
                    dateCalendar,
                    amount: value.totalCost,
                    dayOfWeek: value.dayOfWeek,
                    label: `${dateCalendar} (${value.dayOfWeek})`
                }));

                const cateCurrExpenseArray = Object.entries(categoryCurrExpense).map(([category, cost]) => ({
                    category,
                    costRate: Math.round((cost / calcExpense) * 10000) / 100,
                }));

                setCategoryExp(cateCurrExpenseArray);

                console.log({ curr: currExpenseArray });
                console.log({ Category: cateCurrExpenseArray });
                setExpense(currExpenseArray);

                // Prev Expense data
                const prevExpense = result.prev
                    .filter((data: Data) => data.type.name === "expenses")
                    .sort((a: Data, b: Data) => new Date(a.dateString).getTime() - new Date(b.dateString).getTime());
                const schedulePrev: { [dateCalendar: string]: { totalCost: number, dayOfWeek: string } } = {};
                for (let i = startPrev; i <= endPrev; i += 86400000) {
                    schedulePrev[generateDateFormat(new Date(i))] = { totalCost: 0, dayOfWeek: dayjs(i).format('ddd') };
                }
                let calcPrevExpense = 0;
                for (let i = 0; i < prevExpense.length; i++) {
                    const data = prevExpense[i];
                    schedulePrev[data.dateCalendar].totalCost += data.totalcost;
                    schedulePrev[data.dateCalendar].totalCost = (schedulePrev[data.dateCalendar].totalCost * 100) / 100;
                    calcPrevExpense += data.totalcost;
                    calcPrevExpense = Math.round(calcPrevExpense * 100) / 100;
                }

                const calcRateExpense = Number((((calcExpense - calcPrevExpense) / calcPrevExpense) * 100).toFixed(2));
                setTotalExpense(calcExpense);
                setPrevCompExpense(calcRateExpense);

                const prevExpenseArray = Object.entries(schedulePrev).map(([dateCalendar, value]) => ({
                    dateCalendar,
                    amount: value.totalCost,
                    dayOfWeek: value.dayOfWeek,
                }));

                // console.log({prev: prevExpenseArray});

                const compExpenseArray: forCompGraph[] = [];
                for (let i = 0; i < currExpenseArray.length && i < prevExpenseArray.length; i++) {
                    const currData = currExpenseArray[i];
                    const prevData = prevExpenseArray[i];
                    compExpenseArray.push({
                        currString: currData.dateCalendar,
                        currNum: currData.amount,
                        prevString: prevData.dateCalendar,
                        prevNum: prevData.amount,
                        label: `${prevData.dateCalendar} | ${currData.dateCalendar}`
                    });
                };

                setCompExpense(compExpenseArray);

                // TODO: saving
                const scheduleSaving: { [dateCalendar: string]: { totalSaving: number, dayOfWeek: string } } = {};

                let totalSaving = 0;
                for (let i = start; i <= end; i += 86400000) {
                    const eachSaving = Math.round((scheduleIncomeCurr[generateDateFormat(new Date(i))].totalIncome - scheduleCurrent[generateDateFormat(new Date(i))].totalCost) * 100) / 100;
                    totalSaving += eachSaving;
                    totalSaving = Math.round(totalSaving * 100) / 100;
                    scheduleSaving[generateDateFormat(new Date(i))] = { totalSaving: totalSaving, dayOfWeek: dayjs(i).format("ddd") };
                }
                console.log({ scheduleSaving: scheduleSaving });

                const currSavingArray = Object.entries(scheduleSaving).map(([dateCalendar, value]) => ({
                    dateCalendar,
                    amount: value.totalSaving,
                    dayOfWeek: value.dayOfWeek,
                    label: `${dateCalendar} (${value.dayOfWeek})`
                }));
                setSaving(currSavingArray);

                let calcPreSaving = 0;
                const scheduleSavingPrev: { [dateCalendar: string]: { totalSaving: number, dayOfWeek: string } } = {};
                for (let i = startPrev; i <= endPrev; i += 86400000) {
                    const eachSaving = Math.round((scheduleIncomePrev[generateDateFormat(new Date(i))].totalIncome - schedulePrev[generateDateFormat(new Date(i))].totalCost) * 100) / 100;
                    calcPreSaving += eachSaving;
                    calcPreSaving = Math.round(calcPreSaving * 100) / 100;
                    scheduleSavingPrev[generateDateFormat(new Date(i))] = { totalSaving: calcPreSaving, dayOfWeek: dayjs(i).format('ddd') };
                }

                const prevSavingArray = Object.entries(scheduleSavingPrev).map(([dateCalendar, value]) => ({
                    dateCalendar,
                    amount: value.totalSaving,
                    dayOfWeek: value.dayOfWeek,
                    label: `${dateCalendar} (${value.dayOfWeek}),`
                }));

                setTotalSaving(totalSaving);
                const calcRateSaving = Number((((totalSaving - calcPreSaving) / Math.abs(calcPreSaving)) * 100).toFixed(2));
                setPrevCompSaving(calcRateSaving);

                const compSavingArray: forCompGraph[] = [];
                for (let i = 0; i < currSavingArray.length && i < prevSavingArray.length; i++) {
                    const currData = currSavingArray[i];
                    const prevData = prevSavingArray[i];
                    compSavingArray.push({
                        currString: currData.dateCalendar,
                        currNum: currData.amount,
                        prevString: prevData.dateCalendar,
                        prevNum: prevData.amount,
                        label: `${prevData.dateCalendar} | ${currData.dateCalendar}`
                    });
                };

                setCompSaving(compSavingArray);

                setIsFetched(true);
            }
        }
        fetchData()
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log("Internal Server Error");
                }
            })
    }, [isFetched, from, to]);

    useEffect(() => {
        console.log({ expense: expense });
        console.log({ compExpense: compExpense });
        console.log({ session: session?.user });
        console.log({ income: income });
        console.log({ compIncome: compIncome });
        console.log({ saving: saving });
    }, [expense, compExpense, session, income, compIncome, saving]);

    // CustomToolTip
    const CustomeToolTip = (({ payload }: CustomTooltipProps) => {
        if (payload && payload.length > 0) {
            const { label, amount } = payload[0].payload;

            return (
                <div className="bg-white border-2 border-slate-800 border-solid rounded-md px-3 py-2 flex flex-col items-start">
                    <h3 className="text-base font-[700] text-slate-800">{label}</h3>
                    <p className="text-base font-[700] text-[#ffaf33]">amount: {amount}</p>
                </div>
            )
        }
        return null;
    });

    const CustomToolTipComp = (({ payload }: CustomeTooltipCompProps) => {
        if (payload && payload.length > 0) {
            const { currString, currNum, prevString, prevNum } = payload[0].payload;

            return (
                <div className="bg-white border-2 border-slate-800 border-solid rounded-md px-3 py-2 flex flex-col items-start">
                    <h3 className="text-base font-[700] text-slate-800">Amount</h3>
                    <p className="text-base font-[700] text-[#ffaf33]">{currString}: {currNum}</p>
                    <p className="text-base font-[700] text-[#c6ae8b]">{prevString}: {prevNum}</p>
                </div>
            )
        }
    });
    const CustomToolTipCategory = (({ payload }: CustomToolTipCategoryProps) => {
        if (payload && payload.length > 0) {
            const { category, costRate } = payload[0].payload;

            return (
                <div className="bg-white border-2 border-slate-800 border-solid rounded-md px-2 py-1 flex flex-col items-start">
                    <h3 className="text-base font-[700] text-slate-800">{category}</h3>
                    <p className="text-base font-[700] text-[#ffaf33]">cost: {costRate}%</p>
                </div>
            )
        }
        return null;
    });

    return (
        <div className="w-full flex flex-col px-10">
            {/* Records  */}
            <div className="space-x-5 w-full -mt-16">
                <div className="space-x-5 w-full flex items-center justify-evenly">
                    {/* Income */}
                    <ShowData title="income" currencyType={session?.user.currency} num={totalIncome} prevRate={prevCompIncome}
                        onClick={() => setType("income")} />

                    {/* Expenses */}
                    <ShowData title="expenses" currencyType={session?.user.currency} num={totalExpese} prevRate={prevCompExpense}
                        onClick={() => setType("expenses")} />
                    {/* Savings */}

                    <ShowData title="saving" currencyType={session?.user.currency} num={totalSaving} prevRate={prevCompSaving}
                        onClick={() => setType("saving")} />
                </div>
            </div>

            {/* Graph */}
            <div className="grid grid-rows-[80px_auto] -mr-[81px]">
                <div className="grid grid-cols-[1fr_480px] gap-2">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <button
                                type="button"
                                className={`${chartType === "bar" ? "underline underline-offset-4 font-[700]" : "font-[500] hover:underline hover:underline-offset-4 "} text-xl text-slate-800 mr-10`}
                                onClick={() => setChartType("bar")}
                            >
                                Bar
                            </button>

                            <button
                                type="button"
                                className={`${chartType === "line" ? "underline underline-offset-4 font-[700]" : "font-[500] hover:underline hover:underline-offset-4 "} text-xl text-slate-800 mr-10`}
                                onClick={() => setChartType("line")}
                            >
                                Line
                            </button>

                            <button
                                type="button"
                                className={`${chartType === "mix" ? "underline underline-offset-4 font-[700]" : "font-[500] hover:underline hover:underline-offset-4 "} text-xl text-slate-800 mr-10`}
                                onClick={() => setChartType("mix")}
                            >
                                Mix
                            </button>
                        </div>
                        <div className="relative z-10">
                            <button className="cursor-pointer px-2 py-2 rounded-md bg-slate-800/50 text-white text-[700] text-xl flex items-center justify-between gap-1"
                                onClick={() => setOpenGChange(prev => !prev)}
                            >
                                <span className="capitalize w-28 text-left">{graphChange}</span>
                                <IoMdArrowDropup size={24} className={`${openGChange ? "rotate-180" : "rotate-0"} transition duration-300 ease-in`} />
                            </button>
                            {openGChange &&
                                <div className="absolute z-10 w-full">
                                    <div className="rounded-md border-2 border-slate-800/30 bg-white">
                                        <button className="text-base text-[500] text-slate-800 capitalize w-full text-left px-2 py-1"
                                            onClick={() => {
                                                setGraphChange(prev => prev === "default" ? "comparison" : "default");
                                                setOpenGChange(false);
                                            }}
                                        >
                                            {graphChange === "default" ? "comparison" : "default"}
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Calendar */}
                    <div className="relative z-10 shrink-0 flex items-center justify-end">
                        <div className="rounded-md bg-gray-400/50 px-3 py-1 text-slate-800 cursor-pointer" onClick={() => setCalendar(true)}>
                            <div className="flex items-center">
                                <label className="flex flex-col items-start mr-5 cursor-pointer">
                                    <span className="text-xs">
                                        From
                                    </span>
                                    <p className="text-base font-[600]">
                                        {generateDateFormat(from)}
                                    </p>
                                </label>
                                <label className="flex flex-col items-start cursor-pointer">
                                    <span className="text-xs">
                                        To
                                    </span>
                                    <p className="text-base font-[600]">
                                        {generateDateFormat(to)}
                                    </p>
                                </label>
                            </div>
                        </div>

                        {/* Calendar */}
                        {calendar &&
                            <div className="absolute top-[48px] right-0 left-auto bg-white rounded-md shadow-xl p-2">
                                <form className="flex flex-col items-center" action={handleSubmit}>
                                    <div className="flex items-center gap-2">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateCalendar
                                                value={isFrom || isTo ? dayjs(from) : null}
                                                onChange={handleDateChange}
                                                showDaysOutsideCurrentMonth
                                                displayWeekNumber
                                                slots={{ day: Day }}
                                                slotProps={{
                                                    day: () =>
                                                        ({
                                                            selectedDay: dayjs(from),
                                                            hoveredDay: dayjs(to),
                                                        }) as Partial<PickersDayProps<Dayjs>>,
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div className="flex items-center gap-2 w-full -mt-10 z-10">
                                        <button
                                            type="button"
                                            onClick={() => setCalendar(false)}
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

                {/* Graph & categories */}
                <div className="grid grid-cols-[1fr_480px] gap-2">
                    {/* Graph for income & expenses (Bar, line, and ) */}
                    <div className="w-full bg-white rounded-xl shadow-xl px-2 py-1">
                        {chartType === "bar" &&
                            (graphChange === "default"
                                ?
                                < BarChart width={850} height={400} className="w-full" data={(type === "income" ? income : type === "expenses" ? expense : saving)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey={"dateCalendar"} />
                                    <YAxis label={{ value: `${session?.user.currency}[${(session?.user.currency === "AUD" || session?.user.currency === "AUD") ? "$" : (session?.user.currency === "JPY" ? "¥" : "€")}] - ${type}`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                    <Tooltip content={<CustomeToolTip />} />
                                    {/* <Tooltip /> */}
                                    {/* <Legend /> */}
                                    <Bar dataKey={"amount"} fill="#ffaf33" />
                                </BarChart>
                                :
                                < BarChart width={850} height={400} className="w-full" data={(type === "income" ? compIncome : type === "expenses" ? compExpense : compSaving)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey={"label"} />
                                    <YAxis label={{ value: `${session?.user.currency}[${(session?.user.currency === "AUD" || session?.user.currency === "AUD") ? "$" : (session?.user.currency === "JPY" ? "¥" : "€")}] - ${type}`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                    <Tooltip content={<CustomToolTipComp />} />
                                    <Bar dataKey={"prevNum"} fill="#c6ae8b" />
                                    <Bar dataKey={"currNum"} fill="#ffaf33" />
                                </BarChart>
                            )
                        }
                        {chartType === "line" &&
                            (graphChange === "default"
                                ?
                                < LineChart width={850} height={400} className="w-full" data={(type === "income" ? income : type === "expenses" ? expense : saving)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey={"dateCalendar"} />
                                    <YAxis label={{ value: `${session?.user.currency}[${(session?.user.currency === "AUD" || session?.user.currency === "AUD") ? "$" : (session?.user.currency === "JPY" ? "¥" : "€")}] - ${type}`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                    <Tooltip content={<CustomeToolTip />} />
                                    {/* <Tooltip /> */}
                                    {/* <Legend /> */}
                                    <Line type="monotone" dataKey={"amount"} stroke="#ffaf33" strokeWidth={3} />
                                </LineChart>
                                :
                                < LineChart width={850} height={400} className="w-full" data={(type === "income" ? compIncome : type === "expenses" ? compExpense : compSaving)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey={"label"} />
                                    <YAxis label={{ value: `${session?.user.currency}[${(session?.user.currency === "AUD" || session?.user.currency === "AUD") ? "$" : (session?.user.currency === "JPY" ? "¥" : "€")}] - ${type}`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                    <Tooltip content={<CustomToolTipComp />} />
                                    <Line type="monotone" dataKey={"prevNum"} stroke="#f0dec4" strokeWidth={3} />
                                    <Line type="monotone" dataKey={"currNum"} stroke="#ffaf33" strokeWidth={3} />
                                </LineChart>
                            )
                        }
                        {chartType === "mix" &&
                            (graphChange === "default"
                                ?
                                < ComposedChart width={850} height={400} className="w-full" data={(type === "income" ? income : type === "expenses" ? expense : saving)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey={"dateCalendar"} />
                                    <YAxis label={{ value: `${session?.user.currency}[${(session?.user.currency === "AUD" || session?.user.currency === "AUD") ? "$" : (session?.user.currency === "JPY" ? "¥" : "€")}] - ${type}`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                    <Tooltip content={<CustomeToolTip />} />
                                    {/* <Tooltip /> */}
                                    {/* <Legend /> */}
                                    <Bar dataKey={"amount"} fill="#ffd27c" />
                                    <Line type="monotone" dataKey={"amount"} stroke="#ffaf33" strokeWidth={3} />
                                </ComposedChart>
                                :
                                < ComposedChart width={850} height={400} className="w-full" data={(type === "income" ? compIncome : type === "expenses" ? compExpense : compSaving)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey={"label"} />
                                    <YAxis label={{ value: `${session?.user.currency}[${(session?.user.currency === "AUD" || session?.user.currency === "AUD") ? "$" : (session?.user.currency === "JPY" ? "¥" : "€")}] - ${type}`, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                                    <Tooltip content={<CustomToolTipComp />} />
                                    <Bar dataKey={"prevNum"} fill="#c6ae8b" />
                                    <Bar dataKey={"currNum"} fill="#ffaf33" />
                                    <Line type="monotone" dataKey={"prevNum"} stroke="#f0dec4" strokeWidth={3} />
                                    <Line type="monotone" dataKey={"currNum"} stroke="#ffaf33" strokeWidth={3} />
                                </ComposedChart>
                            )
                        }
                    </div>

                    {/* Category */}
                    <div className="w-full bg-white rounded-xl shadow-xl px-2 py-1">
                        <PieChart width={480} height={400}>
                            <Tooltip content={<CustomToolTipCategory />} />
                            <Pie data={categoryExp} dataKey="costRate" cx="50%" cy="50%" outerRadius={180} fill="#ffaf33" />
                        </PieChart>
                    </div>
                </div>
            </div >
        </div>
    )
}