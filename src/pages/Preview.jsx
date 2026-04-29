import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, LayoutTemplate, X, CheckCircle, Crown, Link as LinkIcon, Share2, ClipboardCheck, Loader2, Zap, ShieldCheck, Lock } from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import LZString from 'lz-string';
import ResumeTemplate from '../components/ResumeTemplate';

export default function Preview({ resumeData, templateId, setTemplateId }) {
  const navigate = useNavigate();
  const printRef = useRef(null);

  // Production Readiness: This will automatically use your live domain once you deploy.
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://resumeforge-api.onrender.com'; 
  
  // Detection for Mobile App environment
  const isNativeApp = window.location.protocol === 'capacitor:';
  
  // Payment & Share States
  const [hasDownloadedFree, setHasDownloadedFree] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    // Check local storage on mount
    const status = localStorage.getItem('firstDownloadDone');
    if (status === 'true') {
      setHasDownloadedFree(true);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (showPayModal && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (!showPayModal) {
      setTimeLeft(300); // reset if closed
    }
    return () => clearInterval(timer);
  }, [showPayModal, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const generateAndSavePdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    const element = printRef.current;
    if (!element) {
      setIsDownloading(false);
      return;
    }

    try {
      // Use html-to-image which properly supports modern css functions like oklch() in Tailwind 4
      const dataUrl = await toPng(element, { 
        quality: 1.0,
        pixelRatio: 2, 
        backgroundColor: '#ffffff',
        fetchRequestInit: { cache: 'no-cache' } // prevent weird CORS cache issues
      });
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Mobile-Safe Download: Using Blob for better Android support
      const blob = pdf.output('blob');
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Resume_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setIsDownloading(false);
    } catch (err) {
      console.error("PDF Fail:", err);
      setIsDownloading(false);
      alert("Download error. If on mobile, try using a different template or ensure browser permissions are granted.");
    }
  };

  const isTier1Premium = ['modern', 'corporate', 'creative', 'blue_designer_pro', 'it_fresher_impact', 'standard_ats_classic', 'indian_corporate_standard'].includes(templateId);
  const isTier2Pro = templateId.startsWith('photo_') || templateId.startsWith('intern_') || templateId.startsWith('expert_');
  const isTier3Premium = templateId.startsWith('expert_creative_') || templateId.startsWith('expert_data_analyst_') || templateId.startsWith('expert_business_mba_') || templateId.startsWith('expert_ats_') || templateId.startsWith('expert_executive_');
  const isPremiumTemplate = isTier1Premium || isTier2Pro || isTier3Premium;
  const currentPrice = isTier3Premium ? 149 : (isTier2Pro ? 89 : (isTier1Premium ? 49 : 0));

  const handleDownloadClick = async () => {
    if (isDownloading) return;
    if (!isPremiumTemplate) {
      await generateAndSavePdf();
    } else {
      if (!hasDownloadedFree) {
        await generateAndSavePdf();
        localStorage.setItem('firstDownloadDone', 'true');
        setHasDownloadedFree(true);
      } else {
        setShowPayModal(true);
      }
    }
  };

  const handleHardRefresh = () => {
    window.location.reload();
  };

  const [isVerifying, setIsVerifying] = useState(false);

  const handlePaymentConfirm = async () => {
    setIsVerifying(true);
    
    try {
      // 1. Fetch secure Order ID from Node.js Express backend
      const res = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: currentPrice })
      }).catch(err => {
        throw new Error("SERVER_OFFLINE");
      });
      
      if (!res.ok) throw new Error("Could not create Razorpay Order. Is backend running?");
      const order = await res.json();

      // 2. Load Razorpay Script dynamically
      const scriptLoaded = await new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      if (!scriptLoaded) {
        alert('Failed to load Razorpay Payment Gateway. Please check your internet connection.');
        setIsVerifying(false);
        return;
      }

      // 3. Configure and Open real Razorpay Checkout Modal
      const options = {
        key: 'rzp_live_SiuRcn1z6rrHNW', // User's LIVE Key
        amount: order.amount,
        currency: order.currency,
        name: 'ResumeBuilder Premium',
        description: isTier2Pro ? 'Pro Template Purchase' : 'Premium Template Purchase',
        image: 'https://cdn-icons-png.flaticon.com/512/8713/8713292.png',
        order_id: order.id, // Mandatory from backend
        handler: async function (response) {
          // 4. Send signatures back to backend for verification
          const verifyRes = await fetch(`${BACKEND_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          });
          
          if(verifyRes.ok) {
            setShowPayModal(false);
            setIsVerifying(false);
            alert(`Payment verified on backend! Transaction: ${response.razorpay_payment_id}\nYour premium PDF is downloading...`);
            await generateAndSavePdf();
          } else {
            alert('Security Error: Invalid payment signature detected.');
            setIsVerifying(false);
          }
        },
        prefill: {
          name: resumeData?.fullName || '',
          email: resumeData?.email || '',
          contact: resumeData?.phone || ''
        },
        theme: { color: '#0F172A' }, // Matching UI scheme
        modal: {
          ondismiss: function() { setIsVerifying(false); }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        setIsVerifying(false);
        alert('Payment Failed! Reason: ' + response.error.description);
      });
      rzp.open();
    } catch(err) {
      console.error(err);
      setIsVerifying(false);
      if (err.message === "SERVER_OFFLINE") {
        alert("🔒 Secure Payment Server is currently offline. Please try again in 5 minutes.");
      } else {
        alert("⚠️ Connection Error: Could not reach the checkout. Please check your internet and try again.");
      }
    }
  };

  // --- VIRAL SHARE FEATURE (LZ-String compression) ---
  const generateShareLink = () => {
    // Compress data tightly so it fits cleanly in URL
    const payloadObj = { ...resumeData, activeTemplate: templateId };
    const stringified = JSON.stringify(payloadObj);
    const compressedHash = LZString.compressToEncodedURIComponent(stringified);
    
    // Generate aesthetic SEO URL name
    const rawName = resumeData.fullName || 'student';
    const cleanName = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const randomHex = Math.floor(Math.random() * 16777215).toString(16);
    
    const url = `${window.location.origin}/resume/${cleanName}-${randomHex}#d=${compressedHash}`;
    
    setShareLink(url);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  // ----------------------------------------------------

  // UPI String using dynamic pricing
  const upiUrl = `upi://pay?pa=7975372880-4@axl&pn=ResumeBuilder&am=${currentPrice}.00&cu=INR`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUrl)}`;

  // Determine button text
  let btnText = "Download Resume";
  if (isPremiumTemplate) {
    btnText = hasDownloadedFree ? `Pay ₹${currentPrice} & Download` : "Download Premium (Free Trial)";
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-100 min-h-screen relative">
      
      {/* 🔗 Share Modal Overlay */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 flex flex-col relative text-center">
            <button 
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto bg-indigo-100 p-3 rounded-full mb-4 mt-2">
              <Share2 className="w-8 h-8 text-indigo-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Portfolio</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Your resume is now hosted globally! Anyone with this link can view a high-resolution, uneditable PDF version of this page directly in their browser.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-2 mb-6">
              <LinkIcon className="w-5 h-5 text-gray-400 shrink-0 ml-1" />
              <input 
                type="text" 
                readOnly 
                value={shareLink} 
                className="bg-transparent border-none outline-none text-gray-600 font-mono text-xs w-full overflow-hidden text-ellipsis whitespace-nowrap"
              />
            </div>

            <button 
              onClick={copyToClipboard}
              className={`w-full flex justify-center items-center gap-2 px-5 py-3 text-white rounded-xl font-bold transition-all shadow-md active:scale-[0.98] ${copied ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {copied ? <><ClipboardCheck className="w-5 h-5" /> Link Copied!</> : <><LinkIcon className="w-5 h-5" /> Copy Public Link</>}
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal Overlay */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 flex flex-col items-center relative">
            <button 
              onClick={() => setShowPayModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-amber-100 p-2 rounded-full mb-3">
              <Crown className="w-6 h-6 text-amber-600" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{isTier2Pro ? "Pro Template ✨" : "Premium Template"}</h2>
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
            
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2 mb-6 flex items-center gap-3 w-full justify-center">
               <Lock className="w-4 h-4 text-emerald-600" />
               <span className="text-xs font-semibold text-emerald-700">Extended Validation SSL Secured</span>
               <div className="h-4 w-px bg-emerald-200"></div>
               <span className="text-xs font-bold text-red-600 animate-pulse">{formatTime(timeLeft)}</span>
            </div>

            <p className="text-gray-600 text-center text-sm mb-8 leading-relaxed px-2">
              To download this premium design again, please complete a secure one-time payment of <span className="font-bold text-emerald-600 border-b-2 border-emerald-200 border-dashed">₹{currentPrice}</span>.
            </p>

            <button 
              onClick={handlePaymentConfirm}
              disabled={isVerifying || timeLeft === 0}
              className={`w-full flex justify-center items-center gap-2 px-5 py-4 ${isVerifying ? 'bg-indigo-600' : 'bg-gray-900'} text-white rounded-xl font-bold hover:bg-black transition-all shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mb-2`}
            >
              {isVerifying ? (
                <> <Loader2 className="w-5 h-5 animate-spin" /> Verifying Server Data... </>
              ) : timeLeft === 0 ? (
                <> <X className="w-5 h-5" /> Session Expired </>
              ) : (
                <> <Zap className="w-5 h-5 fill-current text-blue-400" /> Proceed to Subscription (Razorpay) </>
              )}
            </button>
            <div className="flex items-center justify-center gap-4 mt-5 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968142.png" alt="PCI DSS" className="h-4" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" alt="Mastercard" className="h-4" />
            </div>
            <p className="text-[10px] text-gray-400 mt-4 text-center border-t border-gray-100 pt-3 w-full">
              256-bit AES Encryption. Payments are securely processed via verified gateway.
            </p>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/build')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              title="Go Back to Editor"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button 
              onClick={handleHardRefresh}
              title="Fix Issues / Refresh"
              className="p-2 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all"
            >
              <Zap className="w-4 h-4 fill-current animate-pulse" />
            </button>
          </div>

            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 shadow-inner relative group">
              <LayoutTemplate className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors hidden sm:inline" />
              <select 
                title="Select Template"
                value={templateId} 
                onChange={(e) => setTemplateId(e.target.value)}
                className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer pr-4"
              >
                <optgroup label="Free Templates">
                  <option value="minimal">Minimal (Free)</option>
                  <option value="fresher">Fresher (Free)</option>
                </optgroup>
                <optgroup label="Basic Student Templates (₹49)">
                  <option value="modern">Modern Student - Standard 🎓</option>
                  <option value="corporate">Corporate Basic - Simple 🏢</option>
                  <option value="creative">Creative Student - Basic 🎨</option>
                  <option value="blue_designer_pro">Blue Student - Design 🖌️</option>
                  <option value="it_fresher_impact">IT Student - Impact 💻</option>
                  <option value="standard_ats_classic">ATS Basic - Student 📄</option>
                  <option value="indian_corporate_standard">Indian Corporate Basic 👔</option>
                </optgroup>

                <optgroup label="Professional Job Templates (₹89)">
                  <option value="photo_dark_classic">Professional Classic 📸</option>
                  <option value="photo_modern_split">Professional Modern Split 📸</option>
                  <option value="photo_executive">Professional Executive 📸</option>
                  <option value="photo_minimal">Professional Minimal 📸</option>
                  <option value="photo_creative_wave">Professional Creative Wave 📸</option>
                  <option value="expert_dev_dark_hex">Modern IT Developer 💎</option>
                  <option value="expert_dev_yellow_ribbon">Modern IT Developer 💎</option>
                  <option value="expert_marketing_blue_arc">Marketing Pro 💎</option>
                  <option value="expert_marketing_lavender_creative">Marketing Pro 💎</option>
                  <option value="expert_marketing_orange_bold">Marketing Pro 💎</option>
                  <option value="photo_intern_teal_geometric">Career Starter Teal 📸</option>
                  <option value="photo_intern_navy_border">Elite Starter Navy 📸</option>
                  <option value="photo_intern_yellow_modern">Career Explorer Gold 📸</option>
                  <option value="photo_intern_earthy_sidebar">Career Starter Earthy 📸</option>
                </optgroup>
                <optgroup label="Premium Career Templates 🔥 (₹149)">
                  <option value="expert_creative_vibrant_bubbles">Creative Designer Resume Best for: designers 💎</option>
                  <option value="expert_creative_dark_boxed">Creative Designer Resume Best for: designers 🌑</option>
                  <option value="expert_creative_modern_timeline">Creative Designer Resume Best for: designers 📊</option>
                  <option value="expert_creative_minimal_impact">Creative Designer Resume Best for: designers 🏁</option>
                  <option value="expert_creative_futuristic_arrows">Creative Designer Resume Best for: designers ⚡</option>
                  
                  <option value="expert_data_analyst_yellow_accent">Data Analyst Resume Best for: analytics roles 📊</option>
                  <option value="expert_data_analyst_blue_sidebar">Data Analyst Resume Best for: analytics roles 📈</option>
                  <option value="expert_data_analyst_clean_structured">Data Analyst Resume Best for: analytics roles 🔍</option>
                  <option value="expert_data_analyst_premium_gold">Data Analyst Resume Best for: analytics roles ✨</option>

                  <option value="expert_business_mba_corporate_blue">Business / MBA Resume Best for: management 💼</option>
                  <option value="expert_business_mba_premium_yellow">Business / MBA Resume Best for: management 🏆</option>
                  <option value="expert_business_mba_elegant_salmon">Business / MBA Resume Best for: management 🌸</option>
                  <option value="expert_business_mba_executive_monochrome">Business / MBA Resume Best for: management 🎩</option>

                  <option value="expert_ats_hybrid_clean_design">ATS + Premium Hybrid Best for: all jobs 🎯</option>
                  <option value="expert_ats_gold_standard_classic">ATS + Premium Hybrid Best for: all jobs 🏆</option>
                  <option value="expert_ats_insightful_categorized">ATS + Premium Hybrid Best for: all jobs 💡</option>

                  <option value="expert_executive_teal_photo">Executive / Experience Resume Best for: experienced 🕴️</option>
                  <option value="expert_executive_corporate_split">Executive / Experience Resume Best for: experienced 🏢</option>
                  <option value="expert_executive_modern_sidebar">Executive / Experience Resume Best for: experienced ✨</option>
                  <option value="expert_executive_dynamic_arrows">Executive / Experience Resume Best for: experienced 🏹</option>
                </optgroup>
              </select>
            </div>

            <button 
              onClick={handleDownloadClick}
              disabled={isDownloading}
              className={`flex items-center gap-2 px-6 py-2.5 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
                isDownloading 
                  ? 'bg-gray-400 cursor-wait' 
                  : (isPremiumTemplate && hasDownloadedFree) 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-200'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-200'
              }`}
            >
              {isDownloading ? (
                <> <Loader2 className="w-4 h-4 animate-spin" /> ... </>
              ) : (
                <> <Download className="w-4 h-4" /> <span className="hidden sm:inline">{btnText}</span> </>
              )}
            </button>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 py-4 md:py-12 px-2 md:px-4 flex justify-center overflow-auto pb-24 md:pb-12 bg-gray-200">
        <div className="shadow-2xl bg-white w-full sm:w-[210mm] min-h-[297mm] origin-top transition-transform duration-500 ease-in-out"
             style={{ 
               transform: window.innerWidth < 640 ? `scale(${(window.innerWidth - 32) / 794})` : 'scale(1)',
               marginBottom: window.innerWidth < 640 ? `-${(1 - (window.innerWidth - 32) / 794) * 100}%` : '0'
             }}
        >
          <div ref={printRef} className="w-full h-full bg-white">
            <ResumeTemplate data={resumeData} templateId={templateId} />
          </div>
        </div>
      </main>

      {/* 📱 Mobile Bottom Action Bar (Floating Dock) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-sm sm:hidden animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-2 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-2">
            <button 
               onClick={generateShareLink}
               className="p-4 bg-gray-100 text-gray-700 rounded-2xl active:scale-90 transition-all"
            >
               <Share2 className="w-6 h-6" />
            </button>
            <button 
               onClick={handleDownloadClick}
               disabled={isDownloading}
               className="flex-1 flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 disabled:opacity-50"
            >
               {isDownloading ? (
                 <Loader2 className="w-5 h-5 animate-spin" />
               ) : (
                 <>
                   <Download className="w-5 h-5" />
                   {isPremiumTemplate ? "Get Premium" : "Download"}
                 </>
               )}
            </button>
        </div>
      </div>
    </div>
  );
}
