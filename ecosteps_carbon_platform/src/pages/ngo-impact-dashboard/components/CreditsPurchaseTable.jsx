import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CreditsPurchaseTable = () => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const purchaseData = [
    {
      id: 1,
      date: '2024-01-15',
      contributor: 'Green Gardens Co.',
      location: 'California, USA',
      quantity: 50,
      cost: 1000,
      projectType: 'Urban Garden',
      rating: 4.8,
      status: 'Verified'
    },
    {
      id: 2,
      date: '2024-01-12',
      contributor: 'EcoFarm Solutions',
      location: 'Oregon, USA',
      quantity: 75,
      cost: 1500,
      projectType: 'Reforestation',
      rating: 4.9,
      status: 'Verified'
    },
    {
      id: 3,
      date: '2024-01-10',
      contributor: 'Solar Harvest Inc.',
      location: 'Texas, USA',
      quantity: 100,
      cost: 2000,
      projectType: 'Solar Energy',
      rating: 4.7,
      status: 'Pending'
    },
    {
      id: 4,
      date: '2024-01-08',
      contributor: 'Urban Oasis',
      location: 'New York, USA',
      quantity: 30,
      cost: 600,
      projectType: 'Urban Garden',
      rating: 4.6,
      status: 'Verified'
    },
    {
      id: 5,
      date: '2024-01-05',
      contributor: 'Forest Revival',
      location: 'Washington, USA',
      quantity: 120,
      cost: 2400,
      projectType: 'Reforestation',
      rating: 4.9,
      status: 'Verified'
    }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const filteredData = purchaseData.filter(item =>
    item.contributor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.projectType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Verified': { color: 'bg-success/10 text-success', icon: 'CheckCircle' },
      'Pending': { color: 'bg-warning/10 text-warning', icon: 'Clock' },
      'Rejected': { color: 'bg-error/10 text-error', icon: 'XCircle' }
    };

    const config = statusConfig[status] || statusConfig['Pending'];

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span>{status}</span>
      </span>
    );
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Contributor', 'Location', 'Quantity', 'Cost', 'Project Type', 'Rating', 'Status'],
      ...sortedData.map(item => [
        item.date,
        item.contributor,
        item.location,
        item.quantity,
        `$${item.cost}`,
        item.projectType,
        item.rating,
        item.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carbon-credits-purchases.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-surface rounded-lg shadow-light border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Purchase History
          </h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                type="search"
                placeholder="Search purchases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Button
              variant="outline"
              onClick={exportData}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              {[
                { key: 'date', label: 'Date' },
                { key: 'contributor', label: 'Contributor' },
                { key: 'location', label: 'Location' },
                { key: 'quantity', label: 'Credits' },
                { key: 'cost', label: 'Cost' },
                { key: 'projectType', label: 'Type' },
                { key: 'rating', label: 'Rating' },
                { key: 'status', label: 'Status' }
              ].map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-border/50 transition-smooth"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    <Icon name={getSortIcon(column.key)} size={12} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-background/50 transition-smooth">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary">{item.contributor}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-data text-text-primary">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-data text-text-primary">
                  ${item.cost}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {item.projectType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm font-data text-text-primary">{item.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'primary' : 'ghost'}
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditsPurchaseTable;