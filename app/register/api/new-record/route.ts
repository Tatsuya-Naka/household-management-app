"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import { sqsSendReceiveMessage } from "@/data/sendReceiveMessage";
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const date = dayjs(body.date).format("YYYY-MM-DD");
        if (!date) {
            return NextResponse.json({message: "You must select the date"}, {status: 400});
        }
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ message: "You must signup or login before doing this" }, { status: 404 });
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
            return NextResponse.json({ message: "Invalid type name" }, { status: 400 });
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
            // const create = await db.currency.create({
            //     data: {
            //         name: body.currency
            //     }
            // });
            return NextResponse.json({ message: "Invalid currency type" }, { status: 400 });
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
            // const create = await db.country.create({
            //     data: {
            //         name: body.country,
            //     }
            // })
            return NextResponse.json({ message: "Invalid country" }, { status: 400 });
        }

        // TODO: fetch FX rate
        let xrateId: string;
        const fxrateDate = await db.xRate.findUnique({
            where: { date, }
        });
        if (!fxrateDate) {
            const response = await fetch(`https://data.fixer.io/api/${date}?access_key=${process.env.FIXER_API_KEY}&format=1`);
            const fxrate = await response.json();

            const create = await db.xRate.create({
                data: {
                    date: date,
                    base: fxrate.base,
                    aud: fxrate.rates.AUD,
                    jpy: fxrate.rates.JPY,
                    usd: fxrate.rates.USD,
                    eur: fxrate.rates.EUR,
                    gbp: fxrate.rates.GBP,
                    cad: fxrate.rates.CAD,
                    chf: fxrate.rates.CHF,
                    cny: fxrate.rates.CNY,
                    hkd: fxrate.rates.HKD,
                    krw: fxrate.rates.KRW,
                    mxn: fxrate.rates.MXN,
                    nzd: fxrate.rates.NZD,
                    sgd: fxrate.rates.SGD,
                }
            });
            
            xrateId = create.id;
        } else {
            xrateId = fxrateDate.id;
        }

        // create recordId now for items
        const record = await db.record.create({
            data: {
                userId: session.user.id,
                typeId: type.id,
                currencyId: currency.id,
                countryId: country.id,
                date,
                xrateId,
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
                // const resourceNew = await db.incomeResource.create({
                //     data: {
                //         name: body.resource,
                //     }
                // });
                await db.record.delete({
                    where: {
                        id: record.id,
                    }
                });
                return NextResponse.json({ message: "Invalid resource type" }, { status: 400 });
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
                // const newCategory = await db.incomeCategory.create({
                //     data: {
                //         resourceId: resource.id,
                //         name: body.income_category,
                //     }
                // })
                await db.record.delete({
                    where: {
                        id: record.id,
                    }
                });
                return NextResponse.json({ message: "Invalid income category type" }, { status: 400 });
            }

            if (body.regular_unit && !body.regular_num) {
                await db.record.delete({
                    where: {
                        id: record.id,
                    }
                });
                return NextResponse.json({ message: "Please fill in the number of frequency of the regular income" }, { status: 400 })
            }

            if (!body.regular_unit && body.regular_num) {
                body.regular_num = null;
            }

            if (!body.status) {
                await db.record.delete({
                    where: {
                        id: record.id,
                    }
                });
                return NextResponse.json({ message: "Choose status" }, { status: 400 });
            }

            // TODO: Send SQS -> S3 A image transfered to S3 B bucket -> image in S3 A delete in 24 hours. get url to access image.
            let imageUrl: string = body.object;
            if (body.object) {
                const formState = await sqsSendReceiveMessage(body.object, session.user.id);
                
                imageUrl = formState.success?.url || "";
            }

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
                    object: imageUrl,
                }
            });
        } else if (body.type === "expenses") {
            // Item with categoryID & subcategoryID
            for (const { item, category, subcategory, amount, cost } of body.items) {
                if (!category) {
                    await db.record.delete({
                        where: {
                            id: record.id,
                        }
                    });
                    return NextResponse.json({ message: "Missing Category" }, { status: 400 });
                }

                const categoryDoc = await db.category.findUnique({
                    select: {
                        id: true,
                    },
                    where: {
                        name: category,
                    }
                });

                if (!categoryDoc) {
                    // const create = await db.category.create({
                    //     data: {
                    //         name: category,
                    //     }
                    // })
                    await db.record.delete({
                        where: {
                            id: record.id,
                        }
                    });
                    return NextResponse.json({ message: "Missing Categoroies" }, { status: 400 });
                }

                let subcategoryId: string | null = null;
                if (subcategory) {
                    const subCategoryDoc = await db.subCategory.findUnique({
                        select: {
                            id: true,
                        },
                        where: {
                            name: subcategory,
                            categoryId: categoryDoc.id,
                        }
                    });
                    if (!subCategoryDoc) {
                        const createSubcategory = await db.subCategory.create({
                            data: {
                                name: subcategory,
                                categoryId: categoryDoc.id,
                            }
                        });
                        subcategoryId = createSubcategory.id;
                    } else {
                        subcategoryId = subCategoryDoc.id;
                    }
                }

                await db.items.create({
                    data: {
                        item,
                        categoryId: categoryDoc.id,
                        subcategoryId: !!subcategoryId ? subcategoryId : null,
                        amount,
                        cost,
                        recordId: record.id,
                    }
                });
            }

            // TODO: Send SQS -> S3 A image transfered to S3 B bucket -> image in S3 A delete in 24 hours. get url to access image.
            let imageUrl: string = body.object;
            if (body.object) {
                const formState = await sqsSendReceiveMessage(body.object, session.user.id);
                imageUrl = formState.success?.url || "";
            } 
            // Update record for expenses
            await db.record.update({
                where: {
                    id: record.id,
                },
                data: {
                    genre: body.genre,
                    object: imageUrl,
                    comment: body.comment,
                    totalcost: body.total,
                    payment_method: body.payment_method,
                    regular_unit: body.regular_unit,
                    regular_num: body.regular_num,
                    isSubmitted: body.isSubmitted,
                }
            })
        }

        return NextResponse.json({ message: "Success" }, { status: 200 });

    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: "Something Went Wrong on the Server Side" }, { status: 500 });
        }
    }
}