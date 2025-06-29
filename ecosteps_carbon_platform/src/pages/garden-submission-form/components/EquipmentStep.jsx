import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const EquipmentStep = ({ data, onDataChange, errors }) => {
  const handleInputChange = (field, value) => {
    onDataChange({
      ...data,
      [field]: value
    });
  };

  const handleEquipmentChange = (index, field, value) => {
    const updatedEquipment = [...(data.equipment || [])];
    updatedEquipment[index] = {
      ...updatedEquipment[index],
      [field]: value
    };
    handleInputChange('equipment', updatedEquipment);
  };

  const addEquipment = () => {
    const newEquipment = {
      id: Date.now(),
      type: '',
      model: '',
      installDate: '',
      efficiency: '',
      capacity: '',
      description: ''
    };
    handleInputChange('equipment', [...(data.equipment || []), newEquipment]);
  };

  const removeEquipment = (index) => {
    const updatedEquipment = (data.equipment || []).filter((_, i) => i !== index);
    handleInputChange('equipment', updatedEquipment);
  };

  const equipmentTypes = [
    'Solar Panels',
    'Wind Turbine',
    'Rainwater Harvesting System',
    'Composting System',
    'Drip Irrigation',
    'Biogas Plant',
    'Water Recycling System',
    'LED Lighting',
    'Smart Irrigation Controller',
    'Weather Station',
    'Other'
  ];

  const equipment = data.equipment || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Carbon-Reducing Equipment
        </h2>
        <p className="text-text-secondary">
          Optional: Add any equipment or systems that help reduce your carbon footprint.
        </p>
      </div>

      {/* Skip Option */}
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0" />
          <div>
            <p className="text-sm text-text-primary font-medium">
              This step is optional
            </p>
            <p className="text-xs text-text-secondary">
              You can skip this section if you don't have any carbon-reducing equipment, or add it later.
            </p>
          </div>
        </div>
      </div>

      {/* Equipment Entries */}
      {equipment.length > 0 && (
        <div className="space-y-6">
          {equipment.map((item, index) => (
            <div key={item.id} className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">
                  Equipment #{index + 1}
                </h3>
                <Button
                  variant="ghost"
                  onClick={() => removeEquipment(index)}
                  iconName="Trash2"
                  className="text-error hover:bg-error/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Equipment Type */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Equipment Type *
                  </label>
                  <select
                    value={item.type || ''}
                    onChange={(e) => handleEquipmentChange(index, 'type', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth ${
                      errors[`equipment_${index}_type`] ? 'border-error' : 'border-border'
                    }`}
                  >
                    <option value="">Select equipment type</option>
                    {equipmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors[`equipment_${index}_type`] && (
                    <p className="mt-1 text-sm text-error flex items-center">
                      <Icon name="AlertCircle" size={14} className="mr-1" />
                      {errors[`equipment_${index}_type`]}
                    </p>
                  )}
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Model/Brand
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Tesla Solar Panel Model S"
                    value={item.model || ''}
                    onChange={(e) => handleEquipmentChange(index, 'model', e.target.value)}
                  />
                </div>

                {/* Installation Date */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Installation Date
                  </label>
                  <Input
                    type="date"
                    value={item.installDate || ''}
                    onChange={(e) => handleEquipmentChange(index, 'installDate', e.target.value)}
                  />
                </div>

                {/* Efficiency Rating */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Efficiency Rating
                    <Icon 
                      name="HelpCircle" 
                      size={14} 
                      className="inline ml-1 text-text-secondary cursor-help" 
                      title="Energy efficiency rating or percentage"
                    />
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., 85% or A+ rating"
                    value={item.efficiency || ''}
                    onChange={(e) => handleEquipmentChange(index, 'efficiency', e.target.value)}
                  />
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Capacity/Output
                    <Icon 
                      name="HelpCircle" 
                      size={14} 
                      className="inline ml-1 text-text-secondary cursor-help" 
                      title="Power output, water capacity, etc."
                    />
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., 5kW, 1000L, 50 sq ft"
                    value={item.capacity || ''}
                    onChange={(e) => handleEquipmentChange(index, 'capacity', e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe how this equipment helps reduce carbon emissions..."
                    value={item.description || ''}
                    onChange={(e) => handleEquipmentChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Equipment Button */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={addEquipment}
          iconName="Plus"
          iconPosition="left"
        >
          Add Equipment
        </Button>
      </div>

      {/* Environmental Impact Summary */}
      {equipment.length > 0 && (
        <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Zap" size={16} color="white" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">
                Additional Environmental Impact
              </h4>
              <p className="text-sm text-text-secondary mb-2">
                Your carbon-reducing equipment contributes to additional environmental benefits beyond tree sequestration.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                <div className="text-center p-3 bg-surface rounded-lg">
                  <Icon name="Leaf" size={20} className="mx-auto text-success mb-1" />
                  <p className="text-xs text-text-secondary">Reduced Emissions</p>
                </div>
                <div className="text-center p-3 bg-surface rounded-lg">
                  <Icon name="Droplets" size={20} className="mx-auto text-primary mb-1" />
                  <p className="text-xs text-text-secondary">Water Conservation</p>
                </div>
                <div className="text-center p-3 bg-surface rounded-lg">
                  <Icon name="Recycle" size={20} className="mx-auto text-secondary mb-1" />
                  <p className="text-xs text-text-secondary">Resource Efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentStep;