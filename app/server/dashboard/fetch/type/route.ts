"use server";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs"
import { generateDateFormat } from "@/data/date";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    "use server";
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({message: "Invalid Access"}, {status: 404});
    }

    try {
        const body = await req.json();
        const { from, to, fromPrev, toPrev }: {from: number, to: number, fromPrev: number, toPrev: number} = body;        
        // console.log({from: new Date(from)});
        // console.log({to: new Date(to)});
        // console.log({fromPrev: new Date(fromPrev)});
        // console.log({toPrev: new Date(toPrev)});
        
        // TODO: Extract Data from database
        const data = await db.record.findMany({
            select: {
                currency: {
                    select: {name: true}
                },
                type: {
                    select: {name: true}
                },
                // Income
                incomeresource: {
                    select: {name: true}
                },
                income_amount: true,
                incomecategory: {
                    select: {name: true},
                },
                // Expenses
                Items: {
                    select: {
                        category: {
                            select: {name: true},
                        },
                        subcategory: {
                            select: {name: true},
                        },
                    }
                },
                totalcost: true,
                payment_method: true,
                xrateId: true,
                dateCalendar: true,
            },
            where: {
                userId: session.user.id,
                isSubmitted: true,
                date: {
                    gte: from,
                    lte: to,
                },
            }
        });

        const dataPrev = await db.record.findMany({
            select: {
                currency: {
                    select: {name: true}
                },
                type: {
                    select: {name: true}
                },
                // Income
                incomeresource: {
                    select: {name: true}
                },
                income_amount: true,
                incomecategory: {
                    select: {name: true},
                },
                // Expenses
                Items: {
                    select: {
                        category: {
                            select: {name: true},
                        },
                        subcategory: {
                            select: {name: true},
                        },
                    }
                },
                totalcost: true,
                payment_method: true,
                xrateId: true,
                dateCalendar: true,
            },
            where: {
                userId: session.user.id,
                isSubmitted: true,
                date: {
                    gte: fromPrev,
                    lte: toPrev,
                },
            }
        });

        return NextResponse.json({message: "Success", current: data, prev: dataPrev}, {status: 200});

    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: "Something wrong" }, { status: 500 });
        }
    }

    // return NextResponse.json({ message: "Success" }, { status: 200 });
}