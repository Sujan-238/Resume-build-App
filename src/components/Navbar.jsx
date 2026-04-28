import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Code, LogOut, Loader2 } from 'lucide-react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            ResumeForge
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:flex flex-row items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
            <Code className="w-4 h-4" />
            <span>Developer API</span>
          </a>
          
          <Link 
            to="/build" 
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg shadow-md hover:-translate-y-0.5 transition-all"
          >
            Go to Builder
          </Link>

          <div className="h-6 w-px bg-gray-200 mx-1"></div>

          {isAuthLoading ? (
             <div className="w-8 h-8 flex items-center justify-center">
               <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
             </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border-2 border-indigo-100 shadow-sm"
              />
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg shadow-sm hover:bg-gray-50 transition-all"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Sign In
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}
