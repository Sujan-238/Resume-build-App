import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-16 px-6 w-full text-gray-700">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms & Conditions</h1>
        <p className="mb-4">Welcome to ResumeForge. By accessing this website, we assume you accept these terms and conditions. Do not continue to use ResumeForge if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">License</h2>
        <p className="mb-4">Unless otherwise stated, we own the intellectual property rights for all premium layout material on ResumeForge. You may access this from ResumeForge for your own personal use subjected to restrictions set in these terms.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">User Content</h2>
        <p className="mb-4">You warrant and represent that you have all necessary licenses and consents to use the personal information you enter into the builder.</p>
      </main>
      <Footer />
    </div>
  );
}
