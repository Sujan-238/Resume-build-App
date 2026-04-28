import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactUs() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-16 px-6 w-full">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <p className="mb-4">If you have any questions, encounter payment issues, or need support, we are here to help!</p>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="mb-3"><strong>Email:</strong> sujansujan97977@gmail.com</p>
            <p className="mb-3"><strong>Phone:</strong> +91-7975372880</p>
            <p className="mb-0"><strong>Business Address:</strong> 4th Floor, Tech Park, Bangalore, Karnataka, India - 560001</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
