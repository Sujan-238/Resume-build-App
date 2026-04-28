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

// --- Template 11: Creative Designer Pro (Image 1) ✨ ---
const CreativeDesignerProTemplate = ({ data }) => {
  return (
    <div className="flex flex-col h-full bg-white font-sans text-gray-800">
      {/* Blue Header Strip */}
      <header className="bg-[#009ee3] text-white p-6 flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏠</span>
          <span>{data.address || "City, State"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">📞</span>
          <span>{data.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">✉</span>
          <span>{data.email}</span>
        </div>
      </header>

      <div className="px-12 py-10">
        <h1 className="text-7xl font-black mb-4 flex items-baseline gap-4">
          <span className="uppercase">{data.fullName?.split(' ')[0]}</span>
          <span className="text-5xl font-serif italic lowercase font-normal">{data.fullName?.split(' ').slice(1).join(' ') || 'and Surname'}</span>
        </h1>
        <hr className="border-gray-200 mb-8" />

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-4 flex flex-col gap-10">
            <section>
              <h2 className="text-3xl font-serif italic text-[#009ee3] mb-4">Objectives</h2>
              <p className="text-xs leading-relaxed text-gray-600">{data.summary}</p>
            </section>

            <section>
              <h2 className="text-3xl font-serif italic text-[#009ee3] mb-6">Activities</h2>
              <div className="space-y-6">
                {data.experience?.map((exp, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-400 mt-1 shrink-0 bg-white z-10"></div>
                    {i !== data.experience.length - 1 && <div className="absolute left-2 top-5 bottom-0 w-0.5 bg-gray-200 -ml-[1px]"></div>}
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#009ee3]">{exp.duration?.split(' ')[0]}</span>
                      <span className="text-[10px] font-bold uppercase tracking-tight">{exp.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-serif italic text-[#009ee3] mb-6">Languages</h2>
              <div className="space-y-3">
                {['English', 'Hindi', 'Regional'].map((lang, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase">{lang}</span>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#009ee3]" style={{ width: i === 0 ? '90%' : i === 1 ? '70%' : '50%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="col-span-8 flex flex-col gap-10 border-l border-gray-100 pl-8">
            <section>
              <h2 className="text-3xl font-bold border-b-4 border-[#009ee3] inline-block mb-6">Experiences</h2>
              <div className="space-y-8">
                {data.experience?.map((exp, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <span className="text-xl font-bold text-[#009ee3] block">{exp.duration?.split(' ')[0]}</span>
                      <span className="text-[10px] font-bold uppercase text-gray-400">{exp.company}</span>
                    </div>
                    <div className="col-span-3">
                      <h4 className="font-bold text-lg mb-1">{exp.title}</h4>
                      <p className="text-[11px] text-gray-600 leading-relaxed uppercase">{exp.description?.substring(0, 150)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold border-b-4 border-[#009ee3] inline-block mb-6">Education</h2>
              <div className="flex gap-4">
                {data.education?.map((edu, i) => (
                  <div key={i} className="flex-1">
                    <span className="text-lg font-bold text-[#009ee3] block">{edu.year}</span>
                    <h4 className="font-bold text-xs uppercase mb-1">{edu.degree}</h4>
                    <p className="text-[10px] text-gray-500 uppercase leading-snug">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-serif italic text-gray-300 mb-6 text-right">Skills</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {data.skills?.map((skill, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase">{skill}</span>
                    <div className="h-2 w-full bg-gray-100 border border-gray-200">
                      <div className="h-full bg-[#009ee3]" style={{ width: `${Math.max(40, 100 - (i * 15))}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Template 12: IT Fresher Impact (Image 2) ✨ ---
const ITFresherImpactTemplate = ({ data }) => {
  return (
    <div className="p-16 h-full bg-white font-sans text-[#333]">
       <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{data.fullName}</h1>
          <p className="text-sm text-gray-500 mb-4">Aspirant Software Engineer | IT Enthusiast</p>
          <div className="flex gap-6 text-xs text-gray-400 border-t border-b border-gray-100 py-3">
             <span>{data.email}</span>
             <span>{data.phone}</span>
             <span>{data.address || "Link to Portfolio"}</span>
          </div>
       </div>

       <div className="space-y-10">
          <section>
             <h2 className="text-lg font-bold text-gray-700 uppercase tracking-widest border-b-2 border-gray-100 mb-4 pb-1">Work Experience</h2>
             <div className="space-y-6">
                {data.experience?.map((exp, i) => (
                   <div key={i}>
                      <div className="flex justify-between items-baseline">
                         <h3 className="font-bold text-gray-800">{exp.title}</h3>
                         <span className="text-xs text-gray-400 font-bold">{exp.duration}</span>
                      </div>
                      <p className="text-sm italic text-gray-500 mb-2">{exp.company}</p>
                      <ul className="list-disc ml-4 text-xs text-gray-600 space-y-1">
                         {exp.description?.split('\n').map((line, idx) => <li key={idx}>{line}</li>)}
                      </ul>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h2 className="text-lg font-bold text-gray-700 uppercase tracking-widest border-b-2 border-gray-100 mb-4 pb-1">Education</h2>
             <div className="space-y-4">
                {data.education?.map((edu, i) => (
                   <div key={i} className="flex justify-between">
                      <div>
                         <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                         <p className="text-xs text-gray-500">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-gray-400 font-bold">{edu.year}</span>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h2 className="text-lg font-bold text-gray-700 uppercase tracking-widest border-b-2 border-gray-100 mb-4 pb-1">Skills</h2>
             <div className="grid grid-cols-2 gap-y-2 gap-x-12">
                {data.skills?.map((skill, i) => (
                   <div key={i} className="flex justify-between items-center text-xs border-b border-gray-50 pb-1">
                      <span className="font-bold text-gray-700">{skill}</span>
                      <span className="text-gray-300 italic">Advanced</span>
                   </div>
                ))}
             </div>
          </section>
       </div>
    </div>
  );
};

// --- Template 13: Standard ATS Classic (Image 3) ✨ ---
const StandardATSClassicTemplate = ({ data }) => {
  return (
    <div className="p-12 h-full bg-white font-serif text-black">
       <div className="text-center mb-8">
          <h1 className="text-2xl font-bold uppercase mb-1">{data.fullName}</h1>
          <p className="text-sm tracking-wide">
             {data.address || "Street Address"} • {data.phone} • {data.email}
          </p>
       </div>

       <div className="space-y-6">
          <section className="text-sm leading-relaxed border-t border-gray-900 pt-2">
             <p className="text-center italic">{data.summary || "Give a headline statement here that should briefly highlight your key skills or accomplishments..."}</p>
          </section>

          <section>
             <h2 className="text-base font-bold uppercase border-b border-gray-300 mb-4">Education</h2>
             <div className="space-y-4">
                {data.education?.map((edu, i) => (
                   <div key={i}>
                      <div className="flex justify-between font-bold">
                         <span>{edu.institution}</span>
                         <span>{edu.year}</span>
                      </div>
                      <p className="text-sm">{edu.degree}</p>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h2 className="text-base font-bold uppercase border-b border-gray-300 mb-4">Skills & Courses</h2>
             <ul className="list-disc ml-8 text-sm space-y-1">
                {data.skills?.map((s, i) => <li key={i}>{s}</li>)}
             </ul>
          </section>

          <section>
             <h2 className="text-base font-bold uppercase border-b border-gray-300 mb-4">Experience</h2>
             <div className="space-y-6">
                {data.experience?.map((exp, i) => (
                   <div key={i}>
                      <div className="flex justify-between font-bold">
                         <span>{exp.title}</span>
                         <span>{exp.duration}</span>
                      </div>
                      <p className="text-sm italic mb-2">{exp.company}</p>
                      <ul className="list-disc ml-8 text-sm space-y-1">
                         {exp.description?.split('\n').map((l, idx) => <li key={idx}>{l}</li>)}
                      </ul>
                   </div>
                ))}
             </div>
          </section>
       </div>
    </div>
  );
};

// --- Template 14: Indian Corporate Standard (Image 4) ✨ ---
const IndianCorporateStandardTemplate = ({ data }) => {
  return (
    <div className="p-12 h-full bg-white font-sans text-gray-800 border-[10px] border-gray-50">
       <div className="border border-gray-800 p-2 text-center font-bold tracking-[0.5em] mb-8 w-1/2 mx-auto">
          RESUME
       </div>

       <div className="grid grid-cols-2 mb-10 text-sm leading-relaxed">
          <div>
             <h2 className="font-bold text-lg mb-4">{data.fullName}</h2>
             <p>{data.address || "Address line 1"}</p>
             <p>{data.phone}</p>
             <p>{data.email}</p>
          </div>
       </div>

       <div className="space-y-8">
          <section>
             <h2 className="bg-gray-200 p-1 font-bold text-sm mb-3">❖ Objective</h2>
             <p className="text-sm leading-relaxed italic">{data.summary || "To join a position of responsibility with a professionally managed progressive organization..."}</p>
          </section>

          <section>
             <h2 className="bg-gray-200 p-1 font-bold text-sm mb-3">❖ Academic Details</h2>
             <div className="space-y-2 text-sm ml-4">
                {data.education?.map((edu, i) => (
                   <div key={i} className="flex gap-4">
                      <span className="text-gray-400">•</span>
                      <span>{edu.degree} from {edu.institution} ({edu.year})</span>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h2 className="bg-gray-200 p-1 font-bold text-sm mb-3">❖ Work Experience</h2>
             <div className="space-y-4 ml-4">
                {data.experience?.map((exp, i) => (
                   <div key={i} className="grid grid-cols-4 text-sm">
                      <span className="font-bold">Organization :</span>
                      <span className="col-span-3">{exp.company}</span>
                      <span className="font-bold">Designation :</span>
                      <span className="col-span-3">{exp.title}</span>
                      <span className="font-bold">Duration :</span>
                      <span className="col-span-3">{exp.duration}</span>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h2 className="bg-gray-200 p-1 font-bold text-sm mb-3">❖ Academic Project Undertaken</h2>
             <div className="space-y-4 ml-4">
                {data.projects?.map((proj, i) => (
                   <div key={i} className="grid grid-cols-4 text-sm">
                      <span className="font-bold">Project Title :</span>
                      <span className="col-span-3">{proj.name}</span>
                      <span className="font-bold">Profile :</span>
                      <span className="col-span-3">{proj.description}</span>
                   </div>
                ))}
             </div>
          </section>
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


// --- Template 15: Intern Success Teal (Image 1) ✨ ---
const InternSuccessTealTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 p-12 relative overflow-hidden">
       {/* Geometric Accents */}
       <div className="absolute top-0 left-0 w-32 h-32 bg-[#20c997] rotate-45 -translate-x-16 -translate-y-16 opacity-10"></div>
       <div className="absolute top-10 left-10 w-48 h-48 border-4 border-[#20c997] rotate-12 opacity-20"></div>

       <div className="relative z-10 flex gap-12 h-full">
          {/* Main Content */}
          <div className="flex-1">
             <header className="mb-10 text-right pr-4 border-r-8 border-[#20c997]">
                <h1 className="text-5xl font-black text-gray-700 leading-tight uppercase">
                   {data.fullName?.split(' ')[0]}<br/>
                   <span className="text-[#20c997]">{data.fullName?.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-sm font-bold text-gray-400 mt-2 tracking-[0.3em] uppercase">Internship Candidate</p>
             </header>

             <div className="space-y-8">
                <section>
                   <h2 className="text-[#20c997] font-black uppercase text-sm mb-3 tracking-widest">Work Experience</h2>
                   <div className="space-y-6">
                      {data.experience?.map((exp, i) => (
                         <div key={i} className="relative pl-6">
                            <div className="absolute left-0 top-1.5 w-3 h-3 bg-[#20c997] rotate-45"></div>
                            <div className="flex justify-between items-baseline">
                               <h3 className="font-bold text-gray-800 uppercase text-xs">{exp.title}</h3>
                               <span className="text-[10px] font-bold text-gray-400">{exp.duration}</span>
                            </div>
                            <p className="text-[11px] text-gray-500 italic mb-1">{exp.company}</p>
                            <p className="text-[11px] leading-relaxed text-gray-600">{exp.description}</p>
                         </div>
                      ))}
                   </div>
                </section>

                <section>
                   <h2 className="text-[#20c997] font-black uppercase text-sm mb-3 tracking-widest">Education</h2>
                   <div className="space-y-4">
                      {data.education?.map((edu, i) => (
                         <div key={i} className="flex justify-between border-b border-gray-50 pb-2">
                            <div>
                               <h3 className="font-bold text-gray-800 text-xs uppercase">{edu.degree}</h3>
                               <p className="text-[10px] text-gray-500">{edu.institution}</p>
                            </div>
                            <span className="text-[10px] font-bold text-[#20c997]">{edu.year}</span>
                         </div>
                      ))}
                   </div>
                </section>
             </div>
          </div>

          {/* Sidebar */}
          <div className="w-[30%] flex flex-col gap-10">
             <div className="w-full aspect-square border-4 border-[#20c997] p-2 bg-white relative translate-x-4">
                <div className="w-full h-full bg-gray-100 overflow-hidden shadow-inner">
                   {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
                </div>
             </div>

             <section>
                <h2 className="text-[#20c997] font-black uppercase text-sm mb-4 tracking-widest">Contact</h2>
                <div className="space-y-3 text-[11px] text-gray-600">
                   <div className="flex items-center gap-3"><span className="text-[#20c997]">📍</span> {data.address || "City, Country"}</div>
                   <div className="flex items-center gap-3"><span className="text-[#20c997]">📞</span> {data.phone}</div>
                   <div className="flex items-center gap-3"><span className="text-[#20c997]">✉</span> {data.email}</div>
                </div>
             </section>

             <section>
                <h2 className="text-[#20c997] font-black uppercase text-sm mb-4 tracking-widest">Skills</h2>
                <div className="space-y-3">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-gray-600 uppercase">{s}</span>
                         <div className="h-1 w-full bg-gray-100 rounded-full">
                            <div className="h-full bg-[#20c997]" style={{ width: `${Math.max(40, 90 - (i*10))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 16: Elite Startup Navy (Image 2) ✨ ---
const EliteStartupNavyTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-[#1a1c2c] border-[16px] border-[#1a1c2c]/5 p-12">
       <header className="flex gap-8 items-center mb-12 border-b-2 border-[#1a1c2c] pb-8">
          <div className="w-32 h-32 border-4 border-[#1a1c2c] p-1 shrink-0">
             <div className="w-full h-full bg-gray-50 overflow-hidden">
                {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
             </div>
          </div>
          <div>
             <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{data.fullName}</h1>
             <p className="text-lg font-medium text-gray-500 italic">Candidate for Internship Program</p>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-12 overflow-hidden">
          {/* Left Column */}
          <div className="col-span-12 md:col-span-7 space-y-10">
             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-[#1a1c2c] mb-6 tracking-widest inline-block pr-8 bg-white z-10 relative">Profile</h2>
                <p className="text-xs leading-relaxed text-gray-600 italic border-l-4 border-[#1a1c2c]/20 pl-4">{data.summary}</p>
             </section>

             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-[#1a1c2c] mb-6 tracking-widest inline-block pr-8 bg-white z-10 relative">Education & Awards</h2>
                <div className="space-y-6">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="flex gap-4">
                         <span className="text-[10px] font-black text-gray-400 mt-1 uppercase w-20 shrink-0">{edu.year}</span>
                         <div>
                            <h3 className="font-bold text-xs uppercase">{edu.degree}</h3>
                            <p className="text-[10px] text-gray-500 font-medium italic">{edu.institution}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-[#1a1c2c] mb-6 tracking-widest inline-block pr-8 bg-white z-10 relative">Work & Experiences</h2>
                <div className="space-y-8">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="flex gap-4">
                         <span className="text-[10px] font-black text-gray-400 mt-1 uppercase w-20 shrink-0">{exp.duration}</span>
                         <div>
                            <h3 className="font-bold text-xs uppercase">{exp.title}</h3>
                            <p className="text-[10px] text-gray-500 font-medium mb-2 italic">@ {exp.company}</p>
                            <p className="text-[10px] text-gray-400 leading-relaxed font-mono">{(exp.description || i===0 ? "Developed and optimized multiple user interface components using React and Tailwind CSS." : "Assisted in backend API development and database management.")}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>

          {/* Right Column */}
          <div className="col-span-12 md:col-span-5 space-y-10">
             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-[#1a1c2c] mb-6 tracking-widest inline-block pr-8 bg-white z-10 relative">Skills</h2>
                <div className="space-y-4">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                         <span className="text-[10px] font-black uppercase tracking-tight text-gray-700">{s}</span>
                         <div className="h-3 w-full bg-gray-100 border border-gray-200">
                            <div className="h-full bg-[#1a1c2c]" style={{ width: `${Math.max(30, 100 - (i*15))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-[#1a1c2c] mb-6 tracking-widest inline-block pr-8 bg-white z-10 relative">Contact</h2>
                <div className="space-y-4 text-[11px] font-medium text-gray-600">
                   <div className="flex justify-between items-center"><span className="uppercase text-[9px] font-black text-[#1a1c2c]/40">Email</span> <span>{data.email}</span></div>
                   <div className="flex justify-between items-center"><span className="uppercase text-[9px] font-black text-[#1a1c2c]/40">Phone</span> <span>{data.phone}</span></div>
                   <div className="flex justify-center border-t border-gray-100 pt-6 mt-6 grayscale opacity-50">
                      <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="h-6" alt="GitHub" />
                   </div>
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 17: Futuristic Intern Gold (Image 3) ✨ ---
const FuturisticInternGoldTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800">
       <header className="bg-[#333] text-white p-12 flex justify-between items-center">
          <div>
             <h1 className="text-5xl font-black mb-1 italic tracking-tight">{data.fullName}</h1>
             <p className="text-xs uppercase font-bold tracking-[0.4em] text-[#ffc107]">Your Internship Gateway</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs font-bold text-gray-300">
             <div className="flex items-center gap-3"><span>📞 {data.phone}</span> <span className="text-[#ffc107]">●</span></div>
             <div className="flex items-center gap-3"><span>✉ {data.email}</span> <span className="text-[#ffc107]">●</span></div>
             <div className="flex items-center gap-3"><span>📍 {data.address || "Location"}</span> <span className="text-[#ffc107]">●</span></div>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-0">
          {/* Sidebar */}
          <div className="col-span-4 bg-white p-12 pr-6 border-r-4 border-[#ffc107]">
             <div className="w-full aspect-square rounded-full border-[10px] border-[#ffc107] overflow-hidden mb-12 shadow-2xl">
                {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
             </div>

             <section className="mb-12">
                <h2 className="bg-[#ffc107] text-black font-black text-sm uppercase px-4 py-1.5 mb-6 rotate-[-2deg] inline-block shadow-lg">References</h2>
                <div className="space-y-4">
                   <div className="border-l-4 border-gray-100 pl-4">
                      <h4 className="font-bold text-xs">Professor / HOD</h4>
                      <p className="text-[10px] text-gray-500 italic mt-1 leading-relaxed">Highly recommended for technical proficiency and proactive learning mindset.</p>
                   </div>
                </div>
             </section>

             <section>
                <h2 className="bg-[#ffc107] text-black font-black text-sm uppercase px-4 py-1.5 mb-6 rotate-[1deg] inline-block shadow-lg">Top Skills</h2>
                <div className="space-y-4">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-gray-700 uppercase">{s}</span>
                         <div className="h-1.5 w-full bg-gray-50 rounded-full border border-gray-100">
                            <div className="h-full bg-[#ffc107]" style={{ width: `${Math.max(40, 95 - (i*15))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>

          {/* Main Area */}
          <div className="col-span-8 p-12 pl-12 bg-gray-50/30">
             <section className="mb-10">
                <p className="text-[11px] leading-relaxed text-gray-600 font-medium border-l-4 border-gray-200 pl-6 italic">{data.summary || "Aspiring professional with a focus on delivering high-quality results. Eager to contribute and grow within a dynamic industry setting."}</p>
             </section>

             <section className="mb-12">
                <h2 className="bg-[#333] text-white font-black text-sm uppercase px-6 py-1.5 mb-8 inline-block skew-x-[-15deg] shadow-md">Education</h2>
                <div className="space-y-6">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="relative pl-8">
                         <div className="absolute left-0 top-0 text-[10px] font-black text-[#ffc107]">{edu.year}</div>
                         <h3 className="font-bold text-sm text-gray-800 uppercase tracking-tight">{edu.degree}</h3>
                         <p className="text-[11px] text-gray-400 font-bold">{edu.institution}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="bg-[#333] text-white font-black text-sm uppercase px-6 py-1.5 mb-8 inline-block skew-x-[-15deg] shadow-md">Job Experience</h2>
                <div className="space-y-8">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="relative pl-8">
                         <div className="absolute left-0 top-0 text-[10px] font-black text-[#ffc107]">{exp.duration}</div>
                         <h3 className="font-bold text-sm text-gray-800 uppercase tracking-tight">{exp.title}</h3>
                         <p className="text-[11px] text-gray-400 font-bold mb-3 italic">@ {exp.company}</p>
                         <p className="text-[11px] leading-relaxed text-gray-500">{(exp.description || "Active participant in project workflows, demonstrating strong analytical and collaborative abilities.")}</p>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 18: Career Starter Earthy (Image 4) ✨ ---
const CareerStarterEarthyTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-[#f8f5f2] p-12 font-sans text-[#4a3f35]">
       <div className="flex bg-white shadow-2xl rounded-3xl overflow-hidden h-full border border-gray-100">
          {/* Sidebar */}
          <div className="w-[35%] bg-[#a67c52] p-10 text-white flex flex-col items-center">
             <div className="w-48 h-56 bg-white/20 p-2 mb-10 overflow-hidden relative">
                <div className="absolute inset-0 border-t-8 border-l-8 border-white/40"></div>
                {data.photo && <img src={data.photo} className="w-full h-full object-cover grayscale brightness-110" />}
             </div>

             <div className="w-full space-y-12">
                <section>
                   <h2 className="flex items-center gap-3 font-black uppercase text-xs tracking-widest mb-6 border-b border-white/20 pb-2">
                      <span className="text-xl">👤</span> Work Skills
                   </h2>
                   <div className="space-y-3">
                      {data.skills?.map((s, i) => <div key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-tighter"><span>◆</span> {s}</div>)}
                   </div>
                </section>

                <section>
                   <h2 className="flex items-center gap-3 font-black uppercase text-xs tracking-widest mb-6 border-b border-white/20 pb-2">
                      <span className="text-xl">🌐</span> Language
                   </h2>
                   <div className="space-y-3">
                      {['English (Native)', 'Secondary Language'].map((l, i) => <div key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-tighter text-white/70"><span>◆</span> {l}</div>)}
                   </div>
                </section>

                <section>
                   <h2 className="flex items-center gap-3 font-black uppercase text-xs tracking-widest mb-6 border-b border-white/20 pb-2">
                      <span className="text-xl">📞</span> Contact
                   </h2>
                   <div className="space-y-4 text-[10px] font-medium leading-relaxed">
                      <div className="flex justify-between"><span>Phone:</span> <span>{data.phone}</span></div>
                      <div className="flex justify-between"><span>Email:</span> <span className="truncate">{data.email}</span></div>
                      <div className="flex justify-between"><span>Location:</span> <span>{data.address || "City, #45"}</span></div>
                   </div>
                </section>
             </div>
          </div>

          {/* Main */}
          <div className="flex-1 p-14 flex flex-col gap-10">
             <header>
                <h1 className="text-6xl font-black text-[#8b6b4e] leading-none uppercase tracking-tighter">{data.fullName?.split(' ')[0]}<br/>{data.fullName?.split(' ').slice(1).join(' ')}</h1>
                <p className="text-xl font-bold text-gray-400 mt-4 tracking-[0.2em] uppercase">Graphic Designer Aspirant</p>
                <div className="h-1 w-20 bg-[#a67c52] mt-6"></div>
                <p className="mt-8 text-xs leading-relaxed text-gray-500 italic border-l-4 border-gray-100 pl-6">{data.summary || "Eager to learn and apply design principles in a professional setting. Ready to contribute fresh ideas to creative projects."}</p>
             </header>

             <section>
                <h2 className="flex items-center gap-3 font-black uppercase text-sm tracking-widest mb-8 text-[#8b6b4e]">
                   <span className="bg-[#8b6b4e] text-white p-1 rounded-full text-xs shrink-0 inline-flex items-center justify-center w-6 h-6">🎓</span>
                   Education & Qualification
                </h2>
                <div className="space-y-8">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="flex gap-8 relative items-center">
                         <div className="text-[10px] font-black text-gray-300 w-24 shrink-0">{edu.year}</div>
                         <div className="relative pl-6 border-l border-gray-200">
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-200 rotate-45"></div>
                            <h3 className="font-bold text-xs uppercase text-gray-700">{edu.degree}</h3>
                            <p className="text-[10px] text-gray-400 font-bold">{edu.institution}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="flex items-center gap-3 font-black uppercase text-sm tracking-widest mb-8 text-[#8b6b4e]">
                   <span className="bg-[#8b6b4e] text-white p-1 rounded-full text-xs shrink-0 inline-flex items-center justify-center w-6 h-6">💼</span>
                   Work & Training
                </h2>
                <div className="space-y-8">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="flex gap-8 relative items-center">
                         <div className="text-[10px] font-black text-gray-300 w-24 shrink-0">{exp.duration}</div>
                         <div className="relative pl-6 border-l border-gray-200">
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-200 rotate-45"></div>
                            <h3 className="font-bold text-xs uppercase text-gray-700">{exp.title}</h3>
                            <p className="text-[10px] text-gray-400 font-bold mb-2">@ {exp.company}</p>
                            <p className="text-[10px] leading-relaxed text-gray-500 italic max-w-sm">{(exp.description || i===0 ? "Focusing on creating visual concepts that inspire and inform consumers." : "Actively learning software tools and professional design workflows.")}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};


// --- Template 19: Expert Dev Dark Hex 💎 ---
const ExpertDevDarkHexTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 flex flex-col">
       <header className="bg-[#333538] text-white p-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold tracking-[0.1em] mb-2">{data.fullName}</h1>
          <div className="h-0.5 w-24 bg-[#009ee3] mb-3"></div>
          <p className="text-xs uppercase font-bold text-[#009ee3] tracking-widest">Your Profession Here</p>
       </header>
       <div className="px-10 py-6 text-[11px] leading-relaxed text-gray-500 border-b border-gray-100 italic">
          {data.summary || "Highly skilled developer with passion for building scalable applications..."}
       </div>
       <div className="flex flex-1">
          <div className="w-[65%] p-10 pr-6 border-r border-gray-100 flex flex-col gap-10">
             <section>
                <div className="flex items-center gap-4 mb-8">
                   <div className="bg-[#333538] text-white p-2 rounded shadow-lg">💼</div>
                   <h2 className="text-lg font-black uppercase text-gray-700 tracking-wider">Work Experience</h2>
                </div>
                <div className="space-y-8">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="flex gap-6 relative">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#009ee3] mt-1 shrink-0 z-10"></div>
                         {i !== data.experience.length-1 && <div className="absolute left-[4.5px] top-4 bottom-0 w-[1px] bg-gray-200"></div>}
                         <div className="flex flex-col">
                            <div className="flex justify-between items-baseline mb-1 w-[280px]">
                               <h3 className="font-bold text-gray-800 text-sm">{exp.title}</h3>
                               <span className="text-[9px] font-bold text-gray-400">{exp.duration}</span>
                            </div>
                            <span className="text-[10px] text-[#009ee3] font-bold mb-2 uppercase">{exp.company}</span>
                            <ul className="text-[10px] text-gray-500 space-y-1 list-disc ml-3">
                               {exp.description?.split('\n').map((l, idx) => <li key={idx}>{l}</li>)}
                            </ul>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>
          <div className="w-[35%] bg-[#333538] text-white p-10 flex flex-col gap-10">
             <div className="flex justify-center mb-4">
                <div className="w-40 h-44 bg-[#009ee3] p-1 clip-hex relative overflow-hidden">
                   <style>{`.clip-hex { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }`}</style>
                   <div className="w-full h-full bg-[#333538] clip-hex overflow-hidden">
                      {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
                   </div>
                </div>
             </div>
             <section>
                <h3 className="text-[#009ee3] font-black text-xs uppercase mb-6 border-b border-gray-600 pb-2 tracking-[0.2em]">Contact Me</h3>
                <div className="space-y-4 text-[10px] text-gray-300">
                   <div className="flex items-center gap-3"><span className="text-[#009ee3]">📍</span> <span>{data.address || "Street Address"}</span></div>
                   <div className="flex items-center gap-3"><span className="text-[#009ee3]">📞</span> <span>{data.phone}</span></div>
                   <div className="flex items-center gap-3"><span className="text-[#009ee3]">✉</span> <span>{data.email}</span></div>
                </div>
             </section>
             <section>
                <h3 className="text-[#009ee3] font-black text-xs uppercase mb-6 border-b border-gray-600 pb-2 tracking-[0.2em]">Skills</h3>
                <div className="space-y-4">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex flex-col gap-1">
                         <span className="text-[9px] font-bold uppercase text-gray-100">{s}</span>
                         <div className="h-1.5 w-full bg-gray-600 rounded-full overflow-hidden">
                            <div className="h-full bg-[#009ee3]" style={{ width: `${Math.max(40, 100 - (i*12))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 20: Expert Dev Yellow Ribbon 💎 ---
const ExpertDevYellowRibbonTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 flex flex-col p-12">
       <div className="flex gap-10 items-center mb-12">
          <div className="w-[60%]">
             <div className="h-1 w-12 bg-black mb-6"></div>
             <h1 className="text-6xl font-black uppercase tracking-tighter mb-6 bg-white px-2 inline-block shadow-[8px_8px_0_#fbbc05] border-[3px] border-black">[ {data.fullName?.split(' ')[0] || "YOUR NAME"} ]</h1>
             <p className="text-sm font-medium leading-relaxed text-gray-600 italic border-l-4 border-gray-100 pl-6">{data.summary}</p>
          </div>
          <div className="w-[40%] flex justify-center">
             <div className="w-56 h-56 rounded-full border-[10px] border-[#333538] overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-[#009ee3]/10"></div>
                {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
             </div>
          </div>
       </div>

       <div className="flex gap-16">
          <div className="w-1/2">
             <section className="mb-10">
                <h2 className="text-xl font-black uppercase mb-6 border-b-4 border-gray-800 inline-block">Skills</h2>
                <ul className="grid grid-cols-2 gap-4">
                   {data.skills?.map((s, i) => <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700 underline decoration-[#fbbc05] decoration-2 underline-offset-4">● {s}</li>)}
                </ul>
             </section>
             <section>
                <div className="bg-[#fbbc05] p-6 text-black font-black uppercase tracking-[0.2em] relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-8 h-full bg-black/5 rotate-12 translate-x-4"></div>
                   <span className="text-sm">[ {data.email} ]</span>
                </div>
             </section>
          </div>
          
          <div className="w-1/2 overflow-hidden flex flex-col justify-center">
             <section className="text-center">
                <h2 className="text-2xl font-black text-gray-800 mb-2">Technical Graduate</h2>
                <hr className="border-gray-100 mb-4" />
                <div className="text-[10px] space-y-1 text-gray-400 font-bold uppercase">
                   <p>Contact: {data.phone}</p>
                   <p>Address: {data.address || "Your Address"}</p>
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 21: Expert Marketing Blue Arc 💎 ---
const ExpertMarketingBlueArcTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans flex text-gray-800">
       <div className="flex-1 p-12 pr-6">
          <header className="mb-10">
             <h1 className="text-5xl font-black text-[#009ee3] uppercase tracking-tight italic">{data.fullName}</h1>
             <p className="text-xl font-bold text-gray-400 mt-1">Marketing Expert</p>
             <div className="h-1 w-24 bg-[#009ee3] mt-4 mb-4"></div>
             <p className="text-xs leading-relaxed text-gray-500 italic max-w-sm">{data.summary}</p>
          </header>

          <div className="space-y-10">
             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-gray-100 mb-6 pb-1">Education</h2>
                <div className="space-y-4">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="flex gap-4">
                         <div className="w-2 h-2 rounded-full bg-[#009ee3] mt-1 shrink-0 border-2 border-white ring-2 ring-gray-100"></div>
                         <div>
                            <h3 className="font-bold text-xs uppercase text-[#009ee3]">{edu.degree}</h3>
                            <p className="text-[10px] text-gray-400 font-bold">{edu.institution} | {edu.year}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-gray-100 mb-6 pb-1">Experience</h2>
                <div className="space-y-6">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="flex gap-4">
                         <div className="w-2 h-2 rounded-full bg-[#009ee3] mt-1 shrink-0 border-2 border-white ring-2 ring-gray-100"></div>
                         <div>
                            <h3 className="font-bold text-xs uppercase text-[#009ee3]">{exp.title}</h3>
                            <p className="text-[10px] text-gray-400 font-bold mb-2">@ {exp.company} • {exp.duration}</p>
                            <p className="text-[10px] leading-relaxed text-gray-600 italic">{exp.description}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>

       <div className="w-[35%] bg-[#022b42] text-white flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[280px] bg-white rounded-b-full -translate-y-12"></div>
          <div className="p-10 pt-[240px] flex-1 flex flex-col gap-10">
             <div className="absolute top-10 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full border-4 border-[#022b42] overflow-hidden shadow-2xl z-20">
                {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
             </div>
             <section>
                <h3 className="text-lg font-bold uppercase mb-6 border-b border-white/20 pb-2">Contact</h3>
                <div className="space-y-4 text-[10px] font-medium leading-relaxed">
                   <p>📞 {data.phone}</p>
                   <p className="truncate">✉ {data.email}</p>
                   <p>📍 {data.address || "City, State"}</p>
                </div>
             </section>
             <section>
                <h3 className="text-lg font-bold uppercase mb-6 border-b border-white/20 pb-2">Top Skills</h3>
                <div className="space-y-5">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                         <span className="text-[9px] font-black uppercase tracking-wider">{s}</span>
                         <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#009ee3]" style={{ width: `${Math.max(30, 95 - (i*10))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 22: Expert Marketing Lavender 💎 ---
const ExpertMarketingLavenderTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white p-12 font-sans overflow-hidden relative">
       <div className="absolute top-0 overflow-hidden left-0 w-full h-full opacity-10 pointer-events-none z-0">
          <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply blur-3xl"></div>
          <div className="absolute top-[300px] right-[-200px] w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply blur-3xl"></div>
          <div className="absolute bottom-[-100px] left-[100px] w-[400px] h-[400px] bg-purple-200 rounded-full mix-blend-multiply blur-3xl"></div>
       </div>
       <div className="relative z-10 flex flex-col h-full bg-white/80 p-8 shadow-2xl rounded-3xl border border-white">
          <header className="flex justify-between items-center mb-12 pb-10 border-b-2 border-indigo-50">
             <div>
                <p className="text-lg font-black text-indigo-400 tracking-tighter italic">Hi I'm</p>
                <h1 className="text-7xl font-black text-[#1e293b] leading-tight uppercase tracking-tighter">{data.fullName?.split(' ')[0]}<br/>{data.fullName?.split(' ').slice(1).join(' ')}</h1>
                <p className="text-xs font-black uppercase text-indigo-500 tracking-[0.4em] mt-2">Creative Specialist</p>
                <div className="flex flex-col gap-2 mt-6 text-[10px] font-bold text-gray-400 uppercase">
                    <p className="flex items-center gap-2 italic">✉ {data.email}</p>
                    <p className="flex items-center gap-2 italic">📞 {data.phone}</p>
                    <p className="flex items-center gap-2 italic">📍 {data.address || "Main Street, Country"}</p>
                </div>
             </div>
             <div className="w-56 h-56 rounded-full border-8 border-indigo-500 bg-indigo-600 shadow-[0_20px_50px_rgba(79,70,229,0.3)] overflow-hidden relative">
                {data.photo ? <img src={data.photo} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-4xl">👤</div>}
             </div>
          </header>
          <div className="flex-1 grid grid-cols-12 gap-10">
             <div className="col-span-12 md:col-span-8 flex flex-col gap-10">
                <section>
                   <h2 className="bg-indigo-600 text-white font-black px-4 py-1 inline-flex items-center gap-3 rounded-lg shadow-lg mb-6 uppercase text-sm">
                      <span className="text-xl">💼</span> Experience
                   </h2>
                   <div className="space-y-6 flex flex-col">
                      {data.experience?.map((exp, i) => (
                         <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50 relative group hover:shadow-md transition-all">
                            <h3 className="font-bold text-gray-800 text-lg uppercase">{exp.title}</h3>
                            <p className="text-xs font-black text-indigo-400 italic mb-2 uppercase">{exp.company} | {exp.duration}</p>
                            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">{exp.description}</p>
                         </div>
                      ))}
                   </div>
                </section>
             </div>
             <div className="col-span-12 md:col-span-4 flex flex-col gap-8">
                <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 flex flex-col gap-6">
                   <section>
                      <h2 className="flex items-center gap-3 font-bold uppercase text-indigo-700 text-sm mb-4">⚙ Skills</h2>
                      <div className="space-y-2 text-[10px] font-bold text-gray-500 uppercase list-none">
                         {data.skills?.slice(0,6).map((s, i) => <li key={i} className="bg-white px-2 py-1.5 rounded-lg shadow-sm border border-indigo-50"># {s}</li>)}
                      </div>
                   </section>
                   <section>
                      <h2 className="flex items-center gap-3 font-bold uppercase text-indigo-700 text-sm mb-4">🎓 Education</h2>
                      <div className="space-y-4">
                         {data.education?.map((edu, i) => (
                            <div key={i}>
                               <h4 className="font-bold text-gray-800 text-[11px] leading-tight group-hover:text-indigo-600 transition-colors">{edu.degree}</h4>
                               <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tighter italic">{edu.institution} • {edu.year}</p>
                            </div>
                         ))}
                      </div>
                   </section>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Template 23: Expert Marketing Orange Bold 💎 ---
const ExpertMarketingOrangeBoldTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 flex flex-col border-[24px] border-[#fbbc05]">
       <header className="bg-[#333538] text-white p-12 flex relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#fbbc05] -translate-x-16 -translate-y-16 rotate-45"></div>
          <div className="z-10 flex gap-10 items-center">
             <div className="w-52 h-52 border-[8px] border-[#fbbc05] rounded-full overflow-hidden shadow-2xl relative bg-[#333538]">
                {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
             </div>
             <div>
                <div className="border-[4px] border-[#fbbc05] p-3 inline-block mb-4">
                   <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">{data.fullName?.split(' ')[0]}<br/>{data.fullName?.split(' ').slice(1).join(' ')}</h1>
                </div>
                <p className="text-xl font-bold text-[#fbbc05] uppercase tracking-[0.3em] ml-1">Business Professional</p>
                <div className="flex gap-6 mt-6 ml-2">
                   <div className="flex items-center gap-2"><span className="text-[#fbbc05] text-lg">📍</span> <span className="text-xs">{data.address || "City, State"}</span></div>
                   <div className="flex items-center gap-2"><span className="text-[#fbbc05] text-lg">📞</span> <span className="text-xs">{data.phone}</span></div>
                   <div className="flex items-center gap-2"><span className="text-[#fbbc05] text-lg">✉</span> <span className="text-xs">{data.email}</span></div>
                </div>
             </div>
          </div>
       </header>
       <div className="p-12 flex-1">
          <section className="mb-12">
             <h2 className="text-2xl font-black uppercase text-gray-800 inline-block border-b-4 border-[#fbbc05] pb-1 mb-6">About Me</h2>
             <p className="text-sm leading-relaxed text-gray-600 italic px-6 py-4 bg-gray-50 border-l-4 border-[#333538] rounded-r-xl">{data.summary}</p>
          </section>
          <div className="grid grid-cols-2 gap-16">
             <section>
                <h2 className="text-2xl font-black uppercase text-gray-800 inline-block border-b-4 border-[#fbbc05] pb-1 mb-8">Work Experience</h2>
                <div className="space-y-10">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="flex gap-6 relative">
                         <div className="flex flex-col items-center">
                            <div className="w-4 h-4 rounded-full border-4 border-[#fbbc05] bg-white z-10 shrink-0 shadow-md"></div>
                            {i !== data.experience.length-1 && <div className="absolute left-[7.5px] top-4 bottom-0 w-0.5 bg-gray-200"></div>}
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-baseline mb-2">
                               <h3 className="font-bold uppercase text-[#333538] text-lg">{exp.title}</h3>
                               <span className="text-xs font-black text-[#fbbc05] tracking-widest">{exp.duration}</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed italic mb-2">@ {exp.company}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{exp.description}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
             <div className="flex flex-col gap-12">
                <section>
                   <h2 className="text-2xl font-black uppercase text-gray-800 inline-block border-b-4 border-[#fbbc05] pb-1 mb-8">Education</h2>
                   <div className="space-y-6">
                      {data.education?.map((e, i) => (
                         <div key={i} className="relative group p-4 border border-gray-100 hover:border-[#fbbc05] transition-all rounded-2xl bg-white shadow-sm hover:shadow-lg">
                            <h4 className="font-bold text-base text-gray-800 uppercase">{e.degree}</h4>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase italic">{e.institution} | {e.year}</p>
                         </div>
                      ))}
                   </div>
                </section>
                <section>
                   <h2 className="text-2xl font-black uppercase text-gray-800 inline-block border-b-4 border-[#fbbc05] pb-1 mb-8">Professional Skills</h2>
                   <div className="space-y-5">
                      {data.skills?.map((s, i) => (
                         <div key={i} className="flex flex-col gap-2">
                            <span className="text-xs font-black uppercase tracking-widest text-[#333538]">{s}</span>
                            <div className="h-3 w-full bg-gray-100 border border-gray-200 overflow-hidden rounded-full">
                               <div className="h-full bg-gradient-to-r from-[#fbbc05] to-orange-500" style={{ width: `${Math.max(40, 100 - (i*12))}%` }}></div>
                            </div>
                         </div>
                      ))}
                   </div>
                </section>
             </div>
          </div>
       </div>
       <footer className="h-8 w-full bg-[#333538]"></footer>
    </div>
  );
};

// --- Template 24: Intern Pro Green Geometric (Image 1 New) 📸 ---
const InternProGreenGeometricTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-[#2d2d2d] relative p-16">
       <div className="absolute top-0 left-0 w-64 h-64 border-l-[12px] border-t-[12px] border-[#20c997] -translate-x-4 -translate-y-4"></div>
       <div className="absolute top-0 left-0 w-80 h-80 border-l-[4px] border-t-[4px] border-[#20c997]/20 -translate-x-8 -translate-y-8"></div>
       
       <header className="relative z-10 flex justify-between items-start mb-16">
          <div className="w-1/2">
             <div className="relative mb-6">
                <h1 className="text-5xl font-black uppercase leading-[0.9]">
                   {data.fullName?.split(' ')[0]}<br/>
                   <span className="text-[#20c997]">{data.fullName?.split(' ').slice(1).join(' ')}</span>
                </h1>
                <div className="h-1.5 w-32 bg-[#2d2d2d] mt-6"></div>
             </div>
             <p className="text-xl font-bold text-gray-400 uppercase tracking-[0.2em]">{data.title || "Professional Title"}</p>
          </div>
          <div className="relative">
             <div className="w-48 h-56 bg-gray-100 relative overflow-hidden shadow-2xl clip-path-triangle">
                <style>{`.clip-path-triangle { clip-path: polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%); }`}</style>
                {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
             </div>
             <div className="absolute -top-4 -right-4 w-12 h-12 border-t-8 border-r-8 border-[#20c997]"></div>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-12 relative z-10">
          <div className="col-span-12 md:col-span-7 space-y-12">
             <section>
                <h2 className="text-[#20c997] font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-4">
                   <span>PROFILE</span> <div className="h-px bg-gray-200 flex-1"></div>
                </h2>
                <p className="text-xs leading-relaxed text-gray-500 font-medium">{data.summary}</p>
             </section>

             <section>
                <h2 className="text-[#20c997] font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-4">
                   <span>WORK EXPERIENCE</span> <div className="h-px bg-gray-200 flex-1"></div>
                </h2>
                <div className="space-y-10">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="flex gap-6">
                         <div className="w-24 shrink-0 text-[10px] font-black text-[#20c997] pt-1">{exp.duration}</div>
                         <div className="flex-1 relative">
                            <div className="absolute -left-3 top-2 w-1.5 h-1.5 bg-[#20c997] rotate-45"></div>
                            <h3 className="font-bold text-sm tracking-tight">{exp.title}</h3>
                            <p className="text-[10px] font-black text-gray-400 mb-2 uppercase italic">{exp.company}</p>
                            <p className="text-[11px] text-gray-500 leading-relaxed">{exp.description}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>

          <div className="col-span-12 md:col-span-5 space-y-12">
             <section>
                <h2 className="text-[#20c997] font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-4">
                   <span>CONTACT</span> <div className="h-px bg-gray-200 flex-1"></div>
                </h2>
                <div className="space-y-3 text-[11px] font-bold text-gray-600">
                   <p className="flex items-center gap-3"><span className="text-[#20c997]">📍</span> {data.address || "City, Country"}</p>
                   <p className="flex items-center gap-3"><span className="text-[#20c997]">📞</span> {data.phone}</p>
                   <p className="flex items-center gap-3"><span className="text-[#20c997]">✉</span> {data.email}</p>
                </div>
             </section>

             <section>
                <h2 className="text-[#20c997] font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-4">
                   <span>SKILLS</span> <div className="h-px bg-gray-200 flex-1"></div>
                </h2>
                <div className="space-y-4">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                         <div className="flex justify-between items-center text-[10px] font-black tracking-tight">
                            <span>{s}</span>
                            <span className="text-[#20c997]">{(100 - (i*10))}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#20c997] to-[#12b886]" style={{ width: `${Math.max(40, 100 - (i*10))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-[#20c997] font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-4">
                   <span>EDUCATION</span> <div className="h-px bg-gray-200 flex-1"></div>
                </h2>
                <div className="space-y-6">
                   {data.education?.map((edu, i) => (
                      <div key={i}>
                         <div className="text-[10px] font-black text-[#20c997] mb-1">{edu.year}</div>
                         <h3 className="font-bold text-xs uppercase leading-tight">{edu.degree}</h3>
                         <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase italic">{edu.institution}</p>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 25: Intern Pro Split Design (Image 2 New) 📸 ---
const InternProSplitDesignTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 flex flex-col">
       <header className="bg-[#1a1c2c] text-white p-12 flex justify-between items-center border-b-8 border-[#d4af37]">
          <div className="flex-1">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
                <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
                <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
             </div>
             <h1 className="text-5xl font-light uppercase tracking-[0.2em] leading-none mb-2">[{data.fullName}]</h1>
             <p className="text-sm font-bold text-[#d4af37] tracking-[0.4em] uppercase opacity-80">INTERN</p>
          </div>
          <div className="w-32 h-32 bg-white rounded-lg p-1 shrink-0 shadow-2xl scale-110">
             <div className="w-full h-full bg-gray-50 rounded shadow-inner overflow-hidden">
                {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
             </div>
          </div>
       </header>

       <div className="bg-[#e9e4e0] py-4 px-12 flex justify-center">
          <div className="bg-white/80 backdrop-blur rounded-full px-10 py-2 border border-[#d4af37]/30 shadow-sm flex items-center gap-8 text-[11px] font-bold text-gray-600">
             <div className="flex items-center gap-2 text-[#a67c52]">✉ <span className="text-gray-700">[{data.email}]</span></div>
             <div className="w-px h-4 bg-gray-300"></div>
             <div className="flex items-center gap-2 text-[#a67c52]">📞 <span className="text-gray-700">{data.phone}</span></div>
          </div>
       </div>

       <div className="p-16 flex flex-col gap-12">
          <section className="text-center">
             <h2 className="text-2xl font-black text-[#1a1c2c] uppercase tracking-widest mb-6 flex items-center justify-center gap-6">
                <div className="h-px w-12 bg-gray-200"></div>
                UI UX Designer Resume For Internship
                <div className="h-px w-12 bg-gray-200"></div>
             </h2>
             <div className="max-w-2xl mx-auto space-y-4 text-sm text-gray-500 font-medium">
                <p>Contact Number: <span className="text-gray-900 font-black">[{data.phone}]</span></p>
                <p>Address: <span className="text-gray-900 font-black">[{data.address || "Your Address"}]</span></p>
                <p>LinkedIn: <span className="text-blue-600 underline">https://www.linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</span></p>
             </div>
          </section>

          <div className="grid grid-cols-2 gap-16">
             <section>
                <h3 className="text-xl font-black text-[#1a1c2c] uppercase mb-6 flex items-center gap-3">
                   I. Objective
                </h3>
                <p className="text-xs leading-relaxed text-gray-500 font-medium border-l-4 border-[#d4af37] pl-4">{data.summary}</p>
             </section>

             <section>
                <h3 className="text-xl font-black text-[#1a1c2c] uppercase mb-6 flex items-center gap-3">
                   II. Education
                </h3>
                <div className="space-y-6">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="pl-6 relative">
                         <div className="absolute left-0 top-1 w-2.5 h-2.5 bg-[#d4af37] rounded-sm"></div>
                         <h4 className="font-black text-gray-800 uppercase text-xs mb-1">[{edu.degree}]</h4>
                         <p className="text-[10px] font-bold text-gray-400 italic mb-2">[{edu.institution}], {edu.year}</p>
                         <p className="text-[10px] text-gray-500 underline decoration-[#d4af37] underline-offset-4 font-bold">Expected Graduation: [{edu.year}]</p>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 26: Intern Pro Blue Sidebar (Image 3 New) 📸 ---
const InternProBlueSidebarTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-[#1e1e1e] font-sans flex text-white overflow-hidden">
       {/* Sidebar */}
       <div className="w-[35%] bg-[#a5e1f0] text-gray-900 p-12 flex flex-col h-full gap-10">
          <header>
             <h4 className="text-xs font-black uppercase tracking-widest text-[#1e1e1e]/60 mb-2">TITLE / POSITION</h4>
             <h1 className="text-2xl font-black text-[#1e1e1e] uppercase leading-tight tracking-tighter">Web Developer Intern</h1>
          </header>

          <section>
             <h2 className="text-lg font-black uppercase text-[#1e1e1e] mb-6 border-b-4 border-[#1e1e1e] inline-block tracking-tighter">CONTACT</h2>
             <div className="space-y-3 text-[11px] font-black uppercase">
                <p className="opacity-70 leading-snug">{data.address || "Main Street, NY"}</p>
                <p className="text-[#1e1e1e]">{data.email}</p>
                <p className="text-[#1e1e1e]">{data.phone}</p>
             </div>
          </section>

          <section>
             <h2 className="text-lg font-black uppercase text-[#1e1e1e] mb-6 border-b-4 border-[#1e1e1e] inline-block tracking-tighter">LANGUAGES</h2>
             <div className="space-y-4">
                {['English', 'Hindi', 'French'].map((l, i) => (
                   <div key={i} className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black uppercase">{l}</span>
                      <div className="h-1 w-full bg-[#1e1e1e]/10">
                         <div className="h-full bg-[#1e1e1e]" style={{ width: i === 0 ? '95%' : i === 1 ? '70%' : '30%' }}></div>
                      </div>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h2 className="text-lg font-black uppercase text-[#1e1e1e] mb-6 border-b-4 border-[#1e1e1e] inline-block tracking-tighter">SKILLS</h2>
             <div className="space-y-4">
                {data.skills?.map((s, i) => (
                   <div key={i} className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black uppercase">{s}</span>
                      <div className="h-1 w-full bg-[#1e1e1e]/10">
                         <div className="h-full bg-[#1e1e1e]" style={{ width: `${Math.max(40, 95 - (i*12))}%` }}></div>
                      </div>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h2 className="text-lg font-black uppercase text-[#1e1e1e] mb-6 border-b-4 border-[#1e1e1e] inline-block tracking-tighter">HOBBIES</h2>
             <div className="text-[10px] font-black uppercase space-y-2 opacity-70">
                <p>Coding / Design</p>
                <p>Reading / Research</p>
                <p>Music / Travel</p>
             </div>
          </section>
       </div>

       {/* Main Area */}
       <div className="flex-1 bg-[#1e1e1e] overflow-hidden flex flex-col relative">
          <div className="absolute top-12 right-12 w-48 h-48 rounded-full border-[10px] border-[#a5e1f0] overflow-hidden shadow-2xl z-20">
             {data.photo && <img src={data.photo} className="w-full h-full object-cover grayscale brightness-90" />}
          </div>

          <div className="p-16 pt-32 h-full flex flex-col gap-16 relative">
             <header className="mb-4">
                <h1 className="text-7xl font-black uppercase tracking-tighter leading-[0.8] text-white italic">
                   {data.fullName?.split(' ')[0]}<br/>
                   <span className="text-[#a5e1f0]">{data.fullName?.split(' ').slice(1).join(' ')}</span>
                </h1>
             </header>

             <section>
                <h2 className="text-4xl font-black uppercase text-[#a5e1f0] mb-6 tracking-tighter decoration-4 underline underline-offset-[12px]">personal profile</h2>
                <p className="text-sm leading-relaxed text-gray-400 font-medium italic pr-32">{data.summary}</p>
             </section>

             <section>
                <h2 className="text-4xl font-black uppercase text-[#a5e1f0] mb-6 tracking-tighter decoration-4 underline underline-offset-[12px]">achievements</h2>
                <div className="space-y-8">
                   {data.experience?.slice(0, 3).map((exp, i) => (
                      <div key={i} className="group relative pr-12">
                         <h3 className="font-black text-xl uppercase text-white mb-1 group-hover:text-[#a5e1f0] transition-colors">{exp.title}</h3>
                         <div className="flex items-center gap-3 text-xs font-black text-gray-500 mb-2">
                             <span>{exp.company}</span>
                             <div className="w-1.5 h-1.5 rounded-full bg-[#a5e1f0]"></div>
                             <span>{exp.duration}</span>
                         </div>
                         <p className="text-xs text-gray-400 leading-relaxed font-bold italic line-clamp-2">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 27: Intern Pro Dark Modern (Image 4 New) 📸 ---
const InternProDarkModernTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-[#222] font-sans text-white p-16 flex flex-col gap-16 relative overflow-hidden">
       {/* Background Noise/Texture Simulation */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

       <header className="flex items-center gap-12 relative z-10">
          <div className="w-56 h-56 rounded-full border-[12px] border-white/10 p-2 shadow-2xl bg-zinc-900 shrink-0">
             <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 scale-105 transform translate-x-2 translate-y-1">
                {data.photo && <img src={data.photo} className="w-full h-full object-cover grayscale brightness-110 contrast-125" />}
             </div>
          </div>
          <div className="flex-1">
             <div className="bg-[#ff8c00] inline-block px-4 py-1 text-xs font-black uppercase tracking-[0.3em] mb-4 shadow-xl">TITLE / POSITION</div>
             <h1 className="text-7xl font-black uppercase tracking-tighter leading-[0.8]">
                {data.fullName?.split(' ')[0]}<br/>
                <span className="text-[#ff8c00]">{data.fullName?.split(' ').slice(1).join(' ')}</span>
             </h1>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-16 relative z-10 flex-1">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-16 pr-12">
             <section>
                <h2 className="text-5xl font-black uppercase text-white/20 mb-8 tracking-tighter italic origin-left scale-y-125">personal profile</h2>
                <div className="relative pl-10">
                   <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ff8c00] shadow-[0_0_15px_#ff8c00]"></div>
                   <p className="text-[13px] leading-relaxed text-gray-400 font-bold uppercase tracking-tight">{data.summary}</p>
                </div>
             </section>

             <section>
                <h2 className="text-5xl font-black uppercase text-white/20 mb-8 tracking-tighter italic origin-left scale-y-125">education</h2>
                <div className="space-y-10 pl-10 border-l-2 border-white/5">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="relative group">
                         <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-[#222] border-4 border-[#ff8c00] rounded-full z-10 group-hover:scale-125 transition-transform"></div>
                         <h3 className="font-bold text-[#ff8c00] text-sm uppercase mb-1">{edu.year}</h3>
                         <h4 className="font-black text-xl uppercase tracking-tighter leading-tight">{edu.degree}</h4>
                         <p className="text-xs text-gray-500 font-black mt-2 italic">{edu.institution}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-5xl font-black uppercase text-white/20 mb-8 tracking-tighter italic origin-left scale-y-125">work experience</h2>
                <div className="space-y-12 pl-10 border-l-2 border-white/5">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="relative group">
                         <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-[#222] border-4 border-[#ff8c00] rounded-full z-10"></div>
                         <div className="flex justify-between items-start mb-2 group-hover:translate-x-2 transition-transform">
                            <h4 className="font-black text-2xl uppercase tracking-tighter text-white leading-none">{exp.title}</h4>
                            <span className="text-[#ff8c00] text-xs font-black">{exp.duration}</span>
                         </div>
                         <p className="text-[10px] text-gray-500 font-black mb-4 italic uppercase tracking-[0.2em]">at {exp.company}</p>
                         <p className="text-xs text-gray-400 leading-relaxed font-medium uppercase tracking-tighter">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-16 border-l border-white/5 pl-8">
             <section>
                <h2 className="text-xl font-black uppercase text-[#ff8c00] mb-8 tracking-[0.2em] border-b-2 border-[#ff8c00] inline-block">Contact</h2>
                <div className="space-y-6 text-[11px] font-black uppercase leading-relaxed text-gray-400">
                   <p className="text-white hover:text-[#ff8c00] transition-colors">{data.email}</p>
                   <p className="text-white">{data.phone}</p>
                   <p className="opacity-60">{data.address || "City, State, Zip"}</p>
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase text-[#ff8c00] mb-8 tracking-[0.2em] border-b-2 border-[#ff8c00] inline-block">Skills</h2>
                <div className="space-y-6">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex flex-col gap-2 group">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase">
                            <span className="text-white group-hover:text-[#ff8c00] transition-colors">{s}</span>
                            <span className="text-gray-600">Level {4-i}</span>
                         </div>
                         <div className="h-1 w-full bg-white/5 overflow-hidden rounded-full">
                            <div className="h-full bg-white group-hover:bg-[#ff8c00] transition-all" style={{ width: `${Math.max(30, 95 - (i*15))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase text-[#ff8c00] mb-8 tracking-[0.2em] border-b-2 border-[#ff8c00] inline-block">Languages</h2>
                <div className="space-y-3 text-[11px] font-black uppercase text-gray-400">
                   {['English', 'Spanish', 'Hindi'].map((l, i) => <p key={i} className="hover:text-white transition-colors">{l}</p>)}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};


// --- Template 28: Creative Vibrant Bubbles (Image 1) 🎨 ---
const CreativeVibrantBubblesTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 p-12 relative overflow-hidden">
       {/* Bubble Header Background */}
       <div className="absolute top-0 left-0 w-full h-[300px] opacity-80 pointer-events-none">
          <div className="absolute top-[20px] left-[10%] w-32 h-32 rounded-full bg-yellow-400 blur-xl opacity-40"></div>
          <div className="absolute top-[40px] left-[25%] w-48 h-48 rounded-full bg-red-400 blur-2xl opacity-30"></div>
          <div className="absolute top-[10px] left-[50%] w-64 h-64 rounded-full bg-blue-400 blur-3xl opacity-25"></div>
          <div className="absolute top-[60px] right-[10%] w-40 h-40 rounded-full bg-green-400 blur-xl opacity-30"></div>
          
          {/* SVG Overlay for exact bubble pattern */}
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 300">
             <circle cx="100" cy="80" r="60" fill="#facc15" opacity="0.6" />
             <circle cx="180" cy="120" r="80" fill="#f87171" opacity="0.5" />
             <circle cx="280" cy="70" r="50" fill="#a78bfa" opacity="0.6" />
             <circle cx="120" cy="180" r="40" fill="#4ade80" opacity="0.5" />
             <circle cx="600" cy="100" r="90" fill="#38bdf8" opacity="0.4" />
             <circle cx="520" cy="180" r="60" fill="#fb923c" opacity="0.5" />
          </svg>
       </div>

       <header className="relative z-10 text-center mb-16 pt-10">
          <h1 className="text-7xl font-light uppercase tracking-[0.2em] text-[#009ee3] leading-none mb-4">
             {data.fullName?.split(' ')[0]}<br/>
             <span className="font-thin text-gray-400">{data.fullName?.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="w-48 h-48 rounded-full border-8 border-white shadow-2xl mx-auto overflow-hidden bg-gray-50 mt-[-20px]">
             {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
          </div>
       </header>

       <div className="relative z-10 flex flex-col gap-12">
          <section className="text-center">
             <h2 className="text-3xl font-light uppercase tracking-[0.4em] text-gray-800 mb-6 underline decoration-[#009ee3] underline-offset-8">Personal Profile</h2>
             <p className="text-sm leading-relaxed text-gray-500 max-w-3xl mx-auto italic">{data.summary}</p>
          </section>

          <div className="grid grid-cols-2 gap-16">
             <section>
                <h3 className="text-xl font-bold uppercase tracking-widest text-[#009ee3] mb-8 flex items-center gap-4">
                   <div className="p-2 bg-[#009ee3] text-white rounded-lg scale-75">⚙</div> WORK EXPERIENCE
                </h3>
                <div className="space-y-10">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="flex gap-6 border-l-2 border-gray-100 pl-6 relative">
                         <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[#009ee3]"></div>
                         <div className="flex-1">
                            <h4 className="font-bold text-gray-800 uppercase text-sm">{exp.title}</h4>
                            <p className="text-[10px] text-gray-400 font-bold mb-3 italic">{exp.company} | {exp.duration}</p>
                            <p className="text-xs text-gray-600 leading-relaxed">{exp.description}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <div className="flex flex-col gap-12">
                <section>
                   <h3 className="text-xl font-bold uppercase tracking-widest text-[#009ee3] mb-8 flex items-center gap-4">
                      <div className="p-2 bg-[#009ee3] text-white rounded-lg scale-75">★</div> ACHIEVEMENTS
                   </h3>
                   <div className="space-y-6">
                      {data.projects?.slice(0, 3).map((proj, i) => (
                         <div key={i} className="bg-gray-50 p-4 rounded-xl border-l-4 border-yellow-400">
                            <h4 className="font-bold text-xs uppercase text-gray-700">{proj.name}</h4>
                            <p className="text-[10px] text-gray-500 mt-1">{proj.description}</p>
                         </div>
                      ))}
                   </div>
                </section>

                <section>
                   <h3 className="text-xl font-bold uppercase tracking-widest text-[#009ee3] mb-8 flex items-center gap-4">
                      <div className="p-2 bg-[#009ee3] text-white rounded-lg scale-75">⚡</div> SKILLS
                   </h3>
                   <div className="space-y-5">
                      {data.skills?.slice(0, 4).map((s, i) => (
                         <div key={i} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight text-gray-600">
                               <span>{s}</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                               <div className="h-full bg-gradient-to-r from-[#009ee3] to-green-400" style={{ width: `${Math.max(40, 95 - (i*12))}%` }}></div>
                            </div>
                         </div>
                      ))}
                   </div>
                </section>
             </div>
          </div>

          <section className="mt-8 border-t pt-10">
             <div className="flex justify-around items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                <div className="flex items-center gap-3">
                   <span className="p-2 bg-gray-100 rounded-full text-[#009ee3]">📍</span> {data.address || "Main Street"}
                </div>
                <div className="flex items-center gap-3">
                   <span className="p-2 bg-gray-100 rounded-full text-[#009ee3]">📞</span> {data.phone}
                </div>
                <div className="flex items-center gap-3">
                   <span className="p-2 bg-gray-100 rounded-full text-[#009ee3]">✉</span> {data.email}
                </div>
             </div>
          </section>
       </div>
    </div>
  );
};

// --- Template 29: Creative Dark Boxed (Image 2) 🌑 ---
const CreativeDarkBoxedTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-[#1a1a1a] font-sans text-gray-300 p-10 flex flex-col gap-10">
       <header className="flex items-center gap-10 bg-[#222] p-8 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-[#ff8c00]/40 -translate-x-4 translate-y-4"></div>
          <div className="w-44 h-44 bg-zinc-800 rounded-3xl relative overflow-hidden border-2 border-white/10 group">
             {data.photo && <img src={data.photo} className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700" />}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="flex-1">
             <h1 className="text-5xl font-black uppercase tracking-tight text-white">{data.fullName}</h1>
             <p className="text-[#ff8c00] font-bold tracking-[0.3em] uppercase mt-2 text-sm italic">Creative Designer Specialist</p>
             <div className="flex gap-6 mt-6 text-[10px] font-bold text-gray-500 uppercase">
                <span>{data.email}</span>
                <span>{data.phone}</span>
             </div>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-10 flex-1">
          <div className="col-span-12 md:col-span-5 flex flex-col gap-10">
             <section className="bg-[#222] p-6 rounded-3xl border border-white/5">
                <h2 className="text-xl font-bold uppercase text-white mb-6 flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-[#ff8c00]"></div> ABOUT ME
                </h2>
                <p className="text-xs leading-relaxed text-gray-400 font-medium italic">{data.summary}</p>
             </section>

             <section className="bg-[#222] p-6 rounded-3xl border border-white/5">
                <h2 className="text-xl font-bold uppercase text-white mb-6 flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-[#ff8c00]"></div> SKILLS
                </h2>
                <div className="space-y-4">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
                         <span className="text-[10px] font-black uppercase text-gray-400">{s}</span>
                         <div className="flex gap-1">
                            {[1,2,3,4,5].map(star => (
                               <div key={star} className={`w-2 h-2 rounded-sm ${star <= (5-i) ? 'bg-[#ff8c00]' : 'bg-gray-700'}`}></div>
                            ))}
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section className="bg-gradient-to-br from-[#ff8c00] to-orange-700 p-8 rounded-3xl text-white shadow-xl">
                <h2 className="text-lg font-black uppercase mb-4 tracking-tighter italic">CONTACT</h2>
                <div className="space-y-3 text-[11px] font-bold">
                   <p>📍 {data.address || "Your City, Zip"}</p>
                   <p>✉ {data.email}</p>
                   <p>📞 {data.phone}</p>
                </div>
             </section>
          </div>

          <div className="col-span-12 md:col-span-7 flex flex-col gap-10">
             <section className="bg-[#222] p-8 rounded-3xl border border-white/5 flex-1 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-[#ff8c00]/10 translate-x-4 translate-y-4"></div>
                <h2 className="text-2xl font-black uppercase text-white mb-8 flex items-center gap-4">
                   <div className="w-1.5 h-8 bg-[#ff8c00]"></div> EXPERIENCE
                </h2>
                <div className="space-y-12">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="relative group pl-8">
                         <div className="absolute left-0 top-1.5 w-3 h-3 bg-[#ff8c00] rounded-sm rotate-45 group-hover:scale-125 transition-transform"></div>
                         <div className="flex justify-between items-baseline mb-2">
                            <h3 className="font-bold text-white uppercase text-base">{exp.title}</h3>
                            <span className="text-[#ff8c00] text-[10px] font-black">{exp.duration}</span>
                         </div>
                         <p className="text-[10px] text-gray-500 font-bold mb-3 uppercase tracking-widest">{exp.company}</p>
                         <p className="text-[11px] text-gray-400 leading-relaxed italic">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section className="bg-[#222] p-8 rounded-3xl border border-white/5">
                <h2 className="text-xl font-bold uppercase text-white mb-6 flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-[#ff8c00]"></div> EDUCATION
                </h2>
                <div className="flex gap-8">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="flex-1 bg-black/20 p-4 rounded-2xl">
                         <h3 className="font-bold text-white text-xs uppercase">{edu.degree}</h3>
                         <p className="text-[9px] text-[#ff8c00] font-black mt-1 uppercase italic">{edu.institution} | {edu.year}</p>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 30: Creative Modern Timeline (Image 3) 📊 ---
const CreativeModernTimelineTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-[#1e1a4f] font-sans text-gray-300 flex flex-col">
       <header className="bg-gradient-to-r from-[#1e1a4f] to-[#2d258a] p-12 flex justify-between items-start relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-10 left-10 w-24 h-24 border-2 border-white rotate-12"></div>
             <div className="absolute bottom-10 right-20 w-32 h-32 border-4 border-yellow-400 rotate-45"></div>
          </div>
          <div className="z-10 flex gap-8 items-center">
             <div className="w-32 h-32 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 p-1">
                <div className="w-full h-full rounded-xl overflow-hidden bg-gray-900 shadow-inner">
                   {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
                </div>
             </div>
             <div>
                <h1 className="text-4xl font-black uppercase text-white tracking-tighter flex flex-col leading-none">
                   <span className="bg-[#3b329b] px-4 py-1 mb-2 shadow-lg inline-block">{data.fullName?.split(' ')[0]}</span>
                   <span className="bg-[#ffcc00] text-[#1e1a4f] px-4 py-1 shadow-lg inline-block">{data.fullName?.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.5em] mt-4 ml-1 italic italic">Creative Visionary</p>
             </div>
          </div>
          <div className="z-10 text-right">
             <div className="bg-gray-900/50 p-6 rounded-2xl border-2 border-white/5 italic text-sm text-gray-400 font-medium max-w-xs leading-relaxed">
                " {data.summary || "Designing the future with passion and innovation."} "
             </div>
          </div>
       </header>

       <div className="flex-1 bg-[#efefef] text-gray-800 p-12 flex flex-col justify-around">
          <section>
             <h2 className="text-2xl font-black uppercase text-[#1e1a4f] mb-10 flex items-center gap-4">
                <span className="text-orange-500">▶▶</span> JOB EXPERIENCE
             </h2>
             <div className="flex justify-between relative">
                <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 border-t border-dashed border-gray-400"></div>
                {data.experience?.slice(0, 3).map((exp, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center text-center relative z-10 px-4">
                      <div className="bg-[#1e1a4f] text-white px-4 py-1 text-[9px] font-black italic rounded-full mb-4 shadow-md">{exp.duration}</div>
                      <div className="w-3 h-3 bg-orange-500 rotate-45 mb-4 group hover:scale-150 transition-transform"></div>
                      <h3 className="font-bold text-xs uppercase mb-1 leading-tight">{exp.title}</h3>
                      <p className="text-[9px] text-gray-500 font-black uppercase">{exp.company}</p>
                      <p className="text-[10px] text-gray-400 mt-3 leading-relaxed italic line-clamp-2">{exp.description}</p>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black uppercase text-[#1e1a4f] mb-10 flex items-center gap-4">
                <span className="text-orange-500">▶▶</span> EDUCATION
             </h2>
             <div className="flex justify-between relative">
                <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 border-t border-dashed border-gray-400"></div>
                {data.education?.slice(0, 3).map((edu, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center text-center relative z-10 px-4">
                      <div className="bg-[#1e1a4f] text-white px-4 py-1 text-[9px] font-black italic rounded-full mb-4 shadow-md">{edu.year}</div>
                      <div className="w-3 h-3 bg-yellow-500 rotate-45 mb-4 group hover:scale-150 transition-transform shadow-lg"></div>
                      <h3 className="font-bold text-xs uppercase mb-1 leading-tight">{edu.degree}</h3>
                      <p className="text-[9px] text-gray-500 font-black uppercase">{edu.institution}</p>
                   </div>
                ))}
             </div>
          </section>

          <div className="grid grid-cols-12 gap-10 mt-6">
             <div className="col-span-12 md:col-span-8">
                <h2 className="text-xl font-black uppercase text-[#1e1a4f] mb-6 flex items-center gap-4">
                   <span className="text-orange-500">▶▶</span> SOFTWARE & SKILLS
                </h2>
                <div className="flex flex-wrap gap-8">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex flex-col items-center gap-3">
                         <div className="w-16 h-16 rounded-full border-4 border-gray-100 flex items-center justify-center p-1 bg-white relative shadow-lg">
                            <span className="font-black text-[9px] absolute">{(95 - (i*10))}%</span>
                            <svg className="w-full h-full transform -rotate-90">
                               <circle cx="28" cy="28" r="26" fill="transparent" stroke="#e5e7eb" strokeWidth="4"/>
                               <circle cx="28" cy="28" r="26" fill="transparent" stroke={i%2===0 ? "#f97316" : "#fbbf24"} strokeWidth="4" strokeDasharray="163" strokeDashoffset={`${163 * (i * 0.1)}`}/>
                            </svg>
                         </div>
                         <span className="text-[9px] uppercase font-black text-gray-600 w-16 text-center">{s}</span>
                      </div>
                   ))}
                </div>
             </div>
             <div className="col-span-12 md:col-span-4 bg-[#1e1a4f] p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-x-4 -translate-y-4"></div>
                <h2 className="text-lg font-black uppercase mb-6 tracking-widest italic text-yellow-400">CONTACT INFO</h2>
                <div className="space-y-4 text-[10px] font-bold uppercase tracking-tight">
                   <p className="flex justify-between items-center bg-white/10 p-2 rounded-lg"><span className="opacity-50">LOCATION:</span> <span>{data.address || "NY, City"}</span></p>
                   <p className="flex justify-between items-center bg-white/10 p-2 rounded-lg"><span className="opacity-50">EMAIL:</span> <span>{data.email}</span></p>
                   <p className="flex justify-between items-center bg-white/10 p-2 rounded-lg"><span className="opacity-50">PHONE:</span> <span>{data.phone}</span></p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Template 31: Creative Minimal Impact (Image 4) 🏁 ---
const CreativeMinimalImpactTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-900 border-[32px] border-gray-50 p-12 flex flex-col gap-12">
       <header className="flex flex-col items-center">
          <div className="bg-black text-white px-10 py-8 w-full max-w-2xl text-center transform hover:scale-[1.02] transition-transform shadow-2xl">
             <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2">{data.fullName}</h1>
             <div className="h-1 w-20 bg-white mx-auto mt-4 mb-4"></div>
             <p className="text-xs uppercase font-bold tracking-[0.5em] text-gray-400 italic">Profession / Job Title</p>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-16 flex-1 px-10">
          <div className="col-span-12 md:col-span-7 flex flex-col gap-12 border-r border-gray-100 pr-12">
             <section>
                <h2 className="text-xs font-black uppercase mb-6 tracking-[0.3em] inline-block border-b-2 border-black pb-1">Advertised Position Within Company</h2>
                <p className="text-xs leading-relaxed text-gray-500 font-medium italic border-l-4 border-gray-50 pl-6 mb-8">{data.summary || "Passionate professional with target-driven approach..."}</p>
                <div className="text-[11px] text-gray-400 space-y-4 font-medium italic">
                   <p>Dear Hiring Manager,</p>
                   <p>I wish to apply for the role of Creative Director currently being advertised. Please find enclosed my attached resume, I have over 10+ years experience in the design industry and I am confident that I can bring the level of success with me to your organization.</p>
                   <p>Thank you for your time and consideration. I look forward to meeting with you to discuss my application further.</p>
                   <p className="font-bold text-gray-800">Sincerely,<br/>{data.fullName}</p>
                </div>
             </section>

             <section>
                <h2 className="text-xs font-black uppercase mb-8 tracking-[0.3em] inline-block border-b-2 border-black pb-1">Skills</h2>
                <div className="space-y-6">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex flex-col gap-2">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase">
                            <span>{s}</span>
                            <span className="text-gray-300">Level {5-i}</span>
                         </div>
                         <div className="h-2 w-full bg-gray-50 relative">
                            <div className="h-full bg-black group-hover:bg-[#ff8c00] transition-all" style={{ width: `${Math.max(30, 100 - (i*15))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col gap-10">
             <section>
                <h2 className="text-xs font-black uppercase mb-6 tracking-[0.3em] inline-block border-b-2 border-black pb-1">Education</h2>
                <div className="space-y-8">
                   {data.education?.map((edu, i) => (
                      <div key={i}>
                         <div className="text-[9px] font-black text-gray-300 mb-1">{edu.year}</div>
                         <h3 className="font-black text-xs uppercase leading-tight group-hover:underline">{edu.degree}</h3>
                         <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase italic">{edu.institution}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-xs font-black uppercase mb-6 tracking-[0.3em] inline-block border-b-2 border-black pb-1">Experience</h2>
                <div className="space-y-8">
                   {data.experience?.map((exp, i) => (
                      <div key={i}>
                         <div className="text-[9px] font-black text-gray-300 mb-1">{exp.duration}</div>
                         <h3 className="font-black text-xs uppercase leading-tight">{exp.title}</h3>
                         <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase italic mb-2">at {exp.company}</p>
                         <p className="text-[10px] text-gray-500 leading-relaxed italic line-clamp-2">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section className="bg-gray-50 p-8 transform hover:scale-105 transition-transform">
                <h2 className="text-xs font-black uppercase mb-6 tracking-[0.3em] inline-block border-b-2 border-black pb-1">Contact</h2>
                <div className="space-y-3 text-[10px] font-bold text-gray-600">
                   <p className="flex items-center gap-3">📍 {data.address || "City, State, Zip"}</p>
                   <p className="flex items-center gap-3">✉ {data.email}</p>
                   <p className="flex items-center gap-3">📞 {data.phone}</p>
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 32: Creative Futuristic Arrows (Image 5) ⚡ ---
const CreativeFuturisticArrowsTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-[#1c1c1c] font-sans text-gray-300 p-12 relative overflow-hidden group">
       {/* Glowing Arrow Background Elements */}
       <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-1000">
          <svg className="w-full h-full text-orange-500" viewBox="0 0 100 100">
             <path d="M10,10 L90,10 L90,20 L10,20 Z" fill="currentColor" />
             <path d="M30,30 L90,30 L90,40 L30,40 Z" fill="currentColor" />
             <path d="M50,50 L90,50 L90,60 L50,60 Z" fill="currentColor" />
             <polygon points="90,15 100,15 100,5 90,5" fill="currentColor" />
          </svg>
       </div>
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-5 pointer-events-none">
          <svg className="w-full h-full text-yellow-400 rotate-180" viewBox="0 0 100 100">
             <path d="M10,10 L90,10 L90,20 L10,20 Z" fill="currentColor" />
             <path d="M40,40 L90,40 L90,50 L40,50 Z" fill="currentColor" />
             <polygon points="90,15 100,15 100,5 90,5" fill="currentColor" />
          </svg>
       </div>

       <header className="relative z-10 flex flex-col mb-16 pt-10">
          <div className="flex gap-4 items-center">
             <div className="h-2 w-16 bg-[#ff8c00]"></div>
             <h1 className="text-7xl font-black uppercase text-white tracking-tighter leading-[0.8] flex flex-col">
                <span className="text-[#ff8c00]">{data.fullName?.split(' ')[0]}</span>
                <span>{data.fullName?.split(' ').slice(1).join(' ')}</span>
             </h1>
          </div>
          <p className="text-xl font-bold text-gray-500 uppercase tracking-[0.3em] mt-6 flex items-center gap-4">
             <span className="p-1 border border-gray-700 rounded text-xs bg-gray-800">📁</span> PERSONAL PROFILE
          </p>
          <div className="h-px w-full bg-gradient-to-r from-gray-700 to-transparent mt-4 mb-4"></div>
          <p className="text-xs leading-relaxed text-gray-400 font-medium max-w-4xl italic">{data.summary}</p>
       </header>

       <div className="grid grid-cols-12 gap-16 relative z-10">
          <div className="col-span-12 md:col-span-8 space-y-16">
             <section>
                <div className="flex items-center gap-6 mb-10">
                   <div className="p-3 bg-[#ff8c00] text-black">⚙</div>
                   <h2 className="text-3xl font-black uppercase text-white tracking-widest italic group-hover:translate-x-2 transition-transform">WORK EXPERIENCE</h2>
                </div>
                <div className="space-y-16 pl-12 border-l border-white/5 relative">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="relative group">
                         <div className="absolute -left-[61px] top-0 w-6 h-6 border-2 border-[#ff8c00] bg-zinc-900 z-10 flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#ff8c00] group-hover:scale-150 transition-transform"></div>
                         </div>
                         <div className="flex justify-between items-baseline mb-3">
                            <h3 className="font-extrabold text-2xl uppercase tracking-tighter text-white">{exp.title}</h3>
                            <span className="text-[#ff8c00] font-black text-sm italic">{exp.duration}</span>
                         </div>
                         <p className="text-xs font-black text-gray-500 mb-4 uppercase tracking-[0.2em] italic">@ {exp.company}</p>
                         <p className="text-[13px] text-gray-400 leading-relaxed font-bold italic line-clamp-3">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <div className="flex items-center gap-6 mb-10">
                   <div className="p-3 bg-[#ff8c00] text-black">⚡</div>
                   <h2 className="text-3xl font-black uppercase text-white tracking-widest italic group-hover:translate-x-2 transition-transform">TOP SKILLS</h2>
                </div>
                <div className="flex flex-wrap gap-8">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="group flex flex-col gap-3 min-w-[140px]">
                         <div className="flex justify-between items-end border-b-4 border-gray-800 pb-2 group-hover:border-[#ff8c00] transition-colors">
                            <span className="text-[10px] font-black uppercase text-white tracking-tight">{s}</span>
                            <span className="text-[9px] font-bold text-gray-600">Lvl 0{4-i}</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 relative overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#ff8c00] to-yellow-500 shadow-[0_0_10px_#ff8c00]" style={{ width: `${Math.max(30, 95 - (i*15))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-16 border-l-2 border-white/5 pl-12 bg-white/[0.02] p-8 rounded-3xl backdrop-blur-sm">
             <section>
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-2 bg-[#ff8c00] text-black scale-75 rounded-full">🏆</div>
                   <h2 className="text-xl font-black uppercase text-white tracking-widest italic">ACHIEVEMENTS</h2>
                </div>
                <div className="space-y-8">
                   {data.projects?.slice(0, 3).map((proj, i) => (
                      <div key={i} className="border-b border-white/5 pb-6 last:border-0 hover:bg-white/[0.03] transition-all p-2 rounded-xl">
                         <h4 className="font-black text-sm uppercase text-gray-200 mb-2">{proj.name}</h4>
                         <p className="text-[10px] text-gray-500 leading-relaxed font-bold italic line-clamp-3">{proj.description}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-2 bg-[#ff8c00] text-black scale-75 rounded-full">🎓</div>
                   <h2 className="text-xl font-black uppercase text-white tracking-widest italic">EDUCATION</h2>
                </div>
                <div className="space-y-8">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="relative pl-6 border-l-2 border-[#ff8c00]/20">
                         <span className="text-[10px] font-black text-[#ff8c00] uppercase mb-1 block italic">{edu.year}</span>
                         <h4 className="font-bold text-sm tracking-tight text-white uppercase">{edu.degree}</h4>
                         <p className="text-[10px] text-gray-500 font-bold uppercase italic">{edu.institution}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <span className="text-4xl">📞</span>
                </div>
                <h2 className="text-xl font-black uppercase text-[#ff8c00] mb-8 tracking-[0.2em] italic border-b border-[#ff8c00]/20 pb-2">CONTACT</h2>
                <div className="space-y-6 text-[11px] font-bold uppercase leading-relaxed text-gray-400 tracking-tight">
                   <p className="flex justify-between items-center bg-white/5 p-2 rounded-lg hover:text-white transition-colors"><span>📧</span> <span>{data.email}</span></p>
                   <p className="flex justify-between items-center bg-white/5 p-2 rounded-lg hover:text-white transition-colors"><span>📱</span> <span>{data.phone}</span></p>
                   <p className="flex justify-between items-center bg-white/5 p-2 rounded-lg hover:text-white transition-colors"><span>📍</span> <span>{data.address || "City, State"}</span></p>
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};


// --- Template 33: Data Analyst Yellow Accent (Image 1) 📊 ---
const DataAnalystYellowAccentTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 flex flex-col p-0">
        <header className="bg-gray-100 p-8 flex items-end gap-8 border-b-8 border-gray-200">
           <div className="w-48 h-48 rounded-full border-8 border-[#333538] overflow-hidden shadow-2xl relative z-10 shrink-0">
              {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
           </div>
           <div className="flex-1 bg-[#fbbc05] p-6 mb-[-32px] shadow-xl relative z-20">
              <h1 className="text-4xl font-black uppercase tracking-tighter text-[#333538] leading-none mb-2">{data.fullName}</h1>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#333538]/70">Data Analyst</p>
           </div>
        </header>

        <div className="p-16 pt-24 space-y-12">
           <section>
              <h2 className="text-2xl font-black uppercase text-[#333538] mb-6 border-b-2 border-gray-100 pb-2">Professional Summary</h2>
              <p className="text-sm leading-relaxed text-gray-600 font-medium italic">{data.summary || "Results-driven Data Analyst with a strong foundation in data manipulation, statistical analysis..."}</p>
           </section>

           <div className="grid grid-cols-2 gap-16">
              <section>
                 <h2 className="text-xl font-black uppercase text-[#333538] mb-6 border-b-2 border-gray-100 pb-2">Core Competencies</h2>
                 <ul className="space-y-3 text-xs font-bold text-gray-500 italic">
                    {data.skills?.map((s, i) => <li key={i} className="flex items-center gap-3"><span className="text-[#fbbc05]">●</span> {s}</li>)}
                 </ul>
              </section>

              <section>
                 <h2 className="text-xl font-black uppercase text-[#333538] mb-6 border-b-2 border-gray-100 pb-2">Education</h2>
                 <div className="space-y-6">
                    {data.education?.map((edu, i) => (
                       <div key={i}>
                          <h4 className="font-bold text-gray-800 text-sm uppercase">{edu.degree}</h4>
                          <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase italic">{edu.institution} | {edu.year}</p>
                       </div>
                    ))}
                 </div>
              </section>
           </div>

           <section>
              <h2 className="text-2xl font-black uppercase text-[#333538] mb-8 border-b-2 border-gray-100 pb-2">Experience</h2>
              <div className="space-y-10">
                 {data.experience?.map((exp, i) => (
                    <div key={i} className="relative pl-8 border-l-4 border-[#fbbc05]">
                       <div className="absolute -left-[10px] top-0 w-4 h-4 bg-[#333538] rounded-full"></div>
                       <div className="flex justify-between items-baseline mb-2">
                          <h3 className="font-bold text-[#333538] uppercase text-lg">{exp.title}</h3>
                          <span className="text-xs font-black text-gray-400 italic">{exp.duration}</span>
                       </div>
                       <p className="text-[10px] text-gray-500 font-bold mb-3 uppercase italic">{exp.company}</p>
                       <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">{exp.description}</p>
                    </div>
                 ))}
              </div>
           </section>
        </div>
    </div>
  );
};

// --- Template 34: Data Analyst Blue Sidebar (Image 2) 📈 ---
const DataAnalystBlueSidebarTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 flex flex-col">
       <header className="bg-[#0c2a43] text-white p-12 flex justify-between items-center border-b-[10px] border-[#a5e1f0]">
          <div className="flex items-center gap-12">
             <div className="text-7xl font-black uppercase tracking-tighter text-[#a5e1f0] leading-none flex flex-col items-center">
                <span>{data.fullName?.split(' ')[0][0] || 'M'}</span>
                <div className="h-px w-12 bg-white/20 my-1"></div>
                <span>{data.fullName?.split(' ')[1]?.[0] || 'K'}</span>
             </div>
             <div>
                <h1 className="text-5xl font-light uppercase tracking-[0.2em] leading-none mb-2">{data.fullName}</h1>
                <p className="text-sm font-bold text-[#a5e1f0] tracking-[0.4em] uppercase opacity-80">Data Specialist</p>
             </div>
          </div>
          <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white/10 shadow-2xl">
             {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
          </div>
       </header>

       <div className="flex-1 flex pb-12">
          <aside className="w-[30%] bg-gray-50 p-10 flex flex-col gap-10">
             <section>
                <div className="space-y-4">
                   <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#0c2a43] text-white rounded shrink-0">📞</div>
                      <p className="text-[10px] font-bold text-gray-600 uppercase break-all">{data.phone}</p>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#0c2a43] text-white rounded shrink-0">✉</div>
                      <p className="text-[10px] font-bold text-gray-600 uppercase break-all">{data.email}</p>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#0c2a43] text-white rounded shrink-0">📍</div>
                      <p className="text-[10px] font-bold text-gray-600 uppercase italic">{data.address || "City, State"}</p>
                   </div>
                </div>
             </section>

             <section>
                <h2 className="text-lg font-black uppercase text-[#0c2a43] mb-6 tracking-widest border-b border-gray-200 pb-2">Skills</h2>
                <div className="space-y-3">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex justify-between items-center">
                         <span className="text-[10px] font-black uppercase text-gray-500">{s}</span>
                         <span className="text-[9px] font-bold text-[#0c2a43]">{7-i}/10</span>
                      </div>
                   ))}
                </div>
             </section>
          </aside>

          <main className="flex-1 p-12 flex flex-col gap-12">
             <section>
                <h2 className="text-xl font-black uppercase text-gray-400 mb-6 tracking-[0.3em]">About Me</h2>
                <p className="text-sm leading-relaxed text-gray-500 font-medium italic">{data.summary}</p>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase text-gray-400 mb-8 tracking-[0.3em]">Experience</h2>
                <div className="space-y-10">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="group">
                         <h3 className="font-black text-[#0c2a43] text-base uppercase mb-1">{exp.title}</h3>
                         <p className="text-[10px] text-gray-400 font-black mb-3 uppercase italic">{exp.company} | {exp.duration}</p>
                         <p className="text-xs text-gray-500 leading-relaxed italic">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>
          </main>
       </div>
    </div>
  );
};

// --- Template 35: Data Analyst Clean Structured (Image 3 Top-Left) 🔍 ---
const DataAnalystCleanStructuredTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-900 border-[24px] border-gray-50 p-16 flex flex-col gap-16 overflow-hidden">
       <header className="flex justify-between items-end border-b-4 border-black pb-8">
          <div>
             <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2">{data.fullName}</h1>
             <p className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 italic">Data Management Specialist</p>
          </div>
          <div className="text-right text-[10px] font-bold text-gray-500 leading-relaxed uppercase border-r-4 border-black pr-6">
             <p>{data.email}</p>
             <p>{data.phone}</p>
             <p>{data.address || "Main Street, NY"}</p>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-16 flex-1">
          <div className="col-span-12 md:col-span-7 flex flex-col gap-12">
             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-gray-100 mb-6 flex items-center gap-3">
                   <div className="w-3 h-3 bg-black"></div> WORK EXPERIENCE
                </h2>
                <div className="space-y-12">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="relative group">
                         <h3 className="font-black text-xl uppercase mb-1 leading-tight group-hover:text-blue-600 transition-colors">{exp.title}</h3>
                         <p className="text-[11px] font-black text-gray-400 uppercase italic mb-4">{exp.company} • {exp.duration}</p>
                         <div className="pl-6 border-l-2 border-gray-100 italic text-xs leading-relaxed text-gray-500">
                            {exp.description}
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-gray-100 mb-6 flex items-center gap-3">
                   <div className="w-3 h-3 bg-black"></div> PROFESSIONAL SUMMARY
                </h2>
                <p className="text-xs leading-relaxed text-gray-500 font-medium italic px-6">{data.summary}</p>
             </section>
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col gap-10">
             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-gray-100 mb-6 flex items-center gap-3">
                   <div className="w-3 h-3 bg-black"></div> TECHNICAL SKILLS
                </h2>
                <div className="grid grid-cols-2 gap-4">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="bg-gray-50 p-2 rounded text-[10px] font-bold text-gray-600 border-l-2 border-black italic">
                         # {s}
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-lg font-black uppercase border-b-2 border-gray-100 mb-6 flex items-center gap-3">
                   <div className="w-3 h-3 bg-black"></div> EDUCATION
                </h2>
                <div className="space-y-6">
                   {data.education?.map((edu, i) => (
                      <div key={i}>
                         <h4 className="font-bold text-xs uppercase leading-tight">{edu.degree}</h4>
                         <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase italic">{edu.institution} | {edu.year}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section className="bg-black text-white p-8 rounded-3xl mt-auto shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rotate-45 translate-x-4 -translate-y-4"></div>
                <h2 className="text-sm font-black uppercase mb-4 tracking-widest text-[#a5e1f0]">INTERESTS</h2>
                <div className="flex gap-4 flex-wrap text-[9px] font-bold opacity-70 italic uppercase">
                   <span>Data Viz</span>
                   <span>Python</span>
                   <span>SQL</span>
                   <span>Machine Learning</span>
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 36: Data Analyst Premium Gold (Image 3 Top-Right) ✨ ---
const DataAnalystPremiumGoldTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-[#f8f9fa] font-sans text-gray-800 p-12">
       <header className="flex items-center gap-10 bg-white p-10 rounded-3xl shadow-xl mb-12 border-t-[12px] border-[#d4af37]">
          <div className="w-48 h-48 border-[10px] border-[#f8f9fa] rounded-full overflow-hidden shadow-inner shrink-0 relative">
             <div className="absolute inset-0 border-4 border-[#d4af37]/20 rounded-full"></div>
             {data.photo && <img src={data.photo} className="w-full h-full object-cover" />}
          </div>
          <div className="flex-1">
             <h1 className="text-6xl font-black uppercase tracking-tighter text-[#1a1c2c] leading-none mb-3 italic">{data.fullName}</h1>
             <p className="text-sm font-black text-[#d4af37] tracking-[0.5em] uppercase ml-1 italic opacity-80">Analytics Specialist</p>
             <div className="h-1 w-24 bg-[#1a1c2c] mt-6"></div>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-8 space-y-12">
             <section>
                <h2 className="text-xl font-black uppercase text-[#1a1c2c] mb-8 flex items-center gap-4">
                   <span className="text-[#d4af37] text-2xl italic font-serif">/</span> WORK EXPERIENCE
                </h2>
                <div className="space-y-12 pl-6 border-l-2 border-[#d4af37]/20">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="relative group">
                         <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-white border-4 border-[#d4af37] z-10 group-hover:scale-125 transition-transform"></div>
                         <div className="flex justify-between items-baseline mb-3 group-hover:translate-x-2 transition-transform">
                            <h3 className="font-extrabold text-2xl uppercase tracking-tighter text-[#1a1c2c]">{exp.title}</h3>
                            <span className="text-[#d4af37] font-black text-xs italic">{exp.duration}</span>
                         </div>
                         <p className="text-xs font-black text-gray-400 mb-4 uppercase tracking-[0.2em] italic">at {exp.company}</p>
                         <p className="text-sm text-gray-500 leading-relaxed italic">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase text-[#1a1c2c] mb-8 flex items-center gap-4">
                   <span className="text-[#d4af37] text-2xl italic font-serif">/</span> EDUCATION
                </h2>
                <div className="grid grid-cols-2 gap-8 pl-6 border-l-2 border-[#d4af37]/20">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                         <h4 className="font-extrabold text-sm text-[#1a1c2c] uppercase">{edu.degree}</h4>
                         <p className="text-[10px] text-[#d4af37] font-black mt-2 uppercase italic">{edu.institution} | {edu.year}</p>
                      </div>
                   ))}
                </div>
             </section>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-10">
             <section className="bg-[#1a1c2c] p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-x-4 -translate-y-4"></div>
                <h2 className="text-lg font-black uppercase mb-8 tracking-widest italic text-[#d4af37]">AREAS OF EXPERTISE</h2>
                <div className="space-y-6">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="group">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase mb-2">
                            <span className="text-gray-300 group-hover:text-[#d4af37] transition-colors">{s}</span>
                         </div>
                         <div className="flex gap-1.5">
                            {[1,2,3,4,5].map(dot => (
                               <div key={dot} className={`h-1.5 flex-1 rounded-full ${dot <= (5-i) ? 'bg-[#d4af37]' : 'bg-white/10'}`}></div>
                            ))}
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h2 className="text-lg font-black uppercase text-[#1a1c2c] mb-6 tracking-widest italic border-b-2 border-[#d4af37] inline-block">LANGUAGES</h2>
                <div className="space-y-4">
                   {['English', 'Hindi', 'German'].map((l, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px] font-bold text-gray-500 uppercase italic">
                         <span>{l}</span>
                         <div className="flex gap-1">
                            {[1,2,3,4,5].map(v => <div key={v} className={`w-2 h-2 rounded-full ${v <= (5-i) ? 'bg-[#1a1c2c]' : 'bg-gray-100'}`}></div>)}
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <div className="mt-auto bg-gray-900 rounded-3xl p-8 text-white">
                 <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-[#d4af37]">Contact</h2>
                 <div className="space-y-2 text-[10px] font-bold opacity-60 italic">
                    <p>{data.email}</p>
                    <p>{data.phone}</p>
                    <p>LinkedIn / GitHub</p>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
};


// --- Template 37: Business/MBA Corporate Blue (Image 1) 💼 ---
const BusinessMBACorporateBlueTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-serif text-[#1e1e4f] p-12 border-[16px] border-[#1e1e4f] relative">
       <header className="flex justify-between items-start mb-16 px-4">
          <div className="w-[30%] h-48 border-4 border-[#1e1e4f] p-1 scale-110">
             <div className="w-full h-full bg-gray-50 flex items-center justify-center overflow-hidden">
                {data.photo ? <img src={data.photo} className="w-full h-full object-cover" /> : <div className="text-4xl text-gray-200">PHOTO</div>}
             </div>
          </div>
          <div className="flex-1 text-right mt-4 pl-12 border-r-8 border-[#1e1e4f] pr-8">
             <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.8] mb-4">
                {data.fullName?.split(' ')[0]}<br/>
                {data.fullName?.split(' ').slice(1).join(' ')}
             </h1>
             <p className="text-lg font-bold text-gray-400 uppercase tracking-widest italic">{data.title || "Management Professional"}</p>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-12 px-4 flex-1">
          <div className="col-span-6 space-y-12 pr-6 border-r border-gray-100">
             <section>
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-4">
                   PROFILE <div className="h-2 w-12 bg-[#1e1e4f]"></div>
                </h2>
                <div className="space-y-3 text-xs font-medium leading-relaxed">
                   <p className="flex justify-between text-gray-500 uppercase"><span>Name:</span> <span className="font-bold text-[#1e1e4f]">{data.fullName}</span></p>
                   <p className="flex justify-between text-gray-500 uppercase"><span>Address:</span> <span className="font-bold text-[#1e1e4f]">{data.address || "Main Street, NY"}</span></p>
                   <p className="flex justify-between text-gray-500 uppercase"><span>Email:</span> <span className="font-bold text-[#1e1e4f] line-clamp-1">{data.email}</span></p>
                   <p className="flex justify-between text-gray-500 uppercase"><span>Phone:</span> <span className="font-bold text-[#1e1e4f]">{data.phone}</span></p>
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-4">
                   EDUCATION & AWARDS <div className="h-2 w-12 bg-[#1e1e4f]"></div>
                </h2>
                <div className="space-y-8">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="flex gap-4">
                         <span className="text-[10px] font-black italic text-gray-400 w-16 pt-1 shrink-0">{edu.year}</span>
                         <div>
                            <h4 className="font-bold text-xs uppercase">{edu.degree}</h4>
                            <p className="text-[10px] text-gray-400 font-bold mt-1 italic">{edu.institution}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>

          <div className="col-span-6 space-y-12">
             <section>
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-4">
                   SKILLS <div className="h-2 w-12 bg-[#1e1e4f]"></div>
                </h2>
                <div className="space-y-4">
                   {data.skills?.slice(0, 5).map((s, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                         <span className="text-[10px] font-black uppercase flex justify-between">
                            {s} <span className="opacity-40">{95 - (i*10)}%</span>
                         </span>
                         <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#1e1e4f]" style={{ width: `${Math.max(40, 95 - (i*12))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-4">
                   INTERESTS <div className="h-2 w-12 bg-[#1e1e4f]"></div>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                   {['Management', 'Strategy', 'Investing', 'Leadership'].map((l, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                         <span className="text-[10px] font-bold uppercase">{l}</span>
                         <div className="h-1 w-full bg-gray-100">
                            <div className="h-full bg-[#1e1e4f]" style={{ width: i === 0 ? '95%' : i === 1 ? '80%' : '60%' }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>

       <div className="mt-16 px-4">
          <section>
             <h2 className="text-xl font-black uppercase mb-8 flex items-center gap-4">
                WORK & EXPERIENCES <div className="h-2 w-24 bg-[#1e1e4f]"></div>
             </h2>
             <div className="space-y-10">
                {data.experience?.map((exp, i) => (
                   <div key={i} className="flex gap-8 border-b-2 border-gray-50 pb-8 last:border-0 relative">
                      <div className="absolute -left-12 top-2 text-[10px] font-black text-gray-300 w-24 text-right uppercase tracking-widest">{exp.duration}</div>
                      <div className="flex-1">
                         <h3 className="font-extrabold text-[#1e1e4f] uppercase text-lg leading-tight mb-2 italic">[{exp.title}]</h3>
                         <p className="text-[10px] text-gray-400 font-black mb-4 uppercase tracking-[0.2em] italic">at {exp.company}</p>
                         <p className="text-[11px] leading-relaxed text-gray-500 font-medium italic">{exp.description}</p>
                      </div>
                   </div>
                ))}
             </div>
          </section>
       </div>
    </div>
  );
};

// --- Template 38: Business/MBA Premium Yellow (Image 2) 🏆 ---
const BusinessMBAPremiumYellowTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-900 border-[32px] border-white relative overflow-hidden group">
       <div className="absolute top-0 right-0 p-8 opacity-40">
          <div className="grid grid-cols-5 gap-2">
             {[...Array(25)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>)}
          </div>
       </div>
       <div className="absolute bottom-0 left-0 p-8 opacity-40">
          <div className="grid grid-cols-5 gap-2">
             {[...Array(25)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#fbbc05] rounded-full"></div>)}
          </div>
       </div>

       <header className="relative z-10 flex flex-col mb-16 pt-12 pl-12 border-l-[16px] border-[#fbbc05]">
          <h1 className="text-8xl font-black uppercase tracking-tighter leading-[0.8] text-[#fbbc05] mb-2 drop-shadow-xl">{data.fullName?.split(' ')[0]} {data.fullName?.split(' ').slice(1).join(' ')}</h1>
          <p className="text-xl font-bold text-gray-800 uppercase tracking-[0.4em] mb-8">Business Strategy Leader</p>
          <div className="flex gap-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">
             <p className="flex items-center gap-2 italic">✉ {data.email}</p>
             <p className="flex items-center gap-2 italic">📞 {data.phone}</p>
             <p className="flex items-center gap-2 italic">📍 {data.address || "London, UK"}</p>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-12 px-12 relative z-10 flex-1">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-12">
             <section>
                <h2 className="text-2xl font-black uppercase mb-6 tracking-widest text-[#fbbc05] italic">Professional Profile</h2>
                <div className="bg-gray-50 p-8 border-l-4 border-gray-800 rounded-r-2xl italic text-[13px] leading-relaxed text-gray-600 font-medium">
                   {data.summary}
                </div>
             </section>

             <div className="grid grid-cols-2 gap-10">
                <section>
                   <h2 className="bg-[#fbbc05] text-[#333538] font-black px-4 py-2 text-sm uppercase tracking-widest mb-8 shadow-lg rotate-[-1deg]">Experience</h2>
                   <div className="space-y-12 pl-4 border-l-2 border-gray-100">
                      {data.experience?.map((exp, i) => (
                         <div key={i} className="relative group">
                            <div className="absolute -left-[26px] top-1.5 w-3.5 h-3.5 bg-white border-4 border-[#fbbc05] rounded-full z-10"></div>
                            <h3 className="font-bold text-[#333538] text-base uppercase mb-1">{exp.title}</h3>
                            <p className="text-[10px] font-black text-[#fbbc05] mb-2 uppercase italic">{exp.company} • {exp.duration}</p>
                            <p className="text-[11px] text-gray-500 italic line-clamp-3">{exp.description}</p>
                         </div>
                      ))}
                   </div>
                </section>
                <section>
                   <h2 className="bg-[#fbbc05] text-[#333538] font-black px-4 py-2 text-sm uppercase tracking-widest mb-8 shadow-lg rotate-[1deg]">Education</h2>
                   <div className="space-y-12 pl-4 border-l-2 border-gray-100">
                      {data.education?.map((edu, i) => (
                         <div key={i} className="relative group">
                            <div className="absolute -left-[26px] top-1.5 w-3.5 h-3.5 bg-white border-4 border-[#fbbc05] rounded-full z-10"></div>
                            <h3 className="font-bold text-[#333538] text-base uppercase mb-1">{edu.degree}</h3>
                            <p className="text-[10px] font-black text-[#fbbc05] mb-2 uppercase italic">{edu.institution} • {edu.year}</p>
                         </div>
                      ))}
                   </div>
                </section>
             </div>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-12">
             <section className="bg-gray-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <div className="w-24 h-24 bg-white rotate-45"></div>
                </div>
                <h2 className="text-lg font-black uppercase mb-8 tracking-widest italic text-[#fbbc05]">Core Skills</h2>
                <div className="space-y-6">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="group">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase mb-2">
                            <span className="text-gray-300">{s}</span>
                         </div>
                         <div className="flex gap-1.5 flex-wrap">
                            {[1,2,3,4,5,6,7,8,9,10].map(dot => (
                               <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= (10-i) ? 'bg-[#fbbc05]' : 'bg-white/10'}`}></div>
                            ))}
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section className="border-4 border-gray-100 p-8 rounded-3xl">
                <h2 className="text-xl font-black uppercase mb-6 tracking-widest italic border-b-2 border-gray-800 inline-block">Hobbies</h2>
                <div className="flex gap-3 flex-wrap">
                   {['Strategy', 'Travel', 'Golf', 'Reading'].map((h, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded text-[10px] font-black uppercase italic tracking-tighter shadow-sm">{h}</span>
                   ))}
                </div>
             </section>

             <div className="mt-auto bg-[#fbbc05] p-8 rounded-3xl text-[#333538] shadow-xl hover:rotate-[-2deg] transition-transform">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 border-b border-black/10 pb-2">Business Excellence</h2>
                <p className="text-[10px] font-bold italic leading-relaxed opacity-70">Aiming to leverage management expertise for organizational growth and strategic transformation.</p>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Template 39: Business/MBA Elegant Salmon (Image 3) 🌸 ---
const BusinessMBAElegantSalmonTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-[#fdfaf5] font-sans text-gray-800 p-12 relative overflow-hidden">
       {/* Striped Background Pattern */}
       <div className="absolute top-0 left-0 w-full h-[300px] opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] mt-32"></div>
       
       <header className="flex justify-between items-center mb-16 relative z-10 px-8">
          <div className="flex-1 border-b-8 border-[#333538] pb-10">
             <div className="bg-[#333538] text-white px-6 py-2 inline-block mb-4 shadow-xl">
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">{data.fullName}</h1>
             </div>
             <p className="text-xl font-black text-[#e89d81] uppercase tracking-[0.4em] ml-2 italic">Corporate Strategist</p>
          </div>
          <div className="text-right border-l-4 border-[#e89d81] pl-8 pb-10 mt-[-20px] text-[11px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
             <p>{data.email}</p>
             <p>{data.phone}</p>
             <p>{data.address || "New York, USA"}</p>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-16 px-8 relative z-10 flex-1">
          <div className="col-span-12 md:col-span-7 flex flex-col gap-12">
             <section>
                <div className="bg-[#e89d81] text-white px-4 py-1 inline-flex items-center gap-4 rounded mb-8 shadow-md">
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                   <h2 className="text-sm font-black uppercase tracking-widest">Professional Profile</h2>
                </div>
                <div className="bg-white/80 p-6 rounded-3xl border border-[#e89d81]/20 shadow-sm transition-all hover:shadow-lg backdrop-blur-sm italic text-xs leading-relaxed text-gray-500 font-medium whitespace-pre-wrap">
                   {data.summary}
                </div>
             </section>

             <div className="grid grid-cols-2 gap-12">
                <section>
                   <div className="bg-[#e89d81] text-white px-4 py-1 inline-flex items-center gap-4 rounded mb-8 shadow-md">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <h2 className="text-sm font-black uppercase tracking-widest">Education</h2>
                   </div>
                   <div className="space-y-10 pl-4 border-l-2 border-[#e89d81]/20">
                      {data.education?.map((edu, i) => (
                         <div key={i}>
                            <h3 className="font-extrabold text-gray-800 text-sm uppercase leading-tight">{edu.degree}</h3>
                            <p className="text-[10px] text-[#e89d81] font-black mt-1 uppercase italic">{edu.institution} | {edu.year}</p>
                         </div>
                      ))}
                   </div>
                </section>
                <section>
                   <div className="bg-[#e89d81] text-white px-4 py-1 inline-flex items-center gap-4 rounded mb-8 shadow-md">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <h2 className="text-sm font-black uppercase tracking-widest">Experience</h2>
                   </div>
                   <div className="space-y-10 pl-4 border-l-2 border-[#e89d81]/20">
                      {data.experience?.slice(0, 2).map((exp, i) => (
                         <div key={i}>
                            <h3 className="font-extrabold text-gray-800 text-sm uppercase leading-tight">{exp.title}</h3>
                            <p className="text-[10px] text-[#e89d81] font-black mt-1 uppercase italic">{exp.company} | {exp.duration}</p>
                         </div>
                      ))}
                   </div>
                </section>
             </div>
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col gap-10">
             <section className="bg-white p-8 rounded-3xl border border-[#e89d81]/10 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#e89d81] group-hover:w-full transition-all duration-700 opacity-10"></div>
                <div className="bg-[#e89d81] text-white px-4 py-1 inline-flex items-center gap-4 rounded mb-8 shadow-md relative z-10">
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                   <h2 className="text-sm font-black uppercase tracking-widest">Technical Skills</h2>
                </div>
                <div className="space-y-4 relative z-10">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase text-gray-600 italic">
                         <span>{s}</span>
                         <div className="flex gap-1.5">
                            {[1,2,3,4,5,6,7,8,9,10].map(dot => <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= (10-i) ? 'bg-[#e89d81]' : 'bg-gray-100'}`}></div>)}
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section className="bg-white p-8 rounded-3xl border border-[#e89d81]/10 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#e89d81] group-hover:w-full transition-all duration-700 opacity-10"></div>
                <div className="bg-[#e89d81] text-white px-4 py-1 inline-flex items-center gap-4 rounded mb-8 shadow-md relative z-10">
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                   <h2 className="text-sm font-black uppercase tracking-widest">Languages</h2>
                </div>
                <div className="space-y-4 relative z-10">
                   {['English', 'Spanish', 'French'].map((l, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase text-gray-600 italic">
                         <span>{l}</span>
                         <div className="flex gap-1.5">
                            {[1,2,3,4,5,6,7,8,9,10].map(dot => <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= (8-i) ? 'bg-[#333538]' : 'bg-gray-100'}`}></div>)}
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <div className="mt-auto flex justify-center gap-10 text-[9px] font-black uppercase text-[#e89d81] italic tracking-widest border-t border-[#e89d81]/20 pt-10">
                <p>SPORT</p>
                <p>COOKING</p>
                <p>ORIGAMI</p>
                <p>MUSIC</p>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Template 40: Business/MBA Executive Monochrome (Premium) 🎩 ---
const BusinessMBAExecutiveMonochromeTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-serif text-gray-900 border-[40px] border-gray-50 flex flex-col p-16 overflow-hidden">
       <header className="mb-20 pb-12 border-b-4 border-black flex justify-between items-end">
          <div>
             <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-4 italic flex flex-col">
                <span>{data.fullName?.split(' ')[0]}</span>
                <span className="text-gray-300 transform scale-x-110 origin-left">{data.fullName?.split(' ').slice(1).join(' ')}</span>
             </h1>
             <p className="text-xl font-bold uppercase tracking-[0.3em] text-gray-400">Chief Management Officer</p>
          </div>
          <div className="text-right text-xs font-black uppercase leading-relaxed tracking-widest italic flex flex-col gap-1 border-r-8 border-black pr-8">
             <p>{data.email}</p>
             <p>{data.phone}</p>
             <p>{data.address || "Corporate HQ, NY"}</p>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-20 flex-1">
          <div className="col-span-12 md:col-span-8 space-y-16">
             <section>
                <h2 className="text-2xl font-black uppercase mb-10 tracking-[0.2em] border-l-[10px] border-black pl-8 italic">Mission & Purpose</h2>
                <p className="text-sm leading-relaxed text-gray-500 font-medium italic whitespace-pre-wrap pl-10 border-l border-gray-100">
                   {data.summary}
                </p>
             </section>

             <section>
                <h2 className="text-2xl font-black uppercase mb-10 tracking-[0.2em] border-l-[10px] border-black pl-8 italic">Professional Experience</h2>
                <div className="space-y-12 pl-10 border-l border-gray-100">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="group relative">
                         <div className="absolute -left-[51px] top-1 w-2 h-10 bg-black z-10 group-hover:bg-gray-300 transition-colors"></div>
                         <div className="flex justify-between items-baseline mb-3">
                            <h3 className="font-extrabold text-2xl uppercase text-black italic group-hover:translate-x-2 transition-transform">{exp.title}</h3>
                            <span className="text-gray-400 font-black text-xs uppercase tracking-widest">{exp.duration}</span>
                         </div>
                         <p className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-[0.3em] italic">Enterprise: {exp.company}</p>
                         <p className="text-[13px] text-gray-500 leading-relaxed font-bold italic line-clamp-4">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-16 border-l-2 border-gray-50 pl-16">
             <section>
                <h2 className="text-xl font-black uppercase mb-8 tracking-[0.2em] italic text-gray-300">Management Skills</h2>
                <div className="space-y-8">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="group">
                         <p className="text-[11px] font-black uppercase mb-3 flex items-center gap-3">
                            <span className="w-2 h-2 bg-black rounded-full"></span> {s}
                         </p>
                         <div className="h-1 w-full bg-gray-50 relative overflow-hidden">
                            <div className="h-full bg-black group-hover:bg-gray-300 transition-all" style={{ width: `${Math.max(30, 95 - (i*15))}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase mb-8 tracking-[0.2em] italic text-gray-300">Education</h2>
                <div className="space-y-10">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="relative group p-4 border border-white hover:border-gray-50 transition-all rounded-3xl">
                         <span className="text-[10px] font-black text-gray-300 uppercase mb-2 block italic">{edu.year}</span>
                         <h4 className="font-bold text-sm tracking-tight text-black uppercase leading-tight">{edu.degree}</h4>
                         <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase italic">{edu.institution}</p>
                      </div>
                   ))}
                </div>
             </section>

             <div className="mt-auto bg-black text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 p-4 opacity-5 rotate-45 transform scale-150">
                   <div className="w-32 h-32 bg-white"></div>
                </div>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-gray-400">Executive HQ</h2>
                <p className="text-[10px] font-bold italic opacity-60 leading-relaxed group-hover:opacity-100 transition-opacity">Expertise in operational leadership and board-level strategy execution.</p>
             </div>
          </div>
       </div>
    </div>
  );
};


// --- Template 41: ATS Hybrid Clean Design (Image 1) 🎯 ---
const ATSHybridCleanDesignTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-[#333538] p-16 flex flex-col gap-12 overflow-hidden">
       <header className="flex justify-between items-start border-b-2 border-gray-100 pb-10">
          <div>
             <h1 className="text-5xl font-black uppercase tracking-tighter text-black leading-none mb-2">{data.fullName}</h1>
             <p className="text-lg font-bold text-gray-400 uppercase tracking-widest">{data.title || "Professional Specialist"}</p>
          </div>
          <div className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pt-2">
             YOUR EMAIL: {data.email}
          </div>
       </header>

       <div className="text-center py-4 bg-gray-50 rounded-xl">
          <h2 className="text-3xl font-black uppercase tracking-[0.3em] text-[#333538]">Design ATS Resume</h2>
       </div>

       <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <ul className="grid grid-cols-2 gap-4 text-xs font-bold text-gray-600 uppercase italic">
             <li className="flex items-center gap-3"><span className="text-black">•</span> Contact Number: {data.phone}</li>
             <li className="flex items-center gap-3"><span className="text-black">•</span> Address: {data.address || "City, State"}</li>
             <li className="flex items-center gap-3 col-span-2"><span className="text-black">•</span> Portfolio/LinkedIn: https://linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '')}</li>
          </ul>
       </section>

       <main className="flex-1 space-y-12">
          <section>
             <h3 className="text-xl font-black uppercase text-black mb-6 border-b-2 border-gray-100 pb-2">Professional Summary</h3>
             <p className="text-sm leading-relaxed text-gray-500 font-medium italic">{data.summary}</p>
          </section>

          <section>
             <h3 className="text-xl font-black uppercase text-black mb-6 border-b-2 border-gray-100 pb-2">Education</h3>
             <div className="space-y-6">
                {data.education?.map((edu, i) => (
                   <div key={i} className="group">
                      <h4 className="font-bold text-gray-800 text-sm uppercase">{edu.degree}</h4>
                      <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 mt-1 uppercase italic">
                         <span>• [{edu.institution}]</span>
                         <span>Graduated: [{edu.year}]</span>
                      </div>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h3 className="text-xl font-black uppercase text-black mb-8 border-b-2 border-gray-100 pb-2">Work Experience</h3>
             <div className="space-y-10">
                {data.experience?.map((exp, i) => (
                   <div key={i} className="relative pl-6 border-l-2 border-black group">
                      <div className="absolute -left-[7px] top-1 w-3 h-3 bg-white border-2 border-black rounded-full transition-transform group-hover:scale-150"></div>
                      <h4 className="font-extrabold text-black uppercase text-base mb-1">{exp.title}</h4>
                      <p className="text-[10px] text-gray-400 font-black mb-3 uppercase italic">[{exp.company}] • [{exp.duration}]</p>
                      <p className="text-xs text-gray-500 leading-relaxed italic">{exp.description}</p>
                   </div>
                ))}
             </div>
          </section>
       </main>
    </div>
  );
};

// --- Template 42: ATS Gold Standard Classic (Image 2) 🏆 ---
const ATSGoldStandardClassicTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-serif text-[#1a1a1a] p-16 flex flex-col gap-10 overflow-hidden leading-snug">
       <header className="text-center border-b-[3px] border-black pb-8">
          <h1 className="text-5xl font-bold tracking-tight mb-3">{data.fullName}</h1>
          <p className="text-sm font-medium tracking-wide flex justify-center gap-4 items-center italic">
             <span>{data.email}</span>
             <span className="text-gray-300 font-light">|</span>
             <span>{data.phone}</span>
             <span className="text-gray-300 font-light">|</span>
             <span>{data.address || "New York, USA"}</span>
          </p>
       </header>

       <main className="flex-1 space-y-10">
          <section>
             <h3 className="text-sm font-black uppercase tracking-[0.1em] border-b border-black mb-4 pb-1">Experience</h3>
             <div className="space-y-8">
                {data.experience?.map((exp, i) => (
                   <div key={i}>
                      <div className="flex justify-between items-baseline mb-1">
                         <h4 className="font-bold text-base">{exp.company}</h4>
                         <span className="text-xs font-bold">{exp.duration}</span>
                      </div>
                      <div className="flex justify-between items-baseline mb-3 text-xs italic font-medium">
                         <span>{exp.title}</span>
                         <span className="text-gray-500">{data.address?.split(',')[0] || "Global HQ"}</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-[11px] leading-relaxed text-gray-800">
                         {exp.description?.split('.').filter(s => s.trim()).map((bullet, bi) => (
                            <li key={bi} className="italic">{bullet.trim()}.</li>
                         ))}
                      </ul>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h3 className="text-sm font-black uppercase tracking-[0.1em] border-b border-black mb-4 pb-1">Education</h3>
             <div className="space-y-6">
                {data.education?.map((edu, i) => (
                   <div key={i}>
                      <div className="flex justify-between items-baseline mb-1">
                         <h4 className="font-bold text-base">{edu.institution}</h4>
                         <span className="text-xs font-bold">{edu.year}</span>
                      </div>
                      <p className="text-xs italic font-medium">{edu.degree}</p>
                   </div>
                ))}
             </div>
          </section>

          <section>
             <h3 className="text-sm font-black uppercase tracking-[0.1em] border-b border-black mb-4 pb-1">Other</h3>
             <div className="space-y-3 text-[11px] font-medium leading-relaxed italic">
                <p><span className="font-bold uppercase tracking-wider pr-2">Technical Skills:</span> {data.skills?.join(', ') || "Leadership, Strategy, Analysis"}</p>
                <p><span className="font-bold uppercase tracking-wider pr-2">Certifications & Training:</span> Certified Professional Specialist, Executive Leadership Program</p>
                <p><span className="font-bold uppercase tracking-wider pr-2">Languages:</span> English (Native), Hindi (Professional), German (Intermediate)</p>
             </div>
          </section>
       </main>
    </div>
  );
};

// --- Template 43: ATS Insightful Categorized (Image 3) 💡 ---
const ATSInsightfulCategorizedTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-[#333538] p-16 flex flex-col gap-10 overflow-hidden">
       <header className="flex justify-between items-start border-b-2 border-gray-100 pb-8">
          <div>
             <h1 className="text-5xl font-black uppercase tracking-tighter text-black leading-none mb-2">{data.fullName}</h1>
             <p className="text-lg font-bold text-gray-400 uppercase tracking-widest">{data.title || "Insightful Professional"}</p>
          </div>
          <div className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pt-2">
             YOUR EMAIL: {data.email}
          </div>
       </header>

       <div className="text-center py-4 bg-gray-50 rounded-xl border border-gray-100">
          <h2 className="text-3xl font-black uppercase tracking-[0.3em] text-[#333538]">Insightful ATS Resume</h2>
       </div>

       <main className="flex-1 grid grid-cols-12 gap-12">
          <div className="col-span-12 space-y-12">
             <section className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <ul className="grid grid-cols-3 gap-6 text-[10px] font-black text-gray-500 uppercase italic">
                   <li className="flex flex-col gap-1"><span>Contact:</span> <span className="text-black text-xs font-bold">{data.phone}</span></li>
                   <li className="flex flex-col gap-1"><span>Location:</span> <span className="text-black text-xs font-bold">{data.address || "Remote"}</span></li>
                   <li className="flex flex-col gap-1"><span>Portfolio:</span> <span className="text-black text-xs font-bold break-all">linkedin.com/in/{data.fullName?.split(' ')[0].toLowerCase()}</span></li>
                </ul>
             </section>

             <section>
                <h3 className="text-xl font-black uppercase text-black mb-6 border-b-2 border-gray-100 pb-2">Professional Summary</h3>
                <p className="text-[13px] leading-relaxed text-gray-500 font-medium italic border-l-4 border-black pl-6">{data.summary}</p>
             </section>

             <section>
                <h3 className="text-xl font-black uppercase text-black mb-8 border-b-2 border-gray-100 pb-2">Key Skills</h3>
                <div className="grid grid-cols-3 gap-8">
                   <div className="space-y-4">
                      <h4 className="text-[11px] font-black uppercase text-gray-900 mb-2 border-b border-black w-fit pr-4">Leadership & Strategy</h4>
                      <ul className="space-y-2 text-[10px] font-bold text-gray-500 italic">
                         <li>• Management</li>
                         <li>• Analytical Thinking</li>
                         <li>• Operations</li>
                      </ul>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-[11px] font-black uppercase text-gray-900 mb-2 border-b border-black w-fit pr-4">Technical Execution</h4>
                      <ul className="space-y-2 text-[10px] font-bold text-gray-500 italic">
                         {data.skills?.slice(0, 3).map((s, i) => <li key={i}>• {s}</li>)}
                      </ul>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-[11px] font-black uppercase text-gray-900 mb-2 border-b border-black w-fit pr-4">Communication</h4>
                      <ul className="space-y-2 text-[10px] font-bold text-gray-500 italic">
                         <li>• Stakeholder Relations</li>
                         <li>• Team Building</li>
                         <li>• Collaboration</li>
                      </ul>
                   </div>
                </div>
             </section>

             <section>
                <h3 className="text-xl font-black uppercase text-black mb-8 border-b-2 border-gray-100 pb-2">Experience</h3>
                <div className="space-y-10">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="group">
                         <div className="flex justify-between items-baseline mb-2">
                            <h4 className="font-extrabold text-black uppercase text-base transition-colors group-hover:text-blue-600">{exp.title}</h4>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{exp.duration}</span>
                         </div>
                         <p className="text-[10px] text-gray-400 font-black mb-4 uppercase italic">Company: {exp.company}</p>
                         <p className="text-xs text-gray-500 leading-relaxed italic border-l-2 border-gray-100 pl-6 group-hover:border-black transition-all">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </main>
    </div>
  );
};


// --- Template 44: Executive Teal Photo (Image 1) 🕴️ ---
const ExecutiveTealPhotoTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 flex flex-col p-0 overflow-hidden">
       <header className="flex p-0">
          <div className="w-[30%] bg-gray-200">
             {data.photo ? <img src={data.photo} className="w-full h-64 object-cover" /> : <div className="w-full h-64 bg-gray-300"></div>}
          </div>
          <div className="flex-1 bg-[#2d5a57] text-white p-12 flex flex-col justify-center">
             <h1 className="text-5xl font-light tracking-widest uppercase mb-2 border-b border-white/20 pb-4">[{data.fullName || "Your Name"}]</h1>
             <p className="text-xl font-bold uppercase tracking-[0.3em] opacity-80">Executive</p>
          </div>
       </header>

       <div className="bg-[#fde2c4] p-4 flex justify-center gap-10 text-xs font-bold text-[#2d5a57] uppercase tracking-widest">
          <p className="flex items-center gap-2">✉ [{data.email || "Your Email"}]</p>
          <p className="flex items-center gap-2">📞 [{data.phone || "Your Number"}]</p>
       </div>

       <main className="p-16 flex-1 space-y-12">
          <div className="text-center">
             <h2 className="text-3xl font-black uppercase text-[#1a1c2c] mb-12">One Page Executive Resume</h2>
          </div>

          <section>
             <h3 className="text-lg font-black uppercase text-[#1a1c2c] mb-6">Contact Information</h3>
             <div className="space-y-2 text-sm font-bold text-gray-500 italic">
                <p>Phone Number: [{data.phone}]</p>
                <p>Address: [{data.address || "City, State"}]</p>
             </div>
          </section>

          <section>
             <h3 className="text-lg font-black uppercase text-[#1a1c2c] mb-6 tracking-widest">I. Career Objective</h3>
             <p className="text-sm leading-relaxed text-gray-600 font-medium italic border-l-4 border-[#2d5a57] pl-6">
                {data.summary || "Seeking a leadership role as Chief Executive Officer or Chief Operations Officer..."}
             </p>
          </section>

          <div className="grid grid-cols-2 gap-12">
             <section>
                <h3 className="text-lg font-black uppercase text-[#1a1c2c] mb-6 tracking-widest">II. Education</h3>
                <div className="space-y-6">
                   {data.education?.map((edu, i) => (
                      <div key={i}>
                         <h4 className="font-bold text-sm text-gray-800 uppercase italic mb-1">{edu.degree}</h4>
                         <p className="text-[10px] text-gray-400 font-black uppercase">[{edu.institution}], [{edu.year}]</p>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h3 className="text-lg font-black uppercase text-[#1a1c2c] mb-6 tracking-widest">IV. Skills</h3>
                <ul className="space-y-3">
                   {data.skills?.map((s, i) => (
                      <li key={i} className="text-xs font-bold text-gray-500 italic flex items-center gap-3">
                         <span className="w-2 h-2 bg-[#2d5a57] rounded-full"></span> {s}
                      </li>
                   ))}
                </ul>
             </section>
          </div>

          <section>
             <h3 className="text-lg font-black uppercase text-[#1a1c2c] mb-8 tracking-widest">III. Professional Experience</h3>
             <div className="space-y-10">
                {data.experience?.map((exp, i) => (
                   <div key={i}>
                      <h4 className="font-extrabold text-[#1a1c2c] uppercase text-base mb-1 italic">[{exp.title}], [{exp.company}], [{exp.duration}]</h4>
                      <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-gray-100 pl-6">• {exp.description}</p>
                   </div>
                ))}
             </div>
          </section>
       </main>
       
       <footer className="p-8 border-t border-gray-100 text-center">
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest cursor-pointer underline">Resume Templates @ Antigravity.net</p>
       </footer>
    </div>
  );
};

// --- Template 45: Executive Corporate Split (Image 2) 🏢 ---
const ExecutiveCorporateSplitTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 p-16 border-[12px] border-blue-100 flex flex-col">
       <header className="text-center mb-16 pb-10 border-b border-gray-100">
          <h1 className="text-6xl font-light uppercase tracking-[0.2em] text-black leading-none mb-3 italic">{data.fullName}</h1>
          <p className="text-base font-black text-gray-400 tracking-[0.5em] uppercase italic mb-8 ml-2">Professional Title</p>
          <div className="flex justify-center gap-12 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
             <p className="flex items-center gap-3">Address: {data.address || "123 Street, City"}</p>
             <p className="flex items-center gap-3">Phone: {data.phone}</p>
             <p className="flex items-center gap-3">Email: {data.email}</p>
          </div>
       </header>

       <div className="grid grid-cols-12 gap-16 flex-1">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-12 border-r border-gray-50 pr-12">
             <section>
                <h2 className="text-xl font-black uppercase text-black mb-8 border-b-2 border-black w-fit pr-10">Profile</h2>
                <p className="text-sm leading-relaxed text-gray-500 italic whitespace-pre-wrap">{data.summary}</p>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase text-black mb-10 border-b-2 border-black w-fit pr-10">Work Experience</h2>
                <div className="space-y-12">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="group italic">
                         <div className="flex justify-between items-baseline mb-2">
                            <h3 className="font-extrabold text-xl uppercase text-black leading-none">{exp.title}</h3>
                            <span className="text-xs font-black text-gray-300">{exp.duration}</span>
                         </div>
                         <p className="text-[10px] text-gray-400 font-black mb-4 uppercase tracking-widest">at {exp.company}</p>
                         <p className="text-xs text-gray-500 leading-relaxed pl-6 border-l-2 border-gray-50 group-hover:border-black transition-all">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase text-black mb-8 border-b-2 border-black w-fit pr-10">Hobby & Interests</h2>
                <div className="flex gap-12 text-[11px] font-bold text-gray-400 uppercase italic">
                   <p>• Write your hobby</p>
                   <p>• Write your hobby</p>
                </div>
             </section>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-12">
             <section>
                <h2 className="text-xl font-black uppercase text-black mb-8 border-b-2 border-black w-fit pr-10">Education</h2>
                <div className="space-y-8">
                   {data.education?.map((edu, i) => (
                      <div key={i} className="italic">
                         <h4 className="font-extrabold text-sm text-black uppercase mb-1">{edu.degree}</h4>
                         <p className="text-[11px] text-gray-400 font-bold mb-1 uppercase">{edu.institution}</p>
                         <p className="text-[10px] text-gray-300 font-black">{edu.year}</p>
                      </div>
                   ))}
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase text-black mb-8 border-b-2 border-black w-fit pr-10">Skills</h2>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <p className="text-xs font-black text-black">// Technical</p>
                      {data.skills?.slice(0, 3).map((s, i) => <p key={i} className="text-[11px] font-bold text-gray-400 italic pl-4">• {s}</p>)}
                   </div>
                   <div className="space-y-2">
                      <p className="text-xs font-black text-black">// Professional</p>
                      {['Management', 'Strategy', 'Leadership'].map((s, i) => <p key={i} className="text-[11px] font-bold text-gray-400 italic pl-4">• {s}</p>)}
                   </div>
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase text-black mb-6 border-b-2 border-black w-fit pr-10">References</h2>
                <div className="space-y-6">
                   <div className="text-[11px] font-bold text-gray-500 italic">
                      <p className="text-black font-black uppercase mb-1">Allan May</p>
                      <p className="opacity-60 mb-2">HR Manager | Company Name</p>
                      <p>Phone: +1 234 432 123</p>
                   </div>
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

// --- Template 44: Executive Modern Sidebar (Image 3) ✨ ---
const ExecutiveModernSidebarTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 flex flex-col p-12 overflow-hidden">
       <header className="bg-gray-800 text-white p-4 rounded-xl flex justify-between items-center mb-12 shadow-2xl relative">
          <div className="h-1 bg-[#a5e1f0] absolute bottom-0 left-0 rounded-full transition-all duration-1000 w-[70%]"></div>
          <div className="border-4 border-white inline-block px-10 py-3 rounded">
             <h1 className="text-4xl font-bold tracking-[0.2em] uppercase">{data.fullName}</h1>
          </div>
          <p className="text-sm font-black uppercase tracking-widest text-[#a5e1f0] pr-8 italic">Your Profession Here</p>
       </header>

       <div className="grid grid-cols-12 gap-12 flex-1">
          <aside className="col-span-12 md:col-span-4 bg-gray-900 rounded-3xl p-10 text-white flex flex-col gap-10 shadow-2xl">
             <div className="w-32 h-32 rounded-full border-4 border-[#a5e1f0] overflow-hidden self-center hover:scale-110 transition-transform">
                {data.photo ? <img src={data.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-700"></div>}
             </div>

             <section>
                <h2 className="text-lg font-black uppercase text-[#a5e1f0] mb-6 border-b border-white/10 pb-2">Contact Me</h2>
                <div className="space-y-4 text-[10px] font-bold tracking-widest italic opacity-70">
                   <p>📍 {data.address || "New York City, USA"}</p>
                   <p>📞 {data.phone}</p>
                   <p>✉ {data.email}</p>
                </div>
             </section>

             <section>
                <h2 className="text-lg font-black uppercase text-[#a5e1f0] mb-6 border-b border-white/10 pb-2">Skill</h2>
                <div className="space-y-4">
                   {data.skills?.map((s, i) => (
                      <div key={i} className="group">
                         <p className="text-[9px] font-black uppercase mb-2 group-hover:text-[#a5e1f0] transition-colors">{s}</p>
                         <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#a5e1f0] transition-all duration-1000" style={{ width: `${95-(i*10)}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </aside>

          <main className="col-span-12 md:col-span-8 flex flex-col gap-10">
             <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h2 className="text-lg font-black uppercase text-gray-800 mb-6 flex items-center gap-4">
                   <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs">ℹ</span> ABOUT ME
                </h2>
                <p className="text-sm leading-relaxed text-gray-500 italic whitespace-pre-wrap">{data.summary}</p>
             </section>

             <section>
                <h2 className="text-lg font-black uppercase text-gray-800 mb-8 flex items-center gap-4">
                   <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs">💼</span> WORK EXPERIENCE
                </h2>
                <div className="space-y-12 pl-4 border-l-2 border-gray-100">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="relative group">
                         <div className="absolute -left-[26px] top-1.5 w-3 h-3 bg-white border-2 border-gray-800 rounded-full z-10"></div>
                         <div className="flex justify-between items-baseline mb-2">
                            <h3 className="font-extrabold text-base text-gray-800 uppercase tracking-tighter transition-colors group-hover:text-blue-500">{exp.title}</h3>
                            <span className="text-[10px] font-black text-gray-300 uppercase">{exp.duration}</span>
                         </div>
                         <p className="text-[10px] text-gray-400 font-bold mb-4 uppercase italic">Company: {exp.company}</p>
                         <p className="text-xs text-gray-500 leading-relaxed italic">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>
          </main>
       </div>
    </div>
  );
};

// --- Template 47: Executive Dynamic Arrows (Image 4) 🏹 ---
const ExecutiveDynamicArrowsTemplate = ({ data }) => {
  return (
    <div className="h-full w-full bg-white font-sans text-gray-800 flex flex-col p-16 pb-32 relative overflow-hidden border-[16px] border-gray-900">
       <header className="flex justify-between items-end mb-20 border-b-2 border-gray-100 pb-12">
          <div className="flex-1">
             <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic flex flex-col">
                <span>{data.fullName?.split(' ')[0]}</span>
                <span className="text-gray-300 transform scale-x-110 origin-left">{data.fullName?.split(' ').slice(1).join(' ')}</span>
             </h1>
          </div>
          <div className="w-48 h-48 border-[12px] border-white shadow-2xl rounded-3xl overflow-hidden bg-gray-50 transform rotate-3">
             {data.photo ? <img src={data.photo} className="w-full h-full object-cover" /> : <div className="p-10 opacity-10"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>}
          </div>
       </header>

       <div className="grid grid-cols-12 gap-16 flex-1 relative z-10 px-8">
          <div className="col-span-12 md:col-span-4 flex flex-col gap-12">
             <section className="relative">
                <div className="absolute -left-12 top-0 bottom-0 w-2 bg-[#b91c1c] rounded-full"></div>
                <div className="flex items-center gap-4 mb-8">
                   <h2 className="text-xl font-black uppercase tracking-widest bg-[#b91c1c] text-white px-6 py-2 rounded-r-3xl pr-20 shadow-lg">Summary</h2>
                </div>
                <p className="text-xs leading-relaxed text-gray-500 font-bold italic pl-4 border-l border-gray-100">{data.summary}</p>
             </section>

             <section className="relative">
                <div className="absolute -left-12 top-0 bottom-0 w-2 bg-[#b91c1c] rounded-full opacity-50"></div>
                <div className="flex items-center gap-4 mb-8">
                   <h2 className="text-xl font-black uppercase tracking-widest bg-[#b91c1c] text-white px-6 py-2 rounded-r-3xl pr-20 shadow-lg">Education</h2>
                </div>
                <div className="space-y-6 pl-4 border-l border-gray-100">
                   {data.education?.map((edu, i) => (
                      <div key={i}>
                         <h4 className="font-black text-xs uppercase text-gray-800">{edu.degree}</h4>
                         <p className="text-[10px] text-[#b91c1c] font-black mt-1 uppercase italic">{edu.institution}</p>
                      </div>
                   ))}
                </div>
             </section>

             <div className="grid grid-cols-2 gap-8 mt-auto pt-16">
                <section>
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-gray-300">Contacts</h3>
                   <div className="space-y-2 text-[10px] font-bold text-gray-600 italic leading-snug">
                      <p>{data.email}</p>
                      <p>{data.phone}</p>
                   </div>
                </section>
                <section>
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-gray-300">Skills</h3>
                   <div className="flex flex-wrap gap-2 text-[10px] font-bold text-gray-400 uppercase italic">
                      {data.skills?.slice(0, 4).map((s, i) => <span key={i}>{s}</span>)}
                   </div>
                </section>
             </div>
          </div>

          <div className="col-span-12 md:col-span-8">
             <section className="relative">
                <div className="absolute -right-24 top-0 bottom-0 w-[400px] bg-gray-50/50 -rotate-12 rounded-full -z-10"></div>
                <div className="flex items-center gap-4 mb-10">
                   <h2 className="text-2xl font-black uppercase tracking-widest bg-[#b91c1c] text-white px-8 py-3 rounded-r-[40px] pr-32 shadow-2xl">Experience</h2>
                </div>
                <div className="space-y-16 pl-12 border-l-4 border-gray-900">
                   {data.experience?.map((exp, i) => (
                      <div key={i} className="relative group">
                         <div className="absolute -left-[54px] top-2 w-4 h-4 bg-white border-4 border-[#b91c1c] rounded-full transition-transform group-hover:scale-150 shadow-xl z-20"></div>
                         <h3 className="font-black text-[#1a1c2c] text-2xl uppercase mb-3 leading-none italic group-hover:translate-x-4 transition-transform">{exp.title}</h3>
                         <div className="flex justify-between items-center text-[10px] font-black text-[#b91c1c] mb-6 uppercase tracking-widest italic opacity-60">
                            <span>{exp.company}</span>
                            <span>{exp.duration}</span>
                         </div>
                         <div className="space-y-3 italic text-gray-500 text-sm leading-relaxed whitespace-pre-wrap pl-6 border-l-2 border-gray-50">
                            {exp.description}
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>

       <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-900 transform translate-y-8 flex items-center justify-center pt-[-20px]">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[2em]">EXECUTIVE DOSSIER 2026</p>
       </div>
    </div>
  );
};

export default function ResumeTemplate({ data, templateId }) {
  const safeData = {
      ...data,
      skills: data.skills || [],
      education: data.education || [],
      projects: data.projects || [],
      experience: data.experience || []
  };

  const templates = {
    minimal: MinimalTemplate,
    fresher: FresherTemplate,
    modern: ModernTemplate,
    corporate: CorporateTemplate,
    creative: CreativeTemplate,
    blue_designer_pro: CreativeDesignerProTemplate,
    it_fresher_impact: ITFresherImpactTemplate,
    standard_ats_classic: StandardATSClassicTemplate,
    indian_corporate_standard: IndianCorporateStandardTemplate,
    photo_dark_classic: PhotoDarkClassicTemplate,
    photo_modern_split: PhotoModernSplitTemplate,
    photo_executive: PhotoExecutiveTemplate,
    photo_minimal: PhotoMinimalTemplate,
    photo_creative_wave: PhotoCreativeWaveTemplate,
    photo_intern_teal_geometric: InternSuccessTealTemplate,
    photo_intern_navy_border: EliteStartupNavyTemplate,
    photo_intern_yellow_modern: FuturisticInternGoldTemplate,
    photo_intern_earthy_sidebar: CareerStarterEarthyTemplate,
    expert_dev_dark_hex: ExpertDevDarkHexTemplate,
    expert_dev_yellow_ribbon: ExpertDevYellowRibbonTemplate,
    expert_marketing_blue_arc: ExpertMarketingBlueArcTemplate,
    expert_marketing_lavender_creative: ExpertMarketingLavenderTemplate,
    expert_marketing_orange_bold: ExpertMarketingOrangeBoldTemplate,
    intern_pro_green_geometric: InternProGreenGeometricTemplate,
    intern_pro_split_design: InternProSplitDesignTemplate,
    intern_pro_blue_sidebar: InternProBlueSidebarTemplate,
    intern_pro_dark_modern: InternProDarkModernTemplate,
    expert_creative_vibrant_bubbles: CreativeVibrantBubblesTemplate,
    expert_creative_dark_boxed: CreativeDarkBoxedTemplate,
    expert_creative_modern_timeline: CreativeModernTimelineTemplate,
    expert_creative_minimal_impact: CreativeMinimalImpactTemplate,
    expert_creative_futuristic_arrows: CreativeFuturisticArrowsTemplate,
    expert_data_analyst_yellow_accent: DataAnalystYellowAccentTemplate,
    expert_data_analyst_blue_sidebar: DataAnalystBlueSidebarTemplate,
    expert_data_analyst_clean_structured: DataAnalystCleanStructuredTemplate,
    expert_data_analyst_premium_gold: DataAnalystPremiumGoldTemplate,
    expert_business_mba_corporate_blue: BusinessMBACorporateBlueTemplate,
    expert_business_mba_premium_yellow: BusinessMBAPremiumYellowTemplate,
    expert_business_mba_elegant_salmon: BusinessMBAElegantSalmonTemplate,
    expert_business_mba_executive_monochrome: BusinessMBAExecutiveMonochromeTemplate,
    expert_ats_hybrid_clean_design: ATSHybridCleanDesignTemplate,
    expert_ats_gold_standard_classic: ATSGoldStandardClassicTemplate,
    expert_ats_insightful_categorized: ATSInsightfulCategorizedTemplate,
    expert_executive_teal_photo: ExecutiveTealPhotoTemplate,
    expert_executive_corporate_split: ExecutiveCorporateSplitTemplate,
    expert_executive_modern_sidebar: ExecutiveModernSidebarTemplate,
    expert_executive_dynamic_arrows: ExecutiveDynamicArrowsTemplate,
  };

  const SelectedTemplate = templates[templateId] || PhotoDarkClassicTemplate;
  return <SelectedTemplate data={safeData} />;
}
