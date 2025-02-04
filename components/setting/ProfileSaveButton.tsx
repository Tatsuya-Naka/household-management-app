'use client';
import { useFormStatus } from "react-dom";
import { LuSave } from "react-icons/lu";

export default function ProfileSaveButton() {
  const { pending } = useFormStatus();

  return (
    <button className={`p-2 rounded-full bg-transparent hover:bg-emerald-200/50 cursor-pointer transition duration-150 ease-in-out delay-75 ${pending ? "opacity-50 cursor-not-allowed" : ""}`}
      type="submit"
      disabled={pending}
    >
      <LuSave size={32} className="text-emerald-400" />
    </button>
  )
}