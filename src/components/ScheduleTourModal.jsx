import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

export default function ScheduleTourModal({ property, isOpen, onClose }) {
  const { scheduleVisit, user } = useProperties();

  const [tourType, setTourType] = useState('in-person'); // 'in-person' | 'video'
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen || !property) return null;

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!selectedDate) newErrors.date = 'Please pick a preferred date';
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    scheduleVisit({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyAddress: property.address,
      tourType,
      date: selectedDate,
      time: selectedTime,
      name,
      email,
      phone,
      note
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-soft-xl border border-beige-200 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-charcoalMuted hover:text-charcoal hover:bg-beige-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center mx-auto shadow-soft">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              Tour Scheduled!
            </h3>
            <p className="text-sm text-charcoalMuted max-w-xs mx-auto">
              Your <span className="font-semibold text-charcoal">{tourType === 'in-person' ? 'In-Person Tour' : 'Live Video Tour'}</span> for <span className="font-semibold text-charcoal">{property.title}</span> has been confirmed for <span className="font-semibold text-charcoal">{selectedDate}</span> at <span className="font-semibold text-charcoal">{selectedTime}</span>.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-full bg-sage-500 hover:bg-sage-600 text-white text-sm font-bold shadow-soft transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sage-600">
                Private Viewing
              </span>
              <h3 className="font-serif text-2xl font-bold text-charcoal">
                Schedule a Visit
              </h3>
              <p className="text-xs text-charcoalMuted line-clamp-1 mt-0.5">
                {property.title} • {property.address}
              </p>
            </div>

            {/* In-Person vs Video Tour switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-beige-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setTourType('in-person')}
                className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                  tourType === 'in-person'
                    ? 'bg-white text-sage-700 shadow-sm'
                    : 'text-charcoalMuted hover:text-charcoal'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>In-Person Tour</span>
              </button>
              <button
                type="button"
                onClick={() => setTourType('video')}
                className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                  tourType === 'video'
                    ? 'bg-white text-sage-700 shadow-sm'
                    : 'text-charcoalMuted hover:text-charcoal'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Live Video Tour</span>
              </button>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                Select Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-600" />
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    if (errors.date) setErrors({ ...errors, date: null });
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-beige-50/70 border border-beige-200 text-xs font-medium text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
              {errors.date && <p className="text-rose-500 text-[11px] mt-1">{errors.date}</p>}
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1.5">
                Preferred Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                        isSelected
                          ? 'bg-sage-500 text-white shadow-soft'
                          : 'bg-beige-50 text-charcoal hover:bg-beige-100 border border-beige-200/50'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-3 pt-1">
              <div>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
                {errors.name && <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                  {errors.email && <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400"
                  />
                  {errors.phone && <p className="text-rose-500 text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <textarea
                  rows="2"
                  placeholder="Any specific questions for the agent? (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-beige-50/70 border border-beige-200 text-xs text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-sage-500 hover:bg-sage-600 text-white font-bold text-sm shadow-soft hover:shadow-soft-lg transition-all"
            >
              Confirm Tour Appointment
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

