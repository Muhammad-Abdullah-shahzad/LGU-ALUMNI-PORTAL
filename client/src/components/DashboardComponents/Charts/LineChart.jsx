import React from "react";
import ChartLabel from "../ChartLabel/ChartLabel.jsx";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DashboardAreaChart({
  className = "",
  heading = "Year-wise Employment Status",
  Xkey = "year",
  Ykey = "employees",
  lineColor = "#3b82f6",
  gradientFrom = "rgba(59, 130, 246, 0.5)",
  gradientTo = "rgba(59, 130, 246, 0)",
  data: externalData = [],
  height = 350,
}) {

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-500 text-sm mb-1">{`${Xkey}: ${label}`}</p>
          <p className="font-semibold text-gray-800">{`${Ykey}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`p-4 rounded-3 bg-white shadow-lg ${className}`}>
      <ChartLabel heading={heading} />

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={externalData}
          margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.5} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid 
            strokeDasharray="4 4" 
            stroke="#e0e0e0" 
          />

          <XAxis
            dataKey={Xkey}
            tickLine={false}
            axisLine={{ stroke: "#ccc", strokeWidth: 1 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: "#ccc", strokeWidth: 1 }}
            allowDecimals={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey={Ykey}
            stroke={lineColor}
            strokeWidth={3}
            fill="url(#colorGradient)"
            animationDuration={1500}
            dot={{ r: 5, stroke: lineColor, strokeWidth: 2 }}
            activeDot={{ r: 8, stroke: lineColor, strokeWidth: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
