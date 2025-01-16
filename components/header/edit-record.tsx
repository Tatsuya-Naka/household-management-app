"use client";
import EditRecordNav from "./edit-record-nav";
import { Session } from "next-auth";

interface EditRecordHeaderProps {
    session: Session | null;
}

export default function EditRecordHeader({session}: EditRecordHeaderProps) {
 
    return (
        <div className="w-full px-5 py-3 h-[180px] bg-gradient-to-b from-sky-400 via-teal-200 to-emerald-400 mx-auto">
            <div className='max-w-[1560px] relative z-[80] mx-auto h-full'>
                <EditRecordNav session={session} page={"records"} />
            </div>
        </div>
    )
}