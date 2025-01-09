import { CalendarExpensesGraphCombineType, CalendarExpensesGraphType, CalendarFixingExpensesType, CalendarFixingSavingsExpensesType, CalendarFixingSavingsIncomeType, CalendarFixingType, CalendarGraphCombineType, CalendarGraphType, CalendarSavingsGraphCombineType, CalendarSavingsGraphType } from "@/type/calendar";
import { generateDateFormat } from "./date";
import dayjs from "dayjs";

interface CalendarFixingProps {
    data: CalendarFixingType[];
    from: number;
    to: number;
}
export function CalendarFixingRecords({ data, from, to }: CalendarFixingProps) {
    // const sortedData = data.sort((a: CalendarFixingType, b: CalendarFixingType) => {
    //     const data1 = new Date(a.dateString).getTime();
    //     const data2 = new Date(b.dateString).getTime();
    //     return data1 - data2;
    // });

    const schedule: { [dateCalendar: string]: { total: number, dayOfWeek: string } } = {};
    for (let i = from; i <= to; i += 86400000) {
        schedule[generateDateFormat(new Date(i))] = { total: 0, dayOfWeek: dayjs(i).format("ddd") };
    }

    let total = 0;
    for (let i = 0; i < data.length; i++) {
        const record = data[i];
        if (record.income_amount) {
            schedule[record.dateCalendar].total += (record.income_amount * 100) / 100;
            total += (record.income_amount * 100) / 100;
        }
    }

    const vec = Object.entries(schedule).map(([dateCalendar, values]) => ({
        date: dateCalendar,
        amount: Number(values.total.toFixed(2)),
        dayOfWeek: values.dayOfWeek,
        label: `${dateCalendar} (${values.dayOfWeek})`
    }));

    return {
        total: Math.round(total*100) / 100,
        data: vec,
    };
}


interface CalendarFixingExpensesProps {
    data: CalendarFixingExpensesType[];
    from: number;
    to: number;
}
export function CalendarFixingExpensesRecords({ data, from, to }: CalendarFixingExpensesProps) {
    // const sortedData = data.sort((a: CalendarFixingExpensesType, b: CalendarFixingExpensesType) => {
    //     const data1 = new Date(a.dateString).getTime();
    //     const data2 = new Date(b.dateString).getTime();
    //     return data1 - data2;
    // });

    const schedule: { [dateCalendar: string]: { total: number, dayOfWeek: string } } = {};
    for (let i = from; i <= to; i += 86400000) {
        schedule[generateDateFormat(new Date(i))] = { total: 0, dayOfWeek: dayjs(i).format("ddd") };
    }

    let total: number = 0;
    // for (let i = 0; i < sortedData.length; i++) {
    //     const record = sortedData[i];
    //     if (record.totalcost) {
    //         schedule[record.dateCalendar].total += (record.totalcost * 100) / 100;
    //         total += (record.totalcost * 100) / 100;
    //     }
    // }
    for (let i = 0; i < data.length; i++) {
        const record = data[i];
        if (record.totalcost) {
            schedule[record.dateCalendar].total += (record.totalcost * 100) / 100;
            total += (record.totalcost * 100) / 100;
        }
    }

    const vec = Object.entries(schedule).map(([dateCalendar, values]) => ({
        date: dateCalendar,
        costs: Number(values.total.toFixed(2)),
        dayOfWeek: values.dayOfWeek,
        label: `${dateCalendar} (${values.dayOfWeek})`
    }));

    return {
        total: Math.round(total*100) / 100,
        data: vec,
    };
}

