import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface UsageChartProps {
  data: { date: string; count: number }[];
}

export const UsageChart = ({ data }: UsageChartProps) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
          <YAxis stroke="#94A3B8" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#171F33', borderColor: '#334155', color: '#F8FAFC' }}
            itemStyle={{ color: '#5EEAD4' }}
          />
          <Line type="monotone" dataKey="count" stroke="#7C5CFC" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
