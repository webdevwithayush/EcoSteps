import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep = 2 }) => {
  const steps = [
    { id: 1, name: 'Browse', icon: 'Search', completed: true },
    { id: 2, name: 'Review', icon: 'ShoppingCart', completed: currentStep >= 2 },
    { id: 3, name: 'Payment', icon: 'CreditCard', completed: currentStep >= 3 },
    { id: 4, name: 'Confirmation', icon: 'CheckCircle', completed: currentStep >= 4 }
  ];

  return (
    <div className="bg-surface rounded-lg shadow-light p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                step.completed 
                  ? 'bg-primary text-primary-foreground' 
                  : currentStep === step.id
                  ? 'bg-primary/20 text-primary border-2 border-primary' :'bg-background text-text-secondary border-2 border-border'
              }`}>
                <Icon 
                  name={step.completed ? 'Check' : step.icon} 
                  size={16} 
                />
              </div>
              <span className={`text-sm font-medium mt-2 transition-smooth ${
                step.completed || currentStep === step.id
                  ? 'text-text-primary' :'text-text-secondary'
              }`}>
                {step.name}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-smooth ${
                steps[index + 1].completed ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;