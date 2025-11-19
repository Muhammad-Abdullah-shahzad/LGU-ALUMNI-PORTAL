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

export default function DashboardBarChart({ data,className ,Xkey,Ykey, heading="Your Label Here" }) {
  // data should be an array of objects like:
  // [{ department: 'Computer Science', count: 40 }, { department: 'EE', count: 25 }, ...]

  return (
   <div className={`p-3 rounded-3 bg-white shadow-sm ${className}`}>
      <ChartLabel heading={heading} />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={Xkey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={Ykey} fill="#0d6efd" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
   </div>


  );
}
