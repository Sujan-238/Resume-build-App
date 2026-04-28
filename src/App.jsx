import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Builder from './pages/Builder'
import Preview from './pages/Preview'
import PublicResume from './pages/PublicResume'

import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import RefundPolicy from './pages/RefundPolicy'
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
    </div>
  )
}

export default App
