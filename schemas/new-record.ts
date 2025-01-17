import * as z from "zod";

const ItemSchema = z.object({
    id: z.string(),
    item: z.string().min(1, { message: "Missed name" }),
    category: z.object({ name: z.string().min(1, { message: "Missed category" }) }),
    subcategory: z.object({ name: z.string() }).nullable(),
    amount: z.number({ message: "Invalid Syntax" }),
    cost: z.number(),
});

// Edit schemas
export const EditExpensesSchema = z.object({
    date: z.date(),
    currency: z.enum(["AUD", "JPY", "USD", "EUR"], {
        message: "Incorrect currency type",
    }),
    genre: z.string().min(3, { message: "At least 3 characters required" }),
    country: z.enum(["Australia", "Japan", "US", "Europe"], {
        message: "Incorrect country name selected",
    }),
    items: z.array(ItemSchema),
    object: z.string().url().or(z.string().optional()),
    comment: z.string().optional(),
    payment: z.string().nullable().optional(),
    regular_unit: z.enum(["hourly", "weekly", "monthly", "yearly", ""]),
    regular_num: z.number().nullable().optional(),
}).refine((data) => {
    const isGenreValid = data.genre && data.genre.trim() !== "";
    return isGenreValid;
}, { message: "Please fill in the genre", path: ["genre"] })
    .superRefine((data, ctx) => {
        data.items?.forEach((item, index) => {
            if (!item.item) {
                ctx.addIssue({
                    path: ["items", item.id, "item"],
                    message: "Missed item name",
                    code: z.ZodIssueCode.custom,
                })
            }
            if (!item.category) {
                ctx.addIssue({
                    path: ["items", item.id, "category"],
                    message: "Missed category name",
                    code: z.ZodIssueCode.custom,
                })
            }
        })
    })
    .refine((data) => {
        // regular unit and regular num
        if (data.regular_unit.length > 0) return data.regular_num && data.regular_num > 0;
        return true;
    }, { message: "Incorrect regular unit or fill in the blank", path: ["regular_unit"] });

export const EditIncomeSchema = z.object({
    date: z.date(),
    currency: z.enum(["AUD", "JPY", "USD", "EUR"], {
        message: "Incorrect currency type",
    }),
    country: z.enum(["Australia", "Japan", "US", "Europe"], {
        message: "Incorrect country name selected",
    }),
    object: z.string().url().or(z.string().optional()),
    comment: z.string().optional(),
    regular_unit: z.enum(["hourly", "weekly", "monthly", "yearly", ""]),
    regular_num: z.number().optional(),

    income: z.number(),
    resource: z.string().min(3, { message: "At least 3 characters required" }),
    category: z.string().optional(),
    status: z.string(),
}).refine((data) => {
    // regular unit and regular num
    if (data.regular_unit.length > 0) return data.regular_num && data.regular_num > 0;
    return true;
}, { message: "Incorrect regular unit or fill in the blank", path: ["regular_unit"] })
    .refine((data) => {
        const isResourceValid = data.resource !== null && data.resource?.trim() !== "";
        return isResourceValid;
    }, { message: "fill ine blank", path: ["resource"] });

// New record
export const CombinedSchema = z.object({
    date: z.date(),
    type: z.enum(["income", "expenses", "- - -"], {
        message: "Please select from the list"
    }),
    currency: z.enum(["AUD", "JPY", "USD", "EUR", ""], {
        message: "At most two decimal places valid"
    }),
    resource: z.string().optional(),
    country: z.enum(["Australia", "Japan", "US", "Europe", ""], {
        message: "Please select from the list"
    }),
    // income_amount: z.number().refine((val) => Number.isFinite(2) && val.toFixed(2) === val.toString(), {
    //     message: "At most two decimal places valid"
    // }).nullable(),
    income_amount: z.number().optional(),
    income_category: z.string().optional(),
    status: z.string().optional(),

    genre: z.string().nullable(),
    items: z.array(
        z.object({
            item: z.string().min(1, {
                message: "Empty"
            }).or(z.string().optional()),
            category: z.string().min(1, {
                message: "Empty"
            }).or(z.string().optional()),
            subcategory: z.string().optional(),
            amount: z.number({ message: "Invalid Syntax" }),
            // cost: z.number().refine((val) => Number.isFinite(2) && val.toFixed(2) === val.toString(), {
            //     message: "At most two decimal places valid"
            // }),
            cost: z.number(),
        })
    ).nullable(),
    comment: z.string().optional(),
    object: z.string().url().or(z.string().optional()),
    total: z.number(),
    payment_method: z.string().optional(),

    regular_unit: z.enum(["hourly", "weekly", "monthly", "yearly", ""]),
    regular_num: z.number().optional(),

    isSubmitted: z.boolean(),

    imageId: z.string(),
    isConfirmed: z.boolean(),

}).refine((data) => {
    if (data.type === "expenses") {
        const isGenreValid = data.genre !== null && data.genre.trim() !== "";
        // const areItemsValid = data.items?.every(
        //     (item) => item.item !== null && item.item?.trim() !== "" && item.category !== null && item.category?.trim() !== ""
        // );

        return isGenreValid;
    }
    return true;
},
    {
        message: "FIll in the blank",
        path: ["genre"],
    }
).superRefine((data, ctx) => {
    if (data.type === "expenses") {
        data.items?.forEach((item, index) => {
            if (!item.item) {
                ctx.addIssue({
                    path: ["items", index, "item"],
                    message: "Fill in the blank",
                    code: z.ZodIssueCode.custom,
                })
            }
            if (!item.category) {
                ctx.addIssue({
                    path: ["items", index, "category"],
                    message: "Fill in the blank",
                    code: z.ZodIssueCode.custom,
                });
            }
        })
    }
}).refine((data) => {
    if (data.type === "income") {
        const isResourceValid = data.resource !== null && data.resource?.trim() !== "";
        return isResourceValid;
    }
    return true;
},
    {
        path: ["resource"],
        message: "Fill in the resource blank",
    }).refine((data) => {
        if (data.type === "income") {
            const isCategoryValid = data.income_category !== null && data.income_category?.trim() !== "";
            return isCategoryValid;
        }
        return true;
    },
        {
            path: ["income_category"],
            message: "Fill in the category blank",
        }).refine((data) => {
            if (data.type === "- - -") {
                return false;
            }
            return true;
        },
            {
                path: ["type"],
                message: "No data input"
            });



export const IncomeSchema = z.object({
    date: z.date(),
    type: z.enum(["income", "expenses", "- - -"], {
        message: "Please select from the list"
    }),
    currency: z.enum(["AUD", "JPY", "USD", "EUR"], {
        message: "At most two decimal places valid"
    }),
    resource: z.string().optional(),
    country: z.enum(["Australia", "Japan", "US", "Europe"], {
        message: "Please select from the list"
    }),
    income_amount: z.number().optional(),
    income_category: z.string().optional(),

    comment: z.string().optional(),
    // object: z.string().url().nullable(),
    total: z.number(),

    regular_unit: z.enum(["hourly", "weekly", "monthly", "yearly", ""]),
    regular_num: z.number().optional(),
});

export const ExpenseSchema = z.object({
    date: z.date(),
    type: z.enum(["income", "expenses", "- - -"], {
        message: "Please select from the list"
    }),
    currency: z.enum(["AUD", "JPY", "USD", "EUR"], {
        message: "At most two decimal places valid"
    }),
    genre: z.string(),
    country: z.enum(["Australia", "Japan", "US", "Europe"], {
        message: "Please select from the list"
    }),
    items: z.array(
        z.object({
            item: z.string().min(1, {
                message: "Empty"
            }),
            category: z.string().min(1, {
                message: "Empty"
            }),
            subcategory: z.string().optional(),
            amount: z.number({ message: "Invalid Syntax" }),
            // cost: z.number().refine((val) => Number.isFinite(2) && val.toFixed(2) === val.toString(), {
            //     message: "At most two decimal places valid"
            // }),
            cost: z.number(),
        })
    ).nullable(),
    comment: z.string().optional(),
    // object: z.string().url().nullable(),
    total: z.number(),

    regular_unit: z.enum(["hourly", "weekly", "monthly", "yearly", ""]),
    regular_num: z.number().optional(),
})