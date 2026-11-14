import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { FALLBACK_IMAGE } from '../data/properties';
import { formatPriceInRupees } from '../utils/formatters';

export default function PropertyCard({ property, layout = 'grid' }) {
  const { isFavorite, toggleFavorite } = useProperties();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(
    property.images && property.images.length > 0 ? property.images[0] : FALLBACK_IMAGE
  );
  const [isHovered, setIsHovered] = useState(false);

  const favorited = isFavorite(property.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const isRent = property.status === 'for-rent';

  // Format price nicely in Rupees (₹)
  const displayPrice = property.priceFormatted || formatPriceInRupees(property.price, isRent);

  // LIST VIEW LAYOUT
  if (layout === 'list') {
    return (
      <div 
        onClick={() => navigate(`/property/${property.id}`)}
        className="group bg-white rounded-3xl p-4 border border-beige-200/80 shadow-soft hover:shadow-soft-xl hover:border-sage-300 transition-all duration-300 flex flex-col md:flex-row gap-6 cursor-pointer relative"
      >
        {/* Image Container */}
        <div className="relative md:w-80 h-56 md:h-auto rounded-2xl overflow-hidden shrink-0 bg-beige-100">
          <img
            src={imgSrc}
            alt={property.title}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full backdrop-blur-md shadow-sm ${
              isRent ? 'bg-amber-600/90 text-white' : 'bg-sage-600/90 text-white'
            }`}>
              {isRent ? 'For Rent' : 'For Sale'}
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 text-charcoal backdrop-blur-md shadow-sm">
              {property.type}
            </span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={handleFavoriteClick}
            aria-label={favorited ? 'Remove from saved' : 'Save to favourites'}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-md ${
              favorited
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 text-charcoal hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </button>

          {/* Verified indicator */}
          {property.verified && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 text-charcoal text-[11px] font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
              Verified
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-charcoalMuted mb-1">
                  <MapPin className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                  <span>{property.address}, {property.city}, {property.state}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-sage-700 transition-colors line-clamp-1">
                  {property.title}
                </h3>
              </div>
              
              <div className="text-right">
                <span className="font-serif text-2xl font-bold text-charcoal">
                  {displayPrice}
                </span>
                {property.hoa && (
                  <p className="text-[11px] text-charcoalMuted">HOA: {property.hoa}</p>
                )}
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-charcoalMuted line-clamp-2 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="pt-4 border-t border-beige-100 flex flex-wrap items-center justify-between gap-4 mt-4">
            {/* Specs */}
            <div className="flex items-center gap-4 text-xs font-semibold text-charcoal">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-1.5 bg-beige-50 px-2.5 py-1.5 rounded-xl border border-beige-200/50">
                  <Bed className="w-4 h-4 text-sage-600" />
                  <span>{property.bedrooms} Beds</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-1.5 bg-beige-50 px-2.5 py-1.5 rounded-xl border border-beige-200/50">
                  <Bath className="w-4 h-4 text-sage-600" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-beige-50 px-2.5 py-1.5 rounded-xl border border-beige-200/50">
                <Maximize2 className="w-3.5 h-3.5 text-sage-600" />
                <span>{property.sqft.toLocaleString()} sq.ft.</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-3">
              <Link
                to={`/property/${property.id}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-500 hover:bg-sage-600 text-white text-xs font-semibold shadow-soft hover:shadow-soft-lg transition-all"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT GRID VIEW LAYOUT
  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-3xl overflow-hidden border border-beige-200/80 shadow-soft hover:shadow-soft-xl hover:border-sage-300 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Property Hero Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige-100">
        <img
          src={imgSrc}
          alt={property.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md shadow-sm ${
            isRent ? 'bg-amber-600/90 text-white' : 'bg-sage-600/90 text-white'
          }`}>
            {isRent ? 'For Rent' : 'For Sale'}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 text-charcoal backdrop-blur-md shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={favorited ? 'Remove from saved' : 'Save to favourites'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-md ${
            favorited
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-charcoal hover:bg-white hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Property Type Pill & Rating */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-charcoal/80 text-white text-[11px] font-medium backdrop-blur-md">
            {property.type}
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 text-charcoal text-[11px] font-bold backdrop-blur-md">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{property.rating}</span>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="font-serif text-2xl font-bold text-charcoal tracking-tight">
              {displayPrice}
            </span>
            {property.verified && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-sage-700 bg-sage-50 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-sage-700 transition-colors line-clamp-1 mb-1">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-charcoalMuted line-clamp-1 mb-4">
            <MapPin className="w-3.5 h-3.5 text-sage-600 shrink-0" />
            <span>{property.city}, {property.state} • {property.address}</span>
          </div>
        </div>

        {/* Specs & Actions footer */}
        <div className="pt-3 border-t border-beige-100">
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-charcoal mb-4">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-beige-50/70">
              <span className="text-[10px] text-charcoalMuted font-normal">Beds</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Bed className="w-3.5 h-3.5 text-sage-600" />
                <span>{property.bedrooms > 0 ? property.bedrooms : '—'}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-beige-50/70">
              <span className="text-[10px] text-charcoalMuted font-normal">Baths</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Bath className="w-3.5 h-3.5 text-sage-600" />
                <span>{property.bathrooms > 0 ? property.bathrooms : '—'}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-beige-50/70">
              <span className="text-[10px] text-charcoalMuted font-normal">Area</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Maximize2 className="w-3.5 h-3.5 text-sage-600" />
                <span>{property.sqft} sq.ft.</span>
              </div>
            </div>
          </div>

          <Link
            to={`/property/${property.id}`}
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2.5 rounded-xl bg-beige-100 group-hover:bg-sage-500 group-hover:text-white text-charcoal text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

