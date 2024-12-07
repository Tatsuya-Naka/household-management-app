import * as z from "zod";

export const CombinedSchema = z.object({
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
    income_amount: z.number().refine((val) => Number.isFinite(val) && val.toFixed(2) === val.toString(), {
        message: "At most two decimal places valid"
    }).optional(),
    income_category: z.string().optional(),

    genre: z.string().optional().optional(),
    items: z.array(
        z.object({
            item: z.string().min(1, {
                message: "Empty"
            }), 
            category: z.string().min(1, {
                message: "Empty"
            }),
            subcategory: z.string().optional(),
            amount: z.number().refine((val) => Number.isFinite(2) && val.toFixed(2) === val.toString(), {
                message: "At most two decimal places valid"
            }),
            cost: z.number().refine((val) => Number.isFinite(2) && val.toFixed(2) === val.toString(), {
                message: "At most two decimal places valid"
            }),
        })
    ).optional(),
    comment: z.string().optional(),
    object: z.string().url().optional(),
    // item: z.array(z.string()),
    // category: z.array(z.string()),
    // subcategory: z.array(z.string()),
    // amount: z.array(z.number().refine((val) => Number.isFinite(2) && val.toFixed(2) === val.toString(), {
    //     message: "At most two decimal places valid"
    // })),
    // cost: z.array(z.number().refine((val) => Number.isFinite(2) && val.toFixed(2) === val.toString(), {
    //     message: "At most two decimal places valid"
    // })),
})

export const IncomeSchema = z.object({
    date: z.date(),
    type: z.enum(["income", "expenses"], {
        message: "Please select from the list"
    }),
    currency: z.number().refine((val) => Number.isFinite(val) && val.toFixed(2) === val.toString(), {
        message: "At most two decimal places valid"
    }),
    resource: z.string(),
    country: z.enum(["Australia", "Japan", "US", "Europe"], {
        message: "Please select from the list"
    }),
    amount: z.number().refine((val) => Number.isFinite(val) && val.toFixed(2) === val.toString(), {
        message: "At most two decimal places valid"
    }),
    category: z.string(),
});

export const ExpenseSchema = z.object({
    date: z.date(),
    type: z.enum(["income", "expenses"], {
        message: "Please select from the list"
    }),
    currency: z.number().refine((val) => Number.isFinite(val) && val.toFixed(2) === val.toString(), {
        message: "At most two decimal places valid"
    }),
    genre: z.string(),
    country: z.enum(["Australia", "Japan", "US", "Europe"], {
        message: "Please select from the list"
    }),
    item: z.array(z.string()),
    category: z.array(z.string()),
    subcategory: z.array(z.string()),
    amount: z.array(z.number().refine((val) => Number.isFinite(2) && val.toFixed(2) === val.toString(), {
        message: "At most two decimal places valid"
    })),
    cost: z.array(z.number().refine((val) => Number.isFinite(2) && val.toFixed(2) === val.toString(), {
        message: "At most two decimal places valid"
    })),
})