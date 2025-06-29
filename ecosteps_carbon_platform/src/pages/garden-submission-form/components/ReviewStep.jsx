import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewStep = ({ data, onEdit, onSubmit, isSubmitting }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotalTrees = () => {
    return (data.trees || []).reduce((total, tree) => {
      return total + (parseInt(tree.quantity) || 0);
    }, 0);
  };

  const calculateEstimatedCredits = () => {
    const totalTrees = calculateTotalTrees();
    const avgAge = (data.trees || []).reduce((total, tree) => {
      return total + (parseFloat(tree.age) || 1);
    }, 0) / (data.trees || []).length || 1;
    
    return Math.round(totalTrees * avgAge * 22 / 1000); // Convert to tons CO2
  };

  const handleSubmit = () => {
    setShowConfirmModal(false);
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Review Your Submission
        </h2>
        <p className="text-text-secondary">
          Please review all information before submitting for verification.
        </p>
      </div>

      {/* Garden Details Section */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary flex items-center">
            <Icon name="MapPin" size={20} className="mr-2 text-primary" />
            Garden Details
          </h3>
          <Button
            variant="ghost"
            onClick={() => onEdit(0)}
            iconName="Edit"
            className="text-primary hover:bg-primary/10"
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-text-secondary">Garden Name</p>
            <p className="font-medium text-text-primary">{data.name || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Garden Type</p>
            <p className="font-medium text-text-primary">{data.type || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Location</p>
            <p className="font-medium text-text-primary">
              {data.address ? `${data.address}, ${data.city}, ${data.state}` : 'Not specified'}
            </p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Garden Size</p>
            <p className="font-medium text-text-primary">
              {data.area ? `${data.area} sq m` : 'Not specified'}
            </p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Established Date</p>
            <p className="font-medium text-text-primary">{formatDate(data.establishedDate)}</p>
          </div>
        </div>

        {data.description && (
          <div className="mt-4">
            <p className="text-sm text-text-secondary">Description</p>
            <p className="font-medium text-text-primary mt-1">{data.description}</p>
          </div>
        )}

        {/* Garden Images */}
        {data.images && data.images.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-text-secondary mb-2">Garden Photos ({data.images.length})</p>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {data.images.slice(0, 5).map((image, index) => (
                <div key={image.id} className="aspect-square rounded-lg overflow-hidden border border-border">
                  <Image
                    src={image.url}
                    alt={`Garden photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tree Information Section */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary flex items-center">
            <Icon name="TreePine" size={20} className="mr-2 text-success" />
            Tree Information
          </h3>
          <Button
            variant="ghost"
            onClick={() => onEdit(1)}
            iconName="Edit"
            className="text-primary hover:bg-primary/10"
          >
            Edit
          </Button>
        </div>

        {data.trees && data.trees.length > 0 ? (
          <div className="space-y-4">
            {data.trees.map((tree, index) => (
              <div key={tree.id} className="bg-background rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-2">Tree #{index + 1}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-text-secondary">Species:</span>
                    <span className="ml-2 font-medium">{tree.species || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Quantity:</span>
                    <span className="ml-2 font-medium">{tree.quantity || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Planted:</span>
                    <span className="ml-2 font-medium">{formatDate(tree.plantingDate)}</span>
                  </div>
                  {tree.age && (
                    <div>
                      <span className="text-text-secondary">Age:</span>
                      <span className="ml-2 font-medium">{tree.age} years</span>
                    </div>
                  )}
                  {tree.height && (
                    <div>
                      <span className="text-text-secondary">Height:</span>
                      <span className="ml-2 font-medium">{tree.height} m</span>
                    </div>
                  )}
                  {tree.diameter && (
                    <div>
                      <span className="text-text-secondary">Diameter:</span>
                      <span className="ml-2 font-medium">{tree.diameter} cm</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Tree Summary */}
            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="BarChart3" size={20} className="text-success" />
                <div>
                  <p className="font-medium text-text-primary">
                    Total Trees: {calculateTotalTrees()}
                  </p>
                  <p className="text-sm text-text-secondary">
                    Estimated Annual CO2 Sequestration: {calculateEstimatedCredits()} tons
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-text-secondary">No tree information provided</p>
        )}
      </div>

      {/* Equipment Section */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary flex items-center">
            <Icon name="Zap" size={20} className="mr-2 text-secondary" />
            Carbon-Reducing Equipment
          </h3>
          <Button
            variant="ghost"
            onClick={() => onEdit(2)}
            iconName="Edit"
            className="text-primary hover:bg-primary/10"
          >
            Edit
          </Button>
        </div>

        {data.equipment && data.equipment.length > 0 ? (
          <div className="space-y-4">
            {data.equipment.map((item, index) => (
              <div key={item.id} className="bg-background rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-2">Equipment #{index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-text-secondary">Type:</span>
                    <span className="ml-2 font-medium">{item.type || 'Not specified'}</span>
                  </div>
                  {item.model && (
                    <div>
                      <span className="text-text-secondary">Model:</span>
                      <span className="ml-2 font-medium">{item.model}</span>
                    </div>
                  )}
                  {item.installDate && (
                    <div>
                      <span className="text-text-secondary">Installed:</span>
                      <span className="ml-2 font-medium">{formatDate(item.installDate)}</span>
                    </div>
                  )}
                  {item.efficiency && (
                    <div>
                      <span className="text-text-secondary">Efficiency:</span>
                      <span className="ml-2 font-medium">{item.efficiency}</span>
                    </div>
                  )}
                  {item.capacity && (
                    <div>
                      <span className="text-text-secondary">Capacity:</span>
                      <span className="ml-2 font-medium">{item.capacity}</span>
                    </div>
                  )}
                </div>
                {item.description && (
                  <div className="mt-2">
                    <span className="text-text-secondary text-sm">Description:</span>
                    <p className="text-sm text-text-primary mt-1">{item.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">No equipment information provided</p>
        )}
      </div>

      {/* Submission Actions */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start space-x-3 mb-4">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">
              What happens next?
            </h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Your submission will be reviewed by our verification team</li>
              <li>• We may contact you for additional information or clarification</li>
              <li>• Verification typically takes 5-7 business days</li>
              <li>• You'll receive email notifications about your submission status</li>
              <li>• Once approved, carbon credits will be added to your account</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            onClick={() => setShowConfirmModal(true)}
            loading={isSubmitting}
            disabled={isSubmitting}
            iconName="Send"
            iconPosition="left"
            className="flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
          </Button>
          <Button
            variant="outline"
            onClick={() => onEdit(0)}
            disabled={isSubmitting}
            iconName="Edit"
            iconPosition="left"
          >
            Make Changes
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowConfirmModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-surface rounded-lg shadow-strong max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Send" size={20} color="white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Confirm Submission
                </h3>
              </div>
              
              <p className="text-text-secondary mb-6">
                Are you sure you want to submit your garden information for verification? 
                You won't be able to edit it once submitted.
              </p>
              
              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  className="flex-1"
                >
                  Yes, Submit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewStep;