import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RefundPolicy() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-16 px-6 w-full text-gray-700">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Cancellation & Refund Policy</h1>
        <p className="mb-6">We completely believe in the quality of our premium templates and ensure they are flawlessly formatted for our users.</p>
        <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-900">Refunds</h2>
        <p className="mb-4">If you are completely dissatisfied with your premium download and it does not meet the specified visuals, we offer a 7-day money-back guarantee. Please email us at sujansujan97977@gmail.com within 7 days of your payment with your exact Order ID, and we will process the refund to your original payment method. The credit will reflect in your account within 5-7 business days.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Cancellations</h2>
        <p className="mb-4">Since our products are one-time digital exports rather than recurring subscriptions, conventional 'cancellations' are processed as simple refunds under the above 7-day policy window for the given transaction.</p>
      </main>
      <Footer />
    </div>
  );
}
