import { useState } from 'react';

interface EmailCaptureState {
  email: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

interface EmailCaptureActions {
  setEmail: (email: string) => void;
  submitEmail: (source: string) => Promise<void>;
  reset: () => void;
  handleKeyPress: (e: React.KeyboardEvent, source: string) => void;
}

export const useEmailCapture = (): EmailCaptureState & EmailCaptureActions => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const storeEmailLocally = (email: string, source: string) => {
    try {
      const existingEmails = JSON.parse(localStorage.getItem('captured_emails') || '[]');
      const newEmail = {
        email,
        source,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      };
      
      // Check if email already exists
      const exists = existingEmails.some((item: any) => item.email === email);
      if (!exists) {
        existingEmails.push(newEmail);
        localStorage.setItem('captured_emails', JSON.stringify(existingEmails));
      }
    } catch (error) {
      console.error('Error storing email locally:', error);
    }
  };

  const submitEmail = async (source: string) => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // For now, just store locally since we removed EmailJS
      storeEmailLocally(email, source);
      
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setEmail('');
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent, source: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitEmail(source);
    }
  };

  return {
    email,
    isLoading,
    isSuccess,
    error,
    setEmail,
    submitEmail,
    reset,
    handleKeyPress
  };
};
