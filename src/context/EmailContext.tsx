import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { EmailAccount } from '../types';
import { initialEmails } from '../data/initialData';

interface EmailContextType {
  emails: EmailAccount[];
  addEmail: (email: Omit<EmailAccount, 'id'>) => void;
  updateEmail: (id: string, updatedEmail: Omit<EmailAccount, 'id'>) => void;
  deleteEmail: (id: string) => void;
  searchEmails: (query: string) => EmailAccount[];
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<EmailAccount[]>([]);
  
  useEffect(() => {
    // Load emails from localStorage or use initial data
    const storedEmails = localStorage.getItem('emails');
    if (storedEmails) {
      setEmails(JSON.parse(storedEmails));
    } else {
      setEmails(initialEmails);
    }
  }, []);

  // Save to localStorage whenever emails change
  useEffect(() => {
    if (emails.length > 0) {
      localStorage.setItem('emails', JSON.stringify(emails));
    }
  }, [emails]);

  const addEmail = (email: Omit<EmailAccount, 'id'>) => {
    const newEmail = {
      ...email,
      id: Date.now().toString(),
    };
    setEmails((prevEmails) => [...prevEmails, newEmail]);
  };

  const updateEmail = (id: string, updatedEmail: Omit<EmailAccount, 'id'>) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...updatedEmail, id } : email
      )
    );
  };

  const deleteEmail = (id: string) => {
    setEmails((prevEmails) => prevEmails.filter((email) => email.id !== id));
  };

  const searchEmails = (query: string) => {
    if (!query.trim()) return emails;
    
    const lowerQuery = query.toLowerCase();
    return emails.filter(
      (email) =>
        email.name.toLowerCase().includes(lowerQuery) ||
        email.email.toLowerCase().includes(lowerQuery) ||
        email.department.toLowerCase().includes(lowerQuery) ||
        email.description.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <EmailContext.Provider
      value={{ emails, addEmail, updateEmail, deleteEmail, searchEmails }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export const useEmails = (): EmailContextType => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmails must be used within an EmailProvider');
  }
  return context;
};