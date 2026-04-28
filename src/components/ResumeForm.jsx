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
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-100">
           <div className="relative group shrink-0 w-full md:w-auto">
             <div className="w-full md:w-32 h-48 md:h-32 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden flex flex-col items-center justify-center shadow-inner group-hover:border-indigo-300 transition-colors">
               {resumeData.photo ? (
                 <img src={resumeData.photo} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                       <ImageIcon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Add Photo</span>
                 </div>
               )}
             </div>
             <label className="absolute inset-x-0 bottom-0 md:inset-0 flex items-center justify-center bg-indigo-600/90 md:bg-black/50 text-white text-xs font-bold md:rounded-full py-3 md:py-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer transition-opacity rounded-b-2xl md:rounded-2xl">
               {resumeData.photo ? 'Change Photo' : 'Upload Photo'}
               <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
             </label>
           </div>
           <div className="text-center md:text-left">
             <h3 className="text-base font-black text-gray-900 mb-2 uppercase tracking-tight">Profile Photo <span className="text-indigo-600">(Highly Recommended)</span></h3>
             <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-medium">
               Applications with professional photos get <span className="text-indigo-600 font-bold">2.5x more responses</span>. Supported by all our Premium & Pro layouts.
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Full Name</label>
            <input 
              type="text" name="fullName"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-bold"
              value={resumeData.fullName || ''} onChange={handleChange} placeholder="e.g. Alex Johnson"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Email Address</label>
            <input 
              type="email" name="email"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-bold"
              value={resumeData.email || ''} onChange={handleChange} placeholder="alex@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Phone Number</label>
            <input 
              type="text" name="phone"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-bold"
              value={resumeData.phone || ''} onChange={handleChange} placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
            <label className="block text-xs font-black text-gray-400 uppercase ml-1">Professional Summary</label>
            <button 
              onClick={handleAIGenerateSummary}
              disabled={isSummaryLoading}
              className="flex items-center gap-1.5 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition-all shadow-lg active:scale-95 w-full sm:w-auto"
            >
              {isSummaryLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
              {isSummaryLoading ? 'Generating...' : 'AI Generate Summary'}
            </button>
          </div>
          <textarea 
            name="summary" rows="5"
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-medium leading-relaxed"
            value={resumeData.summary || ''} onChange={handleChange} 
            placeholder="Write a brief professional summary..."
          ></textarea>
        </div>
      </SectionCard>

      {/* 2. Skills & AI Suggestion */}
       <SectionCard title="Core Skills">
        <div className="mb-6 p-6 bg-indigo-900 rounded-2xl shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 transform group-hover:scale-150 transition-transform">
             <Sparkles className="w-24 h-24 text-white" />
          </div>
          <label className="block text-xs font-black text-indigo-200 uppercase mb-3 tracking-widest relative z-10">⚡ Smart Skill Suggestion</label>
          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <input 
              type="text" 
              className="flex-1 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-4 focus:ring-white/20 outline-none text-sm text-white placeholder-indigo-300 font-bold"
              value={targetJobRole} onChange={(e) => setTargetJobRole(e.target.value)}
              placeholder="e.g. Frontend Developer"
            />
            <button 
              onClick={handleAISuggestSkills} disabled={isSkillLoading}
              className="px-6 py-4 bg-white text-indigo-900 rounded-xl hover:bg-indigo-50 transition-all text-sm font-black flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              {isSkillLoading ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Sparkles className="w-4 h-4 text-amber-500" />}
              Auto-Suggest
            </button>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Manual Skill Entry</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm font-bold"
              value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill(e)} placeholder="e.g. React.js"
            />
            <button 
              onClick={addSkill}
              className="px-8 py-4 bg-gray-900 text-white rounded-2xl shadow-xl hover:bg-black transition-all font-black text-sm uppercase tracking-widest active:scale-95 flex items-center justify-center"
            >
              Add Skill
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
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="p-6 bg-white border border-gray-200 rounded-2xl relative group shadow-sm hover:shadow-md transition-all">
              <button onClick={() => removeArrayItem('education', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 rounded-full p-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
              <div className="grid grid-cols-1 gap-5 pr-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Degree / Course</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" value={edu.degree} onChange={(e) => updateArrayItem('education', index, 'degree', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Institution</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" value={edu.institution} onChange={(e) => updateArrayItem('education', index, 'institution', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Year of Passing</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" value={edu.year} onChange={(e) => updateArrayItem('education', index, 'year', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('education', { degree: '', institution: '', year: '' })} className="w-full flex justify-center items-center gap-3 px-6 py-4 border-2 border-dashed border-indigo-200 rounded-2xl text-indigo-600 font-black text-sm uppercase tracking-widest hover:bg-indigo-50 hover:border-indigo-400 transition-all active:scale-[0.99]"><Plus className="w-5 h-5" /> Add Education</button>
        </div>
      </SectionCard>

      {/* 4. Projects */}
      <SectionCard title="Key Projects">
        <div className="space-y-6">
          {resumeData.projects.map((proj, index) => (
            <div key={index} className="p-6 bg-white border border-gray-200 rounded-2xl relative shadow-sm hover:shadow-md transition-all">
              <button onClick={() => removeArrayItem('projects', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 rounded-full p-2"><Trash2 className="w-4 h-4" /></button>
              <div className="grid grid-cols-1 gap-5 pr-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Project Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-extrabold text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" value={proj.name} onChange={(e) => updateArrayItem('projects', index, 'name', e.target.value)} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase ml-1">Description</label>
                    <button 
                      onClick={() => handleAIImproveItem('projects', index, proj.description)}
                      disabled={loadingTasks[`projects-${index}`]}
                      className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-100"
                    >
                      {loadingTasks[`projects-${index}`] ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3 text-indigo-400"/>} AI Improve
                    </button>
                  </div>
                  <textarea rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm leading-relaxed font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" value={proj.description} onChange={(e) => updateArrayItem('projects', index, 'description', e.target.value)}></textarea>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('projects', { name: '', description: '' })} className="w-full flex justify-center items-center gap-3 px-6 py-4 border-2 border-dashed border-indigo-200 rounded-2xl text-indigo-600 font-black text-sm uppercase tracking-widest hover:bg-indigo-50 hover:border-indigo-400 transition-all active:scale-[0.99]"><Plus className="w-5 h-5" /> Add Project</button>
        </div>
      </SectionCard>

      {/* 5. Experience */}
      <SectionCard title="Experience History" optional>
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="p-6 bg-white border border-gray-200 rounded-2xl relative shadow-sm hover:shadow-md transition-all">
              <button onClick={() => removeArrayItem('experience', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-50 rounded-full p-2"><Trash2 className="w-4 h-4" /></button>
              <div className="grid grid-cols-1 gap-5 pr-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Job Title</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" value={exp.title} onChange={(e) => updateArrayItem('experience', index, 'title', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Company</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" value={exp.company} onChange={(e) => updateArrayItem('experience', index, 'company', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Duration</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" value={exp.duration} onChange={(e) => updateArrayItem('experience', index, 'duration', e.target.value)} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase ml-1">Responsibilities / Achievement</label>
                    <button 
                      onClick={() => handleAIImproveItem('experience', index, exp.description)}
                      disabled={loadingTasks[`experience-${index}`]}
                      className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-100"
                    >
                      {loadingTasks[`experience-${index}`] ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3 text-indigo-400"/>} AI Improve
                    </button>
                  </div>
                  <textarea rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm leading-relaxed font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" value={exp.description} onChange={(e) => updateArrayItem('experience', index, 'description', e.target.value)}></textarea>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('experience', { title: '', company: '', duration: '', description: '' })} className="w-full flex justify-center items-center gap-3 px-6 py-4 border-2 border-dashed border-indigo-200 rounded-2xl text-indigo-600 font-black text-sm uppercase tracking-widest hover:bg-indigo-50 hover:border-indigo-400 transition-all active:scale-[0.99]"><Plus className="w-5 h-5" /> Add Experience</button>
        </div>
      </SectionCard>

    </div>
  );
}
