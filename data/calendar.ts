import { CalendarFixingType, CalendarGraphCombineType, CalendarGraphType } from "@/type/calendar";
import { generateDateFormat } from "./date";
import dayjs from "dayjs";

interface CalendarFixingProps {
    data: CalendarFixingType[];
    from: number;
    to: number;
}
export function CalendarFixingRecords({data, from, to}: CalendarFixingProps) {
    const sortedData = data.sort((a: CalendarFixingType, b: CalendarFixingType) => {
        const data1 = new Date(a.dateString).getTime();
        const data2 = new Date(b.dateString).getTime();
        return data1 - data2;
    });

    const schedule: { [dateCalendar: string]: { total: number, dayOfWeek: string}} = {};
    for (let i = from; i <= to; i+=86400000) {
        schedule[generateDateFormat(new Date(i))] = {total: 0, dayOfWeek: dayjs(i).format("ddd")};
    }

    let total = 0;
    for (let i = 0; i < sortedData.length; i++) {
        const record = sortedData[i];
        if (record.income_amount) {
            schedule[record.dateCalendar].total += (record.income_amount * 100) / 100;
            total += (record.income_amount * 100) / 100;
        }
    }

    const vec = Object.entries(schedule).map(([dateCalendar, values]) => ({
        date: dateCalendar,
        amount: values.total,
        dayOfWeek: values.dayOfWeek,
        label: `${dateCalendar} (${values.dayOfWeek})`
    }));

    return {
        total,
        data: vec,
    };
}

interface CalendarFixingRecordsCombineProps {
    current: CalendarGraphType[];
    prev: CalendarGraphType[];
}

export function CalendarFixingRecordsCombine({current, prev}: CalendarFixingRecordsCombineProps) {
    const response: CalendarGraphCombineType[] = [];
    for (let i = 0; i < current.length && i < prev.length; i++) {
        const currData = current[i], prevData = prev[i];
        response.push({
            dateCurr: currData.date,
            currAmount: currData.amount,
            datePrev: prevData.date,
            prevAmount: prevData.amount,
            label: `${prevData.date} | ${currData.date}`
        });
    }

    return {
        data: response
    };
}