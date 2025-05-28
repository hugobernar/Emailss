import React, { useState, useEffect } from 'react';
import { useEmails } from '../context/EmailContext';
import { useAuth } from '../context/AuthContext';
import EmailCard from '../components/EmailCard';
import EmailForm from '../components/EmailForm';
import SearchBar from '../components/SearchBar';
import { EmailAccount } from '../types';
import { Plus, RefreshCw } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { emails, addEmail, updateEmail, deleteEmail, searchEmails } = useEmails();
  const { isAdmin } = useAuth();
  const [filteredEmails, setFilteredEmails] = useState<EmailAccount[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmail, setEditingEmail] = useState<EmailAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    setFilteredEmails(emails);
  }, [emails, isAdmin]);

  const handleSearch = (query: string) => {
    setFilteredEmails(searchEmails(query));
  };

  const handleAddClick = () => {
    setEditingEmail(null);
    setShowForm(true);
  };

  const handleEditClick = (id: string) => {
    const emailToEdit = emails.find(email => email.id === id);
    if (emailToEdit) {
      setEditingEmail(emailToEdit);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this email account?')) {
      deleteEmail(id);
    }
  };

  const handleFormSubmit = (data: Omit<EmailAccount, 'id'>) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (editingEmail) {
        updateEmail(editingEmail.id, data);
      } else {
        addEmail(data);
      }
      setShowForm(false);
      setEditingEmail(null);
      setIsLoading(false);
    }, 500);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEmail(null);
  };

  const refreshEmails = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setFilteredEmails([...emails]);
      setIsLoading(false);
    }, 500);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Admin Dashboard
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar onSearch={handleSearch} />
            
            <div className="flex gap-2">
              <button
                onClick={refreshEmails}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md 
                          shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button
                onClick={handleAddClick}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md 
                          shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Email
              </button>
            </div>
          </div>
        </div>
        
        {filteredEmails.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">No email accounts available.</p>
            <button
              onClick={handleAddClick}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md 
                       shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Email Account
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                isAdmin={true}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>
      
      {showForm && (
        <EmailForm
          initialData={editingEmail ? {
            name: editingEmail.name,
            email: editingEmail.email,
            department: editingEmail.department,
            description: editingEmail.description
          } : undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isEditing={!!editingEmail}
        />
      )}
    </div>
  );
};

export default AdminPage;