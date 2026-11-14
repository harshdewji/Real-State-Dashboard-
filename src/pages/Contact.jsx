import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import PropertyMap from '../components/PropertyMap';
import { useProperties } from '../context/PropertyContext';

export default function Contact() {
  const { showToast } = useProperties();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // Office headquarters coordinates (New York Madison Ave)
  const officeLocation = {
    title: 'EstateEase Headquarters',
    address: '740 Madison Avenue, New York, NY 10065',
    coordinates: { lat: 40.7667, lng: -73.9686 }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email address is required';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Please provide a message of at least 10 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast('Please resolve the errors in the form.', 'error');
      return;
    }

    setErrors({});
    setSubmitted(true);
    showToast('Your message has been received! Our concierge team will reply within 24 hours.', 'success');
  };

  const faqs = [
    {
      q: 'How does EstateEase verify properties before listing?',
      a: 'Every property featured on EstateEase goes through our rigorous 3-step verification protocol: physical inspection by local architecture specialists, legal title examination via public county registers, and current pricing appraisal.'
    },
    {
      q: 'Are the virtual tours live with an agent?',
      a: 'Yes. When you schedule a Live Video Tour, one of our licensed property advisors conducts a private 1-on-1 walkthrough via high-definition video, allowing you to examine finishes, views, and ask questions in real time.'
    },
    {
      q: 'Can I list my own luxury property on EstateEase?',
      a: 'Absolutely. We partner with individual owners, luxury developers, and licensed boutique brokerages. Reach out using the inquiry form above with the "Listing a Property" option.'
    },
    {
      q: 'Are there any hidden platform fees for buyers or renters?',
      a: 'EstateEase is 100% free for buyers and renters to discover, search, and connect with property advisors. Any transaction fees are strictly traditional escrow/closing costs outlined transparently upfront.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sage-600">
          Client Services
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-charcoalMuted leading-relaxed">
          Whether you are looking to purchase, lease, or request an architectural consultation, our team is at your disposal.
        </p>
      </div>

      {/* Main Contact Grid (Form + Contact Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (7 cols): Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-beige-200 shadow-soft space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-charcoalMuted mt-1">
              Fill out the form below and an EstateEase advisor will reach out promptly.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center mx-auto shadow-soft">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal">
                Message Sent Successfully
              </h3>
              <p className="text-sm text-charcoalMuted max-w-md mx-auto">
                Thank you, <span className="font-bold text-charcoal">{formData.name}</span>. We have dispatched your inquiry to our senior real estate advisory desk.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', inquiryType: 'general', message: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-beige-100 hover:bg-beige-200 text-charcoal text-xs font-bold transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Katherine Pierce"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-beige-50/70 border border-beige-200 text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                  {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-beige-50/70 border border-beige-200 text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                  {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-beige-50/70 border border-beige-200 text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-beige-50/70 border border-beige-200 text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400 appearance-none cursor-pointer"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="buying">Purchasing a Residence</option>
                    <option value="renting">Leasing a Property</option>
                    <option value="selling">Listing / Selling a Property</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Your Message *
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us about the property, location, or requirements you have in mind..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-beige-50/70 border border-beige-200 text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
                />
                {errors.message && <p className="text-rose-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-sage-500 hover:bg-sage-600 text-white font-bold text-sm shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Send Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

        {/* Right Column (5 cols): Contact Information & Office Map */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-beige-200 shadow-soft space-y-6">
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              Contact Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">Headquarters</h4>
                  <p className="text-sm text-charcoalMuted mt-0.5">740 Madison Avenue, New York, NY 10065</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">Phone Direct</h4>
                  <p className="text-sm text-charcoalMuted mt-0.5">+1 (800) 555-EASE / +1 (212) 555-0100</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">Email Concierge</h4>
                  <p className="text-sm text-charcoalMuted mt-0.5">concierge@estateease.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">Advisory Hours</h4>
                  <p className="text-sm text-charcoalMuted mt-0.5">Mon – Sat: 9:00 AM – 7:00 PM EST</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-beige-100">
              <span className="text-xs font-bold text-sage-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Licensed Real Estate Brokerage Network
              </span>
            </div>
          </div>

          {/* Interactive Office Map */}
          <div className="bg-white rounded-3xl p-6 border border-beige-200 shadow-soft space-y-3">
            <h4 className="font-serif text-lg font-bold text-charcoal">
              Visit Our Madison Avenue Studio
            </h4>
            <PropertyMap singleProperty={officeLocation} height="240px" zoom={15} />
          </div>

        </div>

      </div>

      {/* Frequently Asked Questions Accordion */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-beige-200 shadow-soft space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Everything You Need to Know
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-beige-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? -1 : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-charcoal hover:bg-beige-50/50"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-sage-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoalMuted leading-relaxed border-t border-beige-100 bg-beige-50/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

