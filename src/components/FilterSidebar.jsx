import React from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  MapPin, 
  IndianRupee, 
  Bed, 
  Bath, 
  Maximize2, 
  Check, 
  X,
  Home
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

export default function FilterSidebar({ isMobile = false, onCloseMobile = () => {} }) {
  const { filters, setFilters, updateFilter, resetFilters, matchCount, totalCount } = useProperties();

  const propertyTypes = ['All', 'Apartment', 'Villa', 'Independent House', 'Luxury Home', 'Commercial'];
  const bedOptions = ['all', '1', '2', '3', '4', '5'];
  const bathOptions = ['all', '1', '2', '3', '4'];

  const amenitiesList = [
    'Pool',
    'Wine Cellar',
    'Elevator',
    'EV Charger',
    'Sauna',
    'Gym',
    'Backyard',
    'Concierge',
    'Views'
  ];

  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities || [];
    if (current.includes(amenity)) {
      updateFilter('amenities', current.filter(a => a !== amenity));
    } else {
      updateFilter('amenities', [...current, amenity]);
    }
  };

  return (
    <aside className="bg-white rounded-3xl p-5 border border-beige-200/80 shadow-soft space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-beige-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sage-100 text-sage-600 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-charcoal">Filters</h3>
            <p className="text-[11px] text-charcoalMuted">
              Showing <span className="font-bold text-sage-700">{matchCount}</span> of {totalCount} properties
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            title="Reset All Filters"
            className="flex items-center gap-1 text-xs font-semibold text-charcoalMuted hover:text-sage-700 p-1.5 rounded-lg hover:bg-beige-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          {isMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-charcoal hover:bg-beige-100 sm:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Purpose: Buy / Rent / All */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
          Listing Type
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-beige-100/70 rounded-2xl">
          <button
            type="button"
            onClick={() => updateFilter('status', 'all')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              filters.status === 'all'
                ? 'bg-white text-charcoal shadow-sm'
                : 'text-charcoalMuted hover:text-charcoal'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => updateFilter('status', 'for-sale')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              filters.status === 'for-sale'
                ? 'bg-white text-sage-700 shadow-sm'
                : 'text-charcoalMuted hover:text-charcoal'
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => updateFilter('status', 'for-rent')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              filters.status === 'for-rent'
                ? 'bg-white text-amber-700 shadow-sm'
                : 'text-charcoalMuted hover:text-charcoal'
            }`}
          >
            Rent
          </button>
        </div>
      </div>

      {/* Search by Keyword / Location */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1.5">
            Search Keyword
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-600" />
            <input
              type="text"
              placeholder="Penthouse, ocean view, modern..."
              value={filters.keyword}
              onChange={(e) => updateFilter('keyword', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1.5">
            City or State
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-600" />
            <input
              type="text"
              placeholder="e.g. New York, Miami, Austin..."
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
          </div>
        </div>
      </div>

      {/* Property Type Radio Pills */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
          Property Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {propertyTypes.map((t) => {
            const active = filters.type.toLowerCase() === t.toLowerCase();
            return (
              <button
                key={t}
                type="button"
                onClick={() => updateFilter('type', t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-sage-500 text-white shadow-soft'
                    : 'bg-beige-50 text-charcoalMuted hover:bg-beige-100 hover:text-charcoal border border-beige-200/60'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
          Price Range (₹)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-charcoalMuted font-medium mb-1 block">Min Price (₹)</span>
            <input
              type="number"
              placeholder="Min (₹)"
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
          </div>
          <div>
            <span className="text-[10px] text-charcoalMuted font-medium mb-1 block">Max Price (₹)</span>
            <input
              type="number"
              placeholder="Max (₹)"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
          </div>
        </div>
      </div>

      {/* Bedrooms Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal">
            Bedrooms
          </label>
          <Bed className="w-3.5 h-3.5 text-sage-600" />
        </div>
        <div className="grid grid-cols-6 gap-1">
          {bedOptions.map((opt) => {
            const active = filters.bedrooms === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => updateFilter('bedrooms', opt)}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  active
                    ? 'bg-sage-500 text-white shadow-soft'
                    : 'bg-beige-50 text-charcoal hover:bg-beige-100 border border-beige-200/50'
                }`}
              >
                {opt === 'all' ? 'Any' : `${opt}+`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bathrooms Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal">
            Bathrooms
          </label>
          <Bath className="w-3.5 h-3.5 text-sage-600" />
        </div>
        <div className="grid grid-cols-5 gap-1">
          {bathOptions.map((opt) => {
            const active = filters.bathrooms === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => updateFilter('bathrooms', opt)}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  active
                    ? 'bg-sage-500 text-white shadow-soft'
                    : 'bg-beige-50 text-charcoal hover:bg-beige-100 border border-beige-200/50'
                }`}
              >
                {opt === 'all' ? 'Any' : `${opt}+`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Property Area (SqFt) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
          Square Footage (sq.ft.)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min sq.ft."
            value={filters.minSqft}
            onChange={(e) => updateFilter('minSqft', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
          />
          <input
            type="number"
            placeholder="Max sq.ft."
            value={filters.maxSqft}
            onChange={(e) => updateFilter('maxSqft', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
          />
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
          Key Amenities
        </label>
        <div className="grid grid-cols-2 gap-2">
          {amenitiesList.map((amenity) => {
            const isChecked = filters.amenities && filters.amenities.includes(amenity);
            return (
              <label
                key={amenity}
                onClick={() => handleAmenityToggle(amenity)}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-sage-50 text-sage-800 border border-sage-200 font-semibold'
                    : 'bg-beige-50/60 text-charcoalMuted hover:bg-beige-100/60'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-sage-500 text-white' : 'border border-beige-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Clear Filters CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={resetFilters}
          className="w-full py-2.5 rounded-xl border border-beige-300 hover:border-sage-400 text-charcoal text-xs font-bold hover:bg-beige-50 transition-all text-center"
        >
          Clear All Filters
        </button>
      </div>

    </aside>
  );
}

