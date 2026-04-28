import { useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

// Lazy load components for performance
const Home = lazy(() => import('./pages/Home'))
const Builder = lazy(() => import('./pages/Builder'))
const Preview = lazy(() => import('./pages/Preview'))
const PublicResume = lazy(() => import('./pages/PublicResume'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'))

import SupportWidget from './components/SupportWidget'

// Premium Loading Fallback
const PageLoader = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      <Loader2 className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
    <p className="mt-4 text-sm font-black text-gray-400 uppercase tracking-widest animate-pulse">Initializing Interface...</p>
  </div>
);

function App() {
  const [resumeData, setResumeData] = useState({
    fullName: '',
    photo: '',
    email: '',
    phone: '',
    summary: '',
    skills: [],
    education: [],
    projects: [],
    experience: []
  });

  const [templateId, setTemplateId] = useState('photo_dark_classic');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/build" 
            element={<Builder resumeData={resumeData} setResumeData={setResumeData} />} 
          />
          <Route 
            path="/preview" 
            element={<Preview 
              resumeData={resumeData} 
              templateId={templateId} 
              setTemplateId={setTemplateId} 
            />} 
          />
          <Route path="/resume/:id" element={<PublicResume />} />
          
          {/* Compliance and Legal Routes */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<RefundPolicy />} />
        </Routes>
      </Suspense>
      
      <SupportWidget />
    </div>
  )
}

export default App
