import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CreditCard = ({ credit, onAddToCart, isSelected, onSelect }) => {
  const [quantity, setQuantity] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleAddToCart = () => {
    onAddToCart({
      id: credit.id,
      name: credit.title,
      price: credit.pricePerCredit,
      quantity: quantity,
      contributor: credit.contributor,
      location: credit.location,
      image: credit.images[0]
    });
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= credit.availableCredits) {
      setQuantity(newQuantity);
    }
  };

  const getVerificationBadge = () => {
    const statusConfig = {
      verified: { color: 'bg-success text-success-foreground', icon: 'CheckCircle' },
      pending: { color: 'bg-warning text-warning-foreground', icon: 'Clock' },
      rejected: { color: 'bg-error text-error-foreground', icon: 'XCircle' }
    };
    
    const config = statusConfig[credit.verificationStatus] || statusConfig.pending;
    
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span className="capitalize">{credit.verificationStatus}</span>
      </div>
    );
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? 'text-accent fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-light hover:shadow-medium transition-all duration-300 group">
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(credit.id, e.target.checked)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-surface"
        />
      </div>

      {/* Image Gallery */}
      <div className="relative h-48 overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 bg-background animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-text-secondary" />
          </div>
        )}
        <Image
          src={credit.images[0]}
          alt={credit.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setIsImageLoading(false)}
        />
        
        {/* Image Count Badge */}
        {credit.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            <Icon name="Camera" size={12} />
            <span>{credit.images.length}</span>
          </div>
        )}

        {/* Verification Badge */}
        <div className="absolute top-3 right-3">
          {getVerificationBadge()}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="font-heading font-semibold text-text-primary mb-1 line-clamp-2">
            {credit.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-text-secondary">
            <Icon name="MapPin" size={14} />
            <span>{credit.location}</span>
          </div>
        </div>

        {/* Credit Type */}
        <div className="mb-3">
          <span className="inline-block bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
            {credit.creditType}
          </span>
        </div>

        {/* Contributor Info */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={12} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{credit.contributor}</p>
            <div className="flex items-center space-x-1">
              {getRatingStars(credit.rating)}
              <span className="text-xs text-text-secondary ml-1">({credit.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Credits and Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-text-secondary">Available Credits</p>
            <p className="font-data font-semibold text-text-primary">{credit.availableCredits}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-secondary">Price per Credit</p>
            <p className="font-heading font-bold text-lg text-primary">${credit.pricePerCredit}</p>
          </div>
        </div>

        {/* Verification Date */}
        <div className="mb-4">
          <p className="text-xs text-text-secondary">
            Verified on {new Date(credit.verificationDate).toLocaleDateString()}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-text-secondary">Quantity:</span>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 p-0 flex items-center justify-center"
            >
              <Icon name="Minus" size={14} />
            </Button>
            <span className="w-12 text-center font-data text-sm">{quantity}</span>
            <Button
              variant="outline"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= credit.availableCredits}
              className="w-8 h-8 p-0 flex items-center justify-center"
            >
              <Icon name="Plus" size={14} />
            </Button>
          </div>
        </div>

        {/* Total Price */}
        <div className="mb-4 p-2 bg-background rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Total Price:</span>
            <span className="font-heading font-bold text-primary">
              ${(credit.pricePerCredit * quantity).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link to={`/credit-details/${credit.id}`} className="flex-1">
            <Button variant="outline" fullWidth>
              <Icon name="Eye" size={16} />
              View Details
            </Button>
          </Link>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={credit.verificationStatus !== 'verified'}
            className="flex-1"
          >
            <Icon name="ShoppingCart" size={16} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;