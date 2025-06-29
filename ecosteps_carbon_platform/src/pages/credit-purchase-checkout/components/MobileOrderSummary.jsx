import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileOrderSummary = ({ orderItems, total, isVisible, onToggle }) => {
  const itemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isVisible) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-strong p-4 md:hidden z-40">
        <Button
          variant="primary"
          fullWidth
          onClick={onToggle}
          className="flex items-center justify-between"
        >
          <span>Show Order Summary</span>
          <div className="flex items-center space-x-2">
            <span className="font-data">{itemCount} items</span>
            <span className="font-heading font-semibold">${total.toFixed(2)}</span>
            <Icon name="ChevronUp" size={16} />
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-surface z-50 md:hidden overflow-y-auto">
      <div className="sticky top-0 bg-surface border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-text-primary">Order Summary</h2>
          <Button variant="ghost" onClick={onToggle} className="p-1">
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {orderItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.gardenName}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary text-sm truncate">{item.gardenName}</h3>
              <p className="text-xs text-text-secondary">by {item.contributor}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-text-secondary">Qty: {item.quantity}</span>
                <span className="text-sm font-medium text-text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="border-t border-border pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Subtotal</span>
            <span className="text-text-primary">${(total * 0.85).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Tax & Fees</span>
            <span className="text-text-primary">${(total * 0.15).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
            <span className="text-text-primary">Total</span>
            <span className="text-text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-surface border-t border-border p-4">
        <Button variant="primary" fullWidth onClick={onToggle}>
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default MobileOrderSummary;