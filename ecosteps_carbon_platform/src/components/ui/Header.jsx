import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

// Mock auth context - replace with actual auth context
const AuthContext = React.createContext({
  user: { role: 'individual', name: 'John Doe', avatar: null },
  logout: () => {}
});

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Garden Submission Approved',
      message: 'Your rooftop garden has been verified and approved for carbon credits.',
      type: 'success',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'New NGO Interest',
      message: 'EcoGreen NGO is interested in purchasing your credits.',
      type: 'info',
      timestamp: '1 day ago',
      read: false
    },
    {
      id: 3,
      title: 'Verification Pending',
      message: 'Your tree registration is awaiting verification.',
      type: 'warning',
      timestamp: '2 days ago',
      read: true
    }
  ]);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const individualNavItems = [
    { label: 'Dashboard', path: '/individual-user-dashboard', icon: 'LayoutDashboard' },
    { label: 'My Gardens', path: '/garden-submission-form', icon: 'Sprout' },
    { label: 'Marketplace', path: '/carbon-credits-marketplace', icon: 'Store' },
  ];

  const ngoNavItems = [
    { label: 'Dashboard', path: '/individual-user-dashboard', icon: 'BarChart3' },
    { label: 'Marketplace', path: '/carbon-credits-marketplace', icon: 'Store' },
    { label: 'Purchases', path: '/credit-purchase-checkout', icon: 'ShoppingBag' },
  ];

  const getNavigationItems = () => {
    if (!user) return [];
    return user.role === 'individual' ? individualNavItems : ngoNavItems;
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/user-registration-login');
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const navigationItems = getNavigationItems();
  const unreadCount = getUnreadCount();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border shadow-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to={user ? '/individual-user-dashboard' : '/user-registration-login'} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Leaf" size={20} color="white" />
                </div>
                <span className="font-heading font-semibold text-lg text-text-primary">
                  EcoSteps
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {user && (
              <nav className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                      isActivePath(item.path)
                        ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-background'
                    }`}
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* Cart (NGO only) */}
                  {user.role === 'ngo' && (
                    <div className="relative">
                      <Button
                        variant="ghost"
                        onClick={toggleCart}
                        className="relative p-2"
                      >
                        <Icon name="ShoppingCart" size={20} />
                        {cartItems.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItems.length}
                          </span>
                        )}
                      </Button>
                    </div>
                  )}

                  {/* Notifications */}
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      className="relative p-2"
                      onClick={toggleNotifications}
                    >
                      <Icon name="Bell" size={20} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </Button>

                    {/* Notifications Dropdown */}
                    {isNotificationOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40"
                          onClick={toggleNotifications}
                        ></div>
                        <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg shadow-strong z-50">
                          <div className="p-4 border-b border-border">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-text-primary">Notifications</h3>
                              {unreadCount > 0 && (
                                <Button
                                  variant="ghost"
                                  onClick={markAllNotificationsAsRead}
                                  className="text-xs text-primary hover:text-primary/80"
                                >
                                  Mark all as read
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                              <div className="p-4 text-center text-text-secondary">
                                <Icon name="Bell" size={24} className="mx-auto mb-2" />
                                <p>No notifications</p>
                              </div>
                            ) : (
                              notifications.map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`p-4 border-b border-border hover:bg-background cursor-pointer ${
                                    !notification.read ? 'bg-primary/5' : ''
                                  }`}
                                  onClick={() => markNotificationAsRead(notification.id)}
                                >
                                  <div className="flex items-start space-x-3">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${
                                      notification.type === 'success' ? 'bg-success' :
                                      notification.type === 'warning' ? 'bg-warning' :
                                      notification.type === 'error' ? 'bg-error' : 'bg-primary'
                                    }`}></div>
                                    <div className="flex-1">
                                      <h4 className="font-medium text-text-primary text-sm">{notification.title}</h4>
                                      <p className="text-text-secondary text-xs mt-1">{notification.message}</p>
                                      <p className="text-text-secondary text-xs mt-2">{notification.timestamp}</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background transition-smooth"
                    >
                      <div className="hidden md:block text-right">
                        <p className="text-sm font-medium text-text-primary">{user.name}</p>
                        <p className="text-xs text-text-secondary capitalize">{user.role}</p>
                      </div>
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="white" />
                      </div>
                    </button>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40"
                          onClick={toggleUserMenu}
                        ></div>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-strong z-50">
                          <div className="p-2">
                            <div className="px-3 py-2 border-b border-border">
                              <p className="font-medium text-text-primary">{user.name}</p>
                              <p className="text-xs text-text-secondary capitalize">{user.role}</p>
                            </div>
                            <div className="mt-2 space-y-1">
                              <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background rounded-md transition-smooth">
                                Profile Settings
                              </button>
                              <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background rounded-md transition-smooth">
                                Account Settings
                              </button>
                              <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background rounded-md transition-smooth">
                                Help & Support
                              </button>
                              <div className="border-t border-border pt-2 mt-2">
                                <button
                                  onClick={handleLogout}
                                  className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-smooth flex items-center space-x-2"
                                >
                                  <Icon name="LogOut" size={16} />
                                  <span>Sign Out</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Menu Button */}
                  <Button
                    variant="ghost"
                    onClick={toggleMobileMenu}
                    className="md:hidden p-2"
                  >
                    <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
                  </Button>
                </>
              ) : (
                <Link to="/user-registration-login">
                  <Button variant="primary">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden bg-surface border-t border-border shadow-medium animate-slide-in">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-smooth ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-background'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="border-t border-border pt-2 mt-2">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-error hover:bg-error/10"
                >
                  <Icon name="LogOut" size={20} />
                  <span className="ml-3">Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Sidebar (NGO only) */}
      {user?.role === 'ngo' && isCartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-1100"
            onClick={toggleCart}
          ></div>
          <div className="fixed right-0 top-0 h-full w-80 bg-surface shadow-strong z-1200 transform transition-transform duration-300">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-text-primary">Shopping Cart</h3>
                <Button variant="ghost" onClick={toggleCart} className="p-1">
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="ShoppingCart" size={48} className="mx-auto text-text-secondary mb-4" />
                  <p className="text-text-secondary">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary">{item.name}</h4>
                        <p className="text-sm text-text-secondary">${item.price} per credit</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1"
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="w-8 text-center font-data">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1"
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-error hover:bg-error/10"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-text-primary">Total:</span>
                  <span className="font-heading font-semibold text-lg text-text-primary">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Link to="/credit-purchase-checkout" onClick={toggleCart}>
                  <Button variant="primary" fullWidth>
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      {/* Content Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;