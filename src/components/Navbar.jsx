import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Heart, 
  PhoneCall, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Building2, 
  KeyRound, 
  CheckCircle,
  Search
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { favorites, user, logout, updateFilter } = useProperties();
  const navigate = useNavigate();
  const location = useLocation();

  // Sticky navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleNavCategory = (statusVal) => {
    updateFilter('status', statusVal);
    navigate('/explore');
  };

  const navLinkClasses = ({ isActive }) =>
    `px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 relative ${
      isActive
        ? 'text-sage-700 bg-sage-50 font-semibold'
        : 'text-charcoal/80 hover:text-sage-700 hover:bg-beige-100/60'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-beige-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-beige-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-sage-500 flex items-center justify-center text-white shadow-soft group-hover:bg-sage-600 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.5L2 10.5V21a1 1 0 0 0 1 1h6v-6h6v6h6a1 1 0 0 0 1-1V10.5L12 2.5z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-charcoal">
                  Estate<span className="text-sage-600">Ease</span>
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-charcoalMuted/70 -mt-1 hidden sm:block">
                Curated Living
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-beige-50/80 px-2 py-1.5 rounded-full border border-beige-200/60 shadow-inner-sm">
            <NavLink to="/" end className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/explore" className={navLinkClasses}>
              Explore Properties
            </NavLink>
            <button
              onClick={() => handleNavCategory('for-sale')}
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                location.pathname === '/explore' && location.search.includes('buy')
                  ? 'text-sage-700 bg-sage-50 font-semibold'
                  : 'text-charcoal/80 hover:text-sage-700 hover:bg-beige-100/60'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => handleNavCategory('for-rent')}
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                location.pathname === '/explore' && location.search.includes('rent')
                  ? 'text-sage-700 bg-sage-50 font-semibold'
                  : 'text-charcoal/80 hover:text-sage-700 hover:bg-beige-100/60'
              }`}
            >
              Rent
            </button>
            <NavLink to="/saved" className={navLinkClasses}>
              <span className="flex items-center gap-1.5">
                Saved
                {favorites.length > 0 && (
                  <span className="px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-sage-500 text-white">
                    {favorites.length}
                  </span>
                )}
              </span>
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses}>
              Contact
            </NavLink>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Favorites shortcut icon */}
            <Link
              to="/saved"
              aria-label="View Saved Properties"
              className="relative p-2.5 rounded-full text-charcoal/70 hover:text-sage-700 hover:bg-beige-100/80 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-sage-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>

            {user ? (
              /* User Profile Logged In Dropdown */
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-beige-200 hover:border-sage-300 bg-white transition-all shadow-sm"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-sage-200"
                  />
                  <span className="text-xs font-semibold text-charcoal max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-soft-xl border border-beige-200 py-2 z-50 animate-fade-in-down">
                    <div className="px-4 py-2 border-b border-beige-100">
                      <p className="text-xs text-charcoalMuted">Signed in as</p>
                      <p className="text-sm font-bold text-charcoal truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-charcoal hover:bg-beige-50 hover:text-sage-700"
                    >
                      <Heart className="w-4 h-4 text-sage-600" />
                      Saved Properties ({favorites.length})
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Buttons */
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold text-charcoal hover:text-sage-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full bg-sage-500 hover:bg-sage-600 text-white text-xs font-semibold shadow-soft hover:shadow-soft-lg transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/saved"
              aria-label="Saved"
              className="relative p-2 text-charcoal/70"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute 0 right-0 w-3.5 h-3.5 bg-sage-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-charcoal hover:bg-beige-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-beige-200 px-4 pt-3 pb-6 space-y-3 animate-fade-in-down shadow-soft-xl">
          <nav className="flex flex-col space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-sage-50 text-sage-700 font-semibold' : 'text-charcoal hover:bg-beige-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-sage-50 text-sage-700 font-semibold' : 'text-charcoal hover:bg-beige-50'
                }`
              }
            >
              Explore Properties
            </NavLink>
            <button
              onClick={() => {
                handleNavCategory('for-sale');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-charcoal hover:bg-beige-50 text-left"
            >
              Buy
            </button>
            <button
              onClick={() => {
                handleNavCategory('for-rent');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-charcoal hover:bg-beige-50 text-left"
            >
              Rent
            </button>
            <NavLink
              to="/saved"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-sage-50 text-sage-700 font-semibold' : 'text-charcoal hover:bg-beige-50'
                }`
              }
            >
              <span>Saved Properties</span>
              {favorites.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-sage-500 text-white">
                  {favorites.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-sage-50 text-sage-700 font-semibold' : 'text-charcoal hover:bg-beige-50'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          <div className="pt-3 border-t border-beige-100">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-beige-50 rounded-xl">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-sage-300"
                  />
                  <div>
                    <p className="text-sm font-bold text-charcoal">{user.name}</p>
                    <p className="text-xs text-charcoalMuted">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-rose-600 bg-rose-50 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="w-full py-2.5 text-center text-sm font-semibold rounded-xl border border-beige-300 text-charcoal"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-sage-500 text-white shadow-soft"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

