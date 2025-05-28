import { EmailAccount, User } from '../types';

export const initialEmails: EmailAccount[] = [
  {
    id: '1',
    name: 'Customer Support',
    email: 'support@yourcompany.com',
    department: 'Support',
    description: 'Contact for general inquiries and customer assistance.'
  },
  {
    id: '2',
    name: 'Sales Department',
    email: 'sales@yourcompany.com',
    department: 'Sales',
    description: 'For pricing inquiries and new business opportunities.'
  },
  {
    id: '3',
    name: 'Technical Team',
    email: 'tech@yourcompany.com',
    department: 'IT',
    description: 'Technical support and troubleshooting assistance.'
  },
  {
    id: '4',
    name: 'Human Resources',
    email: 'hr@yourcompany.com',
    department: 'HR',
    description: 'For employment and recruitment inquiries.'
  }
];

export const users: User[] = [
  {
    username: 'admin',
    password: 'admin123', // In a real app, use hashed passwords!
    isAdmin: true
  }
];