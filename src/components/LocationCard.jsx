import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

export default function LocationCard({ location }) {
  const navigate = useNavigate();
  const { updateFilter } = useProperties();

  const handleClick = () => {
    updateFilter('location', location.shortName || location.name);
    navigate('/explore');
  };

  return (
    <div
      onClick={handleClick}
      className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer shadow-soft hover:shadow-soft-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Background Image */}
      <img
        src={location.image}
        alt={location.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />

      {/* Top Badge */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-charcoal shadow-sm">
          {location.propertyCount}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <div className="flex items-center gap-1.5 text-xs text-sage-200 mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>Starting from {location.startingPrice}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
            {location.name}
          </h3>
          <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-sage-500 backdrop-blur-md flex items-center justify-center transition-colors">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

