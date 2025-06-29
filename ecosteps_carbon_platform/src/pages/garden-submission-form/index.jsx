import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProgressIndicator from './components/ProgressIndicator';
import GardenDetailsStep from './components/GardenDetailsStep';
import TreeInformationStep from './components/TreeInformationStep';
import EquipmentStep from './components/EquipmentStep';
import ReviewStep from './components/ReviewStep';

const GardenSubmissionForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [errors, setErrors] = useState({});

  const steps = ['Garden Details', 'Tree Information', 'Equipment', 'Review'];
  const totalSteps = steps.length;

  // Form data state
  const [formData, setFormData] = useState({
    // Garden Details
    name: '',
    type: '',
    address: '',
    city: '',
    state: '',
    area: '',
    length: '',
    width: '',
    establishedDate: '',
    description: '',
    images: [],
    
    // Tree Information
    trees: [
      {
        id: Date.now(),
        species: '',
        quantity: '',
        plantingDate: '',
        age: '',
        height: '',
        diameter: ''
      }
    ],
    
    // Equipment
    equipment: []
  });

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        saveDraft();
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(timer);
    }
  }, [formData, hasUnsavedChanges]);

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('garden-submission-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        setLastSaved(new Date(localStorage.getItem('garden-submission-last-saved')));
      } catch (error) {
        console.error('Error loading saved draft:', error);
      }
    }
  }, []);

  // Warn user about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const saveDraft = () => {
    try {
      localStorage.setItem('garden-submission-draft', JSON.stringify(formData));
      localStorage.setItem('garden-submission-last-saved', new Date().toISOString());
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const handleStepDataChange = (stepData) => {
    setFormData({ ...formData, ...stepData });
    setHasUnsavedChanges(true);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Garden Details
        if (!formData.name?.trim()) newErrors.name = 'Garden name is required';
        if (!formData.type) newErrors.type = 'Garden type is required';
        if (!formData.address?.trim()) newErrors.address = 'Address is required';
        if (!formData.area || parseFloat(formData.area) <= 0) newErrors.area = 'Valid garden area is required';
        if (!formData.establishedDate) newErrors.establishedDate = 'Establishment date is required';
        if (!formData.description?.trim()) newErrors.description = 'Description is required';
        if (!formData.images || formData.images.length === 0) newErrors.images = 'At least one garden photo is required';
        break;

      case 1: // Tree Information
        if (!formData.trees || formData.trees.length === 0) {
          newErrors.trees = 'At least one tree entry is required';
        } else {
          formData.trees.forEach((tree, index) => {
            if (!tree.species) newErrors[`tree_${index}_species`] = 'Tree species is required';
            if (!tree.quantity || parseInt(tree.quantity) <= 0) newErrors[`tree_${index}_quantity`] = 'Valid quantity is required';
            if (!tree.plantingDate) newErrors[`tree_${index}_plantingDate`] = 'Planting date is required';
          });
        }
        break;

      case 2: // Equipment (optional step)
        if (formData.equipment && formData.equipment.length > 0) {
          formData.equipment.forEach((item, index) => {
            if (!item.type) newErrors[`equipment_${index}_type`] = 'Equipment type is required';
          });
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex < currentStep || validateStep(currentStep)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved draft
      localStorage.removeItem('garden-submission-draft');
      localStorage.removeItem('garden-submission-last-saved');
      
      // Navigate to dashboard with success message
      navigate('/individual-user-dashboard', { 
        state: { 
          message: 'Garden submission successful! Your submission is now under review.',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <GardenDetailsStep
            data={formData}
            onDataChange={handleStepDataChange}
            errors={errors}
          />
        );
      case 1:
        return (
          <TreeInformationStep
            data={formData}
            onDataChange={handleStepDataChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <EquipmentStep
            data={formData}
            onDataChange={handleStepDataChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <ReviewStep
            data={formData}
            onEdit={setCurrentStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Progress Indicator */}
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        steps={steps}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Auto-save Status */}
        {lastSaved && (
          <div className="mb-4 p-3 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Save" size={16} className="text-success" />
              <span className="text-text-secondary">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
              {hasUnsavedChanges && (
                <>
                  <span className="text-text-secondary">•</span>
                  <span className="text-warning">Unsaved changes</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-surface rounded-lg shadow-light border border-border p-6 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                iconName="ChevronLeft"
                iconPosition="left"
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
            
            <Button
              variant="ghost"
              onClick={saveDraft}
              iconName="Save"
              iconPosition="left"
              disabled={!hasUnsavedChanges}
            >
              Save Draft
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Step Indicator */}
            <span className="text-sm text-text-secondary">
              Step {currentStep + 1} of {totalSteps}
            </span>

            {currentStep < totalSteps - 1 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                iconName="ChevronRight"
                iconPosition="right"
                disabled={isSubmitting}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => handleStepClick(3)}
                iconName="Eye"
                iconPosition="left"
                disabled={isSubmitting}
              >
                Review & Submit
              </Button>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="HelpCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-text-primary mb-1">Need Help?</h4>
              <p className="text-sm text-text-secondary mb-2">
                Having trouble with your submission? Here are some tips:
              </p>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Take clear, well-lit photos of your garden from multiple angles</li>
                <li>• Provide accurate measurements for better carbon credit calculation</li>
                <li>• Include all tree species, even if you're not sure of the exact name</li>
                <li>• Your submission will be saved automatically every 30 seconds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenSubmissionForm;