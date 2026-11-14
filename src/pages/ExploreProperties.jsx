import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  LayoutGrid, 
  List, 
  Map as MapIcon, 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  Filter,
  Building,
  Sparkles,
  ChevronDown,
  X
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import PropertyMap from '../components/PropertyMap';
import { useProperties } from '../context/PropertyContext';

export default function ExploreProperties() {
  const [searchParams] = useSearchParams();
  const { 
    filteredProperties, 
    matchCount, 
    totalCount, 
    viewMode, 
    setViewMode, 
    filters, 
    updateFilter, 
    resetFilters 
  } = useProperties();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Sync URL search params if present (e.g., /explore?type=Villa or /explore?status=for-sale)
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const statusParam = searchParams.get('status');
    const locationParam = searchParams.get('location');

    if (typeParam) updateFilter('type', typeParam);
    if (statusParam) updateFilter('status', statusParam);
    if (locationParam) updateFilter('location', locationParam);
  }, [searchParams]);

  // Handle Load More
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 6);
      setIsLoadingMore(false);
    }, 400);
  };

  const paginatedProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-beige-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Building className="w-3.5 h-3.5" />
            Curated Real Estate Portfolio
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Explore Properties
          </h1>
          <p className="text-sm text-charcoalMuted mt-1">
            Displaying <span className="font-bold text-charcoal">{matchCount}</span> matching {matchCount === 1 ? 'property' : 'properties'} across premier markets.
          </p>
        </div>

        {/* View Controls & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-beige-300 text-xs font-bold text-charcoal shadow-soft"
          >
            <SlidersHorizontal className="w-4 h-4 text-sage-600" />
            <span>Filters ({matchCount})</span>
          </button>

          {/* Map View Toggle */}
          <button
            onClick={() => setShowMapView(!showMapView)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
              showMapView
                ? 'bg-sage-500 text-white border-sage-500 shadow-soft'
                : 'bg-white text-charcoal border-beige-300 hover:bg-beige-50 shadow-soft'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>{showMapView ? 'Hide Map' : 'Show Map'}</span>
          </button>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="pl-3 pr-8 py-2.5 rounded-2xl bg-white border border-beige-300 text-xs font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-sage-400 shadow-soft appearance-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Listed</option>
              <option value="sqft-high">Largest Sq.Ft.</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-charcoalMuted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Grid vs List View Switcher */}
          <div className="hidden sm:flex items-center p-1 bg-white rounded-2xl border border-beige-300 shadow-soft">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'grid'
                  ? 'bg-sage-500 text-white shadow-xs'
                  : 'text-charcoalMuted hover:text-charcoal'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List View"
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'list'
                  ? 'bg-sage-500 text-white shadow-xs'
                  : 'text-charcoalMuted hover:text-charcoal'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Interactive Map Overlay (if Map View is toggled on) */}
      {showMapView && (
        <div className="animate-fade-in space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-charcoalMuted px-1">
            <span>Interactive OpenStreetMap Pins (Click pin for property preview)</span>
            <button
              onClick={() => setShowMapView(false)}
              className="text-sage-700 hover:underline"
            >
              Close Map
            </button>
          </div>
          <PropertyMap properties={filteredProperties} height="420px" />
        </div>
      )}

      {/* Main Layout Grid (Filter Sidebar + Listings) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar (Left 4 cols) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24">
          <FilterSidebar />
        </div>

        {/* Listings Container (Right 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.type !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold">
                Type: {filters.type}
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-rose-500" 
                  onClick={() => updateFilter('type', 'All')} 
                />
              </span>
            )}
            {filters.status !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold">
                Status: {filters.status === 'for-sale' ? 'For Sale' : 'For Rent'}
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-rose-500" 
                  onClick={() => updateFilter('status', 'all')} 
                />
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold">
                Location: {filters.location}
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-rose-500" 
                  onClick={() => updateFilter('location', '')} 
                />
              </span>
            )}
            {filters.bedrooms !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold">
                {filters.bedrooms}+ Beds
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-rose-500" 
                  onClick={() => updateFilter('bedrooms', 'all')} 
                />
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold">
                Price: ₹{filters.minPrice ? Number(filters.minPrice).toLocaleString('en-IN') : '0'} – ₹{filters.maxPrice ? Number(filters.maxPrice).toLocaleString('en-IN') : 'Max'}
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-rose-500" 
                  onClick={() => {
                    updateFilter('minPrice', '');
                    updateFilter('maxPrice', '');
                  }} 
                />
              </span>
            )}
          </div>

          {/* EMPTY STATE */}
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-beige-200 shadow-soft space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-beige-100 text-charcoalMuted flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal">
                No matching residences found
              </h3>
              <p className="text-sm text-charcoalMuted max-w-md mx-auto">
                We couldn't find any properties matching your current filters. Try expanding your price range, clearing specific filters, or searching a different city.
              </p>
              <div className="pt-2">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-sage-500 hover:bg-sage-600 text-white text-xs font-bold shadow-soft transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            </div>
          ) : (
            /* PROPERTIES DISPLAY */
            <div className="space-y-8">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} layout="grid" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} layout="list" />
                  ))}
                </div>
              )}

              {/* PAGINATION / LOAD MORE */}
              {hasMore && (
                <div className="text-center pt-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-beige-50 border border-beige-300 text-charcoal text-xs font-bold shadow-soft hover:shadow-soft-lg transition-all"
                  >
                    {isLoadingMore ? (
                      <span>Loading Residences...</span>
                    ) : (
                      <span>Load More Properties ({filteredProperties.length - visibleCount} remaining)</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-xs flex justify-end lg:hidden animate-fade-in">
          <div className="w-full max-w-md bg-white h-full overflow-y-auto p-4 animate-slide-left">
            <FilterSidebar 
              isMobile={true} 
              onCloseMobile={() => setMobileFilterOpen(false)} 
            />
          </div>
        </div>
      )}

    </div>
  );
}

