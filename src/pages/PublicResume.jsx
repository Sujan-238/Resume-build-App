import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LZString from 'lz-string';
import { Home } from 'lucide-react';
import ResumeTemplate from '../components/ResumeTemplate';

export default function PublicResume() {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [templateId, setTemplateId] = useState('modern');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      // The hash will look like #d=ENCODED_STRING
      const hash = window.location.hash;
      if (!hash || !hash.includes('#d=')) {
        throw new Error("No resume data found in the URL.");
      }

      const compressedData = hash.split('#d=')[1];
      const decompressedString = LZString.decompressFromEncodedURIComponent(compressedData);
      
      if (!decompressedString) {
        throw new Error("Could not decode the resume data. The link might be broken.");
      }

      const parsedData = JSON.parse(decompressedString);
      
      if (parsedData.activeTemplate) {
        setTemplateId(parsedData.activeTemplate);
      }
      
      setResumeData(parsedData);
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid or corrupt resume link.");
    }
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Resume Not Found</h1>
          <p className="text-gray-500 mb-8">{error}</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition">
            <Home className="w-5 h-5" /> Back to ResumeForge
          </Link>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium text-sm tracking-wide">DECRYPTING RESUME DATA...</p>
        </div>
      </div>
    );
  }

  // Hide the template UI wrapper completely and render just the clean PDF view
  // centering it nicely for recruiters.
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-10 px-4 pt-20 relative">
      <div className="absolute top-0 w-full h-[300px] bg-gradient-to-b from-indigo-900 to-transparent z-0"></div>
      
      {/* Small subtle branding bar */}
      <div className="fixed top-0 left-0 w-full h-12 bg-white/10 backdrop-blur-md border-b border-white/20 z-10 flex items-center justify-between px-6">
         <span className="text-white/80 font-bold text-sm">ResumeForge Link</span>
         <Link to="/" className="text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider py-1 px-3 bg-white/10 rounded">Create your own</Link>
      </div>

      <div className="shadow-2xl z-10 bg-white w-full max-w-[210mm] min-h-[297mm] overflow-hidden rounded-sm transition-transform md:hover:scale-[1.01] duration-300">
        <ResumeTemplate data={resumeData} templateId={templateId} />
      </div>

      <p className="text-center text-xs text-gray-400 mt-12 z-10">This resume was dynamically generated from a direct encoded URL link.</p>
    </div>
  );
}
