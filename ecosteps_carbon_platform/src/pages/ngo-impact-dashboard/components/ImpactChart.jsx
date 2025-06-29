import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const ImpactChart = () => {
  const [activeChart, setActiveChart] = useState('monthly');

  const monthlyData = [
    { month: 'Jan', credits: 120, cost: 2400 },
    { month: 'Feb', credits: 180, cost: 3600 },
    { month: 'Mar', credits: 240, cost: 4800 },
    { month: 'Apr', credits: 200, cost: 4000 },
    { month: 'May', credits: 320, cost: 6400 },
    { month: 'Jun', credits: 280, cost: 5600 }
  ];

  const geographicData = [
    { region: 'North America', credits: 450, color: '#2D5A3D' },
    { region: 'Europe', credits: 320, color: '#7B9B47' },
    { region: 'Asia', credits: 280, color: '#E67E22' },
    { region: 'South America', credits: 150, color: '#27AE60' },
    { region: 'Africa', credits: 100, color: '#F39C12' }
  ];

  const projectTypeData = [
    { type: 'Urban Gardens', credits: 400 },
    { type: 'Reforestation', credits: 350 },
    { type: 'Solar Projects', credits: 300 },
    { type: 'Wind Energy', credits: 250 }
  ];

  const chartOptions = [
    { id: 'monthly', label: 'Monthly Trends', icon: 'TrendingUp' },
    { id: 'geographic', label: 'Geographic Distribution', icon: 'Globe' },
    { id: 'projects', label: 'Project Types', icon: 'BarChart3' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'monthly':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#7F8C8D" />
              <YAxis stroke="#7F8C8D" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="credits" 
                stroke="#2D5A3D" 
                strokeWidth={3}
                dot={{ fill: '#2D5A3D', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#2D5A3D' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'geographic':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={geographicData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="credits"
                label={({ region, percent }) => `${region} ${(percent * 100).toFixed(0)}%`}
              >
                {geographicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'projects':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="type" stroke="#7F8C8D" />
              <YAxis stroke="#7F8C8D" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="credits" fill="#2D5A3D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-light border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 sm:mb-0">
          Impact Analytics
        </h3>
        <div className="flex flex-wrap gap-2">
          {chartOptions.map((option) => (
            <Button
              key={option.id}
              variant={activeChart === option.id ? 'primary' : 'ghost'}
              onClick={() => setActiveChart(option.id)}
              iconName={option.icon}
              iconPosition="left"
              className="text-sm"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full h-80">
        {renderChart()}
      </div>
    </div>
  );
};

export default ImpactChart;