import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

export default function Login() {
  const { login, showToast } = useProperties();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!password.trim() || password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      login(email, password, rememberMe);
      setIsLoading(false);
      navigate('/explore');
    }, 400);
  };

  const handleQuickDemo = () => {
    login('alex.mercer@estateease.com', 'demo123', true);
    navigate('/explore');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-beige-200 shadow-soft-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-sage-500 text-white flex items-center justify-center shadow-soft">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.5L2 10.5V21a1 1 0 0 0 1 1h6v-6h6v6h6a1 1 0 0 0 1-1V10.5L12 2.5z" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-charcoal">
              Estate<span className="text-sage-600">Ease</span>
            </span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Welcome Back
          </h1>
          <p className="text-xs text-charcoalMuted">
            Sign in to access your saved homes and tour appointments.
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="p-3 bg-sage-50 border border-sage-200/80 rounded-2xl flex items-center justify-between text-xs text-sage-800">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-sage-600 shrink-0" />
            <span>Frontend Mock Auth Demo</span>
          </div>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="px-2.5 py-1 rounded-lg bg-sage-500 hover:bg-sage-600 text-white font-bold text-[11px] shadow-xs transition-colors"
          >
            Quick Demo Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-600" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-beige-50/70 border border-beige-200 text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal">
                Password
              </label>
              <button
                type="button"
                onClick={() => showToast('In demo mode, any password of 6+ characters works!', 'info')}
                className="text-[11px] text-sage-700 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-600" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-beige-50/70 border border-beige-200 text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoalMuted hover:text-charcoal"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-sage-600 focus:ring-sage-400 border-beige-300"
              />
              <span className="text-xs text-charcoal font-medium">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-sage-500 hover:bg-sage-600 text-white font-bold text-sm shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer switch to Register */}
        <div className="text-center pt-2 border-t border-beige-100 text-xs text-charcoalMuted">
          Don't have an EstateEase account?{' '}
          <Link to="/register" className="text-sage-700 font-bold hover:underline">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
}

