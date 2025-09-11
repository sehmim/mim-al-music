import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string | null;
  isLoading: boolean;
  ariaLabel: string;
  className?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  onKeyPress,
  placeholder,
  error,
  isLoading,
  ariaLabel,
  className = '',
}) => {
  return (
    <div className="flex-1">
      <input 
        type="email" 
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
        } ${className}`}
        disabled={isLoading}
        aria-label={ariaLabel}
        autoComplete="email"
      />
      {error && (
        <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
