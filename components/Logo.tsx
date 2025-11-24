import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Stylized S icon representing the building/logo provided */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 80C20 80 10 50 40 40C70 30 80 10 50 10" stroke="#D97706" strokeWidth="8" strokeLinecap="round"/>
          <path d="M20 80H80" stroke="#92400E" strokeWidth="8" strokeLinecap="round"/>
          <rect x="55" y="20" width="10" height="30" fill="#fbbf24" opacity="0.5"/>
          <rect x="70" y="30" width="10" height="20" fill="#fbbf24" opacity="0.3"/>
          <circle cx="50" cy="40" r="5" fill="#D97706"/>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-serif text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-800">
          SHREE
        </span>
        <span className="text-[0.6rem] tracking-[0.2em] font-sans font-bold text-amber-900 uppercase">
          Real Estate
        </span>
      </div>
    </div>
  );
};