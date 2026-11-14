import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Car, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Phone, 
  Mail, 
  ArrowLeft, 
  Clock, 
  Building2,
  Compass,
  School,
  ShoppingBag,
  Bus,
  Sparkles,
  UserCheck
} from 'lucide-react';
import PropertyGallery from '../components/PropertyGallery';
import PropertyMap from '../components/PropertyMap';
import PropertyCard from '../components/PropertyCard';
import ScheduleTourModal from '../components/ScheduleTourModal';
import { useProperties } from '../context/PropertyContext';
import { FALLBACK_IMAGE } from '../data/properties';
import { formatPriceInRupees } from '../utils/formatters';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, isFavorite, toggleFavorite, submitInquiry, showToast, user } = useProperties();

  const [tourModalOpen, setTourModalOpen] = useState(false);

  // Agent inquiry form state
  const [inquiryName, setInquiryName] = useState(user ? user.name : '');
  const [inquiryEmail, setInquiryEmail] = useState(user ? user.email : '');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // Find target property
  const property = properties.find(p => p.id === id) || properties[0];

  // Scroll to top when id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setInquirySent(false);
  }, [id]);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-charcoal">Property Not Found</h2>
        <p className="text-sm text-charcoalMuted mt-2">The property listing you requested may have been archived.</p>
        <Link to="/explore" className="mt-4 inline-block px-6 py-2.5 rounded-full bg-sage-500 text-white font-bold text-xs">
          Return to Properties
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(property.id);
  const isRent = property.status === 'for-rent';
  const displayPrice = property.priceFormatted || formatPriceInRupees(property.price, isRent);

  // Find similar properties (same category or nearby)
  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard!', 'success');
    } else {
      showToast('Share link ready', 'info');
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim()) {
      showToast('Please fill in your name and email', 'error');
      return;
    }

    submitInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      agentEmail: property.agent ? property.agent.email : 'agent@estateease.com',
      name: inquiryName,
      email: inquiryEmail,
      phone: inquiryPhone,
      message: inquiryMessage || `I am interested in scheduling a viewing for ${property.title}.`
    });

    setInquirySent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-charcoalMuted hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Results</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-beige-300 hover:bg-beige-50 text-charcoal text-xs font-semibold shadow-soft transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          <button
            onClick={() => toggleFavorite(property.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold shadow-soft transition-all ${
              favorited
                ? 'bg-rose-50 border-rose-300 text-rose-600'
                : 'bg-white border-beige-300 hover:bg-beige-50 text-charcoal'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            <span>{favorited ? 'Saved to Favourites' : 'Save Property'}</span>
          </button>
        </div>
      </div>

      {/* Property Title & Price Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-beige-200">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isRent ? 'bg-amber-100 text-amber-800' : 'bg-sage-100 text-sage-800'
            }`}>
              {isRent ? 'For Rent' : 'For Sale'}
            </span>
            <span className="px-3 py-1 rounded-full bg-beige-200 text-charcoal text-xs font-semibold">
              {property.type}
            </span>
            {property.verified && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified MLS Title
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-charcoalMuted">
            <MapPin className="w-4 h-4 text-sage-600 shrink-0" />
            <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
          </div>
        </div>

        <div className="md:text-right space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-charcoalMuted">
            Listing Price
          </p>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            {displayPrice}
          </div>
          {property.hoa && (
            <p className="text-xs text-charcoalMuted">HOA / Maintenance: {property.hoa}</p>
          )}
        </div>
      </div>

      {/* 1. IMAGE GALLERY COMPONENT */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* 2. MAIN CONTENT & STICKY SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (8 cols): Specs, Description, Amenities, Map, Facilities */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Key Specs Bar */}
          <div className="bg-white rounded-3xl p-6 border border-beige-200 shadow-soft grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-beige-50/70 border border-beige-200/50">
              <span className="text-xs text-charcoalMuted font-medium block">Bedrooms</span>
              <div className="flex items-center justify-center gap-1.5 font-serif text-xl font-bold text-charcoal mt-1">
                <Bed className="w-5 h-5 text-sage-600" />
                <span>{property.bedrooms > 0 ? property.bedrooms : 'Studio'}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-beige-50/70 border border-beige-200/50">
              <span className="text-xs text-charcoalMuted font-medium block">Bathrooms</span>
              <div className="flex items-center justify-center gap-1.5 font-serif text-xl font-bold text-charcoal mt-1">
                <Bath className="w-5 h-5 text-sage-600" />
                <span>{property.bathrooms}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-beige-50/70 border border-beige-200/50">
              <span className="text-xs text-charcoalMuted font-medium block">Square Feet</span>
              <div className="flex items-center justify-center gap-1.5 font-serif text-xl font-bold text-charcoal mt-1">
                <Maximize2 className="w-5 h-5 text-sage-600" />
                <span>{property.sqft.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-beige-50/70 border border-beige-200/50">
              <span className="text-xs text-charcoalMuted font-medium block">Year Built</span>
              <div className="flex items-center justify-center gap-1.5 font-serif text-xl font-bold text-charcoal mt-1">
                <Calendar className="w-5 h-5 text-sage-600" />
                <span>{property.yearBuilt || '2022'}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl p-8 border border-beige-200 shadow-soft space-y-4">
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              About This Residence
            </h3>
            <p className="text-charcoal/90 text-sm sm:text-base leading-relaxed font-normal">
              {property.description}
            </p>
          </div>

          {/* Features & Amenities */}
          <div className="bg-white rounded-3xl p-8 border border-beige-200 shadow-soft space-y-5">
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              Features & Premium Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {property.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-beige-50/70 border border-beige-200/60 text-sm font-medium text-charcoal"
                >
                  <div className="w-8 h-8 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map Section */}
          <div className="bg-white rounded-3xl p-8 border border-beige-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal">
                  Property Location
                </h3>
                <p className="text-xs text-charcoalMuted">
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-sage-700 bg-sage-50 px-3 py-1.5 rounded-full">
                <Compass className="w-3.5 h-3.5" />
                <span>Prime District</span>
              </div>
            </div>

            {/* Map Component */}
            <PropertyMap singleProperty={property} height="360px" />
          </div>

          {/* Nearby Facilities */}
          {property.nearbyFacilities && property.nearbyFacilities.length > 0 && (
            <div className="bg-white rounded-3xl p-8 border border-beige-200 shadow-soft space-y-4">
              <h3 className="font-serif text-2xl font-bold text-charcoal">
                Nearby Points of Interest
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.nearbyFacilities.map((fac, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-beige-50/70 border border-beige-200/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-charcoal">{fac.name}</p>
                        <p className="text-[11px] text-charcoalMuted">{fac.type}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-sage-700 bg-white px-2.5 py-1 rounded-full shadow-xs">
                      {fac.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sticky Column (4 cols): Agent Contact & Schedule Visit */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          
          {/* Schedule Tour Card */}
          <div className="bg-sage-500 rounded-3xl p-6 sm:p-7 text-white shadow-soft-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-200">
              Private Experience
            </span>
            <h3 className="font-serif text-2xl font-bold">
              Experience This Home in Person
            </h3>
            <p className="text-xs text-white/90 leading-relaxed">
              Book a bespoke walkthrough with our dedicated property specialist. Choose between private in-person viewing or live video tour.
            </p>

            <button
              onClick={() => setTourModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-beige-50 text-charcoal text-xs font-bold shadow-soft transition-all"
            >
              Schedule a Visit
            </button>
          </div>

          {/* Agent Information Card */}
          {property.agent && (
            <div className="bg-white rounded-3xl p-6 border border-beige-200 shadow-soft space-y-5">
              
              <div className="flex items-center gap-4">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-sage-200"
                />
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal">
                    {property.agent.name}
                  </h4>
                  <p className="text-xs text-charcoalMuted">{property.agent.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{property.agent.rating}</span>
                    </div>
                    <span className="text-xs text-charcoalMuted">
                      ({property.agent.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Contact Links */}
              <div className="pt-2 border-t border-beige-100 space-y-2">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-beige-50 hover:bg-sage-50 text-xs font-semibold text-charcoal hover:text-sage-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sage-600" />
                  <span>{property.agent.phone}</span>
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-beige-50 hover:bg-sage-50 text-xs font-semibold text-charcoal hover:text-sage-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-sage-600" />
                  <span>{property.agent.email}</span>
                </a>
              </div>

              {/* Contact Agent Form */}
              <div className="pt-4 border-t border-beige-100">
                <h5 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
                  Inquire About This Property
                </h5>

                {inquirySent ? (
                  <div className="p-4 rounded-2xl bg-sage-50 text-sage-800 text-xs font-medium space-y-1 text-center">
                    <CheckCircle2 className="w-6 h-6 text-sage-600 mx-auto" />
                    <p className="font-bold">Inquiry Sent!</p>
                    <p>{property.agent.name} will be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
                    />
                    <input
                      type="email"
                      placeholder="Your Email *"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone Number"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
                    />
                    <textarea
                      rows="3"
                      placeholder={`Hello, I am interested in ${property.title}...`}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-charcoal hover:bg-sage-600 text-white text-xs font-bold transition-all shadow-soft"
                    >
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* 3. SIMILAR PROPERTIES SECTION */}
      {similarProperties.length > 0 && (
        <section className="pt-12 border-t border-beige-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sage-600">
                Recommended
              </span>
              <h3 className="font-serif text-3xl font-bold text-charcoal">
                Similar Properties You May Like
              </h3>
            </div>
            <Link
              to="/explore"
              className="text-xs font-bold text-sage-700 hover:text-sage-800"
            >
              Browse All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} layout="grid" />
            ))}
          </div>
        </section>
      )}

      {/* Schedule Tour Modal */}
      <ScheduleTourModal
        property={property}
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
      />

    </div>
  );
}

