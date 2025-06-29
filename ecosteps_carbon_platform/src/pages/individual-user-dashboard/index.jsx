import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import QuickActionCard from './components/QuickActionCard';
import ActivityFeed from './components/ActivityFeed';
import CarbonChart from './components/CarbonChart';
import SubmissionGrid from './components/SubmissionGrid';
import SubmissionHistory from './components/SubmissionHistory';
import WalletSummary from './components/WalletSummary';

import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const IndividualUserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();

  // Check for success messages from navigation state
  const successMessage = location.state?.message;
  const messageType = location.state?.type;

  // Mock data
  const mockDashboardData = {
    metrics: {
      totalCredits: 245,
      pendingSubmissions: 3,
      verifiedCredits: 189,
      walletBalance: 1247.50
    },
    chartData: [
      { month: 'Jan', credits: 20 },
      { month: 'Feb', credits: 35 },
      { month: 'Mar', credits: 28 },
      { month: 'Apr', credits: 42 },
      { month: 'May', credits: 38 },
      { month: 'Jun', credits: 55 },
      { month: 'Jul', credits: 48 },
      { month: 'Aug', credits: 62 }
    ],
    recentActivities: [
      {
        id: 1,
        title: "Garden Submission Approved",
        description: "Your rooftop garden submission has been verified and approved",
        status: "approved",
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        title: "New Tree Registration",
        description: "Successfully registered 5 new mango trees in your backyard",
        status: "pending",
        timestamp: "1 day ago"
      },
      {
        id: 3,
        title: "Equipment Verification",
        description: "Solar panel installation is under review",
        status: "pending",
        timestamp: "2 days ago"
      },
      {
        id: 4,
        title: "Credit Purchase",
        description: "EcoGreen NGO purchased 25 credits from your garden",
        status: "approved",
        timestamp: "3 days ago"
      }
    ],
    submissions: [
      {
        id: 1,
        title: "Rooftop Vegetable Garden",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
        status: "approved",
        credits: 45
      },
      {
        id: 2,
        title: "Backyard Fruit Trees",
        image: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400&h=400&fit=crop",
        status: "pending",
        credits: 32
      },
      {
        id: 3,
        title: "Herb Garden Collection",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
        status: "approved",
        credits: 18
      },
      {
        id: 4,
        title: "Community Tree Planting",
        image: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400&h=400&fit=crop",
        status: "rejected",
        credits: 0
      },
      {
        id: 5,
        title: "Indoor Plant Collection",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
        status: "approved",
        credits: 12
      },
      {
        id: 6,
        title: "Balcony Garden Setup",
        image: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400&h=400&fit=crop",
        status: "pending",
        credits: 28
      }
    ],
    recentTransactions: [
      {
        id: 1,
        description: "Credit sale to EcoGreen NGO",
        amount: 125.00,
        type: "credit",
        date: "Dec 15, 2024"
      },
      {
        id: 2,
        description: "Credit sale to Green Future Org",
        amount: 89.50,
        type: "credit",
        date: "Dec 12, 2024"
      },
      {
        id: 3,
        description: "Platform fee",
        amount: 5.00,
        type: "debit",
        date: "Dec 10, 2024"
      }
    ]
  };

  const quickActions = [
    {
      title: "Submit New Garden",
      description: "Add your garden details and photos to generate carbon credits",
      icon: "Sprout",
      color: "bg-primary",
      route: "/garden-submission-form",
      buttonText: "Add Garden"
    },
    {
      title: "Browse Marketplace",
      description: "Explore carbon credit marketplace and connect with NGOs",
      icon: "Store",
      color: "bg-secondary",
      route: "/carbon-credits-marketplace",
      buttonText: "View Marketplace"
    },
    {
      title: "Track Impact",
      description: "Monitor your environmental contribution and earnings",
      icon: "BarChart3",
      color: "bg-accent",
      route: "#",
      buttonText: "View Analytics"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDashboardData(mockDashboardData);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-border rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-border rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-80 bg-border rounded-lg"></div>
                <div className="h-96 bg-border rounded-lg"></div>
              </div>
              <div className="space-y-8">
                <div className="h-64 bg-border rounded-lg"></div>
                <div className="h-80 bg-border rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className={`mb-6 p-4 rounded-lg border flex items-center space-x-3 ${
            messageType === 'success' ?'bg-success/10 border-success/20 text-success' :'bg-primary/10 border-primary/20 text-primary'
          }`}>
            <Icon name={messageType === 'success' ? 'CheckCircle' : 'Info'} size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Welcome back, John! 🌱
          </h1>
          <p className="text-text-secondary">
            Track your environmental impact and manage your carbon credit earnings
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Credits Generated"
            value={dashboardData.metrics.totalCredits}
            icon="Leaf"
            color="bg-primary"
            trend="up"
            trendValue="+12% this month"
          />
          <MetricsCard
            title="Pending Submissions"
            value={dashboardData.metrics.pendingSubmissions}
            icon="Clock"
            color="bg-warning"
          />
          <MetricsCard
            title="Verified Credits"
            value={dashboardData.metrics.verifiedCredits}
            icon="CheckCircle"
            color="bg-success"
            trend="up"
            trendValue="+8% this month"
          />
          <MetricsCard
            title="Wallet Balance"
            value={`$${dashboardData.metrics.walletBalance.toFixed(2)}`}
            icon="Wallet"
            color="bg-accent"
            trend="up"
            trendValue="+$125 this week"
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-background rounded-lg p-1 border border-border">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
                activeTab === 'overview' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
                activeTab === 'history' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Submission History
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Charts and Submissions */}
            <div className="lg:col-span-2 space-y-8">
              {/* Carbon Credits Chart */}
              <CarbonChart data={dashboardData.chartData} />
              
              {/* My Submissions Grid */}
              <SubmissionGrid submissions={dashboardData.submissions} />
            </div>

            {/* Right Column - Quick Actions and Activity */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-surface rounded-lg p-6 shadow-light border border-border">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <QuickActionCard
                      key={index}
                      title={action.title}
                      description={action.description}
                      icon={action.icon}
                      color={action.color}
                      route={action.route}
                      buttonText={action.buttonText}
                    />
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <ActivityFeed activities={dashboardData.recentActivities} />

              {/* Wallet Summary */}
              <WalletSummary 
                balance={dashboardData.metrics.walletBalance}
                recentTransactions={dashboardData.recentTransactions}
              />
            </div>
          </div>
        ) : (
          <SubmissionHistory />
        )}

        {/* Mobile Quick Actions (visible only on mobile) */}
        <div className="lg:hidden mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/garden-submission-form">
              <Button variant="primary" fullWidth iconName="Plus" iconPosition="left">
                Submit Garden
              </Button>
            </Link>
            <Link to="/carbon-credits-marketplace">
              <Button variant="secondary" fullWidth iconName="Store" iconPosition="left">
                Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndividualUserDashboard;