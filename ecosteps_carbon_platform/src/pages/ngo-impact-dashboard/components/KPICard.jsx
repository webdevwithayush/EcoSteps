import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, trend, trendValue, icon, color = 'primary' }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-text-secondary';
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-light border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center`}>
          <Icon name={icon} size={24} className={`text-${color}`} />
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={16} />
          <span className="text-sm font-medium">{trendValue}</span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-text-secondary text-sm font-medium">{title}</p>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-heading font-bold text-text-primary">{value}</span>
          {unit && <span className="text-text-secondary text-sm">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default KPICard;