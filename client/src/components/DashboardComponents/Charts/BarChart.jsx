import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DashboardBarChart({ data }) {
  // data should be an array of objects like:
  // [{ department: 'Computer Science', count: 40 }, { department: 'EE', count: 25 }, ...]

  return (
   
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#0d6efd" barSize={40} />
        </BarChart>
      </ResponsiveContainer>

  );
}
