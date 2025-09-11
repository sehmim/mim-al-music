import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Trash2, Mail } from 'lucide-react';

interface CapturedEmail {
  email: string;
  type: 'tour' | 'newsletter';
  timestamp: string;
}

const EmailAdmin = () => {
  const [emails, setEmails] = useState<CapturedEmail[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = () => {
    try {
      const storedEmails = JSON.parse(localStorage.getItem('captured_emails') || '[]');
      setEmails(storedEmails);
    } catch (error) {
      console.error('Failed to load emails:', error);
    }
  };

  const clearEmails = () => {
    if (confirm('Are you sure you want to clear all captured emails?')) {
      localStorage.removeItem('captured_emails');
      setEmails([]);
    }
  };

  const exportEmails = () => {
    const csvContent = [
      'Email,Type,Timestamp',
      ...emails.map(email => `${email.email},${email.type},${email.timestamp}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `captured-emails-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Only show in development or if ?admin=true in URL
  if (import.meta.env.PROD && !window.location.search.includes('admin=true')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        size="sm"
      >
        <Mail className="w-4 h-4 mr-2" />
        Emails ({emails.length})
      </Button>

      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-card border rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Captured Emails</h3>
            <div className="flex gap-2">
              <Button onClick={exportEmails} size="sm" variant="outline">
                <Download className="w-4 h-4" />
              </Button>
              <Button onClick={clearEmails} size="sm" variant="outline">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {emails.length === 0 ? (
            <p className="text-muted-foreground text-sm">No emails captured yet</p>
          ) : (
            <div className="space-y-2">
              {emails.map((email, index) => (
                <div key={index} className="text-sm border-b pb-2">
                  <div className="font-medium">{email.email}</div>
                  <div className="text-muted-foreground">
                    {email.type} • {new Date(email.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            onClick={() => setIsVisible(false)}
            className="w-full mt-4"
            variant="outline"
            size="sm"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmailAdmin;
