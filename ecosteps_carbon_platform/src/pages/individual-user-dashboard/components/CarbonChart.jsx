import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CarbonChart = ({ data }) => {
  return (
    <div className="bg-surface rounded-lg p-6 shadow-light border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Carbon Credits Generated</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#7F8C8D"
              fontSize={12}
            />
            <YAxis 
              stroke="#7F8C8D"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="credits" 
              stroke="#2D5A3D" 
              strokeWidth={3}
              dot={{ fill: '#2D5A3D', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2D5A3D', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CarbonChart;