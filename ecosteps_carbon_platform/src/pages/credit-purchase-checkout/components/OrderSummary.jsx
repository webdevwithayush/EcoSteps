import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ orderItems, onQuantityChange, onRemoveItem }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.08; // 8% tax
  const processingFee = 2.50;
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount if promo applied
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + tax + processingFee;

  const handlePromoApply = () => {
    if (promoCode.toLowerCase() === 'eco10') {
      setPromoApplied(true);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    onQuantityChange(itemId, newQuantity);
  };

  return (
    <div className="bg-surface rounded-lg shadow-medium p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">Order Summary</h2>
        <span className="text-sm text-text-secondary">{orderItems.length} item{orderItems.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {orderItems.map((item) => (
          <div key={item.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={item.image} 
                  alt={item.gardenName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary truncate">{item.gardenName}</h3>
                <p className="text-sm text-text-secondary mt-1">by {item.contributor}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="MapPin" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">{item.location}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Icon name="Calendar" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">Verified {item.verifiedDate}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={() => onRemoveItem(item.id)}
                className="p-1 text-text-secondary hover:text-error"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="p-1 w-8 h-8"
                    disabled={item.quantity <= 1}
                  >
                    <Icon name="Minus" size={14} />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    className="w-16 text-center"
                    min="1"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-1 w-8 h-8"
                  >
                    <Icon name="Plus" size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-text-secondary">${item.price} per credit</p>
                <p className="font-medium text-text-primary">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="mb-6 p-4 bg-background rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Tag" size={16} className="text-text-secondary" />
          <span className="text-sm font-medium text-text-primary">Promo Code</span>
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1"
            disabled={promoApplied}
          />
          <Button
            variant={promoApplied ? "success" : "outline"}
            onClick={handlePromoApply}
            disabled={promoApplied || !promoCode}
          >
            {promoApplied ? (
              <>
                <Icon name="Check" size={16} />
                Applied
              </>
            ) : (
              'Apply'
            )}
          </Button>
        </div>
        {promoApplied && (
          <p className="text-sm text-success mt-2">✓ ECO10 promo code applied - 10% discount</p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 py-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary">${subtotal.toFixed(2)}</span>
        </div>
        
        {promoApplied && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Discount (ECO10)</span>
            <span className="text-success">-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Tax (8%)</span>
          <span className="text-text-primary">${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Processing Fee</span>
          <span className="text-text-primary">${processingFee.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
          <span className="text-text-primary">Total</span>
          <span className="text-text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Leaf" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Environmental Impact</span>
        </div>
        <p className="text-sm text-text-secondary">
          This purchase will offset approximately <span className="font-medium text-primary">
          {orderItems.reduce((sum, item) => sum + item.quantity, 0)} tons</span> of CO₂ equivalent
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;