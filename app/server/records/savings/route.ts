"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    "use server";

    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({message: "Invalid Access"}, {status: 404});
    }

    try {
        const body = await req.json();
        const {from, to, prevFrom, prevTo}: {from: bigint, to: bigint, prevFrom: bigint, prevTo: bigint} = body;
        
        if (!from || !to || !prevFrom || !prevTo) return NextResponse.json({message: "Something missed"}, {status: 400});

        const currentIncome = await db.record.findMany({
            select: {
                id: true,
                incomeresource: {select: {name: true}},
                incomecategory: {select: {name: true}},
                income_amount: true,
                dateString: true,
                dateCalendar: true,
                currency: {select: {name: true}},
            },
            where: {
                userId: session.user.id,
                isSubmitted: true,
                type: {
                    name: "income",
                },
                date: {
                    gte: from,
                    lte: to,
                }
            }
        });

        const prevIncome = await db.record.findMany({
            select: {
                id: true,
                incomeresource: {select: {name: true}},
                incomecategory: {select: {name: true}},
                income_amount: true,
                dateString: true,
                dateCalendar: true,
                currency: {select: {name: true}}        
            },
            where: {
                userId: session.user.id,
                isSubmitted: true,
                type: {
                    name: "income",
                },
                date: {
                    gte: prevFrom,
                    lte: prevTo,
                }
            }
        });

        const currentExpenses = await db.record.findMany({
            select: {
                id: true,
                genre: true,
                Items: {select: {cost: true, category: {select: {name: true}}, subcategory: {select: {name: true}}}},
                totalcost: true,
                dateString: true,
                dateCalendar: true,
                currency: {select: {name: true}},
            },
            where: {
                userId: session.user.id,
                isSubmitted: true,
                type: {
                    name: "expenses",
                },
                date: {
                    gte: from,
                    lte: to,
                }
            }
        });

        const prevExpenses = await db.record.findMany({
            select: {
                id: true,
                genre: true,
                Items: {select: {cost: true, category: {select: {name: true}}, subcategory: {select: {name: true}}}},
                totalcost: true,
                dateString: true,
                dateCalendar: true,
                currency: {select: {name: true}},
            },
            where: {
                userId: session.user.id,
                isSubmitted: true,
                type: {
                    name: "expenses",
                },
                date: {
                    gte: prevFrom,
                    lte: prevTo,
                }
            }
        });

        return NextResponse.json({message: "Success", income: {current: currentIncome, prev: prevIncome}, expenses: {current: currentExpenses, prev: prevExpenses}}, {status: 200});

    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({message: err.message}, {status: 500});
        } else {
            return NextResponse.json({message: "Something wrong"}, {status: 500});
        }
    }
}