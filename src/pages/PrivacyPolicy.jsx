import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-16 px-6 w-full text-gray-700">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
        <p className="mb-4">Your privacy is important to us. This privacy statement explains the personal data we process, how we process it, and for what purposes.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Information we collect</h2>
        <p className="mb-4">We only collect the data you voluntarily provide to generate your resume, such as your name, email, phone number, and professional history.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How we use it</h2>
        <p className="mb-4">We use this data solely to render your resume document on the interface. We do not sell or share your data with advertisers or third parties. All exports are generated locally where possible.</p>
      </main>
      <Footer />
    </div>
  );
}
