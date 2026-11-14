import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Home, 
  IndianRupee, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

export default function SearchBar({ compact = false }) {
  const { filters, setFilters } = useProperties();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(filters.status === 'for-rent' ? 'rent' : 'buy');
  const [locationInput, setLocationInput] = useState(filters.location || '');
  const [propertyType, setPropertyType] = useState(filters.type || 'All');
  const [priceRange, setPriceRange] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Parse price range selection in Indian Rupees (₹)
    let minPrice = '';
    let maxPrice = '';
    if (priceRange === 'under-2cr') {
      maxPrice = '20000000';
    } else if (priceRange === '2cr-5cr') {
      minPrice = '20000000';
      maxPrice = '50000000';
    } else if (priceRange === '5cr-8cr') {
      minPrice = '50000000';
      maxPrice = '80000000';
    } else if (priceRange === 'above-8cr') {
      minPrice = '80000000';
    } else if (priceRange === 'rent-under-50k') {
      maxPrice = '50000';
    } else if (priceRange === 'rent-50k-100k') {
      minPrice = '50000';
      maxPrice = '100000';
    } else if (priceRange === 'rent-above-100k') {
      minPrice = '100000';
    }

    setFilters(prev => ({
      ...prev,
      status: activeTab === 'rent' ? 'for-rent' : 'for-sale',
      location: locationInput.trim(),
      type: propertyType,
      minPrice: minPrice || prev.minPrice,
      maxPrice: maxPrice || prev.maxPrice
    }));

    navigate('/explore');
  };

  if (compact) {
    return (
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full max-w-xl">
        <div className="relative flex-1">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-600" />
          <input
            type="text"
            placeholder="Search by city, neighborhood, or zip..."
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-beige-300 text-xs sm:text-sm text-charcoal placeholder-charcoalMuted/60 focus:outline-none focus:ring-2 focus:ring-sage-400"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-full bg-sage-500 hover:bg-sage-600 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-soft transition-all"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-5 shadow-soft-xl border border-beige-200/80">
      
      {/* Buy / Rent Switcher */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-beige-100">
        <div className="flex items-center gap-1.5 p-1 bg-beige-100/80 rounded-full">
          <button
            type="button"
            onClick={() => setActiveTab('buy')}
            className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'buy'
                ? 'bg-sage-500 text-white shadow-soft'
                : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            Buy Properties
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rent')}
            className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'rent'
                ? 'bg-sage-500 text-white shadow-soft'
                : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            Rent Properties
          </button>
        </div>

        <span className="hidden sm:inline-flex text-xs font-medium text-charcoalMuted">
          Over 20+ verified luxury properties
        </span>
      </div>

      {/* Main Search Controls */}
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* City or Location */}
        <div className="md:col-span-4 relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoalMuted mb-1 ml-1">
            Location / City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-600" />
            <input
              type="text"
              placeholder="e.g. New York, Beverly Hills, Miami..."
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-2xl bg-beige-50/70 border border-beige-200/80 text-sm text-charcoal font-medium placeholder-charcoalMuted/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400 transition-all"
            />
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoalMuted mb-1 ml-1">
            Property Type
          </label>
          <div className="relative">
            <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-600 pointer-events-none" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-beige-50/70 border border-beige-200/80 text-sm text-charcoal font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400 transition-all appearance-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Independent House">Independent House</option>
              <option value="Luxury Home">Luxury Home</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoalMuted mb-1 ml-1">
            Price Range (₹)
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-600 pointer-events-none" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-beige-50/70 border border-beige-200/80 text-sm text-charcoal font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400 transition-all appearance-none cursor-pointer"
            >
              <option value="">Any Price</option>
              {activeTab === 'buy' ? (
                <>
                  <option value="under-2cr">Under ₹2 Crore</option>
                  <option value="2cr-5cr">₹2 Crore – ₹5 Crore</option>
                  <option value="5cr-8cr">₹5 Crore – ₹8 Crore</option>
                  <option value="above-8cr">₹8 Crore+</option>
                </>
              ) : (
                <>
                  <option value="rent-under-50k">Under ₹50,000/mo</option>
                  <option value="rent-50k-100k">₹50,000 – ₹1,00,000/mo</option>
                  <option value="rent-above-100k">₹1,00,000+/mo</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <div className="md:col-span-2 pt-2 md:pt-5">
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-sage-500 hover:bg-sage-600 text-white font-bold text-sm shadow-soft hover:shadow-soft-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>

      </form>
    </div>
  );
}

