import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ activeTab }) => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-medium">
          <Icon name="Leaf" size={28} color="white" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">EcoSteps</h1>
          <p className="text-sm text-text-secondary">Carbon Credit Platform</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-2">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          {activeTab === 'login' ? 'Welcome Back!' : 'Join EcoSteps'}
        </h2>
        <p className="text-text-secondary mt-1">
          {activeTab === 'login' ?'Sign in to access your carbon credit dashboard' :'Create your account and start earning from your environmental impact'
          }
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;