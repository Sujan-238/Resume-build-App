import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Zap, ShieldCheck, AlertCircle, TrendingUp, Cloud, Loader2 } from 'lucide-react';
import { auth, rtdb } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import ResumeForm from '../components/ResumeForm';

export default function Builder({ resumeData, setResumeData }) {
  const navigate = useNavigate();
  
  // Auth & Auto-Save State
  const [user, setUser] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const skipNextSave = useRef(false);

  // 1. Listen for Google Login & Fetch Data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // Look up user's data in the instant Realtime Database
          const snapshot = await get(ref(rtdb, 'resumes/' + currentUser.uid));
          if (snapshot.exists()) {
            // Prevent immediate auto-save from overriding data during hydration
            skipNextSave.current = true;
            
            const rawData = snapshot.val();
            // Firebase natively deletes completely empty arrays. 
            // We must re-hydrate missing array fields to prevent .length React crashes!
            setResumeData({
              fullName: rawData.fullName || '',
              email: rawData.email || '',
              phone: rawData.phone || '',
              summary: rawData.summary || '',
              skills: rawData.skills || [],
              education: rawData.education || [],
              projects: rawData.projects || [],
              experience: rawData.experience || []
            });
            
            setLastSaved(new Date());
          }
        } catch (error) {
          console.error("Failed to load user profile:", error);
        }
      }
      setIsInitializing(false);
    });
    return () => unsubscribe();
  }, [setResumeData]);

  // 2. "ChatGPT Style" Auto-Saver
  useEffect(() => {
    // Wait until they actually log in, and don't fire immediately upon loading their old data
    if (!user || isInitializing) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    // Debounce the save to prevent writing on every single keystroke
    const timer = setTimeout(() => {
      set(ref(rtdb, 'resumes/' + user.uid), resumeData)
        .then(() => setLastSaved(new Date()))
        .catch(err => console.error("Auto-save failed implicitly:", err));
    }, 1500);

    return () => clearTimeout(timer);
  }, [resumeData, user, isInitializing]);

  const fillDemoData = () => {
    setResumeData({
      fullName: 'Alex Johnson',
      email: 'alex.j.student@university.edu',
      phone: '+1 (555) 987-6543',
      summary: '',
      skills: ['JavaScript', 'React.js', 'Node.js', 'Python', 'Machine Learning', 'Agile Leadership'],
      education: [
        { degree: 'B.S. in Computer Science', institution: 'State University', year: 'Expected May 2025' }
      ],
      projects: [
        { name: 'AI Study Assistant', description: 'Built a full-stack React app utilizing OpenAI API to convert student notes into flashcards. Deployed on Vercel with 500+ active campus users.' },
        { name: 'Campus Ride-Share App', description: 'Developed mobile app interface using React Native. Integrated Mapbox for real-time location. Achieved 20% faster load times than previous prototype.' }
      ],
      experience: [
        { title: 'Software Engineering Intern', company: 'TechFlow Solutions', duration: 'June 2023 - Aug 2023', description: 'Designed internal dashboard using React and Tailwind CSS.\nOptimized database queries resulting in a 15% speed increase.\nCollaborated with senior devs in 2-week Agile sprints.' }
      ]
    });
  };

  // Analyze Resume Quality
  const analysis = useMemo(() => {
    let score = 0;
    let suggestions = [];

    let basics = 0;
    if (resumeData.fullName) basics += 10;
    if (resumeData.email) basics += 10;
    if (resumeData.phone) basics += 10;
    score += basics;
    if (basics < 30) suggestions.push("Complete all personal details (Name, Email, Phone).");

    if (resumeData.skills && resumeData.skills.length >= 5) {
      score += 20;
    } else if (resumeData.skills && resumeData.skills.length > 0) {
      score += 10;
      suggestions.push("Add at least 5 core technical or soft skills.");
    } else {
      suggestions.push("Add skills to pass ATS keyword filters.");
    }

    if (resumeData.education && resumeData.education.length > 0) {
      score += 10;
    } else {
      suggestions.push("Include your highest education background.");
    }

    if (resumeData.projects && resumeData.projects.length >= 2) {
      score += 20;
    } else if (resumeData.projects && resumeData.projects.length === 1) {
      score += 10;
      suggestions.push("Add one more project to bulk up your portfolio.");
    } else {
      suggestions.push("Add at least 1-2 projects highlighting your technical abilities.");
    }

    let hasGoodDescriptions = false;
    let totalDescLength = 0;
    
    if (resumeData.projects) resumeData.projects.forEach(p => { if(p.description) totalDescLength += p.description.length; });
    if (resumeData.experience) resumeData.experience.forEach(e => { if(e.description) totalDescLength += e.description.length; });

    if (totalDescLength > 150) {
      score += 20;
      hasGoodDescriptions = true;
    } else if (totalDescLength > 50) {
      score += 10;
    }

    if (!hasGoodDescriptions && ((resumeData.projects && resumeData.projects.length > 0) || (resumeData.experience && resumeData.experience.length > 0))) {
       suggestions.push("Improve descriptions. Use detailed bullet points starting with action verbs (e.g. 'Developed', 'Spearheaded').");
    }

    let colorClass = 'text-red-500';
    let bgClass = 'bg-red-500';
    let grade = 'Needs Work';
    
    if (score >= 50) { colorClass = 'text-amber-500'; bgClass = 'bg-amber-500'; grade = 'Average'; }
    if (score >= 80) { colorClass = 'text-emerald-500'; bgClass = 'bg-emerald-500'; grade = 'Strong'; }
    if (score === 100) { colorClass = 'text-indigo-500'; bgClass = 'bg-indigo-500'; grade = 'Excellent ✨'; }

    return { score, suggestions, colorClass, bgClass, grade };
  }, [resumeData]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium hidden md:inline">Back Home</span>
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Auto-Save Identifier just like Google Docs or ChatGPT */}
            {user ? (
               <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-full mr-2">
                 <Cloud className="w-3.5 h-3.5" />
                 {lastSaved ? `Auto-Saved ${lastSaved.toLocaleTimeString()}` : "Ready to Auto-Save"}
               </div>
            ) : (
               <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-2 rounded-full mr-2 shadow-inner">
                 <AlertCircle className="w-3.5 h-3.5" />
                 Login via Home Page to securely Auto-Save your progress
               </div>
            )}

            <button 
              onClick={fillDemoData}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg font-medium hover:bg-indigo-100 transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Fill Demo</span>
            </button>

            <button 
              onClick={() => navigate('/preview')}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Eye className="w-4 h-4" />
              Build PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout containing Form & Sticky Sidebar */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Col: Builder Form */}
        <div className="w-full lg:w-2/3">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-3">
                Build Your Details
                {user && <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" title={`Editing as ${user.displayName}`} />}
              </h1>
              <p className="text-gray-500 font-medium">Changes are analyzed live on the right panel.</p>
            </div>
          </div>
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>

        {/* Right Col: AI Tracker / Score Panel */}
        <div className="w-full lg:w-1/3 sticky top-24">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" /> Resume Strength
              </h3>
              <span className={`text-sm font-bold px-2 py-1 rounded bg-gray-50 ${analysis.colorClass}`}>
                {analysis.grade}
              </span>
            </div>

            {/* Score Ring UI */}
            <div className="flex flex-col items-center justify-center mb-6 py-4">
              <div className="text-5xl font-black mb-2" className={analysis.colorClass}>
                {analysis.score}<span className="text-2xl text-gray-400">/100</span>
              </div>
              
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mt-2">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${analysis.bgClass}`} 
                  style={{ width: `${analysis.score}%` }}
                ></div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gray-500" /> Actionable Suggestions
              </h4>
              
              {analysis.suggestions.length > 0 ? (
                <ul className="space-y-3">
                  {analysis.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-xs font-medium text-gray-700 leading-relaxed">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-4 rounded-xl flex items-center gap-3">
                  <span className="text-xl">🎉</span>
                  <span className="text-sm font-bold">Your resume is perfectly optimized! You are ready to download.</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </main>

      {/* 📱 Mobile Sticky Builder Actions */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <button 
          onClick={() => navigate('/preview')}
          className="flex items-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-[0_10px_30px_rgba(79,70,229,0.4)] active:scale-95 transition-all text-sm uppercase tracking-widest border border-indigo-500"
        >
          <Eye className="w-5 h-5" />
          Build PDF
        </button>
      </div>
    </div>
  );
}
