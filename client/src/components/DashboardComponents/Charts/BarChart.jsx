import React from "react";
import ChartLabel from "../ChartLabel/ChartLabel.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DashboardBarChart({
  data,
  className,
  Xkey,
  Ykey,
  heading = "Your Label Here",
  layout,
  Xtype,
  Ytype,
  BarKey,
  barColor
}) {
  return (
    <div className={`p-3 rounded-3 bg-white shadow-sm ${className}`}>
      <ChartLabel heading={heading} />

      <ResponsiveContainer width="100%" height={330}>
        <BarChart layout={layout} data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

              <XAxis type={Xtype} dataKey={Xkey} />
              <YAxis type={Ytype} dataKey={Ykey} />

          <Tooltip />
          <Bar dataKey={BarKey} fill={barColor} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
