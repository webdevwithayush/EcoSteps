import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: '',
    organizationName: '',
    registrationNumber: '',
    contactNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    // NGO specific validations
    if (formData.role === 'ngo') {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Organization name is required';
      }
      if (!formData.registrationNumber.trim()) {
        newErrors.registrationNumber = 'Registration number is required';
      }
      if (!formData.contactNumber.trim()) {
        newErrors.contactNumber = 'Contact number is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-error', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'];
    
    return {
      strength: (strength / 5) * 100,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || 'bg-gray-300'
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Successful registration - redirect based on role
      if (formData.role === 'individual') {
        navigate('/individual-user-dashboard');
      } else {
        navigate('/ngo-impact-dashboard');
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{errors.general}</p>
          </div>
        </div>
      )}
      
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
          Full Name
        </label>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          className={errors.fullName ? 'border-error' : ''}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-error">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'border-error' : ''}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'border-error pr-10' : 'pr-10'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.strength}%` }}
                ></div>
              </div>
              <span className="text-xs text-text-secondary">{passwordStrength.label}</span>
            </div>
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-sm text-error">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password
        </label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={errors.confirmPassword ? 'border-error' : ''}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          I am registering as:
        </label>
        <div className="space-y-3">
          <label className="flex items-start space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-background transition-smooth">
            <Input
              type="radio"
              name="role"
              value="individual"
              checked={formData.role === 'individual'}
              onChange={handleInputChange}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-text-primary">Individual User</div>
              <div className="text-sm text-text-secondary">
                I maintain gardens, trees, or participate in carbon-reducing activities
              </div>
            </div>
          </label>
          <label className="flex items-start space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-background transition-smooth">
            <Input
              type="radio"
              name="role"
              value="ngo"
              checked={formData.role === 'ngo'}
              onChange={handleInputChange}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-text-primary">NGO / Organization</div>
              <div className="text-sm text-text-secondary">
                I represent an organization looking to purchase carbon credits
              </div>
            </div>
          </label>
        </div>
        {errors.role && (
          <p className="mt-1 text-sm text-error">{errors.role}</p>
        )}
      </div>

      {formData.role === 'ngo' && (
        <div className="space-y-4 p-4 bg-background rounded-lg border border-border">
          <h4 className="font-medium text-text-primary">Organization Details</h4>
          
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-text-primary mb-2">
              Organization Name
            </label>
            <Input
              type="text"
              id="organizationName"
              name="organizationName"
              placeholder="Enter organization name"
              value={formData.organizationName}
              onChange={handleInputChange}
              className={errors.organizationName ? 'border-error' : ''}
            />
            {errors.organizationName && (
              <p className="mt-1 text-sm text-error">{errors.organizationName}</p>
            )}
          </div>

          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-text-primary mb-2">
              Registration Number
            </label>
            <Input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              placeholder="Enter registration number"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              className={errors.registrationNumber ? 'border-error' : ''}
            />
            {errors.registrationNumber && (
              <p className="mt-1 text-sm text-error">{errors.registrationNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-text-primary mb-2">
              Contact Number
            </label>
            <Input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter contact number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className={errors.contactNumber ? 'border-error' : ''}
            />
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-error">{errors.contactNumber}</p>
            )}
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        disabled={isLoading}
        fullWidth
        className="py-3"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;