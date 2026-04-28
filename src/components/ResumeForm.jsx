import React, { useState } from 'react';
import { Plus, Trash2, X, AlertCircle, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { generateSummary, improveDescription, suggestSkills } from '../services/ai';

export default function ResumeForm({ resumeData, setResumeData }) {
  const [skillInput, setSkillInput] = useState('');
  const [targetJobRole, setTargetJobRole] = useState('');
  
  // AI Loading States
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isSkillLoading, setIsSkillLoading] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState({}); // Tracking loading states for specific array items

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
        setResumeData(prev => ({ ...prev, photo: compressedBase64 }));
      };
    };
    reader.readAsDataURL(file);
  };

  // --- AI Actions ---
  const handleAIGenerateSummary = async () => {
    if (!resumeData.fullName && resumeData.skills.length === 0) return alert('Please enter your name or some skills first!');
    
    setIsSummaryLoading(true);
    const result = await generateSummary(resumeData.fullName, resumeData.skills);
    setResumeData(prev => ({ ...prev, summary: result }));
    setIsSummaryLoading(false);
  };

  const handleAISuggestSkills = async () => {
    if (!targetJobRole) return alert('Please enter a target job role first!');
    
    setIsSkillLoading(true);
    const suggestions = await suggestSkills(targetJobRole);
    setResumeData(prev => {
      // Merge unique skills
      const newSkills = [...new Set([...prev.skills, ...suggestions])];
      return { ...prev, skills: newSkills };
    });
    setTargetJobRole('');
    setIsSkillLoading(false);
  };

  const handleAIImproveItem = async (section, index, currentText) => {
    setLoadingTasks(prev => ({ ...prev, [`${section}-${index}`]: true }));
    const improved = await improveDescription(currentText);
    updateArrayItem(section, index, 'description', improved);
    setLoadingTasks(prev => ({ ...prev, [`${section}-${index}`]: false }));
  };
  // -----------------

  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() !== '') {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (indexToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove)
    }));
  };

  const addArrayItem = (section, defaultItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], defaultItem]
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const SectionCard = ({ title, children, optional }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 transition-shadow hover:shadow-md">
      <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          {title} 
          {optional && <span className="text-xs font-medium px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">Optional</span>}
        </h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      
      {/* 1. Basic Info & Setup */}
      <SectionCard title="Personal Details">
        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-100">
           <div className="relative group shrink-0">
             <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shadow-inner">
               {resumeData.photo ? (
                 <img src={resumeData.photo} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <ImageIcon className="w-8 h-8 text-gray-400" />
               )}
             </div>
             <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
               Upload Photo
               <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
             </label>
           </div>
           <div>
             <h3 className="text-sm font-bold text-gray-900 mb-1">Make Your Resume Stand Out ✨</h3>
             <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
               Adding a professional photo massively increases callback rates for modern job applications. (Supported by Pro Templates).
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <input 
              type="text" name="fullName"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
              value={resumeData.fullName || ''} onChange={handleChange} placeholder="e.g. Alex Johnson"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <input 
              type="email" name="email"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
              value={resumeData.email || ''} onChange={handleChange} placeholder="alex@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
            <input 
              type="text" name="phone"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
              value={resumeData.phone || ''} onChange={handleChange} placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-semibold text-gray-700">Professional Summary</label>
            <button 
              onClick={handleAIGenerateSummary}
              disabled={isSummaryLoading}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              {isSummaryLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              {isSummaryLoading ? 'Generating...' : 'AI Generate'}
            </button>
          </div>
          <textarea 
            name="summary" rows="4"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm text-sm"
            value={resumeData.summary || ''} onChange={handleChange} 
            placeholder="Write a brief professional summary..."
          ></textarea>
        </div>
      </SectionCard>

      {/* 2. Skills & AI Suggestion */}
      <SectionCard title="Core Skills">
        <div className="mb-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
          <label className="block text-sm font-semibold text-indigo-900 mb-2">⚡ AI Skill Suggestion by Role</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 px-4 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm placeholder-indigo-300"
              value={targetJobRole} onChange={(e) => setTargetJobRole(e.target.value)}
              placeholder="e.g. Frontend Developer"
            />
            <button 
              onClick={handleAISuggestSkills} disabled={isSkillLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold flex items-center gap-2"
            >
              {isSkillLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Auto-Suggest
            </button>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Add manually</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-300 outline-none transition-all shadow-sm"
              value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill(e)} placeholder="e.g. React.js"
            />
            <button 
              onClick={addSkill}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow-lg hover:-translate-y-0.5 transition-all font-semibold"
            >
              Add
            </button>
          </div>
        </div>
        
        {resumeData.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg shadow-sm group">
                <span className="text-sm font-semibold text-indigo-900">{skill}</span>
                <button 
                  onClick={() => removeSkill(index)}
                  className="text-indigo-400 hover:text-red-500 focus:outline-none transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-400 italic"><AlertCircle className="w-4 h-4" /> No skills added yet.</div>
        )}
      </SectionCard>

      {/* 3. Education */}
      <SectionCard title="Education History">
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="p-5 bg-white border border-gray-200 rounded-xl relative group shadow-sm hover:shadow-md transition-shadow">
              <button onClick={() => removeArrayItem('education', index)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 bg-white rounded-full p-1"><Trash2 className="w-4 h-4" /></button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Degree</label>
                  <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium" value={edu.degree} onChange={(e) => updateArrayItem('education', index, 'degree', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Institution</label>
                  <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium" value={edu.institution} onChange={(e) => updateArrayItem('education', index, 'institution', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Year</label>
                  <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium" value={edu.year} onChange={(e) => updateArrayItem('education', index, 'year', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('education', { degree: '', institution: '', year: '' })} className="w-full flex justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-all"><Plus className="w-5 h-5" /> Add Education</button>
        </div>
      </SectionCard>

      {/* 4. Projects */}
      <SectionCard title="Key Projects">
        <div className="space-y-4">
          {resumeData.projects.map((proj, index) => (
            <div key={index} className="p-5 bg-white border border-gray-200 rounded-xl relative shadow-sm hover:shadow-md transition-shadow">
              <button onClick={() => removeArrayItem('projects', index)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 bg-white rounded-full p-1"><Trash2 className="w-4 h-4" /></button>
              <div className="grid grid-cols-1 gap-4 pr-8">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Project Name</label>
                  <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium text-sm" value={proj.name} onChange={(e) => updateArrayItem('projects', index, 'name', e.target.value)} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase">Description</label>
                    <button 
                      onClick={() => handleAIImproveItem('projects', index, proj.description)}
                      disabled={loadingTasks[`projects-${index}`]}
                      className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded"
                    >
                      {loadingTasks[`projects-${index}`] ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3"/>} Improve
                    </button>
                  </div>
                  <textarea rows="3" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm leading-relaxed" value={proj.description} onChange={(e) => updateArrayItem('projects', index, 'description', e.target.value)}></textarea>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('projects', { name: '', description: '' })} className="w-full flex justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-all"><Plus className="w-5 h-5" /> Add Project</button>
        </div>
      </SectionCard>

      {/* 5. Experience */}
      <SectionCard title="Experience History" optional>
        <div className="space-y-4">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="p-5 bg-white border border-gray-200 rounded-xl relative shadow-sm hover:shadow-md transition-shadow">
              <button onClick={() => removeArrayItem('experience', index)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 bg-white rounded-full p-1"><Trash2 className="w-4 h-4" /></button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Job Title</label>
                  <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium text-sm" value={exp.title} onChange={(e) => updateArrayItem('experience', index, 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company</label>
                  <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium text-sm" value={exp.company} onChange={(e) => updateArrayItem('experience', index, 'company', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duration</label>
                  <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium text-sm" value={exp.duration} onChange={(e) => updateArrayItem('experience', index, 'duration', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase">Responsibilities</label>
                    <button 
                      onClick={() => handleAIImproveItem('experience', index, exp.description)}
                      disabled={loadingTasks[`experience-${index}`]}
                      className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded"
                    >
                      {loadingTasks[`experience-${index}`] ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3"/>} Improve
                    </button>
                  </div>
                  <textarea rows="4" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none resize-y text-sm leading-relaxed" value={exp.description} onChange={(e) => updateArrayItem('experience', index, 'description', e.target.value)}></textarea>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('experience', { title: '', company: '', duration: '', description: '' })} className="w-full flex justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-all"><Plus className="w-5 h-5" /> Add Experience</button>
        </div>
      </SectionCard>

    </div>
  );
}
