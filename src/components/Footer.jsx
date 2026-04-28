import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            ResumeForge
          </span>
          <p className="text-gray-500 text-sm mt-1 text-center md:text-left">
            Empowering students to build world-class resumes in minutes.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 text-sm font-medium text-gray-500 max-w-lg">
          <Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link>
          <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
          <Link to="/refund" className="hover:text-indigo-600 transition-colors">Refund & Cancellation</Link>
        </div>
        
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} ResumeForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
