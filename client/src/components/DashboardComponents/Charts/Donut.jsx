import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardDonut({ data, className, Xkey, Ykey, colors }) {
  const defaultColors = ["#0d6efd", "#198754", "#dc3545", "#ffc107", "#6f42c1"];

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
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
                fill={colors ? colors[index % colors.length] : defaultColors[index % defaultColors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
