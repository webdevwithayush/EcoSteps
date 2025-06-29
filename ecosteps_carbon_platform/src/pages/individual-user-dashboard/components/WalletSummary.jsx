import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletSummary = ({ balance, recentTransactions }) => {
  return (
    <div className="bg-surface rounded-lg p-6 shadow-light border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Wallet Summary</h3>
        <Icon name="Wallet" size={20} className="text-primary" />
      </div>
      
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-4 mb-4">
        <p className="text-primary-foreground/80 text-sm mb-1">Total Balance</p>
        <p className="text-2xl font-heading font-bold text-primary-foreground">${balance.toFixed(2)}</p>
      </div>
      
      <div className="space-y-3 mb-4">
        <h4 className="text-sm font-medium text-text-primary">Recent Transactions</h4>
        {recentTransactions.length === 0 ? (
          <p className="text-sm text-text-secondary">No transactions yet</p>
        ) : (
          recentTransactions.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.type === 'credit' ? 'bg-success/10' : 'bg-error/10'
                }`}>
                  <Icon 
                    name={transaction.type === 'credit' ? 'Plus' : 'Minus'} 
                    size={16} 
                    className={transaction.type === 'credit' ? 'text-success' : 'text-error'}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{transaction.description}</p>
                  <p className="text-xs text-text-secondary">{transaction.date}</p>
                </div>
              </div>
              <p className={`text-sm font-medium ${
                transaction.type === 'credit' ? 'text-success' : 'text-error'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
      
      <Button variant="outline" fullWidth>
        View All Transactions
      </Button>
    </div>
  );
};

export default WalletSummary;