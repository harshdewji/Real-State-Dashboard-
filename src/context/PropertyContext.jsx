import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROPERTIES, FALLBACK_IMAGE } from '../data/properties';

const PropertyContext = createContext();

export const INITIAL_FILTERS = {
  keyword: '',
  location: '',
  type: 'All',
  status: 'all', // 'all' | 'for-sale' | 'for-rent'
  minPrice: '',
  maxPrice: '',
  bedrooms: 'all',
  bathrooms: 'all',
  minSqft: '',
  maxSqft: '',
  sortBy: 'featured', // 'featured' | 'price-low' | 'price-high' | 'newest' | 'sqft-high'
  amenities: []
};

export const PropertyProvider = ({ children }) => {
  // Properties
  const [properties, setProperties] = useState(PROPERTIES);
  
  // Favorites persistence
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('estateease_favorites');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  // Mock User Auth persistence
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('estateease_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Scheduled Visits & Inquiries persistence
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('estateease_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [scheduledVisits, setScheduledVisits] = useState(() => {
    try {
      const saved = localStorage.getItem('estateease_visits');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters State
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // View Mode: 'grid' or 'list'
  const [viewMode, setViewMode] = useState('grid');

  // Global Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Sync favorites to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('estateease_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Sync user to LocalStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('estateease_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('estateease_user');
      }
    } catch (e) {
      console.error('Failed to sync user', e);
    }
  }, [user]);

  // Sync Inquiries & Visits
  useEffect(() => {
    try {
      localStorage.setItem('estateease_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('estateease_visits', JSON.stringify(scheduledVisits));
    } catch (e) {
      console.error(e);
    }
  }, [scheduledVisits]);

  // Toggle Favorite Action
  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const exists = prev.includes(propertyId);
      const prop = properties.find(p => p.id === propertyId);
      const title = prop ? prop.title : 'Property';
      
      if (exists) {
        showToast(`Removed "${title}" from saved properties`, 'info');
        return prev.filter(id => id !== propertyId);
      } else {
        showToast(`Saved "${title}" to your favourites!`, 'success');
        return [...prev, propertyId];
      }
    });
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  const clearFavorites = () => {
    setFavorites([]);
    showToast('All saved properties cleared', 'info');
  };

  // Filter setters
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    showToast('Search filters have been reset', 'info');
  };

  // Mock Auth Handlers
  const login = (email, password, rememberMe = true) => {
    // Generate clean demo user
    const username = email.split('@')[0];
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
    const mockUser = {
      email,
      name: formattedName || 'Alex Mercer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Verified Buyer',
      memberSince: '2024'
    };
    setUser(mockUser);
    showToast(`Welcome back, ${mockUser.name}!`, 'success');
    return true;
  };

  const register = (name, email, password) => {
    const mockUser = {
      name: name.trim() || 'New Member',
      email,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Member',
      memberSince: '2024'
    };
    setUser(mockUser);
    showToast(`Account created successfully! Welcome to EstateEase, ${mockUser.name}.`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('You have been logged out safely.', 'info');
  };

  // Inquiry submission
  const submitInquiry = (inquiryData) => {
    const newInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast('Thank you! Your inquiry has been sent to the listing agent.', 'success');
    return true;
  };

  // Tour booking
  const scheduleVisit = (visitData) => {
    const newVisit = {
      ...visitData,
      id: `vis-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setScheduledVisits(prev => [newVisit, ...prev]);
    showToast(`Tour confirmed! We look forward to showing you ${visitData.propertyTitle}.`, 'success');
    return true;
  };

  // Filtered properties computation
  const filteredProperties = properties.filter(prop => {
    // Keyword search (title, address, city, state, description)
    if (filters.keyword.trim()) {
      const q = filters.keyword.toLowerCase().trim();
      const match =
        prop.title.toLowerCase().includes(q) ||
        prop.address.toLowerCase().includes(q) ||
        prop.city.toLowerCase().includes(q) ||
        prop.state.toLowerCase().includes(q) ||
        prop.description.toLowerCase().includes(q) ||
        prop.type.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Location search
    if (filters.location.trim()) {
      const loc = filters.location.toLowerCase().trim();
      const match =
        prop.city.toLowerCase().includes(loc) ||
        prop.state.toLowerCase().includes(loc) ||
        prop.address.toLowerCase().includes(loc) ||
        prop.zipCode.toLowerCase().includes(loc);
      if (!match) return false;
    }

    // Property Type
    if (filters.type && filters.type !== 'All') {
      if (prop.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
    }

    // Status (Buy / Rent)
    if (filters.status && filters.status !== 'all') {
      if (prop.status !== filters.status) {
        return false;
      }
    }

    // Price range
    if (filters.minPrice !== '' && !isNaN(Number(filters.minPrice))) {
      if (prop.price < Number(filters.minPrice)) return false;
    }
    if (filters.maxPrice !== '' && !isNaN(Number(filters.maxPrice))) {
      if (prop.price > Number(filters.maxPrice)) return false;
    }

    // Bedrooms
    if (filters.bedrooms && filters.bedrooms !== 'all') {
      const minBeds = parseInt(filters.bedrooms, 10);
      if (prop.bedrooms < minBeds) return false;
    }

    // Bathrooms
    if (filters.bathrooms && filters.bathrooms !== 'all') {
      const minBaths = parseFloat(filters.bathrooms);
      if (prop.bathrooms < minBaths) return false;
    }

    // Sqft range
    if (filters.minSqft !== '' && !isNaN(Number(filters.minSqft))) {
      if (prop.sqft < Number(filters.minSqft)) return false;
    }
    if (filters.maxSqft !== '' && !isNaN(Number(filters.maxSqft))) {
      if (prop.sqft > Number(filters.maxSqft)) return false;
    }

    // Amenities
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity =>
        prop.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  // Sorted properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return (b.yearBuilt || 0) - (a.yearBuilt || 0);
      case 'sqft-high':
        return b.sqft - a.sqft;
      case 'featured':
      default:
        // Featured first, then highest rating
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.rating || 0) - (a.rating || 0);
    }
  });

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties: sortedProperties,
        totalCount: properties.length,
        matchCount: sortedProperties.length,
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        viewMode,
        setViewMode,
        user,
        login,
        register,
        logout,
        toast,
        showToast,
        submitInquiry,
        scheduleVisit,
        scheduledVisits,
        inquiries
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};

