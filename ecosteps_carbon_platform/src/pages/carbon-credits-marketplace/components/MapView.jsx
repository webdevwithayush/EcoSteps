import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MapView = ({ credits, onCreditSelect }) => {
  const [selectedCredit, setSelectedCredit] = useState(null);

  // Mock coordinates for demonstration
  const getCoordinates = (location) => {
    const locationCoords = {
      'California, USA': { lat: 36.7783, lng: -119.4179 },
      'New York, USA': { lat: 40.7128, lng: -74.0060 },
      'Texas, USA': { lat: 31.9686, lng: -99.9018 },
      'Florida, USA': { lat: 27.7663, lng: -82.6404 },
      'Washington, USA': { lat: 47.7511, lng: -120.7401 },
      'Oregon, USA': { lat: 43.8041, lng: -120.5542 }
    };
    return locationCoords[location] || { lat: 39.8283, lng: -98.5795 };
  };

  const handleMarkerClick = (credit) => {
    setSelectedCredit(credit);
  };

  const closePopup = () => {
    setSelectedCredit(null);
  };

  // Group credits by location for clustering
  const groupedCredits = credits.reduce((acc, credit) => {
    const key = credit.location;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(credit);
    return acc;
  }, {});

  return (
    <div className="relative w-full h-[600px] bg-background rounded-lg overflow-hidden border border-border">
      {/* Map Container */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Carbon Credits Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=39.8283,-98.5795&z=4&output=embed"
          className="w-full h-full"
        />
      </div>

      {/* Map Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {Object.entries(groupedCredits).map(([location, locationCredits]) => {
          const coords = getCoordinates(location);
          // Convert lat/lng to approximate pixel positions (simplified)
          const x = ((coords.lng + 180) / 360) * 100;
          const y = ((90 - coords.lat) / 180) * 100;
          
          return (
            <div
              key={location}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => handleMarkerClick(locationCredits[0])}
            >
              <div className="relative">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow-medium hover:scale-110 transition-transform">
                  <span className="text-xs font-bold">{locationCredits.length}</span>
                </div>
                {locationCredits.length > 1 && (
                  <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {locationCredits.length}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Credit Details Popup */}
      {selectedCredit && (
        <div className="absolute top-4 right-4 w-80 bg-surface border border-border rounded-lg shadow-strong p-4 z-10">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-heading font-semibold text-text-primary pr-2">
              {selectedCredit.title}
            </h3>
            <Button variant="ghost" onClick={closePopup} className="p-1">
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="space-y-3">
            {/* Image */}
            <div className="w-full h-32 rounded-lg overflow-hidden">
              <Image
                src={selectedCredit.images[0]}
                alt={selectedCredit.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="MapPin" size={14} />
              <span>{selectedCredit.location}</span>
            </div>

            {/* Credit Type */}
            <div>
              <span className="inline-block bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                {selectedCredit.creditType}
              </span>
            </div>

            {/* Credits and Price */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-secondary">Available Credits</p>
                <p className="font-data font-semibold text-text-primary">{selectedCredit.availableCredits}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-secondary">Price per Credit</p>
                <p className="font-heading font-bold text-primary">${selectedCredit.pricePerCredit}</p>
              </div>
            </div>

            {/* Contributor */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={12} color="white" />
              </div>
              <span className="text-sm text-text-primary">{selectedCredit.contributor}</span>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={() => onCreditSelect(selectedCredit)}
                className="flex-1 text-sm"
              >
                View Details
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  onCreditSelect(selectedCredit);
                  closePopup();
                }}
                className="flex-1 text-sm"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-surface border border-border rounded-lg p-3 shadow-medium">
        <h4 className="font-medium text-text-primary mb-2 text-sm">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
            <span className="text-text-secondary">Available Credits</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-text-secondary">Multiple Credits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;