"use client";

import { CombinedSchema } from "@/schemas/new-record";
import { SessionProvider } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

type NewRecordType = z.infer<typeof CombinedSchema>

export default function NewRecordLayout({ children }: { children: React.ReactNode }) {
    const methods = useForm<NewRecordType>({
        mode: "onChange",
        defaultValues: {
            date: new Date(), type: "- - -", currency: "AUD", country: "Australia", resource: "", income_amount: 0, income_category: "",
            genre: "",
            // item: [""], category: [""], subcategory: [""],  amount: [0], cost: [0],
            items: [{ item: "", category: "", subcategory: "", amount: 0, cost: 0 }],
            comment: "",
        },
        // resolver: zodResolver(CombinedSchema)
    });

    return (
        <SessionProvider>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </SessionProvider>
    )
}