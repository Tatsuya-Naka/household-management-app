'use server';

import xrateCalc from "@/components/xrate/xrate_calc";
import { db } from "@/lib/db";
import { XRateType } from "@/type/xrate";
import dayjs from "dayjs";

const getXRate = async (from: string, to: string): Promise<XRateType[]> => {
    'use server';
    const lastMonth = getLastMonth();
    const today = getToday();
    const fromLCS = from ? from.toLowerCase() : "";
    const toLCS = to ? to.toLowerCase() : "";

    const selectColumns: Record<string, boolean> = {
        date: true, base: true, 
    }
    if (from) selectColumns[fromLCS] = true;
    if (to) selectColumns[toLCS] = true;
    
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
        const fromValue = Number(item[fromLCS]);
        
        const toValue = Number(item[toLCS]);

        return {
            date: String(item.date),
            base: String(item.base),
            from: 1,
            to: xrateCalc(fromValue, toValue)
        };
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