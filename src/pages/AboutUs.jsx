import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-16 px-6 w-full">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <p className="mb-4">Welcome to ResumeForge. Our mission is to empower students and professionals to build world-class resumes in minutes.</p>
        <p className="mb-4">We believe that a great resume is the first step to a great career. Our platform provides beautiful templates that seamlessly pass Applicant Tracking Systems.</p>
      </main>
      <Footer />
    </div>
  );
}
