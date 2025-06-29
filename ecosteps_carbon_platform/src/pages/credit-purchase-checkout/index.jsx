import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OrderSummary from './components/OrderSummary';
import PaymentForm from './components/PaymentForm';
import CheckoutProgress from './components/CheckoutProgress';
import MobileOrderSummary from './components/MobileOrderSummary';

const CreditPurchaseCheckout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobileOrderSummary, setShowMobileOrderSummary] = useState(false);
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      gardenName: "Urban Rooftop Garden",
      contributor: "Maria Rodriguez",
      location: "San Francisco, CA",
      verifiedDate: "Dec 15, 2024",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      price: 25.50,
      quantity: 2,
      creditType: "Verified Carbon Reduction"
    },
    {
      id: 2,
      gardenName: "Community Vegetable Garden",
      contributor: "James Chen",
      location: "Portland, OR",
      verifiedDate: "Dec 12, 2024",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
      price: 18.75,
      quantity: 3,
      creditType: "Organic Farming Initiative"
    },
    {
      id: 3,
      gardenName: "Native Plant Restoration",
      contributor: "Sarah Thompson",
      location: "Austin, TX",
      verifiedDate: "Dec 10, 2024",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop",
      price: 32.00,
      quantity: 1,
      creditType: "Ecosystem Restoration"
    }
  ]);

  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    setOrderItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setOrderItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handlePaymentSubmit = async (paymentData) => {
    setIsProcessing(true);
    setCurrentStep(3);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock successful payment
      setCurrentStep(4);
      
      // Show success message and redirect
      setTimeout(() => {
        alert('Payment successful! Redirecting to your dashboard...');
        navigate('/ngo-impact-dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
      setCurrentStep(2);
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const processingFee = 2.50;
    return subtotal + tax + processingFee;
  };

  const total = calculateTotal();

  if (orderItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <Icon name="ShoppingCart" size={64} className="mx-auto text-text-secondary mb-4" />
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                Your cart is empty
              </h2>
              <p className="text-text-secondary mb-6">
                Browse our marketplace to find carbon credits to purchase
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/carbon-credits-marketplace')}
              >
                <Icon name="ArrowLeft" size={16} />
                Back to Marketplace
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
              <button 
                onClick={() => navigate('/carbon-credits-marketplace')}
                className="hover:text-primary transition-smooth"
              >
                Marketplace
              </button>
              <Icon name="ChevronRight" size={14} />
              <span className="text-text-primary">Checkout</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-text-primary">
              Complete Your Purchase
            </h1>
            <p className="text-text-secondary mt-2">
              Review your order and complete the payment to offset your carbon footprint
            </p>
          </div>

          {/* Progress Indicator */}
          <CheckoutProgress currentStep={currentStep} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Order Summary - Desktop */}
            <div className="lg:col-span-3 hidden md:block">
              <OrderSummary
                orderItems={orderItems}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
              />
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2">
              <PaymentForm
                onPaymentSubmit={handlePaymentSubmit}
                isProcessing={isProcessing}
              />
            </div>
          </div>

          {/* Mobile Order Summary Toggle */}
          <div className="md:hidden pb-20">
            <MobileOrderSummary
              orderItems={orderItems}
              total={total}
              isVisible={showMobileOrderSummary}
              onToggle={() => setShowMobileOrderSummary(!showMobileOrderSummary)}
            />
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-surface rounded-lg shadow-light border border-border">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-success mt-0.5" />
              <div>
                <h3 className="font-medium text-text-primary mb-1">Secure Transaction</h3>
                <p className="text-sm text-text-secondary">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption 
                  and are PCI DSS compliant. Your carbon credits will be immediately available in your account 
                  after successful payment.
                </p>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@ecosteps.com" className="text-primary hover:underline">
                support@ecosteps.com
              </a>{' '}
              or call{' '}
              <a href="tel:+1-555-123-4567" className="text-primary hover:underline">
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-surface rounded-lg shadow-strong p-8 max-w-sm w-full mx-4 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              Processing Payment
            </h3>
            <p className="text-sm text-text-secondary">
              Please don't close this window. Your payment is being processed securely.
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} className="text-success" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Lock" size={12} className="text-success" />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreditPurchaseCheckout;