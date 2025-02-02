"use client";
import { XRateType } from "@/type/xrate";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

type CustomTooltipProps = {
  payload?: { payload: XRateType }[]; // `payload` from Recharts passed in
};

interface XRateGraphProps {
  data: XRateType[];
  currency: string;
};

export default function XRateGraph({ data, currency }: XRateGraphProps) {
  const minValue = Math.min(...data.map((d) => d.to));
  const maxValue = Math.max(...data.map((d) => d.to));

  const CustomToolTip = (({ payload }: CustomTooltipProps) => {
    if (payload && payload.length > 0) {
      const { date, to } = payload[0].payload;

      return (
        <div className="bg-white border-2 border-slate-800 border-solid rounded-md px-3 py-2 flex flex-col items-start">
          <h3 className="text-base font-[700] text-slate-800">{date}</h3>
          <p className="text-base font-[700] text-[#ffaf33]">{currency}: {to}</p>
        </div>
      )
    }
    return null;
  });

  return (
    <AreaChart width={1200} height={400} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" />
      <YAxis domain={[Math.max(0, Math.round(minValue - minValue/10)), Math.round(maxValue + minValue/10)]} label={{value: currency, angle: -90, position: `insideLeft`, style: { textAnchor: `middle` }}}/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={<CustomToolTip />} />
      <Area type="monotone" dataKey="to" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
  )
}