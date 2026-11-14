import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUpRight,
  Heart,
  Instagram,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-beige-200 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-beige-100">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sage-500 flex items-center justify-center text-white shadow-soft">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.5L2 10.5V21a1 1 0 0 0 1 1h6v-6h6v6h6a1 1 0 0 0 1-1V10.5L12 2.5z" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-charcoal">
                Estate<span className="text-sage-600">Ease</span>
              </span>
            </Link>

            <p className="text-sm text-charcoalMuted max-w-sm leading-relaxed">
              Find your place. Feel at home. EstateEase curates extraordinary residential properties, prime architecture, and verified estates across leading metropolitan and coastal destinations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-beige-100 flex items-center justify-center text-charcoal hover:bg-sage-500 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-beige-100 flex items-center justify-center text-charcoal hover:bg-sage-500 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-beige-100 flex items-center justify-center text-charcoal hover:bg-sage-500 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-beige-100 flex items-center justify-center text-charcoal hover:bg-sage-500 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-charcoalMuted">
              <li>
                <Link to="/explore" className="hover:text-sage-600 transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/explore?type=Apartment" className="hover:text-sage-600 transition-colors">
                  Luxury Apartments
                </Link>
              </li>
              <li>
                <Link to="/explore?type=Villa" className="hover:text-sage-600 transition-colors">
                  Private Villas
                </Link>
              </li>
              <li>
                <Link to="/explore?type=Luxury+Home" className="hover:text-sage-600 transition-colors">
                  Modern Estates
                </Link>
              </li>
              <li>
                <Link to="/explore?type=Commercial" className="hover:text-sage-600 transition-colors">
                  Commercial Offices
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-charcoalMuted">
              <li>
                <Link to="/saved" className="hover:text-sage-600 transition-colors">
                  Saved Properties
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sage-600 transition-colors">
                  Schedule Tour
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-sage-600 transition-colors">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sage-600 transition-colors">
                  Agent Network
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sage-600 transition-colors">
                  Privacy Policy & Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
              Headquarters
            </h4>
            <div className="space-y-2 text-sm text-charcoalMuted">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                <span>740 Madison Avenue, New York, NY 10065</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sage-600 shrink-0" />
                <span>+1 (800) 555-EASE</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sage-600 shrink-0" />
                <span>concierge@estateease.com</span>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-sage-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Verified Listings</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoalMuted">
          <p>© {new Date().getFullYear()} EstateEase Inc. All rights reserved. Built with precision & care.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-charcoal cursor-pointer">Equal Housing Opportunity</span>
            <span className="hover:text-charcoal cursor-pointer">MLS Verified</span>
            <span className="hover:text-charcoal cursor-pointer">Security Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

