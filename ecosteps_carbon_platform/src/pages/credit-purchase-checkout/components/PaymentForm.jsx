import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentForm = ({ onPaymentSubmit, isProcessing }) => {
  const [billingInfo, setBillingInfo] = useState({
    organizationName: 'Green Future NGO',
    contactName: 'Sarah Johnson',
    email: 'sarah.johnson@greenfuture.org',
    phone: '+1 (555) 123-4567',
    address: '123 Environmental Way',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [orderNotes, setOrderNotes] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const savedPaymentMethods = [
    { id: 1, type: 'card', last4: '4242', brand: 'Visa', expiry: '12/25' },
    { id: 2, type: 'card', last4: '5555', brand: 'Mastercard', expiry: '08/26' }
  ];

  const handleBillingChange = (field, value) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field, value) => {
    setCardInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }
    onPaymentSubmit({
      billingInfo,
      paymentMethod,
      cardInfo,
      orderNotes
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="bg-surface rounded-lg shadow-medium p-6">
      <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">Payment Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Billing Information */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Billing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Organization Name *
              </label>
              <Input
                type="text"
                value={billingInfo.organizationName}
                onChange={(e) => handleBillingChange('organizationName', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Contact Name *
              </label>
              <Input
                type="text"
                value={billingInfo.contactName}
                onChange={(e) => handleBillingChange('contactName', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email *
              </label>
              <Input
                type="email"
                value={billingInfo.email}
                onChange={(e) => handleBillingChange('email', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phone *
              </label>
              <Input
                type="tel"
                value={billingInfo.phone}
                onChange={(e) => handleBillingChange('phone', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Address *
              </label>
              <Input
                type="text"
                value={billingInfo.address}
                onChange={(e) => handleBillingChange('address', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                City *
              </label>
              <Input
                type="text"
                value={billingInfo.city}
                onChange={(e) => handleBillingChange('city', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                State *
              </label>
              <Input
                type="text"
                value={billingInfo.state}
                onChange={(e) => handleBillingChange('state', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                ZIP Code *
              </label>
              <Input
                type="text"
                value={billingInfo.zipCode}
                onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Country *
              </label>
              <Input
                type="text"
                value={billingInfo.country}
                onChange={(e) => handleBillingChange('country', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Payment Method</h3>
          
          {/* Saved Payment Methods */}
          <div className="space-y-3 mb-4">
            {savedPaymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <input
                  type="radio"
                  id={`saved-${method.id}`}
                  name="paymentMethod"
                  value={`saved-${method.id}`}
                  checked={paymentMethod === `saved-${method.id}`}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary"
                />
                <div className="flex items-center space-x-2">
                  <Icon name="CreditCard" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">
                    {method.brand} ending in {method.last4}
                  </span>
                  <span className="text-sm text-text-secondary">Expires {method.expiry}</span>
                </div>
              </div>
            ))}
          </div>

          {/* New Card Option */}
          <div className="flex items-center space-x-3 p-3 border border-border rounded-lg mb-4">
            <input
              type="radio"
              id="new-card"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-primary"
            />
            <div className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">New Credit/Debit Card</span>
            </div>
          </div>

          {/* Bank Transfer Option */}
          <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
            <input
              type="radio"
              id="bank-transfer"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-primary"
            />
            <div className="flex items-center space-x-2">
              <Icon name="Building2" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">Bank Transfer</span>
            </div>
          </div>
        </div>

        {/* Card Details (if new card selected) */}
        {paymentMethod === 'card' && (
          <div>
            <h4 className="text-md font-medium text-text-primary mb-4">Card Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Cardholder Name *
                </label>
                <Input
                  type="text"
                  value={cardInfo.cardholderName}
                  onChange={(e) => handleCardChange('cardholderName', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Card Number *
                </label>
                <Input
                  type="text"
                  value={cardInfo.cardNumber}
                  onChange={(e) => handleCardChange('cardNumber', formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Expiry Date *
                </label>
                <Input
                  type="text"
                  value={cardInfo.expiryDate}
                  onChange={(e) => handleCardChange('expiryDate', formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  CVV *
                </label>
                <Input
                  type="text"
                  value={cardInfo.cvv}
                  onChange={(e) => handleCardChange('cvv', e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  maxLength="4"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer Instructions */}
        {paymentMethod === 'bank' && (
          <div className="p-4 bg-background rounded-lg">
            <h4 className="text-md font-medium text-text-primary mb-2">Bank Transfer Instructions</h4>
            <p className="text-sm text-text-secondary mb-3">
              You will receive bank transfer instructions via email after placing your order.
            </p>
            <div className="text-sm text-text-secondary space-y-1">
              <p><strong>Processing Time:</strong> 2-3 business days</p>
              <p><strong>Reference:</strong> Include your order number in the transfer reference</p>
            </div>
          </div>
        )}

        {/* Order Notes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Order Notes (Optional)
          </label>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Add any special instructions or notes for this order..."
            rows="3"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 text-primary"
          />
          <label htmlFor="terms" className="text-sm text-text-secondary">
            I agree to the{' '}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-primary hover:underline"
            >
              Terms and Conditions
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-primary hover:underline"
            >
              Privacy Policy
            </button>
          </label>
        </div>

        {/* Security Badges */}
        <div className="flex items-center justify-center space-x-4 py-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">PCI Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">Fraud Protected</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isProcessing}
          disabled={!termsAccepted}
          className="h-12"
        >
          {isProcessing ? (
            <>
              <Icon name="Loader2" size={20} className="animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <Icon name="CreditCard" size={20} />
              Complete Purchase
            </>
          )}
        </Button>
      </form>

      {/* Terms Modal */}
      {showTermsModal && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setShowTermsModal(false)}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-surface rounded-lg shadow-strong max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Terms and Conditions
                  </h3>
                  <Button
                    variant="ghost"
                    onClick={() => setShowTermsModal(false)}
                    className="p-1"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-4 text-sm text-text-secondary">
                <p>
                  By purchasing carbon credits through EcoSteps, you agree to the following terms:
                </p>
                <h4 className="font-medium text-text-primary">1. Credit Verification</h4>
                <p>
                  All carbon credits have been verified by our team and meet international standards for carbon offset projects.
                </p>
                <h4 className="font-medium text-text-primary">2. Payment Terms</h4>
                <p>
                  Payment is due immediately upon order placement. Refunds are available within 30 days of purchase if credits have not been retired.
                </p>
                <h4 className="font-medium text-text-primary">3. Credit Retirement</h4>
                <p>
                  Credits will be automatically retired in your name unless otherwise specified. Retired credits cannot be resold or transferred.
                </p>
                <h4 className="font-medium text-text-primary">4. Privacy Policy</h4>
                <p>
                  We protect your personal information and only use it for order processing and communication purposes.
                </p>
              </div>
              <div className="p-6 border-t border-border">
                <Button
                  variant="primary"
                  onClick={() => setShowTermsModal(false)}
                  fullWidth
                >
                  I Understand
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentForm;