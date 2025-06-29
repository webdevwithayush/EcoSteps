import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [loadingStates, setLoadingStates] = useState({});

  const handleAction = async (actionId) => {
    setLoadingStates(prev => ({ ...prev, [actionId]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoadingStates(prev => ({ ...prev, [actionId]: false }));
  };

  const quickActions = [
    {
      id: 'browse',
      title: 'Browse New Credits',
      description: 'Discover newly available carbon credits from verified contributors',
      icon: 'Search',
      color: 'primary',
      link: '/carbon-credits-marketplace',
      external: false
    },
    {
      id: 'reports',
      title: 'Generate Reports',
      description: 'Create detailed impact reports for stakeholders and compliance',
      icon: 'FileBarChart',
      color: 'secondary',
      action: true
    },
    {
      id: 'certificates',
      title: 'Download Certificates',
      description: 'Get official certificates for your carbon offset achievements',
      icon: 'Download',
      color: 'accent',
      action: true
    },
    {
      id: 'checkout',
      title: 'Complete Purchase',
      description: 'Finish pending transactions in your cart',
      icon: 'ShoppingBag',
      color: 'success',
      link: '/credit-purchase-checkout',
      external: false,
      badge: '2 items'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      'primary': {
        bg: 'bg-primary/10 hover:bg-primary/20',
        icon: 'text-primary',
        button: 'primary'
      },
      'secondary': {
        bg: 'bg-secondary/10 hover:bg-secondary/20',
        icon: 'text-secondary',
        button: 'secondary'
      },
      'accent': {
        bg: 'bg-accent/10 hover:bg-accent/20',
        icon: 'text-accent',
        button: 'warning'
      },
      'success': {
        bg: 'bg-success/10 hover:bg-success/20',
        icon: 'text-success',
        button: 'success'
      }
    };
    return colorMap[color] || colorMap['primary'];
  };

  return (
    <div className="bg-surface rounded-lg shadow-light border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Quick Actions
        </h3>
        <p className="text-text-secondary text-sm mt-1">
          Streamline your carbon credit management
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const colors = getColorClasses(action.color);
            const isLoading = loadingStates[action.id];

            const ActionContent = () => (
              <div className={`relative p-6 rounded-lg border border-border transition-all duration-200 ${colors.bg} group cursor-pointer`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-surface flex items-center justify-center ${colors.icon} shadow-light`}>
                    <Icon name={action.icon} size={24} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-heading font-medium text-text-primary mb-1">
                          {action.title}
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {action.description}
                        </p>
                      </div>
                      {action.badge && (
                        <span className="ml-2 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                          {action.badge}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <Button
                        variant={colors.button}
                        loading={isLoading}
                        onClick={action.action ? () => handleAction(action.id) : undefined}
                        iconName={action.link ? "ArrowRight" : action.icon}
                        iconPosition="right"
                        className="text-sm"
                      >
                        {isLoading ? 'Processing...' : (action.link ? 'Go to' : 'Execute')}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-current opacity-20 transition-all duration-200"></div>
              </div>
            );

            if (action.link) {
              return (
                <Link key={action.id} to={action.link}>
                  <ActionContent />
                </Link>
              );
            }

            return (
              <div key={action.id}>
                <ActionContent />
              </div>
            );
          })}
        </div>

        {/* Additional Quick Stats */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-text-primary">24</div>
              <div className="text-xs text-text-secondary">Pending Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-text-primary">156</div>
              <div className="text-xs text-text-secondary">Available Credits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-text-primary">$2.4K</div>
              <div className="text-xs text-text-secondary">Budget Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-text-primary">98%</div>
              <div className="text-xs text-text-secondary">Goal Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;