import { expenseType } from "@/app/types/commonTypes";
import React, { PureComponent, useState } from "react";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function ExpenseChart(props : any) { 
    const data = props.expense.map((expense: expenseType) => ({
        name: expense.date,
        amount: expense.amount,
      }));
  return (
    <div>
      <div className="flex justify-center">
        <p className="text-2xl , font-semibold">Expense Bar Chart</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey= "amount" />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" shape={<Rectangle fill="green" stroke="blue" width={100}  />} />
        </BarChart>
      </ResponsiveContainer>
     
    </div>
  );
}
