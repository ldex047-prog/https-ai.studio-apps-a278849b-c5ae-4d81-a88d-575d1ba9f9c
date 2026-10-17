import React from 'react';
import { Check, Heart, ShoppingBag } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'cart' | 'wishlist' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div className="fixed bottom-6 end-6 z-50 flex items-center gap-3 bg-[#49363a] text-white px-4 py-3 rounded-lg shadow-xl border border-[#eedcda]/30 animate-fade-in text-xs sm:text-sm">
      <div className="w-6 h-6 rounded-full bg-[#b87982] flex items-center justify-center text-white shrink-0">
        {type === 'cart' ? (
          <ShoppingBag className="w-3.5 h-3.5" />
        ) : type === 'wishlist' ? (
          <Heart className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Check className="w-3.5 h-3.5" />
        )}
      </div>
      <span className="font-medium">{message}</span>
    </div>
  );
};
