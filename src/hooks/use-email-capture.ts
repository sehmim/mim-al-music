import { useState } from 'react';
import { sendEmail, storeEmailLocally, EmailData } from '@/lib/emailjs';

interface EmailCaptureState {
  email: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

interface EmailCaptureActions {
  setEmail: (email: string) => void;
  submitEmail: (type: 'tour' | 'newsletter') => Promise<void>;
  handleKeyPress: (e: React.KeyboardEvent, type: 'tour' | 'newsletter') => void;
  reset: () => void;
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

  const submitEmail = async (type: 'tour' | 'newsletter'): Promise<void> => {
    // Clear previous errors
    setError(null);
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const emailData: EmailData = {
        email: email.trim(),
        type,
        timestamp: new Date().toISOString(),
      };

      // Try to send email via EmailJS first
      try {
        await sendEmail(emailData);
        console.log(`Email sent successfully for ${type}:`, email);
      } catch (emailError) {
        console.warn('EmailJS failed, storing locally:', emailError);
        // Fallback to localStorage if EmailJS fails
        storeEmailLocally(emailData);
      }
      
      setIsSuccess(true);
      
      // Reset form after 5 seconds to give user time to see success message
      setTimeout(() => {
        reset();
      }, 5000);
      
    } catch (err) {
      console.error('Email capture failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'tour' | 'newsletter') => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      submitEmail(type);
    }
  };

  const reset = () => {
    setEmail('');
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  };

  return {
    email,
    isLoading,
    isSuccess,
    error,
    setEmail,
    submitEmail,
    handleKeyPress,
    reset,
  };
};
