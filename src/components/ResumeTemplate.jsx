import React from 'react';

// --- Template 1: Minimal ATS-Friendly (Free) ---
const MinimalTemplate = ({ data }) => {
  const hasContactInfo = data.email || data.phone;
  return (
    <div className="p-12 text-gray-900 font-sans h-full bg-white flex flex-col gap-8">
      <header className="border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-light tracking-wide mb-2">{data.fullName || 'Your Name'}</h1>
        {hasContactInfo && (
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-light">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-6 flex-1">
        {data.summary && (
          <section>
            <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-2">Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4">
                  <div className="w-1/4 text-xs tracking-wider text-gray-500 pt-1">{exp.duration}</div>
                  <div className="w-3/4">
                    <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                    <div className="text-sm text-gray-600 mb-2">{exp.company}</div>
                    {exp.description && (
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects?.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((proj, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4">
                  <div className="w-1/4"></div>
                  <div className="w-3/4">
                    <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                    {proj.description && <p className="text-sm text-gray-600 leading-relaxed mt-1">{proj.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education?.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4">
                  <div className="w-1/4 text-xs tracking-wider text-gray-500 pt-1">{edu.year}</div>
                  <div className="w-3/4">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <div className="text-sm text-gray-600">{edu.institution}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">Skills</h2>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="text-sm text-gray-700">{skill}{idx < data.skills.length - 1 ? ',' : ''}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// --- Template 2: Modern Sidebar ✨ ---
const ModernTemplate = ({ data }) => {
  const hasContactInfo = data.email || data.phone;
  return (
    <div className="text-gray-900 text-[11pt] font-sans h-full flex flex-col bg-white">
      <header className="bg-emerald-800 text-white p-8">
        <h1 className="text-4xl font-extrabold uppercase tracking-widest mb-2">{data.fullName || 'Your Name'}</h1>
        {hasContactInfo && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-emerald-100 text-sm mt-3 font-medium">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
          </div>
        )}
      </header>

      <div className="flex flex-1">
        <aside className="w-1/3 p-8 bg-emerald-50/50 border-r border-gray-100 flex flex-col gap-8">
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-b-2 border-emerald-800 pb-1 inline-block">Skills</h2>
              <div className="flex flex-col gap-2">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="text-gray-700 font-medium text-sm">{skill}</div>
                ))}
              </div>
            </section>
          )}

          {data.education?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-b-2 border-emerald-800 pb-1 inline-block">Education</h2>
              <div className="space-y-5">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug">{edu.degree}</h3>
                    <div className="text-emerald-700 font-medium text-sm mt-1">{edu.institution}</div>
                    <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{edu.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        <main className="w-2/3 p-8 flex flex-col gap-8">
          {data.summary && (
            <section className="bg-emerald-50/30 p-4 rounded-lg border-l-4 border-emerald-700">
               <p className="text-gray-700 text-sm leading-relaxed italic">{data.summary}</p>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-5 border-b-2 border-gray-200 pb-2">Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900 text-base">{exp.title}</h3>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{exp.duration}</div>
                    </div>
                    <div className="text-emerald-700 font-bold text-sm mb-2">{exp.company}</div>
                    {exp.description && (
                      <ul className="list-disc leading-relaxed text-gray-700 text-sm ml-4 pl-1 space-y-1">
                        {exp.description.split('\n').map((line, i) => {
                          const cleanLine = line.replace(/^-/, '').trim();
                          return cleanLine ? <li key={i}>{cleanLine}</li> : null;
                        })}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-5 border-b-2 border-gray-200 pb-2">Projects</h2>
              <div className="space-y-6">
                {data.projects.map((proj, idx) => (
                  <div key={idx} className="flex flex-col">
                    <h3 className="font-bold text-gray-900 text-base mb-1">{proj.name}</h3>
                    {proj.description && <p className="text-gray-700 text-sm leading-relaxed mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

// --- Template 3: Creative Colorful ✨ ---
const CreativeTemplate = ({ data }) => {
  const hasContactInfo = data.email || data.phone;
  return (
    <div className="text-gray-900 font-sans h-full bg-[#fdfbf7] flex flex-col">
      <header className="p-8 pb-4 mb-4">
        <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-2">
          {data.fullName || 'Your Name'}
        </h1>
        {hasContactInfo && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 font-medium text-sm mt-3">
            {data.email && <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full">{data.email}</span>}
            {data.phone && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">{data.phone}</span>}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-6 px-8 flex-1">
        {data.summary && (
          <p className="text-indigo-900 font-medium text-lg leading-relaxed">{data.summary}</p>
        )}

        {data.experience?.length > 0 && (
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 inline-block">Experience</h2>
            <div className="space-y-5">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="flex flex-col border-l-2 border-purple-200 pl-4 py-1">
                  <h3 className="font-bold text-gray-900 text-lg">{exp.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-purple-600">{exp.company}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm font-semibold text-gray-400">{exp.duration}</span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.projects?.length > 0 && (
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 mb-4">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((proj, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-gray-900">{proj.name}</h3>
                    {proj.description && <p className="text-sm text-gray-600 leading-relaxed mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-col gap-6">
            {data.education?.length > 0 && (
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 mb-4">Education</h2>
                <div className="space-y-3">
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <div className="text-indigo-600 font-medium text-sm">{edu.institution}</div>
                      <div className="text-xs text-gray-400 font-semibold mt-1">{edu.year}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.skills?.length > 0 && (
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-cyan-100">
                <h2 className="text-xl font-black text-cyan-600 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, idx) => (
                    <span key={idx} className="bg-cyan-50 text-cyan-700 px-2 py-1 text-xs font-bold rounded-lg border border-cyan-100">{skill}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Template 4: Corporate Professional ✨ ---
const CorporateTemplate = ({ data }) => {
  const hasContactInfo = data.email || data.phone;
  return (
    <div className="p-10 text-gray-900 h-full bg-white flex flex-col gap-6" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      <header className="text-center border-b-[3px] border-gray-900 pb-4 mb-2">
        <h1 className="text-4xl font-bold uppercase mb-2 tracking-widest">{data.fullName || 'Your Name'}</h1>
        {hasContactInfo && (
          <div className="flex justify-center items-center gap-4 text-sm mt-1">
            {data.email && <span>{data.email}</span>}
            {(data.email && data.phone) && <span>|</span>}
            {data.phone && <span>{data.phone}</span>}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-6">
        {data.summary && (
          <section>
             <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Professional Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{exp.title}</h3>
                    <div className="text-sm font-semibold">{exp.duration}</div>
                  </div>
                  <div className="italic text-sm mb-1">{exp.company}</div>
                  {exp.description && (
                    <ul className="list-disc leading-relaxed text-sm ml-5 mt-1 space-y-1">
                      {exp.description.split('\n').map((line, i) => {
                        const cleanLine = line.replace(/^-/, '').trim();
                        return cleanLine ? <li key={i}>{cleanLine}</li> : null;
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Projects</h2>
            <div className="space-y-3">
              {data.projects.map((proj, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-base">{proj.name}</h3>
                  {proj.description && <p className="text-sm leading-relaxed mt-1">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Education</h2>
            <div className="space-y-2">
              {data.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold">{edu.degree}</span>
                    <span>, {edu.institution}</span>
                  </div>
                  <div className="text-sm">{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Skills</h2>
            <p className="text-sm">
              <span className="font-bold">Core Competencies: </span>
              {data.skills.join(', ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

// --- Template 5: Simple Fresher (Free) ---
const FresherTemplate = ({ data }) => {
  const hasContactInfo = data.email || data.phone;
  return (
    <div className="p-10 text-gray-800 font-sans h-full bg-white flex flex-col gap-8 rounded-xl ring-2 ring-gray-100 ring-offset-4">
      <header className="flex flex-col items-center justify-center text-center">
        <div className="bg-gray-800 text-white px-8 py-3 rounded-full mb-4 shadow-sm inline-block">
          <h1 className="text-3xl font-bold tracking-tight">{data.fullName || 'Your Name'}</h1>
        </div>
        {hasContactInfo && (
          <div className="flex justify-center items-center gap-3 text-sm font-medium text-gray-500">
            {data.email && <span className="bg-gray-100 px-3 py-1 rounded-md">{data.email}</span>}
            {data.phone && <span className="bg-gray-100 px-3 py-1 rounded-md">{data.phone}</span>}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-8">
        
        {data.summary && (
          <section className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-pink-500 rounded-full"></div>
            <div className="pl-4">
               <p className="text-gray-700 italic leading-relaxed text-sm">{data.summary}</p>
            </div>
          </section>
        )}
      
        {data.education?.length > 0 && (
          <section className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 rounded-full"></div>
            <div className="pl-4">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Academic Background</h2>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 className="font-bold text-lg text-gray-900">{edu.degree}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-medium text-blue-600">{edu.institution}</span>
                      <span className="text-sm font-bold text-gray-400">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {data.skills?.length > 0 && (
          <section className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500 rounded-full"></div>
            <div className="pl-4">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Technical Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="bg-white border border-gray-200 text-gray-700 shadow-sm px-3 py-1.5 text-sm font-bold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {data.projects?.length > 0 && (
          <section className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-purple-500 rounded-full"></div>
            <div className="pl-4">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Academic & Personal Projects</h2>
              <div className="space-y-4">
                {data.projects.map((proj, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{proj.name}</h3>
                    {proj.description && <p className="text-sm text-gray-600 leading-relaxed mt-2 bg-gray-50 p-3 rounded-lg">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-amber-500 rounded-full"></div>
            <div className="pl-4">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Internships & Work</h2>
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900 text-base">{exp.title}</h3>
                      <div className="text-sm text-gray-500 font-bold">{exp.duration}</div>
                    </div>
                    <div className="font-medium text-amber-600 text-sm mb-2">{exp.company}</div>
                    {exp.description && (
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// ==========================================
// ====== THE NEW ₹89 PHOTO TEMPLATES ======
// ==========================================

// --- Template 6: Dark Classic Sidebar (Exact match of User Screenshot) 📸 ---
const PhotoDarkClassicTemplate = ({ data }) => {
  return (
    <div className="flex h-full w-full bg-white font-sans text-gray-900" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Left Column (Dark) */}
      <aside className="w-[35%] bg-zinc-900 text-white flex flex-col h-full pt-12 pb-8 px-8 border-r-8 border-white/10">
        
        {/* Photo Container */}
        <div className="flex justify-center mb-10 w-full relative">
          <div className="w-48 h-48 rounded-full border-[6px] border-white overflow-hidden shadow-2xl bg-zinc-800 flex items-center justify-center">
            {data.photo ? (
              <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-zinc-500 font-bold uppercase text-2xl tracking-widest text-center px-4">No Photo</span>
            )}
          </div>
        </div>

        {/* Contact Block */}
        <div className="mb-10 w-full">
          <h2 className="text-base font-bold tracking-[0.2em] uppercase border-b border-zinc-700 pb-2 mb-5 text-center">Contact</h2>
          <div className="flex flex-col gap-4 text-xs font-semibold tracking-wider text-zinc-300">
            {data.phone && (
               <div className="flex items-center gap-4">
                 <div className="w-5 h-5 rounded bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0">✆</div>
                 <span className="truncate">{data.phone}</span>
               </div>
            )}
            {data.email && (
               <div className="flex items-center gap-4">
                 <div className="w-5 h-5 rounded bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0">✉</div>
                 <span className="truncate">{data.email}</span>
               </div>
            )}
            <div className="flex items-center gap-4 border-t border-zinc-800 pt-4 mt-2 justify-center italic text-zinc-500">
              Personal Portfolio
            </div>
          </div>
        </div>

        {/* Skills Block */}
        {data.skills?.length > 0 && (
          <div className="mb-10 w-full">
            <h2 className="text-base font-bold tracking-[0.2em] uppercase border-b border-zinc-700 pb-2 mb-5 text-center">Skills</h2>
            <div className="flex flex-col gap-5">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <span className="text-xs uppercase font-bold tracking-wider text-white">{skill}</span>
                  <div className="flex gap-1 text-zinc-500 text-sm">
                    {/* Simulated 5 star rating layout */}
                    <span className="text-white">★</span><span className="text-white">★</span><span className="text-white">★</span><span className="text-white">★</span><span>★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Column (Light) */}
      <main className="w-[65%] bg-white p-12 pr-16 flex flex-col gap-8 h-full">
        
        {/* Name Header */}
        <header className="border-b-[1.5px] border-zinc-800 pb-5 mb-2 mt-4 text-center mx-auto w-full">
          <h1 className="text-5xl font-black uppercase tracking-widest text-[#222] mb-3">
            {data.fullName || 'YOUR NAME'}
          </h1>
          <h2 className="text-lg font-medium tracking-[0.3em] uppercase text-zinc-600">
            Professional Title
          </h2>
        </header>

        {/* About Me */}
        {data.summary && (
          <section className="w-full">
            <h3 className="text-xl font-bold tracking-[0.1em] text-zinc-800 uppercase mb-3 text-center md:text-left border-b border-gray-200 pb-2">About Me</h3>
            <p className="text-[13px] text-zinc-600 leading-relaxed text-justify">{data.summary}</p>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="w-full mt-2">
            <h3 className="text-xl font-bold tracking-[0.1em] text-zinc-800 uppercase mb-4 text-center md:text-left border-b border-gray-200 pb-2">Education</h3>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-[20%] text-xs font-bold text-zinc-500 pt-1 tracking-wider">{edu.year}</div>
                  <div className="w-[80%] border-l-2 border-zinc-200 pl-4">
                    <h4 className="font-bold text-zinc-800 text-sm uppercase tracking-wide">{edu.degree}</h4>
                    <span className="text-xs italic text-zinc-500 mt-1 block leading-relaxed">{edu.institution}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {data.experience?.length > 0 && (
          <section className="w-full mt-2">
            <h3 className="text-xl font-bold tracking-[0.1em] text-zinc-800 uppercase mb-4 text-center md:text-left border-b border-gray-200 pb-2">Work Experience</h3>
            <div className="space-y-5">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-[20%] text-xs font-bold text-zinc-500 pt-1 tracking-wider">{exp.duration}</div>
                  <div className="w-[80%] border-l-2 border-zinc-200 pl-4">
                    <h4 className="font-bold text-zinc-800 text-sm uppercase tracking-wide">{exp.title}</h4>
                    <span className="text-xs italic text-zinc-500 mt-0.5 mb-2 block">{exp.company}</span>
                    <p className="text-[13px] leading-relaxed text-zinc-600 block">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Specialities (Mapped to Projects) */}
        {data.projects?.length > 0 && (
          <section className="w-full mt-2">
            <h3 className="text-xl font-bold tracking-[0.1em] text-zinc-800 uppercase mb-4 text-center md:text-left border-b border-gray-200 pb-2">My Specialities</h3>
            <div className="flex items-center justify-between gap-4">
              {data.projects.slice(0, 4).map((proj, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 w-1/4">
                  <div className="w-16 h-16 rounded-full border-[4px] border-zinc-800 flex items-center justify-center p-1 bg-white relative">
                    <span className="font-black text-sm absolute">{(100 - (idx * 25))}%</span>
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="28" cy="28" r="26" fill="transparent" stroke="#e5e7eb" strokeWidth="4"/>
                      <circle cx="28" cy="28" r="26" fill="transparent" stroke="#27272a" strokeWidth="4" strokeDasharray="163" strokeDashoffset={`${163 * (idx * 0.25)}`}/>
                    </svg>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-zinc-600 text-center tracking-wider">{proj.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

// --- Template 7: Photo Modern Split 📸 ---
const PhotoModernSplitTemplate = ({ data }) => {
  return (
    <div className="flex h-full w-full bg-[#f4f7f6] font-sans">
      <div className="w-1/2 bg-[#2d4059] text-white p-12 flex flex-col justify-center relative shadow-[10px_0_20px_rgba(0,0,0,0.1)] z-10 rounded-br-[100px]">
        <div className="w-44 h-44 rounded-full border-[8px] border-white/20 mb-8 overflow-hidden shadow-2xl relative bg-white mx-auto">
           {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
        </div>
        <h1 className="text-5xl font-black mb-2 text-center text-white">{data.fullName}</h1>
        <div className="h-1 w-16 bg-[#ea5455] mx-auto mt-4 mb-8"></div>
        <p className="text-center text-sm font-medium leading-relaxed italic text-white/80">{data.summary}</p>
        <div className="mt-8 flex flex-col gap-3 items-center text-sm font-semibold tracking-wider text-white/90">
           {data.phone && <span>📞 {data.phone}</span>}
           {data.email && <span>✉ {data.email}</span>}
        </div>
      </div>
      <div className="w-1/2 p-12 overflow-hidden flex flex-col justify-center bg-white shadow-inner">
         <h2 className="text-2xl font-black text-[#2d4059] uppercase tracking-widest mb-6 border-b-2 border-[#ea5455] inline-block pb-1">Experience</h2>
         <div className="space-y-6">
           {data.experience?.map((exp, i) => (
             <div key={i} className="pl-4 border-l-2 border-[#ea5455]/50">
               <h3 className="font-bold text-lg text-[#2d4059]">{exp.title}</h3>
               <span className="text-xs text-gray-500 font-bold uppercase">{exp.company} | {exp.duration}</span>
               <p className="text-sm mt-2 text-gray-700 leading-relaxed max-w-[90%]">{exp.description}</p>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

// --- Template 8: Photo Executive 📸 ---
const PhotoExecutiveTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white flex flex-col font-serif">
      <header className="bg-slate-900 text-white p-12 flex items-center justify-between shadow-lg">
         <div>
           <h1 className="text-6xl font-light tracking-tight">{data.fullName}</h1>
           <p className="text-xl font-light text-slate-300 mt-2">Executive Profile</p>
         </div>
         <div className="w-32 h-32 rounded bg-slate-800 shadow-xl border-2 border-slate-700 overflow-hidden transform rotate-3 relative">
            <div className="absolute inset-0 bg-slate-600/20 mix-blend-overlay z-10 pointer-events-none"></div>
            {data.photo && <img src={data.photo} className="w-full h-full object-cover grayscale contrast-125 filter" />}
         </div>
      </header>
      <div className="p-12 flex-1 flex flex-col gap-8">
         <p className="text-slate-800 font-serif leading-relaxed text-justify text-lg border-l-4 border-amber-600 pl-6 italic">"{data.summary}"</p>
         <div className="grid grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold border-b border-slate-200 pb-2 mb-4 text-slate-900">Career History</h2>
              {data.experience?.map((exp, i) => (
                 <div key={i} className="mb-6">
                   <h3 className="text-lg font-bold text-slate-800">{exp.company}</h3>
                   <span className="text-slate-500 block mb-2">{exp.title} • {exp.duration}</span>
                 </div>
              ))}
            </div>
            <div>
              <h2 className="text-2xl font-semibold border-b border-slate-200 pb-2 mb-4 text-slate-900">Core Expertise</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {data.skills?.map((skill, i) => <li key={i} className="font-medium text-base tracking-wide uppercase">{skill}</li>)}
              </ul>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Template 9: Photo Minimal Sleek 📸 ---
const PhotoMinimalTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white p-16 font-sans flex flex-col">
       <div className="flex items-center gap-10 mb-12 border-b-2 border-black pb-10">
          <div className="w-48 h-48 bg-gray-100 overflow-hidden shadow-sm filter grayscale hover:grayscale-0 transition-all duration-700 hover:shadow-xl">
             {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
          </div>
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-black">{data.fullName}</h1>
            <div className="h-2 w-24 bg-black mt-4 mb-4"></div>
            <div className="flex gap-4 text-xs font-bold tracking-widest text-gray-500 uppercase">
              <span>{data.email}</span> • <span>{data.phone}</span>
            </div>
          </div>
       </div>
       <div className="w-full grid grid-cols-3 gap-8">
          <div className="col-span-1 border-r border-gray-200 pr-8 text-right flex flex-col justify-between">
             <div>
               <h3 className="font-extrabold text-xs tracking-widest uppercase mb-4 text-black border-b border-gray-200 pb-2 inline-block w-full">Education</h3>
               {data.education?.map((e, i)=><div key={i} className="mb-4 text-sm font-medium text-gray-700">{e.degree}<br/><span className="text-xs text-gray-400">{e.year}</span></div>)}
             </div>
             <div>
                <h3 className="font-extrabold text-xs tracking-widest uppercase mb-4 text-black border-b border-gray-200 pb-2 mt-8 inline-block w-full">Skills</h3>
                {data.skills?.map((s,i)=><div key={i} className="text-sm font-medium text-gray-700 mb-1">{s}</div>)}
             </div>
          </div>
          <div className="col-span-2">
             <h3 className="font-extrabold text-xl mb-4 text-black tracking-tight">{data.summary}</h3>
             <div className="mt-8">
                {data.experience?.map((exp, i) => (
                  <div key={i} className="mb-6 relative pb-6 border-b border-gray-100 last:border-0">
                    <h4 className="font-black text-lg text-black">{exp.title} <span className="font-light text-gray-400 text-sm ml-2">@ {exp.company}</span></h4>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed font-medium">{exp.description}</p>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Template 10: Creative Wave Card 📸 ---
const PhotoCreativeWaveTemplate = ({ data }) => {
  return (
    <div className="h-[297mm] w-full bg-[#f9fafc] flex flex-col overflow-hidden relative font-sans">
       <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-b-[100px] shadow-lg"></div>
       <div className="z-10 w-full text-center mt-[120px]">
          <div className="w-56 h-56 rounded-[40px] rotate-3 bg-white mx-auto shadow-2xl p-2 relative">
             <div className="w-full h-full rounded-[30px] overflow-hidden -rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white overflow-hidden shadow-inner">
                {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
             </div>
          </div>
          <h1 className="text-5xl font-black text-white mt-[-30px] drop-shadow-xl">{data.fullName}</h1>
       </div>
       
       <div className="mt-20 px-16 flex justify-between gap-10">
          <div className="w-1/2 bg-white rounded-3xl p-8 shadow-xl border border-indigo-50">
             <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 font-black text-2xl mb-4">Core Strengths</h2>
             <div className="flex flex-wrap gap-2">
               {data.skills?.map((s,i)=><div key={i} className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1.5 rounded-xl border border-indigo-100 text-sm shadow-sm">{s}</div>)}
             </div>
          </div>
          
          <div className="w-1/2 bg-white rounded-3xl p-8 shadow-xl border border-purple-50">
             <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-black text-2xl mb-4">Top Experience</h2>
             {data.experience?.slice(0,2).map((exp, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-bold text-gray-800">{exp.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">at {exp.company}</p>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};


// ==========================================
// ====== DYNAMIC TEMPLATE SWITCHER ========
// ==========================================
export default function ResumeTemplate({ data, templateId }) {
  // Safe default initialization logic if data isn't fully hydrated yet
  const safeData = {
      ...data,
      skills: data.skills || [],
      education: data.education || [],
      projects: data.projects || [],
      experience: data.experience || []
  };

  // Free Tier
  if (templateId === 'minimal') return <MinimalTemplate data={safeData} />;
  if (templateId === 'fresher') return <FresherTemplate data={safeData} />;
  
  // Premium ₹49 Tier
  if (templateId === 'modern') return <ModernTemplate data={safeData} />;
  if (templateId === 'corporate') return <CorporateTemplate data={safeData} />;
  if (templateId === 'creative') return <CreativeTemplate data={safeData} />;

  // PRO ₹89 Tier (Photo Suite)
  if (templateId === 'photo_dark_classic') return <PhotoDarkClassicTemplate data={safeData} />;
  if (templateId === 'photo_modern_split') return <PhotoModernSplitTemplate data={safeData} />;
  if (templateId === 'photo_executive') return <PhotoExecutiveTemplate data={safeData} />;
  if (templateId === 'photo_minimal') return <PhotoMinimalTemplate data={safeData} />;
  if (templateId === 'photo_creative_wave') return <PhotoCreativeWaveTemplate data={safeData} />;
  
  return <PhotoDarkClassicTemplate data={safeData} />;
}
