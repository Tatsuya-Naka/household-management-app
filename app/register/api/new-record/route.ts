"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {        
        const body = await req.json();
        
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({message: "You must signup or login before doing this"}, {status: 404});
        }

        // get typeId from db
        const type = await db.type.findUnique({
            select: {
                id: true,
                name: true,
            },
            where: {
                name: body.type,
            }
        });
        if (!type) {
            return NextResponse.json({message: "Invalid type name"}, {status: 404});
        }

        // currency
        const currency = await db.currency.findUnique({
            select: {
                id: true,
            },
            where: {
                name: body.currency,
            }
        });

        if (!currency) {
            return NextResponse.json({message: "Invalid currency type"}, {status: 404});
        }

        // Country id
        const country = await db.country.findUnique({
            select: {
                id: true,
            }, where: {
                name: body.country,
            },
        });

        if (!country) {
            return NextResponse.json({message: "Invalid country"}, {status: 404});
        }

        // create recordId now for items
        const record = await db.record.create({
            data: {
                userId: session.user.id,
                typeId: type.id,
                currencyId: currency.id,
                countryId: country.id,
            }
        });
        
        if (type.name === "income") {
            // income resource
            const resource = await db.incomeResource.findUnique({
                select: {
                    id: true,
                }, where: {
                    name: body.resource
                }
            });

            if (!resource) {
                return NextResponse.json({message: "Invalid resource type"}, {status: 404});
            }

            // income category belogging to the income resource
            const category = await db.incomeCategory.findUnique({
                select: {
                    id: true,
                }, where: {
                    name: body.income_category,
                    resourceId: resource.id,
                }
            });
            
            if (!category) {
                return NextResponse.json({message: "Invalid income category type"}, {status: 404});
            }

            if (body.regular_unit && !body.regular_num) {
                return NextResponse.json({message: "Please fill in the number of frequency of the regular income"}, {status: 404})
            }

            if (!body.regular_unit && body.regular_num) {
                body.regular_num = null;
            }

            if (!body.status) {
                return NextResponse.json({message: "Choose status"}, {status: 404});
            }

            // TODO: Image and store it to AWS S3.
            
            await db.record.update({
                where: {
                    id: record.id,
                },
                data: {
                    resourceId: resource.id,
                    income_categoryId: category.id,
                    regular_unit: body.regular_unit,
                    regular_num: body.regular_num,
                    income_status: body.status,
                    income_amount: body.income_amount,
                    comment: body.comment,
                }
            });
        } else if (body.type === "expenses") {
            // TODO: CategoryID
            // TODO: SubCategory ID
            // TODO: Receipt Image
            // TODO: fetch FX rate
            // TODO: create Items
            // TODO: update record
        }

        return NextResponse.json({message: "Success"}, {status: 200});

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            return NextResponse.json({message: err.message}, {status: 500});
        } else {
            console.log("Went Wrong");
            return NextResponse.json({message: "Something Went Wrong on the Server Side"}, {status: 500});
        }
    }
}