interface CalendarFixingSavingsProps {
    income: CalendarFixingSavingsIncomeType[];
    expenses: CalendarFixingSavingsExpensesType[];
    from: number;
    to: number;
}
export function CalendarFixingSavingsRecords({ income, expenses, from, to }: CalendarFixingSavingsProps) {
    const scheduleInc: { [dateCalendar: string]: { total: number, dayOfWeek: string } } = {};
    const scheduleExp: { [dateCalendar: string]: { total: number, dayOfWeek: string } } = {};
    const schedule: { [dateCalendar: string]: { total: number, dayOfWeek: string } } = {};

    const resInc: { [resource: string]: number } = {};
    const cateInc: { [resource: string]: { category: string, amount: number }[] } = {};

    for (let i = from; i <= to; i += 86400000) {
        scheduleInc[generateDateFormat(new Date(i))] = { total: 0, dayOfWeek: dayjs(i).format("ddd") };
        scheduleExp[generateDateFormat(new Date(i))] = { total: 0, dayOfWeek: dayjs(i).format("ddd") };
        schedule[generateDateFormat(new Date(i))] = { total: 0, dayOfWeek: dayjs(i).format("ddd") };
    }

    let totalInc: number = 0;
    for (let i = 0; i < income.length; i++) {
        const record = income[i];
        if (record.income_amount) {
            scheduleInc[record.dateCalendar].total += (record.income_amount * 100) / 100;
            totalInc += (record.income_amount * 100) / 100;
            if (!(record.incomeresource.name in resInc)) {
                resInc[record.incomeresource.name] = 0;
                cateInc[record.incomeresource.name] = [];
            }
            resInc[record.incomeresource.name] += (record.income_amount * 100) / 100;

            // subcategory
            if (record.incomecategory) {
                let category = cateInc[record.incomeresource.name].find(
                    (a) => a.category === record.incomecategory.name
                )
                if (!category) {
                    category = { category: record.incomecategory.name, amount: 0 };
                    cateInc[record.incomeresource.name].push(category);
                }
                category.amount += (record.income_amount * 100) / 100;
            }
        }
    }

    const cateExp: { [category: string]: number } = {};
    const subcatExp: { [category: string]: { subcategory: string, cost: number }[] } = {};
    let totalExp: number = 0;
    for (let i = 0; i < expenses.length; i++) {
        const record = expenses[i];
        if (record.totalcost) {
            scheduleExp[record.dateCalendar].total += (record.totalcost * 100) / 100;
            totalExp += (record.totalcost * 100) / 100;
            // console.log({record: record.Items});
            if (record.Items && record.Items.length > 0) {
                for (let j = 0; j < record.Items.length; j++) {
                    console.log({ item: record.Items[j] });
                    const category = record.Items[j].category.name;
                    const cost = record.Items[j].cost;
                    if (!(category in cateExp)) {
                        cateExp[category] = 0;
                        subcatExp[category] = [];
                    }
                    cateExp[category] += cost;

                    if (record.Items[j].subcategory) {
                        let subcat = subcatExp[category].find(
                            (a) => a.subcategory === record.Items[j].subcategory.name
                        );
                        if (!subcat) {
                            subcat = { subcategory: record.Items[j].subcategory.name, cost: 0 };
                            subcatExp[category].push(subcat);
                        }
                        subcat.cost += cost;
                    } else {
                        let subcat = subcatExp[category].find(
                            (a) => a.subcategory === "Other"
                        );
                        if (!subcat) {
                            subcat = {subcategory: "Other", cost: 0};
                            subcatExp[category].push(subcat);
                        }
                        subcat.cost += cost;
                    }
                }
            }
        }
    }

    let totalSaving: number = 0;
    for (let i = from; i <= to; i += 86400000) {
        const eachSaving = Math.round((scheduleInc[generateDateFormat(new Date(i))].total - scheduleExp[generateDateFormat(new Date(i))].total) * 100) / 100;
        totalSaving += eachSaving
        schedule[generateDateFormat(new Date(i))] = { total: totalSaving, dayOfWeek: dayjs(i).format("ddd") };
    }

    const vec = Object.entries(schedule).map(([dateCalendar, values]) => ({
        date: dateCalendar,
        savings: values.total,
        dayOfWeek: values.dayOfWeek,
        label: `${dateCalendar} (${values.dayOfWeek})`
    }));

    const resource = Object.entries(resInc).map(([resource, amount]) => ({
        resource,
        rate: Math.round((amount / totalInc) * 10000) / 100,
    }));

    const catIncome = Object.entries(cateInc).map(([resource, values]) => ({
        resource,
        categories: values.map((value) => ({
            category: value.category,
            rate: Math.round((value.amount / resInc[resource]) * 10000) / 100,
        }))
    }));

    const catExp = Object.entries(cateExp).map(([category, cost]) => ({
        category,
        rate: Math.round((cost / totalExp) * 10000) / 100,
    }));

    const subcat = Object.entries(subcatExp).map(([category, values]) => ({
        category,
        subcategories: values.map((value) => ({
            subcategory: value.subcategory,
            rate: Math.round((value.cost / cateExp[category]) * 10000) / 100,
        }))
    }))

    return {
        total: Math.round(totalSaving * 100) / 100,
        data: vec,
        income: {resource: resource, category: catIncome},
        expenses: {category: catExp, sub_category: subcat},
    };
}

interface CalendarFixingRecordsCombineProps {
    current: CalendarGraphType[];
    prev: CalendarGraphType[];
}

export function CalendarFixingRecordsCombine({ current, prev }: CalendarFixingRecordsCombineProps) {
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

interface CalendarFixingRecordsExpensesCombineProps {
    current: CalendarExpensesGraphType[];
    prev: CalendarExpensesGraphType[];
}

export function CalendarFixingRecordsExpensesCombine({ current, prev }: CalendarFixingRecordsExpensesCombineProps) {
    const response: CalendarExpensesGraphCombineType[] = [];
    for (let i = 0; i < current.length && i < prev.length; i++) {
        const currData = current[i], prevData = prev[i];
        response.push({
            dateCurr: currData.date,
            currCosts: currData.costs,
            datePrev: prevData.date,
            prevCosts: prevData.costs,
            label: `${prevData.date} | ${currData.date}`
        });
    }

    return {
        data: response
    };
}

interface CalendarFixingRecordsSavingsCombineProps {
    current: CalendarSavingsGraphType[];
    prev: CalendarSavingsGraphType[];
}

export function CalendarFixingRecordsSavingsCombine({ current, prev }: CalendarFixingRecordsSavingsCombineProps) {
    const response: CalendarSavingsGraphCombineType[] = [];
    for (let i = 0; i < current.length && i < prev.length; i++) {
        const currData = current[i], prevData = prev[i];
        response.push({
            dateCurr: currData.date,
            currSavings: currData.savings,
            datePrev: prevData.date,
            prevSavings: prevData.savings,
            label: `${prevData.date} | ${currData.date}`
        });
    }

    return {
        data: response
    };
}