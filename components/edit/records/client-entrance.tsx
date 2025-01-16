"use client";
import EditRecordHeader from "@/components/header/edit-record";
import { EditRecordType } from "@/type/records";
import type { Session } from "next-auth";
import { MdEditSquare } from "react-icons/md";
import EditRecordsForm from "./edit-form";

interface EditRecordEntranceProps {
    session: Session | null;
    record: EditRecordType | null | undefined;
}

export default function EditRecordEntrance({ session, record }: EditRecordEntranceProps) {
    return (
        <div className="max-w-full">
            {/* Header */}
            <EditRecordHeader session={session} />

            {/* main */}
            <main className='max-w-[1560px]  pr-[81px] min-h-[calc(100%-180px)] mx-auto'>
                <div className="relative">
                    {/* Icon */}
                    <div className="absolute -top-10 left-32 right-auto w-[80px] h-[80px] bg-white rounded-lg shadow-2xl p-3">
                        <MdEditSquare className="w-full h-full" />
                    </div>
                    {/* Body */}
                    <div className="w-full absolute top-0 left-0 right-0">
                        <EditRecordsForm record={record} />
                    </div>
                </div>
            </main>
        </div>
    )
}