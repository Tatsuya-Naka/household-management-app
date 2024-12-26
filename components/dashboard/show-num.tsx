"use client";

interface ShowDataProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    currencyType?: string;
    num: number;
    prevRate: number;
};

export default function ShowData({ title, currencyType, num, prevRate, ...props }: ShowDataProps) {
    return (
        <div className="px-3 py-5 rounded-md bg-white shadow-xl w-full cursor-pointer" {...props}>
            <div className="flex flex-col items-start justify-center gap-3">
                {/* title */}
                <h3 className="text-xl font-[700] text-slate-800 capitalize">
                    {title}
                </h3>
                <h2 className="text-4xl font-[700] text-slate-800">
                    {(currencyType === "AUD" || currencyType === "USD" ? "$" : (currencyType === 'JPY' ? "¥" : "€"))} {num}
                </h2>
                <h5 className="text-sm">
                    <span className={`${title === "expenses" ? (prevRate < 0 ? "text-green-500" : "text-red-500") : (prevRate < 0 ? "text-red-500" : "text-green-500")} px-1 py-0.5 rounded-sm`}>
                        {prevRate}%
                    </span>
                    {prevRate < 0 ? "decreased" : "increased"}
                </h5>
            </div>
        </div>
    )
}