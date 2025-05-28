import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, LogOut, UserCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  
  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Mail className="h-8 w-8 mr-2" />
            <span className="text-xl font-semibold">Corporate Email Portal</span>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <div className="flex items-center text-blue-200">
                    <UserCircle className="h-5 w-5 mr-1" />
                    <span>Admin</span>
                  </div>
                )}
                <button
                  onClick={logout}
                  className="flex items-center text-blue-200 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;