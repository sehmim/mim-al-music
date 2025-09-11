import React from 'react';
import { Button } from './button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
  className?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  disabled,
  isLoading,
  loadingText,
  children,
  className = '',
}) => {
  return (
    <Button 
      className={className}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
