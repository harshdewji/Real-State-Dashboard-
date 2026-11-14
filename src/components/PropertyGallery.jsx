import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Grid,
  Heart,
  Share2
} from 'lucide-react';
import { FALLBACK_IMAGE } from '../data/properties';

export default function PropertyGallery({ images = [], title = 'Property Image' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const displayImages = images.length > 0 ? images : [FALLBACK_IMAGE];

  const handlePrev = (e) => {
    e && e.stopPropagation();
    setActiveIndex(prev => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e && e.stopPropagation();
    setActiveIndex(prev => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="space-y-3">
      {/* Hero Showcase Frame */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative rounded-3xl overflow-hidden shadow-soft-lg">
        
        {/* Main Large Image (Takes 3 columns on tablet/desktop) */}
        <div 
          onClick={() => setLightboxOpen(true)}
          className="md:col-span-3 aspect-[16/10] sm:aspect-[16/9] relative group cursor-pointer overflow-hidden bg-beige-100"
        >
          <img
            src={displayImages[activeIndex]}
            alt={`${title} - view ${activeIndex + 1}`}
            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
            <span className="text-white text-xs font-semibold backdrop-blur-md bg-black/40 px-3 py-1.5 rounded-full">
              Click to expand full screen
            </span>
          </div>

          {/* Navigation Arrows for main view */}
          {displayImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-charcoal shadow-soft-lg flex items-center justify-center transition-all opacity-90 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-charcoal shadow-soft-lg flex items-center justify-center transition-all opacity-90 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Expand Fullscreen Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            aria-label="Expand image preview"
            className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-charcoal/80 hover:bg-charcoal text-white text-xs font-semibold backdrop-blur-md shadow-md transition-all"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">View Gallery ({displayImages.length})</span>
          </button>
        </div>

        {/* Side Thumbnails Column (Desktop) */}
        <div className="hidden md:flex flex-col gap-3 h-full">
          {displayImages.slice(1, 4).map((img, idx) => {
            const actualIdx = idx + 1;
            const isSelected = activeIndex === actualIdx;
            return (
              <div
                key={actualIdx}
                onClick={() => setActiveIndex(actualIdx)}
                className={`relative flex-1 rounded-2xl overflow-hidden cursor-pointer bg-beige-100 transition-all ${
                  isSelected ? 'ring-2 ring-sage-500 shadow-md' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${title} thumbnail ${actualIdx}`}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  className="w-full h-full object-cover"
                />
                {idx === 2 && displayImages.length > 4 && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxOpen(true);
                    }}
                    className="absolute inset-0 bg-charcoal/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold"
                  >
                    +{displayImages.length - 4} More
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Horizontal Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {displayImages.map((img, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  isSelected
                    ? 'border-sage-500 ring-2 ring-sage-200 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* LIGHTBOX FULLSCREEN MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <div>
              <h4 className="text-base font-bold line-clamp-1">{title}</h4>
              <p className="text-xs text-white/70">
                Photo {activeIndex + 1} of {displayImages.length}
              </p>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Stage */}
          <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4">
            <img
              src={displayImages[activeIndex]}
              alt={`${title} enlarged`}
              onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {/* Nav arrows in lightbox */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white text-charcoal hover:text-charcoal backdrop-blur-md flex items-center justify-center transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6 text-white hover:text-charcoal" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white text-charcoal hover:text-charcoal backdrop-blur-md flex items-center justify-center transition-all"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6 text-white hover:text-charcoal" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto max-w-4xl mx-auto w-full py-2">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-14 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeIndex === idx ? 'border-sage-400 scale-110' : 'border-transparent opacity-40 hover:opacity-90'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

