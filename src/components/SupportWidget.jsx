import React, { useState } from 'react';
import { MessageCircle, X, HelpCircle, ArrowRight } from 'lucide-react';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // User's provided WhatsApp Number automatically formatted with Country Code
  const phoneNumber = '917975372880';
  const message = encodeURIComponent('Hi! I am using ResumeForge and I need some help.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Expanded Popup */}
      {isOpen && (
        <div className="mb-4 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-up transform transition-all">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-5 text-white relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Live Support
            </h3>
            <p className="text-emerald-50 text-sm mt-1">We usually reply within a few minutes.</p>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Have a question about a premium layout or facing a payment issue? Chat directly with our support team on WhatsApp.
            </p>
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95"
            >
              Start WhatsApp Chat
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 ${isOpen ? 'bg-gray-800 text-white' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/40 relative'}`}
      >
        {!isOpen && (
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
           </span>
        )}
        {isOpen ? <X className="w-6 h-6" /> : <HelpCircle className="w-7 h-7" />}
      </button>
    </div>
  );
}
