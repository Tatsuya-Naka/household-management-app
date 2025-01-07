interface ChartSectionProps {
    chart: string;
    type: string;
}

export default function ChartSection({ chart, type }: ChartSectionProps) {
    console.log({type: type});
    return (
        <div className="bg-white rounded-md w-full px-2 py-1">
            {chart === "bar" ?
                <div>
                    Bar
                </div>
                :
                chart === "line" ?
                    <div>
                        line
                    </div>
                    :
                    <div>
                        Mix
                    </div>
            }
        </div>
    )
}