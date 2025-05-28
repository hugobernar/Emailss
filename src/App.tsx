import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EmailProvider } from './context/EmailContext';
import Navbar from './components/Navbar';
import PublicPage from './pages/PublicPage';
import AdminPage from './pages/AdminPage';
import LoginForm from './components/LoginForm';
import { Lock } from 'lucide-react';

const MainContent: React.FC = () => {
  const { isAuthenticated, isAdmin, showLogin, setShowLogin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {isAuthenticated && isAdmin ? (
          <AdminPage />
        ) : showLogin ? (
          <LoginForm />
        ) : (
          <PublicPage />
        )}
      </main>
      {!isAuthenticated && !showLogin && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setShowLogin(true)}
            className="p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all duration-300 group"
            title="Admin Login"
          >
            <Lock className="h-5 w-5 text-white" />
          </button>
        </div>
      )}
      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <EmailProvider>
        <MainContent />
      </EmailProvider>
    </AuthProvider>
  );
}

export default App;