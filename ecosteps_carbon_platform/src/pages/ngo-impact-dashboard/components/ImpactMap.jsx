import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImpactMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const impactLocations = [
    {
      id: 1,
      name: 'California Urban Gardens',
      lat: 36.7783,
      lng: -119.4179,
      credits: 450,
      projects: 12,
      type: 'Urban Gardens',
      contributors: 8
    },
    {
      id: 2,
      name: 'Oregon Reforestation',
      lat: 43.8041,
      lng: -120.5542,
      credits: 320,
      projects: 6,
      type: 'Reforestation',
      contributors: 4
    },
    {
      id: 3,
      name: 'Texas Solar Initiative',
      lat: 31.9686,
      lng: -99.9018,
      credits: 280,
      projects: 8,
      type: 'Solar Energy',
      contributors: 6
    },
    {
      id: 4,
      name: 'New York Green Spaces',
      lat: 42.1657,
      lng: -74.9481,
      credits: 150,
      projects: 15,
      type: 'Urban Gardens',
      contributors: 12
    },
    {
      id: 5,
      name: 'Washington Forest Recovery',
      lat: 47.7511,
      lng: -120.7401,
      credits: 380,
      projects: 5,
      type: 'Reforestation',
      contributors: 3
    }
  ];

  const regionStats = [
    { region: 'North America', credits: 1580, projects: 46, color: '#2D5A3D' },
    { region: 'Europe', credits: 890, projects: 28, color: '#7B9B47' },
    { region: 'Asia', credits: 650, projects: 22, color: '#E67E22' },
    { region: 'South America', credits: 420, projects: 18, color: '#27AE60' }
  ];

  const getProjectTypeIcon = (type) => {
    switch (type) {
      case 'Urban Gardens': return 'Sprout';
      case 'Reforestation': return 'Trees';
      case 'Solar Energy': return 'Sun';
      case 'Wind Energy': return 'Wind';
      default: return 'MapPin';
    }
  };

  const getProjectTypeColor = (type) => {
    switch (type) {
      case 'Urban Gardens': return '#2D5A3D';
      case 'Reforestation': return '#7B9B47';
      case 'Solar Energy': return '#E67E22';
      case 'Wind Energy': return '#27AE60';
      default: return '#7F8C8D';
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-light border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Global Impact Distribution
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" iconName="Maximize2" className="p-2">
              <span className="sr-only">Fullscreen</span>
            </Button>
            <Button variant="ghost" iconName="Download" className="p-2">
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="relative bg-background rounded-lg overflow-hidden" style={{ height: '400px' }}>
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Global Impact Map"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=39.8283,-98.5795&z=4&output=embed"
                className="border-0"
              ></iframe>
              
              {/* Map Overlay with Location Markers */}
              <div className="absolute inset-0 pointer-events-none">
                {impactLocations.map((location) => (
                  <div
                    key={location.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{
                      left: `${20 + (location.id * 15)}%`,
                      top: `${30 + (location.id * 10)}%`
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-medium transition-transform hover:scale-110"
                      style={{ backgroundColor: getProjectTypeColor(location.type) }}
                      onClick={() => setSelectedRegion(location)}
                    >
                      <Icon 
                        name={getProjectTypeIcon(location.type)} 
                        size={16} 
                        color="white" 
                      />
                    </div>
                    {selectedRegion?.id === location.id && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-surface border border-border rounded-lg p-3 shadow-strong z-10 min-w-48">
                        <div className="space-y-2">
                          <h4 className="font-medium text-text-primary text-sm">{location.name}</h4>
                          <div className="space-y-1 text-xs text-text-secondary">
                            <div className="flex justify-between">
                              <span>Credits:</span>
                              <span className="font-data text-text-primary">{location.credits}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Projects:</span>
                              <span className="font-data text-text-primary">{location.projects}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Contributors:</span>
                              <span className="font-data text-text-primary">{location.contributors}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Statistics */}
          <div className="space-y-4">
            <h4 className="font-heading font-medium text-text-primary">Regional Overview</h4>
            <div className="space-y-3">
              {regionStats.map((region) => (
                <div key={region.region} className="p-4 bg-background rounded-lg border border-border">
                  <div className="flex items-center space-x-3 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: region.color }}
                    ></div>
                    <span className="font-medium text-text-primary text-sm">{region.region}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Credits:</span>
                      <span className="font-data text-text-primary">{region.credits}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Projects:</span>
                      <span className="font-data text-text-primary">{region.projects}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-border">
              <h5 className="font-medium text-text-primary text-sm mb-3">Project Types</h5>
              <div className="space-y-2">
                {['Urban Gardens', 'Reforestation', 'Solar Energy', 'Wind Energy'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: getProjectTypeColor(type) }}
                    >
                      <Icon name={getProjectTypeIcon(type)} size={10} color="white" />
                    </div>
                    <span className="text-xs text-text-secondary">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactMap;