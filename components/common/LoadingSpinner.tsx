
import React from 'react';

interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Analyzing..." }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-white/50 rounded-lg">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <p className="mt-4 text-slate-600 font-semibold">{message}</p>
  </div>
);
