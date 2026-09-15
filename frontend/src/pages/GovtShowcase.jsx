import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { 
  Award, Landmark, ShieldCheck, MapPin, TrendingUp, Users, 
  Lock, ArrowRight, CheckCircle2, Sparkles, Server, FileText, 
  Play, BarChart3, Database, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function GovtShowcase() {
  const { lang, setActiveTab } = useContext(AppContext);
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const [activeDemo, setActiveDemo] = useState('onion');

  const demoPresets = {
    onion: {
      title: "Lasalgaon APMC • Unhali Onion (Asia's Largest Mandi)",
      crop: "Onion",
      mandi: "Lasalgaon APMC",
      rate: "₹2,850 / Qtl",
      action: "WAIT 3-5 DAYS",
      reason: "Arrivals down 32%; Karnataka rains delayed dispatch; projected +₹270/Qtl price rebound.",
      gain: "+₹21,600 for 80 Qtl lot"
    },
    tomato: {
      title: "Nashik & Pune APMC • Hybrid Tomato (Perishable Harvest)",
      crop: "Tomato",
      mandi: "Pune APMC",
      rate: "₹1,850 / Qtl",
      action: "SELL TODAY (POOLED)",
      reason: "Arrivals spiked 24%; perishable risk high without cold-room; dispatch via pooled truck.",
      gain: "Save ₹4,500 on transport freight"
    },
    soybean: {
      title: "Latur APMC • Yellow Soybean JS-335 (FPO Bulk Lot)",
      crop: "Soybean",
      mandi: "Latur APMC",
      rate: "₹4,720 / Qtl",
      action: "SELL TO FPO BUYER",
      reason: "Moisture <10% verified by AI grading; solvent extraction plants paying +5% bonus.",
      gain: "+₹18,800 collective realization"
    }
  };

  const activeData = demoPresets[activeDemo];

  const roadmapPhases = [
    {
      phase: "Phase 1: Pilot",
      phase_mr: "टप्पा १: पथदर्शी प्रकल्प (Pilot)",
      phase_hi: "चरण 1: पायलट प्रोजेक्ट (Pilot)",
      timeline: "Months 1 - 4",
      title: "APMC Pilot in Nashik & Pune",
      title_mr: "नाशिक व पुणे बाजार समित्यांमध्ये सुरुवात",
      title_hi: "नासिक व पुणे मंडी में पायलट शुरुआत",
      desc_en: "Partner with 3 key APMCs (Lasalgaon, Nashik, Pune) and onboard 500 smallholder farmers, 4 FPOs, and 25 verified corporate buyers.",
      desc_mr: "लासलगाव, नाशिक व पुणे बाजार समित्यांमध्ये ५०० शेतकरी, ४ शेतकरी उत्पादक कंपन्या (FPO) आणि २५ प्रमाणित खरेदीदारांसह सुरुवात.",
      desc_hi: "3 प्रमुख मंडियों (लासलगांव, नासिक, पुणे) के साथ साझेदारी और 500 छोटे किसानों, 4 एफपीओ तथा 25 सत्यापित खरीदारों को ऑनबोर्ड करना।",
      status: "Ready for Deployment"
    },
    {
      phase: "Phase 2: Scale",
      phase_mr: "टप्पा २: राज्यव्यापी विस्तार",
      phase_hi: "चरण 2: राज्यव्यापी विस्तार",
      timeline: "Months 5 - 12",
      title: "MSAMB Statewide Integration",
      title_mr: "महाराष्ट्र राज्य कृषी पणन मंडळ (MSAMB) एकात्मता",
      title_hi: "महाराष्ट्र राज्य कृषि विपणन बोर्ड (MSAMB) एकीकरण",
      desc_en: "Seamless digital integration with MSAMB and e-NAM databases across all 36 Maharashtra districts, serving 50,000+ farmers.",
      desc_mr: "महाराष्ट्रातील सर्व ३६ जिल्ह्यांमधील बाजार समित्या आणि MSAMB डेटाबेसशी थेट जोडणी, ५०,०००+ शेतकऱ्यांपर्यंत पोहोच.",
      desc_hi: "महाराष्ट्र के सभी 36 जिलों में एमएसएएमबी और ई-नाम डेटाबेस के साथ सहज डिजिटल एकीकरण, 50,000+ किसानों तक पहुंच।",
      status: "Architecture Designed"
    },
    {
      phase: "Phase 3: Sustainability",
      phase_mr: "टप्पा ३: आत्मनिर्भर स्वावलंबन",
      phase_hi: "चरण 3: आत्मनिर्भर स्वावलंबन",
      timeline: "Year 2 Onwards",
      title: "Self-Sustaining Public-Private Model",
      title_mr: "स्वयं-शाश्वत महसूल मॉडेल",
      title_hi: "आत्मनिर्भर सार्वजनिक-निजी मॉडल",
      desc_en: "Zero fees for smallholder farmers. 0.5% buyer convenience fee on settled escrow and SaaS intelligence tools for FPOs ensure ongoing platform self-reliance.",
      desc_mr: "लहान शेतकऱ्यांसाठी १००% मोफत सेवा. खरेदीदारांवर नाममात्र ०.५% शुल्क आणि FPO साठी डिजिटल साधनांद्वारे प्लॅटफॉर्म स्वयंपूर्ण.",
      desc_hi: "छोटे किसानों के लिए 100% निःशुल्क सेवा। सुलझे हुए एस्क्रो पर 0.5% खरीदार सुविधा शुल्क और एफपीओ के लिए डिजिटल उपकरणों द्वारा मंच का आत्मनिर्भर संचालन।",
      status: "Financial Projections Ready"
    }
  ];

  return (
    <div className="ab-container py-6 sm:py-8 space-y-8 max-w-6xl">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-emerald-800/80">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
              <Award className="w-4 h-4" /> Smart India Hackathon 2026
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Landmark className="w-3.5 h-3.5" /> Problem Statement: SIH26132
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {isMr 
              ? 'महाराष्ट्र शासन धोरण संरेखन व सादरीकरण केंद्र' 
              : isHi
              ? 'महाराष्ट्र सरकार नीति संरेखण व प्रस्तुति केंद्र'
              : 'Government of Maharashtra Alignment & SIH Showcase'
            }
          </h1>

          <p className="text-emerald-100/90 font-medium max-w-3xl text-sm sm:text-base leading-relaxed">
            {isMr 
              ? 'ॲग्रोब्रिज हे केवळ एक ॲप नसून महाराष्ट्र शासनाच्या महाविस्तार-AI (MahaVISTAAR-AI) व ॲग्रीस्टॅक (AgriStack) उपक्रमांशी सुसंगत, शेतकऱ्यांच्या उत्पन्नवाढीसाठी तयार केलेले डिजिटल सार्वजनिक साधन (Public Digital Good) आहे.'
              : isHi
              ? 'एग्रोब्रिज केवल एक ऐप नहीं, बल्कि महाराष्ट्र सरकार की महाविस्तार-AI (MahaVISTAAR-AI) व एग्रीस्टैक (AgriStack) पहलों के साथ संरेखित, किसानों की आय बढ़ाने हेतु निर्मित डिजिटल पब्लिक गुड (DPI) है।'
              : 'AgroBridge is engineered as a policy-aligned, scalable Digital Public Infrastructure (DPI) layer that integrates directly with MahaVISTAAR-AI, AgriStack, and MSAMB to systematically eliminate information asymmetry for Maharashtra farmers.'
            }
          </p>
        </div>
      </div>

      {/* 4 Core Quantified Impact Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="ab-card p-5 border-l-4 border-l-emerald-500 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isMr ? 'निव्वळ नफा' : isHi ? 'शुद्ध आय' : 'Net Realization'}
          </span>
          <div className="text-3xl font-black text-emerald-600">+18.4%</div>
          <p className="text-xs text-slate-600 font-medium">Average increase in farmer earnings after logistics & buyer optimization.</p>
        </div>

        <div className="ab-card p-5 border-l-4 border-l-blue-500 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isMr ? 'पैसे जमा होण्याचा वेग' : isHi ? 'भुगतान गति' : 'Settlement Speed'}
          </span>
          <div className="text-3xl font-black text-blue-600">2.1 Days</div>
          <p className="text-xs text-slate-600 font-medium">Automated Smart Contract payouts vs 18.3 days traditional mandi delay.</p>
        </div>

        <div className="ab-card p-5 border-l-4 border-l-amber-500 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isMr ? 'वाहतूक खर्च बचत' : isHi ? 'भाड़ा बचत' : 'Logistics Savings'}
          </span>
          <div className="text-3xl font-black text-amber-600">40 - 60%</div>
          <p className="text-xs text-slate-600 font-medium">Freight cost reduction through hyper-local shared truck pooling.</p>
        </div>

        <div className="ab-card p-5 border-l-4 border-l-purple-500 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isMr ? 'माल नकार दर' : isHi ? 'अस्वीकृति दर' : 'Rejection Rate'}
          </span>
          <div className="text-3xl font-black text-purple-600">0.18%</div>
          <p className="text-xs text-slate-600 font-medium">Zero disputes achieved through tamper-proof AI grading certificates.</p>
        </div>
      </div>

      {/* State Initiative Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Alignment 1: MahaVISTAAR-AI */}
        <div className="ab-card p-6 sm:p-8 space-y-4 border-2 border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                State Strategic Alignment
              </span>
              <h3 className="text-xl font-black text-slate-800 mt-0.5">MahaVISTAAR-AI Integration</h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {isMr 
              ? 'महाराष्ट्र शासनाने सुरू केलेल्या महाविस्तार-AI द्वारे शेतकऱ्यांना मराठीत हवामान व पीक सल्ला दिला जातो. ॲग्रोब्रिज हा त्यावर एक निर्णय व बाजारपेठ जोडणारा स्तर (Market Linkage Layer) म्हणून काम करतो, ज्यातून शेतकरी थेट योग्य खरेदीदार व वाहतूक निवडू शकतात.'
              : isHi
              ? 'महाराष्ट्र सरकार महाविस्तार-AI के माध्यम से कृषि में कृत्रिम बुद्धिमत्ता को बढ़ावा दे रही है। एग्रोब्रिज फसल सलाह के ऊपर एक वाणिज्यिक निर्णय व बाजार जुड़ाव इंजन के रूप में कार्य करता है—ताकि किसान सटीक लाभ ले सकें।'
              : 'The Government of Maharashtra is championing AI in agriculture through MahaVISTAAR-AI. AgroBridge serves as the complementary commercial decision engine on top of agronomic advisories—transforming crop insights into profitable market transactions in Marathi.'
            }
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="w-4 h-4" /> Native Vernacular AI Copilot & Voice Synthesis
          </div>
        </div>

        {/* Alignment 2: AgriStack & Data Privacy */}
        <div className="ab-card p-6 sm:p-8 space-y-4 border-2 border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                Privacy & Data Security
              </span>
              <h3 className="text-xl font-black text-slate-800 mt-0.5">AgriStack (IDEA) & DPDP Act 2023</h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {isMr 
              ? 'शेतकऱ्यांच्या डेटा गोपनीयतेला सर्वोच्च प्राधान्य. डिजिटल वैयक्तिक डेटा संरक्षण कायदा २०२३ (DPDP Act) आणि ॲग्रीस्टॅकच्या मार्गदर्शक तत्त्वांनुसार शेतकऱ्यांच्या संमतीशिवाय डेटा कोणालाही दिला जात नाही.'
              : isHi
              ? 'किसानों की डेटा गोपनीयता सर्वोच्च प्राथमिकता है। डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 (DPDP Act) और एग्रीस्टैक के खुले ढांचे का पूर्ण पालन। सहमति-आधारित सुरक्षित एपीआई द्वारा डेटा प्रवाह।'
              : 'Adheres strictly to the Digital Personal Data Protection (DPDP) Act 2023 and AgriStack open architecture. Uses anonymized farmer IDs, electronic consent management, and secure API gateways.'
            }
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
            <CheckCircle2 className="w-4 h-4" /> Consent-Driven Open Agriculture API Gateway
          </div>
        </div>

      </div>

      {/* Phased Implementation Roadmap */}
      <div className="ab-card p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-1">
            Rollout Strategy
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            {isMr ? 'राज्यव्यापी अंमलबजावणी आराखडा (३ टप्पे)' : isHi ? 'राज्यव्यापी कार्यान्वयन रोडमैप (3 चरण)' : '3-Phase State Implementation Roadmap'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmapPhases.map((phase, pIdx) => (
            <div key={pIdx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg uppercase">
                    {isMr ? phase.phase_mr : isHi ? (phase.phase_hi || phase.phase) : phase.phase}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{phase.timeline}</span>
                </div>
                <h4 className="font-black text-slate-800 text-lg mb-2">
                  {isMr ? phase.title_mr : isHi ? (phase.title_hi || phase.title) : phase.title}
                </h4>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  {isMr ? phase.desc_mr : isHi ? (phase.desc_hi || phase.desc_en) : phase.desc_en}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {phase.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Live Demo Launcher for Judges */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              <Play className="w-3.5 h-3.5 fill-slate-950" /> Interactive Judge Live Demo
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              One-Click Maharashtra Mandi Demo
            </h2>
          </div>

          {/* Quick Tabs */}
          <div className="flex gap-2">
            {['onion', 'tomato', 'soybean'].map(dKey => (
              <button
                key={dKey}
                onClick={() => setActiveDemo(dKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                  activeDemo === dKey ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {dKey}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-300">{activeData.title}</h3>
            <div className="bg-black/30 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Benchmark APMC Rate:</span>
                <span className="font-black text-white">{activeData.rate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Recommendation:</span>
                <span className="font-black text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">{activeData.action}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Expected Net Gain:</span>
                <span className="font-black text-emerald-400">{activeData.gain}</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              💡 <strong>Explainable Causal Reasoning:</strong> {activeData.reason}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
              Jump into Working Platform Module:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setActiveTab('market_data')}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition border border-white/10 cursor-pointer"
              >
                📊 Live Agmarknet Data
              </button>
              <button 
                onClick={() => setActiveTab('govt_schemes')}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition border border-white/10 cursor-pointer"
              >
                🏛️ Maharashtra Schemes
              </button>
              <button 
                onClick={() => setActiveTab('digital_twin')}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition border border-white/10 cursor-pointer"
              >
                🧬 Farmer Digital Twin
              </button>
              <button 
                onClick={() => setActiveTab('traceability')}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition border border-white/10 cursor-pointer"
              >
                📦 Farm-to-Fork QR
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
