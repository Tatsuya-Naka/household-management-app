import { ListType } from "@/type/list";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";

interface SettingList {
	ListItems: ListType[];
	params?: string;
}
export default function SettingList({ ListItems, params }: SettingList) {
	const ListContainer = (ListItem: ListType, isLast: boolean) => {
		return (
			<Link href={ListItem.url} className={`${!isLast ? "border-b-2 border-solid border-slate-400/30" : ""} w-full flex items-center gap-2 justify-between hover:bg-slate-400/30 rounded-lg p-2`}>
				<div
					className="capitalize font-[700] text-slate-800 text-2xl">
					{ListItem.name}
				</div>
				{ListItem.name === params &&
					<div className="border-none">
						<IoMdArrowDropright size={32} className="fill-slate-800" />
					</div>
				}
			</Link>
		)
	}

	return (
		<div className="flex items-start justify-center flex-col shadow-md rounded-lg">
				{ListItems.map((ListItem, index) => (ListContainer(ListItem, index === ListItems.length-1)))}
		</div>
	)
}