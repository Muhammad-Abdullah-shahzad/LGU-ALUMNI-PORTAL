import React from "react";
import ChartLabel from "../ChartLabel/ChartLabel.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DashboardLineChart({
  className,
  heading = "Year-wise Employment Status",
  Xkey = "year",
  Ykey = "employees",
  lineColor = "#3b82f6",
  data: externalData,
}) {

  return (
    <div className={`p-3 rounded-3 bg-white shadow-sm ${className}`}>
      <ChartLabel heading={heading} />

      <ResponsiveContainer width="100%" height={330}>
        <LineChart data={externalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey={Xkey} type="category" />
          <YAxis dataKey={Ykey} type="number" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey={Ykey}
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
