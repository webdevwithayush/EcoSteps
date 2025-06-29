import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';

const UserRegistrationLogin = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Helmet>
        <title>{activeTab === 'login' ? 'Sign In' : 'Create Account'} - EcoSteps Carbon Platform</title>
        <meta 
          name="description" 
          content="Join EcoSteps to monetize your environmental impact. Connect with NGOs and trade verified carbon credits from your gardens and trees." 
        />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header Section */}
          <AuthHeader activeTab={activeTab} />

          {/* Main Auth Card */}
          <div className="bg-surface rounded-2xl shadow-strong p-8 border border-border">
            {/* Tab Navigation */}
            <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Form Content */}
            <div className="space-y-6">
              {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
              
              {/* Social Login */}
              <SocialLogin />
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-2">
            <p className="text-sm text-text-secondary">
              By continuing, you agree to our{' '}
              <button className="text-primary hover:text-primary/80 transition-smooth">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-primary hover:text-primary/80 transition-smooth">
                Privacy Policy
              </button>
            </p>
            
            {/* Help Section */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-text-secondary mb-2">Need help getting started?</p>
              <div className="flex justify-center space-x-4 text-xs">
                <button className="text-primary hover:text-primary/80 transition-smooth">
                  Contact Support
                </button>
                <span className="text-border">•</span>
                <button className="text-primary hover:text-primary/80 transition-smooth">
                  Platform Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationLogin;