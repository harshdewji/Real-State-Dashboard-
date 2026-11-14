import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Trash2, 
  ArrowRight, 
  Building2, 
  Sparkles,
  Search
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../context/PropertyContext';
import { formatPriceInRupees } from '../utils/formatters';

export default function SavedProperties() {
  const { properties, favorites, clearFavorites, viewMode, setViewMode } = useProperties();

  // Filter properties in favorites list
  const savedList = properties.filter(p => favorites.includes(p.id));

  // Compute estimated portfolio total
  const totalValue = savedList.reduce((acc, curr) => {
    return curr.status === 'for-sale' ? acc + curr.price : acc;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 min-h-[60vh]">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-beige-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            Your Private Collection
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Saved Properties
          </h1>
          <p className="text-sm text-charcoalMuted mt-1">
            You have saved <span className="font-bold text-charcoal">{savedList.length}</span> {savedList.length === 1 ? 'residence' : 'residences'} to your wishlist.
          </p>
        </div>

        {savedList.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearFavorites}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-beige-300 hover:border-rose-300 text-charcoal hover:text-rose-600 text-xs font-semibold shadow-soft transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Saved</span>
            </button>
          </div>
        )}
      </div>

      {/* Portfolio Value Summary Card */}
      {savedList.length > 0 && totalValue > 0 && (
        <div className="bg-beige-50/80 rounded-3xl p-6 border border-beige-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sage-700">
              Saved Collection Valuation
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-0.5">
              {formatPriceInRupees(totalValue, false, true)}
            </div>
            <p className="text-xs text-charcoalMuted">
              Combined purchase value of {savedList.filter(p => p.status === 'for-sale').length} properties for sale
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage-500 hover:bg-sage-600 text-white text-xs font-bold shadow-soft transition-all"
          >
            <span>Explore More Homes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Saved Properties Grid or Empty State */}
      {savedList.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-beige-200 shadow-soft max-w-2xl mx-auto space-y-5 my-8">
          <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-10 h-10 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              No Saved Properties Yet
            </h3>
            <p className="text-sm text-charcoalMuted max-w-md mx-auto leading-relaxed">
              As you browse through our collection of luxury residences, tap the heart icon on any property card to save it here for comparison and review.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-sage-500 hover:bg-sage-600 text-white text-xs sm:text-sm font-bold shadow-soft hover:shadow-soft-lg transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Start Exploring Properties</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedList.map((prop) => (
            <PropertyCard key={prop.id} property={prop} layout="grid" />
          ))}
        </div>
      )}

    </div>
  );
}

