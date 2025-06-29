import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartWidget = ({ cartItems, onUpdateQuantity, onRemoveItem, isOpen, onToggle }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onToggle}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-surface shadow-strong z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="ShoppingCart" size={20} className="text-primary" />
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Shopping Cart
              </h3>
              {cartItems.length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </div>
            <Button variant="ghost" onClick={onToggle} className="p-1">
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="ShoppingCart" size={48} className="mx-auto text-text-secondary mb-4" />
              <h4 className="font-medium text-text-primary mb-2">Your cart is empty</h4>
              <p className="text-sm text-text-secondary mb-6">
                Browse our marketplace to find carbon credits
              </p>
              <Button variant="primary" onClick={onToggle}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="border border-border rounded-lg p-4">
                  <div className="flex space-x-3">
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text-primary mb-1 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-text-secondary mb-1">
                        by {item.contributor}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-text-secondary mb-2">
                        <Icon name="MapPin" size={12} />
                        <span>{item.location}</span>
                      </div>
                      <p className="text-sm font-medium text-primary">
                        ${item.price} per credit
                      </p>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-error hover:bg-error/10 flex-shrink-0"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary">Quantity:</span>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 p-0 flex items-center justify-center"
                        >
                          <Icon name="Minus" size={12} />
                        </Button>
                        <span className="w-8 text-center font-data text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 flex items-center justify-center"
                        >
                          <Icon name="Plus" size={12} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-heading font-semibold text-text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-border bg-background">
            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-text-primary">Total:</span>
              <span className="font-heading font-bold text-xl text-primary">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>

            {/* Summary */}
            <div className="text-sm text-text-secondary mb-4">
              {getTotalItems()} credits from {cartItems.length} {cartItems.length === 1 ? 'source' : 'sources'}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link to="/credit-purchase-checkout" onClick={onToggle}>
                <Button variant="primary" fullWidth>
                  <Icon name="CreditCard" size={16} />
                  Proceed to Checkout
                </Button>
              </Link>
              <Button variant="outline" onClick={onToggle} fullWidth>
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartWidget;