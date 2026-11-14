import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Palmtree, 
  Home as HomeIcon, 
  Briefcase,
  Mail,
  Send,
  MapPin
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import LocationCard from '../components/LocationCard';
import TestimonialCard from '../components/TestimonialCard';
import { useProperties } from '../context/PropertyContext';
import { CATEGORIES, POPULAR_LOCATIONS, TESTIMONIALS } from '../data/properties';

export default function Home() {
  const { properties, updateFilter, showToast } = useProperties();
  const navigate = useNavigate();

  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Featured properties
  const featuredProperties = properties
    .filter(p => activeCategoryTab === 'all' || p.type.toLowerCase() === activeCategoryTab.toLowerCase())
    .slice(0, 6);

  const handleCategoryClick = (categorySlug) => {
    updateFilter('type', categorySlug);
    navigate('/explore');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Subscribed to EstateEase luxury digest!', 'success');
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] sm:min-h-[720px] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Background Image with soft dark-to-light gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="EstateEase Hero Luxury Property"
            className="w-full h-full object-cover scale-105 filter brightness-95"
          />
          {/* Subtle gradient overlays for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
          <div className="absolute inset-0 bg-sage-900/20 mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 mt-4">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-medium animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Discover Over 20+ Handpicked Architectural Estates</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Find Your Place. <br className="hidden sm:inline" />
              <span className="italic font-normal text-sage-200">Feel at Home.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-beige-100 font-light leading-relaxed">
              Explore exceptional residential sanctuaries, modern architectural penthouses, and private coastal villas curated for refined living.
            </p>
          </div>

          {/* Property Search Component */}
          <div className="pt-2 sm:pt-4">
            <SearchBar compact={false} />
          </div>

          {/* Quick Stats Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-white/90">
            <div className="border-r border-white/20 last:border-none">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white">₹3,500 Cr+</p>
              <p className="text-[11px] uppercase tracking-wider text-beige-200">Volume Listed</p>
            </div>
            <div className="border-r border-white/20 last:border-none">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white">100%</p>
              <p className="text-[11px] uppercase tracking-wider text-beige-200">Verified Titles</p>
            </div>
            <div className="border-r border-white/20 last:border-none">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white">12+</p>
              <p className="text-[11px] uppercase tracking-wider text-beige-200">Prime Cities</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white">4.95 ★</p>
              <p className="text-[11px] uppercase tracking-wider text-beige-200">Client Rating</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Handpicked Residences
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Featured Properties
            </h2>
            <p className="text-sm sm:text-base text-charcoalMuted mt-1">
              Exceptional architecture and prime locations, curated for discerning buyers & renters.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['all', 'Apartment', 'Villa', 'Luxury Home'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategoryTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all capitalize whitespace-nowrap ${
                  activeCategoryTab === tab
                    ? 'bg-sage-500 text-white shadow-soft'
                    : 'bg-beige-100 text-charcoal hover:bg-beige-200'
                }`}
              >
                {tab === 'all' ? 'All Residences' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} layout="grid" />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-sage-500 hover:bg-sage-600 text-white text-sm font-bold shadow-soft hover:shadow-soft-lg transition-all"
          >
            <span>Explore All 20+ Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. PROPERTY CATEGORIES */}
      <section className="bg-beige-50/70 border-y border-beige-200/60 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600">
              Architectural Diversity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Browse by Property Type
            </h2>
            <p className="text-sm sm:text-base text-charcoalMuted">
              Whether you are looking for an urban skyline loft or an expansive coastal estate, discover properties tailored to your style.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className="group relative bg-white rounded-3xl p-6 border border-beige-200/80 shadow-soft hover:shadow-soft-xl hover:border-sage-400 cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sage-50 text-sage-600 group-hover:bg-sage-500 group-hover:text-white flex items-center justify-center transition-colors mb-4">
                    {cat.icon === 'Building2' && <Building2 className="w-6 h-6" />}
                    {cat.icon === 'Palmtree' && <Palmtree className="w-6 h-6" />}
                    {cat.icon === 'Home' && <HomeIcon className="w-6 h-6" />}
                    {cat.icon === 'Sparkles' && <Sparkles className="w-6 h-6" />}
                    {cat.icon === 'Briefcase' && <Briefcase className="w-6 h-6" />}
                  </div>
                  
                  <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-sage-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-charcoalMuted mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 flex items-center justify-between text-xs font-bold text-sage-700">
                  <span>{cat.count} Listings</span>
                  <div className="w-6 h-6 rounded-full bg-beige-100 group-hover:bg-sage-100 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-charcoal group-hover:text-sage-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE ESTATEEASE? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              The EstateEase Standard
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
              A Simpler, More Transparent Way to Find Home.
            </h2>
            
            <p className="text-base text-charcoalMuted leading-relaxed">
              We bridge the gap between luxury architecture and straightforward discovery. Every residence is vetted, priced clearly, and supported by dedicated personal advisors.
            </p>

            <div className="pt-2">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal hover:bg-sage-600 text-white text-xs sm:text-sm font-bold shadow-soft transition-all"
              >
                <span>Discover Verified Listings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column Benefits Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div className="bg-white rounded-3xl p-6 border border-beige-200/80 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">
                100% Verified Listings
              </h3>
              <p className="text-xs sm:text-sm text-charcoalMuted leading-relaxed">
                Every property title, ownership status, and physical condition is verified by certified real estate analysts before publishing.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-beige-200/80 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-softblue-100 text-softblue-500 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Effortless Discovery
              </h3>
              <p className="text-xs sm:text-sm text-charcoalMuted leading-relaxed">
                Filter by price brackets, bedroom counts, key amenities, and explore spatial locations directly on our interactive Leaflet map.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-beige-200/80 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Transparent Pricing
              </h3>
              <p className="text-xs sm:text-sm text-charcoalMuted leading-relaxed">
                Zero surprise fees. Clear breakdowns of HOA charges, estimated monthly mortgages, and historical price valuations upfront.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-beige-200/80 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-beige-200 text-charcoal flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Dedicated Concierge
              </h3>
              <p className="text-xs sm:text-sm text-charcoalMuted leading-relaxed">
                Schedule in-person or live video tours directly with premier licensed partner agents with a single tap.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. POPULAR LOCATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600">
              Prime Destinations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Popular Locations
            </h2>
            <p className="text-sm text-charcoalMuted mt-1">
              Discover thriving cultural hubs and luxury communities across the country.
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs sm:text-sm font-bold text-sage-700 hover:text-sage-800 flex items-center gap-1"
          >
            <span>View all markets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="bg-white border-y border-beige-200/70 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600">
              Client Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Trusted by Discerning Buyers & Renters
            </h2>
            <p className="text-sm sm:text-base text-charcoalMuted">
              Read how our clients discovered their sanctuary with EstateEase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>

        </div>
      </section>

      {/* 7. NEWSLETTER SUBSCRIPTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sage-500 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-soft-xl">
          
          {/* Subtle background decorative shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sage-700/30 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-white">
              <Mail className="w-6 h-6" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Receive Curated Private Off-Market Releases
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-light max-w-lg mx-auto">
              Join 18,000+ architects, investors, and homeowners receiving our bi-weekly digest of off-market architectural listings.
            </p>

            {newsletterSubscribed ? (
              <div className="pt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-sage-700 text-sm font-bold shadow-md animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-sage-600" />
                <span>You're subscribed! Welcome to the EstateEase Circle.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="pt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-full bg-white text-charcoal placeholder-charcoalMuted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage-200"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-charcoal hover:bg-charcoal/90 text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-white/70 pt-2">
              We respect your privacy. Unsubscribe anytime with 1-click.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

