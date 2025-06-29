import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterSidebar from './components/FilterSidebar';
import CreditCard from './components/CreditCard';
import SearchAndSort from './components/SearchAndSort';
import BulkActions from './components/BulkActions';
import MapView from './components/MapView';
import Pagination from './components/Pagination';
import CartWidget from './components/CartWidget';

const CarbonCreditsMarketplace = () => {
  const [filters, setFilters] = useState({
    locations: [],
    creditTypes: [],
    gardenTypes: [],
    minPrice: 0,
    maxPrice: 1000,
    verificationDateFrom: '',
    verificationDateTo: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-new');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCredits, setSelectedCredits] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isMobile, setIsMobile] = useState(false);

  // Mock data for carbon credits
  const mockCredits = [
    {
      id: 1,
      title: "Urban Rooftop Garden - Downtown LA",
      location: "California, USA",
      creditType: "Home Garden",
      contributor: "Sarah Johnson",
      rating: 4.8,
      reviewCount: 24,
      availableCredits: 150,
      pricePerCredit: 12.50,
      verificationStatus: "verified",
      verificationDate: "2024-01-15",
      images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop"
      ],
      description: `Beautiful rooftop garden in downtown LA featuring organic vegetables and herbs. This garden has been actively maintained for 3 years and contributes significantly to urban air quality improvement.`
    },
    {
      id: 2,
      title: "Community Tree Planting Initiative",
      location: "New York, USA",
      creditType: "Tree Planting",
      contributor: "Michael Chen",
      rating: 4.9,
      reviewCount: 18,
      availableCredits: 300,
      pricePerCredit: 15.75,
      verificationStatus: "verified",
      verificationDate: "2024-01-20",
      images: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1574263867128-a3d5c1b1debc?w=400&h=300&fit=crop"
      ],
      description: `Large-scale tree planting project in Central Park area. Over 200 native trees planted and maintained with community involvement.`
    },
    {
      id: 3,
      title: "Sustainable Backyard Farm",
      location: "Texas, USA",
      creditType: "Sustainable Agriculture",
      contributor: "Emily Rodriguez",
      rating: 4.7,
      reviewCount: 31,
      availableCredits: 200,
      pricePerCredit: 10.25,
      verificationStatus: "verified",
      verificationDate: "2024-01-18",
      images: [
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=300&fit=crop"
      ],
      description: `Organic backyard farm using sustainable practices including composting, rainwater harvesting, and natural pest control methods.`
    },
    {
      id: 4,
      title: "Native Plant Restoration Project",
      location: "Florida, USA",
      creditType: "Native Plants",
      contributor: "David Thompson",
      rating: 4.6,
      reviewCount: 15,
      availableCredits: 120,
      pricePerCredit: 18.00,
      verificationStatus: "verified",
      verificationDate: "2024-01-22",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"
      ],
      description: `Restoration of native Florida plants in residential area, supporting local wildlife and improving biodiversity.`
    },
    {
      id: 5,
      title: "Solar-Powered Greenhouse Garden",
      location: "Washington, USA",
      creditType: "Renewable Energy",
      contributor: "Lisa Park",
      rating: 4.9,
      reviewCount: 22,
      availableCredits: 180,
      pricePerCredit: 22.50,
      verificationStatus: "verified",
      verificationDate: "2024-01-25",
      images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop"
      ],
      description: `Innovative greenhouse powered entirely by solar energy, growing organic produce year-round with minimal environmental impact.`
    },
    {
      id: 6,
      title: "Rainwater Harvesting Garden",
      location: "Oregon, USA",
      creditType: "Water Conservation",
      contributor: "James Wilson",
      rating: 4.5,
      reviewCount: 19,
      availableCredits: 90,
      pricePerCredit: 14.75,
      verificationStatus: "pending",
      verificationDate: "2024-01-28",
      images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
      ],
      description: `Garden featuring advanced rainwater harvesting system, reducing water consumption by 70% while maintaining lush vegetation.`
    }
  ];

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and sort credits
  const getFilteredAndSortedCredits = () => {
    let filtered = mockCredits.filter(credit => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          credit.title.toLowerCase().includes(query) ||
          credit.location.toLowerCase().includes(query) ||
          credit.contributor.toLowerCase().includes(query) ||
          credit.creditType.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.locations.length > 0 && !filters.locations.includes(credit.location)) {
        return false;
      }

      // Credit type filter
      if (filters.creditTypes.length > 0 && !filters.creditTypes.includes(credit.creditType)) {
        return false;
      }

      // Price range filter
      if (credit.pricePerCredit < filters.minPrice || credit.pricePerCredit > filters.maxPrice) {
        return false;
      }

      // Verification date filter
      if (filters.verificationDateFrom && new Date(credit.verificationDate) < new Date(filters.verificationDateFrom)) {
        return false;
      }
      if (filters.verificationDateTo && new Date(credit.verificationDate) > new Date(filters.verificationDateTo)) {
        return false;
      }

      return true;
    });

    // Sort credits
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricePerCredit - b.pricePerCredit;
        case 'price-high':
          return b.pricePerCredit - a.pricePerCredit;
        case 'date-new':
          return new Date(b.verificationDate) - new Date(a.verificationDate);
        case 'date-old':
          return new Date(a.verificationDate) - new Date(b.verificationDate);
        case 'location':
          return a.location.localeCompare(b.location);
        case 'credits-high':
          return b.availableCredits - a.availableCredits;
        case 'credits-low':
          return a.availableCredits - b.availableCredits;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredCredits = getFilteredAndSortedCredits();
  const totalPages = Math.ceil(filteredCredits.length / itemsPerPage);
  const paginatedCredits = filteredCredits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setFilters({
      locations: [],
      creditTypes: [],
      gardenTypes: [],
      minPrice: 0,
      maxPrice: 1000,
      verificationDateFrom: '',
      verificationDateTo: ''
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleCreditSelect = (creditId, isSelected) => {
    if (isSelected) {
      setSelectedCredits(prev => [...prev, creditId]);
    } else {
      setSelectedCredits(prev => prev.filter(id => id !== creditId));
    }
  };

  const handleSelectAll = () => {
    setSelectedCredits(paginatedCredits.map(credit => credit.id));
  };

  const handleDeselectAll = () => {
    setSelectedCredits([]);
  };

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  const handleBulkAddToCart = () => {
    selectedCredits.forEach(creditId => {
      const credit = mockCredits.find(c => c.id === creditId);
      if (credit) {
        handleAddToCart({
          id: credit.id,
          name: credit.title,
          price: credit.pricePerCredit,
          quantity: 1,
          contributor: credit.contributor,
          location: credit.location,
          image: credit.images[0]
        });
      }
    });
    setSelectedCredits([]);
  };

  const handleUpdateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/individual-user-dashboard" className="text-text-secondary hover:text-primary transition-smooth">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            <span className="text-text-primary font-medium">Carbon Credits Marketplace</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Carbon Credits Marketplace
              </h1>
              <p className="text-text-secondary">
                Discover and purchase verified carbon credits from individual contributors
              </p>
            </div>
            
            {/* Cart Button */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <Icon name="ShoppingCart" size={20} />
                <span className="ml-2">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <SearchAndSort
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onToggleFilters={() => setIsFilterSidebarOpen(true)}
          isMobile={isMobile}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedCredits={selectedCredits}
          credits={paginatedCredits}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onBulkAddToCart={handleBulkAddToCart}
        />

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          {!isMobile && (
            <div className="lg:w-1/4">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAllFilters}
                isMobile={false}
              />
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-text-secondary">
                {filteredCredits.length} {filteredCredits.length === 1 ? 'credit' : 'credits'} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Content based on view mode */}
            {viewMode === 'map' ? (
              <MapView
                credits={filteredCredits}
                onCreditSelect={(credit) => {
                  handleAddToCart({
                    id: credit.id,
                    name: credit.title,
                    price: credit.pricePerCredit,
                    quantity: 1,
                    contributor: credit.contributor,
                    location: credit.location,
                    image: credit.images[0]
                  });
                }}
              />
            ) : (
              <>
                {/* Credits Grid/List */}
                {paginatedCredits.length > 0 ? (
                  <div className={`grid gap-6 mb-8 ${
                    viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
                  }`}>
                    {paginatedCredits.map((credit) => (
                      <CreditCard
                        key={credit.id}
                        credit={credit}
                        onAddToCart={handleAddToCart}
                        isSelected={selectedCredits.includes(credit.id)}
                        onSelect={handleCreditSelect}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">No credits found</h3>
                    <p className="text-text-secondary mb-6">
                      Try adjusting your filters or search terms
                    </p>
                    <Button variant="outline" onClick={handleClearAllFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                )}

                {/* Pagination */}
                {paginatedCredits.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredCredits.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(newItemsPerPage) => {
                      setItemsPerPage(newItemsPerPage);
                      setCurrentPage(1);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {isMobile && isFilterSidebarOpen && (
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAllFilters}
          isMobile={true}
          onClose={() => setIsFilterSidebarOpen(false)}
        />
      )}

      {/* Cart Widget */}
      <CartWidget
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        isOpen={isCartOpen}
        onToggle={() => setIsCartOpen(!isCartOpen)}
      />
    </div>
  );
};

export default CarbonCreditsMarketplace;