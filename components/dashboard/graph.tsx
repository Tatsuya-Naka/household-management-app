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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

// TODO: receive data from the client based on the date
// TODO: Eliminate data based on the type (income or expenses)
// TODO: Graph (Bar and Line and additional figures for income & expenses) & Category for Income & expenses
// TODO: Figures on the graph

type Data = {
    type: { name: string }, currency: { name: string }, Items: {
        category: { name: string }, subcategory: { name: string } | null,
    }[], income_amount: number | null, totalcost: number | null, payment_method: string | null, xrateId: string | null,
    incomeresource: { name: string } | null, incomecategory: { name: string } | null, dateString: string, dateCalendar: string,
};

type forGraph = {
    dateCalendar: string;
    amount: number;
    dayOfWeek: string;
    label: string;
};

// type forCompGraph = {
//     dayOfWeek: string;
//     curr: number;
//     last: number;
// };

type CustomTooltipProps = {
    payload?: { payload: forGraph }[]; // `payload` from Recharts passed in
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

export default function DashboardGraph() {
    const params = useSearchParams();
    const fromDate = params.get("from");
    const toDate = params.get("to");
    const [from, setFrom] = useState(fromDate ? dayjs(fromDate).toDate() : new Date());
    const [to, setTo] = useState(toDate ? dayjs(toDate).toDate() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const [isFrom, setIsFrom] = useState(false);
    const [isTo, setIsTo] = useState(false);
    const [isFetched, setIsFetched] = useState(false);

    const [calendar, setCalendar] = useState(false);

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
        redirect(`${paths.home()}?from=${dayjs(from)}&to=${dayjs(to)}`)
    }

    const [currentIncome, setCurrentIncome] = useState<Data[]>();
    const [prevIncome, setPrevIncome] = useState<Data[]>();
    const [expense, setExpense] = useState<forGraph[]>();
    // const [compExpense, setCompExpense] = useState<forCompGraph[]>();

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

                // TODO: sort by date and add the date with 0 totalcost/income_amount
                // TODO: combine prev and current data for the rechart.
                setCurrentIncome(result.current
                    .filter((data: Data) => data.type.name === "income")
                );
                setPrevIncome(result.prev.filter((data: Data) => data.type.name === "income"));

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

                for (let i = start; i <= end; i += 86400000) {
                    scheduleCurrent[generateDateFormat(new Date(i))] = { totalCost: 0, dayOfWeek: dayjs(i).format("ddd") };
                }

                console.log({ schedule: scheduleCurrent });

                for (let i = 0; i < currentExpense.length; i++) {
                    const data = currentExpense[i];
                    scheduleCurrent[data.dateCalendar].totalCost += data.totalcost;
                    scheduleCurrent[data.dateCalendar].totalCost = (scheduleCurrent[data.dateCalendar].totalCost * 100) / 100;
                }

                const currExpenseArray = Object.entries(scheduleCurrent).map(([dateCalendar, value]) => ({
                    dateCalendar,
                    amount: value.totalCost,
                    dayOfWeek: value.dayOfWeek,
                    label: `${dateCalendar} (${value.dayOfWeek})`
                }));

                console.log({ curr: currExpenseArray });
                setExpense(currExpenseArray);

                // Prev Expense data
                const prevExpense = result.prev
                    .filter((data: Data) => data.type.name === "expenses")
                    .sort((a: Data, b: Data) => new Date(a.dateString).getTime() - new Date(b.dateString).getTime());
                const schedulePrev: { [dateCalendar: string]: { totalCost: number, dayOfWeek: string } } = {};
                for (let i = startPrev; i <= endPrev; i += 86400000) {
                    schedulePrev[generateDateFormat(new Date(i))] = {totalCost: 0, dayOfWeek: dayjs(i).format('ddd')};
                }
                for (let i = 0; i < prevExpense.length; i++) {
                    const data = prevExpense[i];
                    schedulePrev[data.dateCalendar].totalCost += data.totalcost;
                    schedulePrev[data.dateCalendar].totalCost = (schedulePrev[data.dateCalendar].totalCost * 100) / 100;
                }

                const prevExpenseArray = Object.entries(schedulePrev).map(([dateCalendar, value]) => ({
                    dateCalendar,
                    amount: value.totalCost,
                    dayOfWeek: value.dayOfWeek,
                }));

                console.log({prev: prevExpenseArray});

                // setPrevExpense();

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
        console.log({ CurrentIncome: currentIncome });
        console.log({ PrevIncome: prevIncome });
        console.log({ expense: expense });
    }, [currentIncome, prevIncome, expense]);

    // CustomToolTip
    const CustomeToolTip = (({payload}: CustomTooltipProps) => {
        if (payload && payload.length > 0) {
            const {label, amount} = payload[0].payload;

            return (
                <div className="bg-white border-2 border-slate-800 border-solid rounded-md px-3 py-2 flex flex-col items-start">
                    <h3 className="text-base font-[700] text-slate-800">{label}</h3>
                    <p className="text-base font-[700] text-[#ffaf33]">amount: {amount}</p>
                </div>
            )
        }
        return null;
    });

    return (
        <div className="grid grid-rows-[80px_auto] -mr-[81px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        type="button"
                        className="underline underline-offset-4 text-xl font-[700] text-slate-800 mr-10"
                    >
                        Bar
                    </button>

                    <button
                        type="button"
                        className="font-[500] text-slate-800 text-xl hover:underline hover:underline-offset-4 mr-10"
                    >
                        Line
                    </button>

                    <button
                        type="button"
                        className="font-[500] text-slate-800 text-xl hover:underline hover:underline-offset-4"
                    >
                        Band
                    </button>
                </div>

                {/* Calendar */}
                <div className="relative z-10">
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
            <div className="grid grid-cols-[1fr_480px] ">
                {/* Graph for income & expenses (Bar, line, and ) */}
                <div className="w-full bg-white rounded-xl shadow-xl px-2 py-1">
                    <BarChart width={850} height={400} className="w-full" data={expense}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={"dateCalendar"} />
                        <YAxis label={{ value: "AUD[$]", angle: -90, position: `insideLeft`, style: { textAnchor: `middle` } }} />
                        <Tooltip content={<CustomeToolTip />} />
                        {/* <Tooltip /> */}
                        {/* <Legend /> */}
                        {/* <Bar dataKey={"totalCost"} fill="#f0dec4" /> */}
                        <Bar dataKey={"amount"} fill="#ffaf33" />
                    </BarChart>
                </div>

                {/* Category */}
                <div className="w-full bg-white rounded-xl shadow-xl px-2 py-1">

                </div>
            </div>
        </div>
    )
}