import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-beige-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Rating Stars & Quote Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Quote className="w-6 h-6 text-sage-300 stroke-[1.5]" />
        </div>

        {/* Comment */}
        <p className="text-sm sm:text-base text-charcoal/90 leading-relaxed font-normal mb-6 italic">
          "{testimonial.comment}"
        </p>
      </div>

      {/* Author info */}
      <div className="pt-4 border-t border-beige-100 flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-sage-200"
        />
        <div>
          <h4 className="font-serif text-sm font-bold text-charcoal">
            {testimonial.name}
          </h4>
          <p className="text-xs text-charcoalMuted">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

