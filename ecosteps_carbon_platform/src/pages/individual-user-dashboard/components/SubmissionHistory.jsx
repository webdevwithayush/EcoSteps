import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubmissionHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Mock submission history data
  const submissionHistory = [
    {
      id: 1,
      title: "Rooftop Vegetable Garden",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      status: "approved",
      credits: 45,
      submittedDate: "2024-12-10",
      approvedDate: "2024-12-12",
      description: "Organic vegetable garden on apartment rooftop with drip irrigation system",
      location: "San Francisco, CA",
      area: "150 sq ft"
    },
    {
      id: 2,
      title: "Backyard Fruit Trees",
      image: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400&h=400&fit=crop",
      status: "pending",
      credits: 32,
      submittedDate: "2024-12-08",
      approvedDate: null,
      description: "Collection of apple, pear, and cherry trees planted in backyard",
      location: "Portland, OR",
      area: "200 sq ft"
    },
    {
      id: 3,
      title: "Herb Garden Collection",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      status: "approved",
      credits: 18,
      submittedDate: "2024-12-05",
      approvedDate: "2024-12-07",
      description: "Comprehensive herb garden with basil, mint, rosemary, and thyme",
      location: "Seattle, WA",
      area: "75 sq ft"
    },
    {
      id: 4,
      title: "Community Tree Planting",
      image: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400&h=400&fit=crop",
      status: "rejected",
      credits: 0,
      submittedDate: "2024-12-03",
      approvedDate: null,
      description: "Tree planting initiative in local community park",
      location: "Austin, TX",
      area: "500 sq ft",
      rejectionReason: "Insufficient documentation provided"
    },
    {
      id: 5,
      title: "Indoor Plant Collection",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      status: "approved",
      credits: 12,
      submittedDate: "2024-11-28",
      approvedDate: "2024-11-30",
      description: "Large collection of air-purifying indoor plants throughout home",
      location: "Denver, CO",
      area: "30 sq ft"
    },
    {
      id: 6,
      title: "Balcony Garden Setup",
      image: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400&h=400&fit=crop",
      status: "pending",
      credits: 28,
      submittedDate: "2024-11-25",
      approvedDate: null,
      description: "Vertical garden setup on apartment balcony with native plants",
      location: "Miami, FL",
      area: "85 sq ft"
    },
    {
      id: 7,
      title: "Sustainable Lawn Alternative",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      status: "approved",
      credits: 35,
      submittedDate: "2024-11-20",
      approvedDate: "2024-11-22",
      description: "Replaced traditional lawn with drought-resistant native ground cover",
      location: "Phoenix, AZ",
      area: "300 sq ft"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { color: 'bg-success text-success-foreground', icon: 'CheckCircle', label: 'Approved' },
      pending: { color: 'bg-warning text-warning-foreground', icon: 'Clock', label: 'Pending' },
      rejected: { color: 'bg-error text-error-foreground', icon: 'XCircle', label: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <div className={`${config.color} px-3 py-1 rounded-full flex items-center space-x-1 text-sm`}>
        <Icon name={config.icon} size={14} />
        <span className="font-medium">{config.label}</span>
      </div>
    );
  };

  const filteredSubmissions = submissionHistory.filter(submission => {
    if (selectedFilter === 'all') return true;
    return submission.status === selectedFilter;
  });

  const getFilterCount = (status) => {
    if (status === 'all') return submissionHistory.length;
    return submissionHistory.filter(s => s.status === status).length;
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-light border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Submission History</h3>
        <Link 
          to="/garden-submission-form" 
          className="mt-2 sm:mt-0"
        >
          <Button variant="primary" size="sm" iconName="Plus" iconPosition="left">
            New Submission
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'All Submissions' },
          { key: 'approved', label: 'Approved' },
          { key: 'pending', label: 'Pending' },
          { key: 'rejected', label: 'Rejected' }
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedFilter(filter.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth flex items-center space-x-2 ${
              selectedFilter === filter.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-text-secondary hover:text-text-primary hover:bg-border'
            }`}
          >
            <span>{filter.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedFilter === filter.key
                ? 'bg-primary-foreground text-primary'
                : 'bg-border text-text-secondary'
            }`}>
              {getFilterCount(filter.key)}
            </span>
          </button>
        ))}
      </div>

      {/* Submissions List */}
      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Sprout" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary mb-4">
            {selectedFilter === 'all' ?'No submissions yet' 
              : `No ${selectedFilter} submissions`}
          </p>
          <Link to="/garden-submission-form">
            <Button variant="primary">
              Submit Your First Garden
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <div key={submission.id} className="bg-background rounded-lg p-4 border border-border hover:shadow-light transition-smooth">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={submission.image}
                      alt={submission.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <h4 className="font-medium text-text-primary">{submission.title}</h4>
                    {getStatusBadge(submission.status)}
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                    {submission.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{submission.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Maximize" size={12} />
                      <span>{submission.area}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>Submitted {new Date(submission.submittedDate).toLocaleDateString()}</span>
                    </div>
                    {submission.approvedDate && (
                      <div className="flex items-center space-x-1">
                        <Icon name="CheckCircle" size={12} />
                        <span>Approved {new Date(submission.approvedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {submission.status === 'rejected' && submission.rejectionReason && (
                    <div className="mt-2 p-2 bg-error/10 border border-error/20 rounded text-sm text-error">
                      <strong>Rejection Reason:</strong> {submission.rejectionReason}
                    </div>
                  )}
                </div>

                {/* Credits */}
                <div className="flex-shrink-0 text-center">
                  <div className="text-lg font-heading font-semibold text-text-primary">
                    {submission.credits}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {submission.credits === 1 ? 'Credit' : 'Credits'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Statistics */}
      {filteredSubmissions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-text-primary">
                {submissionHistory.length}
              </div>
              <div className="text-xs text-text-secondary">Total Submissions</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-success">
                {submissionHistory.filter(s => s.status === 'approved').length}
              </div>
              <div className="text-xs text-text-secondary">Approved</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-warning">
                {submissionHistory.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-xs text-text-secondary">Pending</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-text-primary">
                {submissionHistory.filter(s => s.status === 'approved').reduce((sum, s) => sum + s.credits, 0)}
              </div>
              <div className="text-xs text-text-secondary">Total Credits</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;