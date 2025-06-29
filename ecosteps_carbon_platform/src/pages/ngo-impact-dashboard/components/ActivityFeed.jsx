import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'purchase',
      title: 'Carbon Credits Purchased',
      description: 'Successfully purchased 75 credits from EcoFarm Solutions',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'ShoppingCart',
      color: 'success',
      amount: 75,
      cost: 1500
    },
    {
      id: 2,
      type: 'availability',
      title: 'New Credits Available',
      description: 'Green Gardens Co. has listed 120 new verified credits',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'Plus',
      color: 'primary',
      amount: 120,
      location: 'California, USA'
    },
    {
      id: 3,
      type: 'verification',
      title: 'Credits Verified',
      description: 'Your recent purchase from Solar Harvest Inc. has been verified',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'CheckCircle',
      color: 'success',
      amount: 100
    },
    {
      id: 4,
      type: 'certificate',
      title: 'Certificate Generated',
      description: 'Impact certificate for Q1 2024 is now available for download',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      icon: 'FileText',
      color: 'accent',
      period: 'Q1 2024'
    },
    {
      id: 5,
      type: 'recommendation',
      title: 'Recommended Credits',
      description: 'New reforestation projects matching your preferences are available',
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      icon: 'Target',
      color: 'secondary',
      count: 5
    },
    {
      id: 6,
      type: 'milestone',
      title: 'Impact Milestone Reached',
      description: 'Congratulations! You have offset 1,000 tons of CO2 this year',
      timestamp: new Date(Date.now() - 28800000), // 8 hours ago
      icon: 'Award',
      color: 'warning',
      milestone: '1,000 tons CO2'
    }
  ];

  const getActivityIcon = (type, icon) => {
    return icon;
  };

  const getActivityColor = (color) => {
    const colorMap = {
      'primary': 'text-primary bg-primary/10',
      'success': 'text-success bg-success/10',
      'warning': 'text-warning bg-warning/10',
      'accent': 'text-accent bg-accent/10',
      'secondary': 'text-secondary bg-secondary/10'
    };
    return colorMap[color] || colorMap['primary'];
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getActivityDetails = (activity) => {
    switch (activity.type) {
      case 'purchase':
        return (
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <span>Amount: {activity.amount} credits</span>
            <span>Cost: ${activity.cost}</span>
          </div>
        );
      case 'availability':
        return (
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <span>Amount: {activity.amount} credits</span>
            <span>Location: {activity.location}</span>
          </div>
        );
      case 'verification':
        return (
          <div className="text-xs text-text-secondary">
            Amount: {activity.amount} credits verified
          </div>
        );
      case 'certificate':
        return (
          <div className="text-xs text-text-secondary">
            Period: {activity.period}
          </div>
        );
      case 'recommendation':
        return (
          <div className="text-xs text-text-secondary">
            {activity.count} new projects available
          </div>
        );
      case 'milestone':
        return (
          <div className="text-xs text-text-secondary">
            Total offset: {activity.milestone}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-light border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Recent Activity
          </h3>
          <Button variant="ghost" className="text-sm">
            View All
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 bg-background rounded-lg border border-border hover:shadow-light transition-smooth">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.color)}`}>
                <Icon name={getActivityIcon(activity.type, activity.icon)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary text-sm mb-1">
                      {activity.title}
                    </h4>
                    <p className="text-text-secondary text-sm mb-2">
                      {activity.description}
                    </p>
                    {getActivityDetails(activity)}
                  </div>
                  <span className="text-xs text-text-secondary ml-4 flex-shrink-0">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="outline" fullWidth>
            Load More Activities
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;