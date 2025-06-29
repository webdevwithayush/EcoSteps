import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, color, route, buttonText }) => {
  return (
    <div className="bg-surface rounded-lg p-6 shadow-light border border-border hover:shadow-medium transition-smooth">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} mb-4`}>
        <Icon name={icon} size={24} color="white" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary mb-4">{description}</p>
      <Link to={route}>
        <Button variant="outline" fullWidth>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default QuickActionCard;