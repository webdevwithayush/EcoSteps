import React from 'react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import ImpactChart from './components/ImpactChart';
import CreditsPurchaseTable from './components/CreditsPurchaseTable';
import ImpactMap from './components/ImpactMap';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';

const NGOImpactDashboard = () => {
  const kpiData = [
    {
      title: 'Total Credits Purchased',
      value: '1,247',
      unit: 'credits',
      trend: 'up',
      trendValue: '+12.5%',
      icon: 'ShoppingCart',
      color: 'primary'
    },
    {
      title: 'Carbon Offset Achieved',
      value: '2,494',
      unit: 'tons CO2',
      trend: 'up',
      trendValue: '+18.2%',
      icon: 'Leaf',
      color: 'success'
    },
    {
      title: 'Active Projects Supported',
      value: '34',
      unit: 'projects',
      trend: 'up',
      trendValue: '+5',
      icon: 'TreePine',
      color: 'secondary'
    },
    {
      title: 'Average Cost per Ton',
      value: '$19.50',
      unit: 'per ton',
      trend: 'down',
      trendValue: '-3.2%',
      icon: 'DollarSign',
      color: 'accent'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary">
                Impact Dashboard
              </h1>
              <p className="text-text-secondary mt-2">
                Track your organization's carbon credit purchases and environmental impact
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">Last Updated</p>
                <p className="text-xs text-text-secondary">
                  {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              trend={kpi.trend}
              trendValue={kpi.trendValue}
              icon={kpi.icon}
              color={kpi.color}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2">
            <ImpactChart />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Map and Activity Feed */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2">
            <ImpactMap />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>

        {/* Purchase History Table */}
        <div className="mb-8">
          <CreditsPurchaseTable />
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} EcoSteps Carbon Platform. Making environmental impact measurable and actionable.
          </p>
        </div>
      </main>
    </div>
  );
};

export default NGOImpactDashboard;