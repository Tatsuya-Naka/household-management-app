"use client";
import NewRegisterForm from "@/components/new-record/form";
import { FaCashRegister } from "react-icons/fa";

export default function CreateNewRecordPage() {
    return (
        <div className="relative">
            {/* Icon */}
            <div className="absolute -top-10 left-32 right-auto w-[80px] h-[80px] bg-white rounded-lg shadow-2xl p-3">
                <FaCashRegister className="w-full h-full" />
            </div>
            {/* Body */}
            <div className="w-full absolute top-0 left-0 right-0">
                <NewRegisterForm />
            </div>
        </div>
    )
}