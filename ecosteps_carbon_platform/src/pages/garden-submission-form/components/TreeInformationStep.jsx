import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const TreeInformationStep = ({ data, onDataChange, errors }) => {
  const handleInputChange = (field, value) => {
    onDataChange({
      ...data,
      [field]: value
    });
  };

  const handleTreeChange = (index, field, value) => {
    const updatedTrees = [...(data.trees || [])];
    updatedTrees[index] = {
      ...updatedTrees[index],
      [field]: value
    };
    handleInputChange('trees', updatedTrees);
  };

  const addTree = () => {
    const newTree = {
      id: Date.now(),
      species: '',
      quantity: '',
      plantingDate: '',
      age: '',
      height: '',
      diameter: ''
    };
    handleInputChange('trees', [...(data.trees || []), newTree]);
  };

  const removeTree = (index) => {
    const updatedTrees = (data.trees || []).filter((_, i) => i !== index);
    handleInputChange('trees', updatedTrees);
  };

  const treeSpecies = [
    'Oak',
    'Maple',
    'Pine',
    'Birch',
    'Cedar',
    'Willow',
    'Apple',
    'Cherry',
    'Mango',
    'Neem',
    'Banyan',
    'Teak',
    'Eucalyptus',
    'Bamboo',
    'Other'
  ];

  const trees = data.trees || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Tree Information
        </h2>
        <p className="text-text-secondary">
          Provide details about the trees in your garden for carbon credit calculation.
        </p>
      </div>

      {/* Tree Entries */}
      <div className="space-y-6">
        {trees.map((tree, index) => (
          <div key={tree.id} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-text-primary">
                Tree #{index + 1}
              </h3>
              {trees.length > 1 && (
                <Button
                  variant="ghost"
                  onClick={() => removeTree(index)}
                  iconName="Trash2"
                  className="text-error hover:bg-error/10"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Species */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Tree Species *
                  <Icon 
                    name="HelpCircle" 
                    size={14} 
                    className="inline ml-1 text-text-secondary cursor-help" 
                    title="Select the type of tree or choose 'Other' if not listed"
                  />
                </label>
                <select
                  value={tree.species || ''}
                  onChange={(e) => handleTreeChange(index, 'species', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth ${
                    errors[`tree_${index}_species`] ? 'border-error' : 'border-border'
                  }`}
                >
                  <option value="">Select species</option>
                  {treeSpecies.map(species => (
                    <option key={species} value={species}>{species}</option>
                  ))}
                </select>
                {errors[`tree_${index}_species`] && (
                  <p className="mt-1 text-sm text-error flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {errors[`tree_${index}_species`]}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Quantity *
                  <Icon 
                    name="HelpCircle" 
                    size={14} 
                    className="inline ml-1 text-text-secondary cursor-help" 
                    title="Number of trees of this species"
                  />
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  value={tree.quantity || ''}
                  onChange={(e) => handleTreeChange(index, 'quantity', e.target.value)}
                  min="1"
                  className={errors[`tree_${index}_quantity`] ? 'border-error' : ''}
                />
                {errors[`tree_${index}_quantity`] && (
                  <p className="mt-1 text-sm text-error flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {errors[`tree_${index}_quantity`]}
                  </p>
                )}
              </div>

              {/* Planting Date */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Planting Date *
                  <Icon 
                    name="HelpCircle" 
                    size={14} 
                    className="inline ml-1 text-text-secondary cursor-help" 
                    title="When were these trees planted?"
                  />
                </label>
                <Input
                  type="date"
                  value={tree.plantingDate || ''}
                  onChange={(e) => handleTreeChange(index, 'plantingDate', e.target.value)}
                  className={errors[`tree_${index}_plantingDate`] ? 'border-error' : ''}
                />
                {errors[`tree_${index}_plantingDate`] && (
                  <p className="mt-1 text-sm text-error flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {errors[`tree_${index}_plantingDate`]}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Age (years)
                  <Icon 
                    name="HelpCircle" 
                    size={14} 
                    className="inline ml-1 text-text-secondary cursor-help" 
                    title="Approximate age of the trees"
                  />
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 3"
                  value={tree.age || ''}
                  onChange={(e) => handleTreeChange(index, 'age', e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Height (meters)
                  <Icon 
                    name="HelpCircle" 
                    size={14} 
                    className="inline ml-1 text-text-secondary cursor-help" 
                    title="Average height of the trees"
                  />
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 2.5"
                  value={tree.height || ''}
                  onChange={(e) => handleTreeChange(index, 'height', e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Diameter */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Trunk Diameter (cm)
                  <Icon 
                    name="HelpCircle" 
                    size={14} 
                    className="inline ml-1 text-text-secondary cursor-help" 
                    title="Diameter of the trunk at chest height"
                  />
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 15"
                  value={tree.diameter || ''}
                  onChange={(e) => handleTreeChange(index, 'diameter', e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Tree Button */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={addTree}
          iconName="Plus"
          iconPosition="left"
        >
          Add Another Tree Type
        </Button>
      </div>

      {/* Carbon Impact Estimate */}
      {trees.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Leaf" size={16} color="white" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">
                Estimated Carbon Impact
              </h4>
              <p className="text-sm text-text-secondary mb-2">
                Based on the tree information provided, your garden is estimated to sequester approximately{' '}
                <span className="font-medium text-primary">
                  {(trees.reduce((total, tree) => {
                    const quantity = parseInt(tree.quantity) || 0;
                    const age = parseFloat(tree.age) || 1;
                    return total + (quantity * age * 22); // Rough estimate: 22kg CO2 per tree per year
                  }, 0)).toFixed(0)} kg CO2
                </span>{' '}
                annually.
              </p>
              <p className="text-xs text-text-secondary">
                * This is a preliminary estimate. Final carbon credits will be calculated after verification.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* General Error */}
      {errors.trees && (
        <div className="bg-error/5 border border-error/20 rounded-lg p-4">
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-2" />
            {errors.trees}
          </p>
        </div>
      )}
    </div>
  );
};

export default TreeInformationStep;