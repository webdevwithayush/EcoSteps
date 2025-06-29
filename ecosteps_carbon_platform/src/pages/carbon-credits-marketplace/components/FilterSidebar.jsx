import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ filters, onFilterChange, onClearAll, isMobile, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    creditType: true,
    priceRange: true,
    verificationDate: true,
    gardenCharacteristics: true
  });
  
  const [locationSearch, setLocationSearch] = useState('');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLocationChange = (location) => {
    const updatedLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location];
    onFilterChange('locations', updatedLocations);
  };

  const handleCreditTypeChange = (type) => {
    const updatedTypes = filters.creditTypes.includes(type)
      ? filters.creditTypes.filter(t => t !== type)
      : [...filters.creditTypes, type];
    onFilterChange('creditTypes', updatedTypes);
  };

  const handleGardenTypeChange = (type) => {
    const updatedTypes = filters.gardenTypes.includes(type)
      ? filters.gardenTypes.filter(t => t !== type)
      : [...filters.gardenTypes, type];
    onFilterChange('gardenTypes', updatedTypes);
  };

  // Comprehensive list of countries
  const allCountries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Netherlands',
    'Belgium',
    'Switzerland',
    'Austria',
    'Sweden',
    'Norway',
    'Denmark',
    'Finland',
    'Poland',
    'Czech Republic',
    'Hungary',
    'Portugal',
    'Ireland',
    'Australia',
    'New Zealand',
    'Japan',
    'South Korea',
    'Singapore',
    'China',
    'India',
    'Indonesia',
    'Thailand',
    'Malaysia',
    'Philippines',
    'Vietnam',
    'Brazil',
    'Argentina',
    'Chile',
    'Colombia',
    'Mexico',
    'Costa Rica',
    'Panama',
    'South Africa',
    'Kenya',
    'Nigeria',
    'Ghana',
    'Morocco',
    'Egypt',
    'Israel',
    'Turkey',
    'Russia',
    'Ukraine',
    'Croatia',
    'Slovenia',
    'Estonia',
    'Latvia',
    'Lithuania',
    'Iceland',
    'Luxembourg',
    'Monaco',
    'Malta',
    'Cyprus',
    'Greece',
    'Bulgaria',
    'Romania',
    'Serbia',
    'Bosnia and Herzegovina',
    'North Macedonia',
    'Albania',
    'Montenegro',
    'Moldova',
    'Belarus',
    'Slovakia',
    'Slovenia',
    'Malta',
    'Cyprus',
    'San Marino',
    'Vatican City',
    'Liechtenstein',
    'Andorra',
    'Monaco'
  ];

  // Filter countries based on search
  const filteredCountries = allCountries.filter(country =>
    country.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const creditTypes = [
    'Tree Planting',
    'Home Garden',
    'Renewable Energy',
    'Waste Reduction',
    'Water Conservation',
    'Sustainable Agriculture'
  ];

  const gardenTypes = [
    'Vegetable Garden',
    'Fruit Trees',
    'Native Plants',
    'Herb Garden',
    'Flower Garden',
    'Mixed Garden'
  ];

  const getActiveFiltersCount = () => {
    return filters.locations.length + 
           filters.creditTypes.length + 
           filters.gardenTypes.length +
           (filters.minPrice > 0 ? 1 : 0) +
           (filters.maxPrice < 1000 ? 1 : 0) +
           (filters.verificationDateFrom ? 1 : 0) +
           (filters.verificationDateTo ? 1 : 0);
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-medium text-text-primary hover:text-primary transition-smooth"
      >
        <span>{title}</span>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
        />
      </button>
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  const content = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-heading font-semibold text-text-primary">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        {isMobile && (
          <Button variant="ghost" onClick={onClose} className="p-1">
            <Icon name="X" size={20} />
          </Button>
        )}
      </div>

      {/* Clear All */}
      {getActiveFiltersCount() > 0 && (
        <Button 
          variant="outline" 
          onClick={onClearAll}
          className="w-full text-sm"
        >
          Clear All Filters
        </Button>
      )}

      {/* Location Filter */}
      <FilterSection
        title="Location"
        isExpanded={expandedSections.location}
        onToggle={() => toggleSection('location')}
      >
        {/* Search Bar */}
        <div className="mb-3">
          <Input
            type="text"
            placeholder="Search countries..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="w-full"
            icon="Search"
          />
        </div>
        
        {/* Countries List */}
        <div className="max-h-48 overflow-y-auto space-y-2">
          {filteredCountries.length === 0 ? (
            <p className="text-sm text-text-secondary text-center py-2">
              No countries found
            </p>
          ) : (
            filteredCountries.map((country) => (
              <label key={country} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.locations.includes(country)}
                  onChange={() => handleLocationChange(country)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">{country}</span>
              </label>
            ))
          )}
        </div>
        
        {locationSearch && (
          <Button
            variant="ghost"
            onClick={() => setLocationSearch('')}
            className="w-full text-xs mt-2"
          >
            Clear Search
          </Button>
        )}
      </FilterSection>

      {/* Credit Type Filter */}
      <FilterSection
        title="Credit Type"
        isExpanded={expandedSections.creditType}
        onToggle={() => toggleSection('creditType')}
      >
        {creditTypes.map((type) => (
          <label key={type} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.creditTypes.includes(type)}
              onChange={() => handleCreditTypeChange(type)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">{type}</span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.priceRange}
        onToggle={() => toggleSection('priceRange')}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1">Min Price ($)</label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange('minPrice', Number(e.target.value) || 0)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">Max Price ($)</label>
            <Input
              type="number"
              placeholder="1000"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange('maxPrice', Number(e.target.value) || 1000)}
              className="w-full"
            />
          </div>
        </div>
      </FilterSection>

      {/* Verification Date Filter */}
      <FilterSection
        title="Verification Date"
        isExpanded={expandedSections.verificationDate}
        onToggle={() => toggleSection('verificationDate')}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1">From Date</label>
            <Input
              type="date"
              value={filters.verificationDateFrom || ''}
              onChange={(e) => onFilterChange('verificationDateFrom', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">To Date</label>
            <Input
              type="date"
              value={filters.verificationDateTo || ''}
              onChange={(e) => onFilterChange('verificationDateTo', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </FilterSection>

      {/* Garden Characteristics Filter */}
      <FilterSection
        title="Garden Type"
        isExpanded={expandedSections.gardenCharacteristics}
        onToggle={() => toggleSection('gardenCharacteristics')}
      >
        {gardenTypes.map((type) => (
          <label key={type} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.gardenTypes.includes(type)}
              onChange={() => handleGardenTypeChange(type)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">{type}</span>
          </label>
        ))}
      </FilterSection>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
        <div className="bg-surface w-full max-h-[80vh] rounded-t-lg overflow-y-auto">
          <div className="p-6">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 h-fit sticky top-20">
      {content}
    </div>
  );
};

export default FilterSidebar;