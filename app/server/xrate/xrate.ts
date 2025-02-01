'use server';

import { db } from "@/lib/db";
import { XRateType } from "@/type/xrate";
import dayjs from "dayjs";

const getXRate = async (from: string, to: string): Promise<XRateType[]> => {
    'use server';
    const lastMonth = getLastMonth();
    const today = getToday();

    const selectColumns: Record<string, boolean> = {
        date: true, base: true, 
    }
    if (from) selectColumns[from.toLowerCase()] = true;
    if (to) selectColumns[to.toLowerCase()] = true;
    
    const data = await db.xRate.findMany({
        where: {
            date: {
                gte: lastMonth,
                lte: today
            }
        },
        select: selectColumns,
        orderBy: {
            date: "asc",
        }
    });

    const result: XRateType[] = data.map((item) => {
        return {date: String(item.date), base: String(item.base), from: Number(item[from.toLowerCase()]), to: Number(item[to.toLowerCase()])}
    });

    return result;
}

const getToday = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return dayjs(date).format('YYYY-MM-DD');
}

const getLastMonth = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setMonth(date.getMonth() - 1);
    return dayjs(date).format('YYYY-MM-DD');
}

export { getXRate };