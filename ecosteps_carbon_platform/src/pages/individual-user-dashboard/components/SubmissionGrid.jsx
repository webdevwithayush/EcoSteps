import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SubmissionGrid = ({ submissions }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { color: 'bg-success text-success-foreground', icon: 'CheckCircle' },
      pending: { color: 'bg-warning text-warning-foreground', icon: 'Clock' },
      rejected: { color: 'bg-error text-error-foreground', icon: 'XCircle' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <div className={`absolute top-2 right-2 ${config.color} px-2 py-1 rounded-full flex items-center space-x-1`}>
        <Icon name={config.icon} size={12} />
        <span className="text-xs font-medium capitalize">{status}</span>
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-light border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">My Submissions</h3>
        <Link 
          to="/garden-submission-form" 
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          View All
        </Link>
      </div>
      
      {submissions.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Sprout" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary mb-4">No submissions yet</p>
          <Link to="/garden-submission-form">
            <button className="text-primary hover:text-primary/80 font-medium">
              Submit Your First Garden
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {submissions.slice(0, 6).map((submission) => (
            <div key={submission.id} className="relative group cursor-pointer">
              <div className="aspect-square rounded-lg overflow-hidden bg-background">
                <Image
                  src={submission.image}
                  alt={submission.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {getStatusBadge(submission.status)}
              <div className="mt-2">
                <h4 className="text-sm font-medium text-text-primary truncate">{submission.title}</h4>
                <p className="text-xs text-text-secondary">{submission.credits} credits</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionGrid;