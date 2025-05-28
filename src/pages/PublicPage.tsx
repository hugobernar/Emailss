import React, { useState, useEffect } from 'react';
import { useEmails } from '../context/EmailContext';
import EmailCard from '../components/EmailCard';
import SearchBar from '../components/SearchBar';
import { Mail } from 'lucide-react';
import { EmailAccount } from '../types';

const PublicPage: React.FC = () => {
  const { emails, searchEmails } = useEmails();
  const [filteredEmails, setFilteredEmails] = useState<EmailAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFilteredEmails(emails);
  }, [emails]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredEmails(searchEmails(query));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-16 px-4 text-center">
        <Mail className="h-16 w-16 text-white mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Corporate Email Directory</h1>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Find and connect with our team through our official corporate email accounts.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {filteredEmails.length === 0 ? (
          <div className="text-center py-12">
            {searchQuery ? (
              <p className="text-gray-500">No email accounts match your search.</p>
            ) : (
              <p className="text-gray-500">No email accounts available.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmails.map((email) => (
              <EmailCard key={email.id} email={email} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicPage;