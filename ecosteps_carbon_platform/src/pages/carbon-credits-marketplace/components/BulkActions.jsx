import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedCredits, credits, onSelectAll, onDeselectAll, onBulkAddToCart }) => {
  const selectedCount = selectedCredits.length;
  const totalCredits = credits.length;
  const allSelected = selectedCount === totalCredits && totalCredits > 0;

  const getTotalPrice = () => {
    return selectedCredits.reduce((total, creditId) => {
      const credit = credits.find(c => c.id === creditId);
      return total + (credit ? credit.pricePerCredit : 0);
    }, 0);
  };

  const getTotalAvailableCredits = () => {
    return selectedCredits.reduce((total, creditId) => {
      const credit = credits.find(c => c.id === creditId);
      return total + (credit ? credit.availableCredits : 0);
    }, 0);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* Selection Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-text-primary">
              {selectedCount} of {totalCredits} credits selected
            </span>
          </div>
          
          <div className="text-sm text-text-secondary">
            Total: {getTotalAvailableCredits()} credits • ${getTotalPrice().toFixed(2)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {!allSelected ? (
            <Button
              variant="outline"
              onClick={onSelectAll}
              iconName="CheckSquare"
              iconSize={16}
            >
              Select All
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onDeselectAll}
              iconName="Square"
              iconSize={16}
            >
              Deselect All
            </Button>
          )}

          <Button
            variant="primary"
            onClick={onBulkAddToCart}
            iconName="ShoppingCart"
            iconSize={16}
          >
            Add Selected to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;