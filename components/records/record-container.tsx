import { MdOutlineImageNotSupported } from "react-icons/md";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import CurrencyIcon from "@/type/currency";

interface RecordContainerProps {
    recordId: string;
    currency: string;
    content: string;
    genre?: string;
    items?: string;
    resource?: string;
    category?: string;
    amount: number;
    image?: string;
    editUrl: string;
}

export default function RecordContainer({recordId, currency, content, genre, items, resource, category, amount, image, editUrl}: RecordContainerProps) {
    console.log({recordId: recordId});
    console.log({image: image});
    return (
        <div className="w-[560px] h-[240px] bg-white rounded-md shadow-md grid grid-cols-[240px_auto] shrink-0">
            <div className="w-full h-full">
                <div className="w-[240px] h-[240px] bg-gray-500/50 rounded-l-md flex items-center justify-center">
                    <MdOutlineImageNotSupported size={32} className="fill-slate-800 mr-3" />
                    <span className="text-slate-800 text-lg font-[600] capitalize">no material</span>
                </div>
            </div>
            <div className="py-2 px-3 flex flex-col gap-2 items-start justify-around">
                {/* Resource(income) or Genre(expenses) */}
                <div className="flex flex-col gap-1 items-start">
                    <label className="text-sm text-slate-800 font-[700]">{content === "income" ? "Resource" : "Genre"}</label>
                    <p className="text-lg text-slate-800 font-[500]">{content === "income" ? resource : genre}</p>
                </div>

                {/* Category(income) or Items(expenses) */}
                <div className="flex flex-col gap-1 items-start">
                    <label className="text-sm text-slate-800 font-[700]">{content === "income" ? "Category" : "Items"}</label>
                    <p className="text-lg text-slate-800 font-[500]">{content === "income" ? category : items}</p>
                </div>

                {/* Amount & Edit Delete */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col gap-1 items-start">
                        <label className="text-sm text-slate-800 font-[700]">Amount</label>
                        <p className="text-lg text-slate-800 font-[500]"><CurrencyIcon currencyType={currency} /> {amount}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={editUrl}
                            className=""
                        >
                            <MdOutlineEdit size={28} className="fill-emerald-500" />
                        </Link>
                        <button
                            type="button"
                            className=""
                        >
                            <IoTrashBinOutline size={28} className="text-indigo-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}