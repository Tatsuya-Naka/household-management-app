"use client";

import { CombinedSchema } from "@/schemas/new-record";
import { SessionProvider } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type NewRecordType = z.infer<typeof CombinedSchema>

export default function NewRecordLayout({ children }: { children: React.ReactNode }) {
    const methods = useForm<NewRecordType>({
        mode: "onChange",
        defaultValues: {
            date: new Date(), type: "- - -", currency: "", country: "", resource: "", income_amount: 0, income_category: "",
            genre: "",
            items: [{ item: "", category: "", subcategory: "", amount: 0, cost: 0 }],
            comment: "",
            total: 0,
            regular_unit: "", isSubmitted: false
        },
        resolver: zodResolver(CombinedSchema),
    });

    return (
        <SessionProvider>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </SessionProvider>
    )
}