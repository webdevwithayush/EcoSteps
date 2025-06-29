import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-background rounded-lg p-1 mb-8">
      <Button
        variant={activeTab === 'login' ? 'primary' : 'ghost'}
        onClick={() => onTabChange('login')}
        className="flex-1 py-3"
        fullWidth
      >
        Login
      </Button>
      <Button
        variant={activeTab === 'register' ? 'primary' : 'ghost'}
        onClick={() => onTabChange('register')}
        className="flex-1 py-3"
        fullWidth
      >
        Register
      </Button>
    </div>
  );
};

export default AuthTabs;