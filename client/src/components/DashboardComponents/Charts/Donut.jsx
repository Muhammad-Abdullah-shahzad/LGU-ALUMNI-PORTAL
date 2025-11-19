import React from "react";
import ChartLabel from "../ChartLabel/ChartLabel.jsx";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardDonut({
  data,
  className,
  Xkey,
  Ykey,
  colors,
  heading = "Your Label Here",
}) {
  // Refined dashboard-friendly colors
  const defaultColors = [
    "#4e79a7", // blue
    "#59a14f", // green
    "#f28e2b", // orange
    "#e15759", // red
    "#937ebf", // purple
  ];

  // custom label for better clarity
  const renderLabel = (entry) => `${entry[Xkey]} (${entry[Ykey]})`;

  return (
    <div className={`p-3 rounded-3 bg-white shadow-sm ${className}`}>
      <ChartLabel heading={heading} />
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey={Ykey}   // ✅ numeric value
            nameKey={Xkey}   // ✅ label
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  colors
                    ? colors[index % colors.length]
                    : defaultColors[index % defaultColors.length]
                }
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={40}
            iconType="circle"
            wrapperStyle={{ marginTop: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
