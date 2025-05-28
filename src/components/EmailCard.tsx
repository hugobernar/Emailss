import React from 'react';
import { Mail, Building } from 'lucide-react';
import { EmailAccount } from '../types';

interface EmailCardProps {
  email: EmailAccount;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const EmailCard: React.FC<EmailCardProps> = ({ 
  email, 
  isAdmin = false,
  onEdit,
  onDelete
}) => {
  const handleEmailClick = () => {
    if (!isAdmin) {
      window.location.href = `mailto:${email.email}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{email.name}</h3>
          <div className="flex items-center text-sm text-blue-800 bg-blue-100 px-2 py-1 rounded-full">
            <Building className="h-4 w-4 mr-1" />
            {email.department}
          </div>
        </div>
        
        <p className="mt-2 text-gray-600">{email.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleEmailClick}
            className={`flex items-center text-blue-600 hover:text-blue-800 ${isAdmin ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <Mail className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{email.email}</span>
          </button>
          
          {isAdmin && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit && onEdit(email.id)}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(email.id)}
                className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailCard;