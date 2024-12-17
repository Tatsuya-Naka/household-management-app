"use client";

import { generateDateFormat } from "@/data/date";
import { useState } from "react";
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
            <div className="grid grid-cols-[1fr_240px] ">

            </div>
        </div>
    )
}