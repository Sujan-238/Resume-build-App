import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Layout, Download, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50 relative overflow-hidden">
      <Navbar />
      
      {/* Background Gradients */}
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent z-0 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-100/40 blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-20 -left-20 w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-3xl -z-10 pointer-events-none"></div>

      <main className="flex-1 flex flex-col items-center justify-center pt-20 pb-32 z-10 px-4 sm:px-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-700 mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          ResumeForge 2.0 is Live
        </div>
        
        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-center tracking-tight mb-6 max-w-4xl leading-[1.1]">
          The Ultimate Resume <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient">
            Builder for Students
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl text-center leading-relaxed">
          Create ATS-friendly, professional resumes in minutes. No sign-ups. Built specifically for students to land internships and top-tier roles.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-16 w-full sm:w-auto">
          <Link 
            to="/build" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-1 transition-all duration-300"
          >
            Start Building Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
          </Link>
          <a 
            href="#features" 
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            View Templates
          </a>
        </div>

        {/* Mini Social Proof */}
        <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Free Export</div>
          <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> ATS Optimized</div>
          <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> No Logins</div>
        </div>
      </main>

      {/* Feature Cards Section */}
      <section id="features" className="bg-white py-24 border-t border-gray-100 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why use ResumeForge?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to craft the perfect application, without the complex enterprise bloat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-6 border border-gray-100">
                <Layout className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Layouts</h3>
              <p className="text-gray-600 leading-relaxed">Choose from modern, minimalistic, or corporate designs trusted by top recruiters.</p>
            </div>
            
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-purple-600 mb-6 border border-gray-100">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seamless Builder</h3>
              <p className="text-gray-600 leading-relaxed">Type your details into our fluid, component-driven form and watch your resume assemble instantly.</p>
            </div>
            
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 mb-6 border border-gray-100">
                <Download className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant PDF</h3>
              <p className="text-gray-600 leading-relaxed">Download exact replicas of your live preview as a PDF natively on your device. No backend required.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
