import { GiBaseballGlove } from "react-icons/gi";
import { PiBaseballHelmet } from "react-icons/pi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import Link from "next/link";
import { RecordsListsType } from "@/type/records";
import { generateDateFormat } from "@/data/date";
import dayjs from "dayjs";

interface RecordBoxProps {
    data: RecordsListsType;
}

export default function RecordBox({ data }: RecordBoxProps) {
    return (
        <div className="w-full border-2 border-solid border-slate-500 px-3 py-2 rounded-md h-[220px]">
            <div className="flex flex-col gap-2">
                {/* Date */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        {data.type.name === "income" ? <GiBaseballGlove size={24} className="rounded-full mr-2" /> : <PiBaseballHelmet size={24} className="rounded-full mr-2" />}
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-800 font-[600] capitalize">{data.type.name}</span>
                            <span className="text-xs text-slate-800 font-[600]">{generateDateFormat(dayjs(data.dateString).toDate(), "new-register")}</span>
                        </div>
                    </div>

                    <IoMdCheckboxOutline size={32} className="fill-emerald-500" />
                </div>

                {/* Content */}
                <div className="flex flex-col items-start gap-2">
                    {/* Resource */}
                    <div className="flex flex-col">
                        <h4 className="text-sm font-[700] text-slate-800">{data.type.name === "income" ? "Resource" : "Genre"}</h4>
                        <p className="text-lg font-[500] text-slate-800 capitalize">{data.type.name === "income" ? data.incomeresource?.name : data.genre}</p>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col">
                        <h4 className="text-sm font-[700] text-slate-800">{data.type.name === "income" ? "Category" : "Items"}</h4>
                        <p className="text-lg font-[500] text-slate-800">{data.type.name === "income" ? data.incomecategory?.name :
                            (data.Items && data.Items.length > 0 ?
                                `${data.Items.map(item => item.item).slice(0, 3).join(", ")}${data.Items.length > 3 ? ", ..." : ""}`
                                :
                                ""
                            )
                        }</p>
                    </div>

                    {/* Other (comment) & Edit mark　とりあえずwidth: max-250px for comment*/}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col ">
                            <h4 className="text-sm font-[700] text-slate-800">Other</h4>
                            <p className="text-lg font-[500] text-slate-800 overflow-hidden text-ellipsis whitespace-nowrap no-scrollbar max-w-[250px]">{data.comment}</p>
                        </div>

                        {/* TODO: Edit Page  */}
                        <Link
                            href="#"
                            className="group ml-2"
                        >
                            <TiPencil size={32} className="group-hover:fill-orange-800/50 transition delay-75 ease-in" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}