import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

export default function Toast() {
  const { toast } = useProperties();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in-up">
      <div
        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-soft-xl border backdrop-blur-md transition-all ${
          isSuccess
            ? 'bg-white/95 border-sage-300 text-charcoal'
            : isInfo
            ? 'bg-white/95 border-softblue-300 text-charcoal'
            : 'bg-white/95 border-rose-300 text-charcoal'
        }`}
      >
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            isSuccess
              ? 'bg-sage-100 text-sage-600'
              : isInfo
              ? 'bg-softblue-100 text-softblue-500'
              : 'bg-rose-100 text-rose-500'
          }`}
        >
          {isSuccess && <CheckCircle2 className="w-5 h-5" />}
          {isInfo && <Info className="w-5 h-5" />}
          {isError && <AlertCircle className="w-5 h-5" />}
        </div>
        <div className="text-sm font-medium pr-2 text-charcoal">
          {toast.message}
        </div>
      </div>
    </div>
  );
}

