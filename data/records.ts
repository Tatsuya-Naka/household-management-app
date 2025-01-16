"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getRecordsAppliedData = async (search: string, page: number) => {
    "use server";
    const skip = (page - 1) * 8;

    try {
        const session = await auth();
        if (!session || !session.user) return { message: "Invalid Access", data: [], count: 0 };

        const totalCount = await db.record.count({
            where: {
                userId: session.user.id,
                isSubmitted: true,
                AND: [{
                    OR: [
                        {incomeresource: { name: { contains: search, mode: "insensitive" } }},
                        {incomecategory: { name: { contains: search, mode: "insensitive" } }},
                        {genre: { contains: search, mode: "insensitive" }},
                        {Items: { some: { item: { contains: search, mode: "insensitive" } } }},
                        {comment: { contains: search, mode: "insensitive" }},
                    ]
                }]
            },
        });

        const data = await db.record.findMany({
            where: {
                userId: session.user.id,
                isSubmitted: true,
                AND: [{
                    OR: [
                        {incomeresource: { name: { contains: search, mode: "insensitive" } }},
                        {incomecategory: { name: { contains: search, mode: "insensitive" } }},
                        {genre: { contains: search, mode: "insensitive" }},
                        {Items: { some: { item: { contains: search, mode: "insensitive" } } }},
                        {comment: { contains: search, mode: "insensitive" }},
                    ]
                }]
            },
            select: {
                id: true,
                dateString: true,
                dateCalendar: true,
                comment: true,
                type: {select: {name: true}},
                incomeresource: { select: { name: true } },
                incomecategory: { select: { name: true } },
                income_status: true,

                genre: true,
                Items: { select: { item: true } },
            },
            skip: skip,
            take: 8,
        });

        return {
            message: "Success",
            data: data,
            count: Math.ceil(totalCount / 8),
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message,
                data: [],
                count: 0,
            }
        } else {
            return {
                message: "Something Wrong",
                data: [],
                count: 0,
            }
        }
    }
}

export const getRecordsProcessingData = async (search: string, page: number) => {
    "use server";
    const skip = (page - 1) * 8;

    try {
        const session = await auth();
        if (!session || !session.user) return { message: "Invalid Access", data: [], count: 0 };

        const totalCount = await db.record.count({
            where: {
                userId: session.user.id,
                isSubmitted: false,
                AND: [{
                    OR: [
                        {incomeresource: { name: { contains: search, mode: "insensitive" } }},
                        {incomecategory: { name: { contains: search, mode: "insensitive" } }},
                        {genre: { contains: search, mode: "insensitive" }},
                        {Items: { some: { item: { contains: search, mode: "insensitive" } } }},
                        {comment: { contains: search, mode: "insensitive" }},
                    ]
                }]
            },
        });

        const data = await db.record.findMany({
            where: {
                userId: session.user.id,
                isSubmitted: false,
                AND: [{
                    OR: [
                        {incomeresource: { name: { contains: search, mode: "insensitive" } }},
                        {incomecategory: { name: { contains: search, mode: "insensitive" } }},
                        {genre: { contains: search, mode: "insensitive" }},
                        {Items: { some: { item: { contains: search, mode: "insensitive" } } }},
                        {comment: { contains: search, mode: "insensitive" }},
                    ]
                }]
            },
            select: {
                id: true,
                dateString: true,
                dateCalendar: true,
                comment: true,
                type: {select: {name: true}},
                incomeresource: { select: { name: true } },
                incomecategory: { select: { name: true } },
                income_status: true,

                genre: true,
                Items: { select: { item: true } },
            },
            skip: skip,
            take: 8,
        });

        return {
            message: "Success",
            data: data,
            count: Math.ceil(totalCount / 8),
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message,
                data: [],
                count: 0,
            }
        } else {
            return {
                message: "Something Wrong",
                data: [],
                count: 0,
            }
        }
    }
};

export const getRecordData = async ({recordId, userId}: {recordId: string, userId: string | undefined}) => {
    try {

        if (!userId) return {message: "Invalid Access"};

        const record = await db.record.findUnique({
            where: {
                id: recordId,
                userId,
            },
            select: {
                id: true,
                // userId: true,
                type: {select: {name: true}},
                currency: {select: {name: true}}, country: {select: {name: true}},
                dateString: true, comment: true,
                income_status: true,
                incomeresource: {select: {name: true}}, incomecategory: {select: {name: true}},
                regular_num: true, regular_unit: true,
                income_amount: true,
                Items: {select: {id: true, item: true, category: {select: {name: true}}, subcategory: {select: {name: true}}, amount: true, cost: true, }},
                genre: true,
                payment_method: true,
                object: true,
            }
        });

        return {
            message: "Success",
            record,
        };

    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message,
            }
        } else {
            return {
                message: "Something Wrong"
            }
        }
    }
}