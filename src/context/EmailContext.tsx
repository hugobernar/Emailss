import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { EmailAccount } from '../types';
import {
  addEmailToFirebase,
  getAllEmailsFromFirebase,
  updateEmailInFirebase,
  deleteEmailFromFirebase,
} from '../services/emailService'; // ajuste se estiver em outra pasta

interface EmailContextType {
  emails: EmailAccount[];
  addEmail: (email: Omit<EmailAccount, 'id'>) => Promise<void>;
  updateEmail: (id: string, updatedEmail: Omit<EmailAccount, 'id'>) => Promise<void>;
  deleteEmail: (id: string) => Promise<void>;
  searchEmails: (query: string) => EmailAccount[];
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<EmailAccount[]>([]);

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const data = await getAllEmailsFromFirebase();
        setEmails(data);
      } catch (error) {
        console.error('Erro ao carregar emails do Firebase:', error);
      }
    };
    loadEmails();
  }, []);

  const addEmail = async (email: Omit<EmailAccount, 'id'>) => {
    try {
      const newEmail = await addEmailToFirebase(email);
      setEmails((prev) => [...prev, newEmail]);
    } catch (error) {
      console.error('Erro ao adicionar email:', error);
    }
  };

  const updateEmail = async (id: string, updatedEmail: Omit<EmailAccount, 'id'>) => {
    try {
      await updateEmailInFirebase(id, updatedEmail);
      setEmails((prev) =>
        prev.map((email) => (email.id === id ? { id, ...updatedEmail } : email))
      );
    } catch (error) {
      console.error('Erro ao atualizar email:', error);
    }
  };

  const deleteEmail = async (id: string) => {
    try {
      await deleteEmailFromFirebase(id);
      setEmails((prev) => prev.filter((email) => email.id !== id));
    } catch (error) {
      console.error('Erro ao deletar email:', error);
    }
  };

  const searchEmails = (query: string): EmailAccount[] => {
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
    <EmailContext.Provider value={{ emails, addEmail, updateEmail, deleteEmail, searchEmails }}>
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
