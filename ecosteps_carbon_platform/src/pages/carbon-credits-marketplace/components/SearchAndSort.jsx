import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndSort = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onToggleFilters,
  isMobile 
}) => {
  const sortOptions = [
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'date-new', label: 'Recently Verified' },
    { value: 'date-old', label: 'Oldest First' },
    { value: 'location', label: 'Location' },
    { value: 'credits-high', label: 'Most Credits' },
    { value: 'credits-low', label: 'Least Credits' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <Input
              type="search"
              placeholder="Search credits by location, type, or contributor..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Mobile Filter Toggle */}
          {isMobile && (
            <Button
              variant="outline"
              onClick={onToggleFilters}
              iconName="Filter"
              iconSize={16}
            >
              Filters
            </Button>
          )}

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-surface border border-border rounded-lg px-4 py-2 pr-10 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              onClick={() => onViewModeChange('grid')}
              className="rounded-none border-0 px-3 py-2"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              onClick={() => onViewModeChange('list')}
              className="rounded-none border-0 px-3 py-2"
            >
              <Icon name="List" size={16} />
            </Button>
            <Button
              variant={viewMode === 'map' ? 'primary' : 'ghost'}
              onClick={() => onViewModeChange('map')}
              className="rounded-none border-0 px-3 py-2"
            >
              <Icon name="Map" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndSort;