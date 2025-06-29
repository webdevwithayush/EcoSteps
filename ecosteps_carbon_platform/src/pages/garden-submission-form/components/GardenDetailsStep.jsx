import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import ImageUpload from './ImageUpload';

const GardenDetailsStep = ({ data, onDataChange, errors }) => {
  const [showMap, setShowMap] = useState(false);

  const handleInputChange = (field, value) => {
    onDataChange({
      ...data,
      [field]: value
    });
  };

  const calculateArea = () => {
    if (data.length && data.width) {
      const area = parseFloat(data.length) * parseFloat(data.width);
      handleInputChange('area', area.toFixed(2));
    }
  };

  const gardenTypes = [
    'Home Garden',
    'Community Garden',
    'Rooftop Garden',
    'Vertical Garden',
    'Greenhouse',
    'Farm Plot',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Garden Details
        </h2>
        <p className="text-text-secondary">
          Tell us about your garden and its location for verification purposes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Garden Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Garden Name *
            </label>
            <Input
              type="text"
              placeholder="e.g., My Backyard Garden"
              value={data.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={errors.name ? 'border-error' : ''}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Garden Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Garden Type *
            </label>
            <select
              value={data.type || ''}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth ${
                errors.type ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">Select garden type</option>
              {gardenTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.type}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Location *
            </label>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your address"
                value={data.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={errors.address ? 'border-error' : ''}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="text"
                  placeholder="City"
                  value={data.city || ''}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="State/Province"
                  value={data.state || ''}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowMap(!showMap)}
                iconName="MapPin"
                iconPosition="left"
                className="w-full"
              >
                {showMap ? 'Hide Map' : 'Show on Map'}
              </Button>
            </div>
            {errors.address && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.address}
              </p>
            )}
          </div>

          {/* Map */}
          {showMap && (
            <div className="h-64 rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Garden Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=37.7749,-122.4194&z=14&output=embed"
              />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Garden Size */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Garden Size *
            </label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    type="number"
                    placeholder="Length (m)"
                    value={data.length || ''}
                    onChange={(e) => handleInputChange('length', e.target.value)}
                    onBlur={calculateArea}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Width (m)"
                    value={data.width || ''}
                    onChange={(e) => handleInputChange('width', e.target.value)}
                    onBlur={calculateArea}
                  />
                </div>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Total area (sq m)"
                  value={data.area || ''}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  className={errors.area ? 'border-error' : ''}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Icon name="Calculator" size={16} className="text-text-secondary" />
                </div>
              </div>
            </div>
            {errors.area && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.area}
              </p>
            )}
          </div>

          {/* Establishment Date */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Garden Established *
            </label>
            <Input
              type="date"
              value={data.establishedDate || ''}
              onChange={(e) => handleInputChange('establishedDate', e.target.value)}
              className={errors.establishedDate ? 'border-error' : ''}
            />
            {errors.establishedDate && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.establishedDate}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description *
            </label>
            <textarea
              placeholder="Describe your garden, plants, and environmental activities..."
              value={data.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth resize-none ${
                errors.description ? 'border-error' : 'border-border'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && (
                <p className="text-sm text-error flex items-center">
                  <Icon name="AlertCircle" size={14} className="mr-1" />
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-text-secondary ml-auto">
                {(data.description || '').length}/500
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Garden Photos *
        </label>
        <p className="text-sm text-text-secondary mb-4">
          Upload clear photos of your garden from different angles. These will be used for verification.
        </p>
        <ImageUpload
          images={data.images || []}
          onImagesChange={(images) => handleInputChange('images', images)}
          maxImages={5}
        />
        {errors.images && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.images}
          </p>
        )}
      </div>
    </div>
  );
};

export default GardenDetailsStep;