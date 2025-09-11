import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailData {
  email: string;
  type: 'tour' | 'newsletter';
  timestamp: string;
}

export const sendEmail = async (data: EmailData): Promise<void> => {
  try {
    const templateParams = {
      to_email: 'sehmim.al@gmail.com', // Your email address
      from_email: data.email,
      message: `New ${data.type} subscription from: ${data.email}`,
      type: data.type,
      timestamp: data.timestamp,
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email. Please try again.');
  }
};

// Alternative: Store emails in localStorage for now (fallback)
export const storeEmailLocally = (data: EmailData): void => {
  try {
    const storedEmails = JSON.parse(localStorage.getItem('captured_emails') || '[]');
    storedEmails.push(data);
    localStorage.setItem('captured_emails', JSON.stringify(storedEmails));
    console.log('Email stored locally:', data);
  } catch (error) {
    console.error('Failed to store email locally:', error);
  }
};
