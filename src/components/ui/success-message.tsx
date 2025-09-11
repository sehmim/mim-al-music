import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  className?: string;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  message, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-center gap-2 text-green-600 mb-4 animate-in slide-in-from-top-2 duration-300 ${className}`}>
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </div>
  );
};
