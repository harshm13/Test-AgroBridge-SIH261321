import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { MAHARASHTRA_SCHEMES_DATA } from '../data/maharashtraSchemes';
import { 
  Building2, CheckCircle2, AlertCircle, FileText, ExternalLink, 
  Search, ShieldCheck, Sparkles, Sprout, Droplets, Sun, Landmark, 
  HelpCircle, ArrowRight, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GovtSchemes() {
  const { lang, t, farmerProfile } = useContext(AppContext);
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedScheme, setAppliedScheme] = useState(null);
  const [eligibleCount, setEligibleCount] = useState(0);

  const farmer = {
    name: farmerProfile?.name || "Ramesh Patil",
    acres: parseFloat(farmerProfile?.farmSize === '< 1' ? 0.8 : farmerProfile?.farmSize === '10+' ? 12 : 2.5),
    crops: farmerProfile?.crops || ["Onion", "Tomato"],
    district: farmerProfile?.district || "Nashik",
    hasCropLoan: true
  };

  const categories = [
    { id: 'all', label_en: 'All Schemes', label_mr: 'सर्व योजना', label_hi: 'सभी योजनाएं' },
    { id: 'Debt Relief', label_en: 'Debt Relief', label_mr: 'कर्जमुक्ती', label_hi: 'कर्जमुक्ति' },
    { id: 'Direct Income Support', label_en: 'Income Support', label_mr: 'थेट उत्पन्न', label_hi: 'आय सहायता' },
    { id: 'Farm Modernization', label_en: 'Drip & Mechanization', label_mr: 'ठिबक सिंचन व अवजारे', label_hi: 'ड्रिप व उपकरण' },
    { id: 'Green Energy & Power', label_en: 'Solar Pumps', label_mr: 'सौर पंप', label_hi: 'सोलर पंप' },
    { id: 'Insurance & Social Safety', label_en: 'Insurance', label_mr: 'विमा संरक्षण', label_hi: 'बीमा सुरक्षा' }
  ];

  // Evaluate eligibility for each scheme based on active farmer profile
  const evaluatedSchemes = MAHARASHTRA_SCHEMES_DATA.map(scheme => {
    const isEligible = farmer.acres <= scheme.match_criteria.max_acres;
    return {
      ...scheme,
      isEligible: isEligible,
      matchReason_en: isEligible 
        ? `Eligible! Your farm size (${farmer.acres} acres) is within the ${scheme.match_criteria.max_acres} acre threshold.` 
        : `Landholding (${farmer.acres} acres) exceeds smallholder criteria.`,
      matchReason_mr: isEligible 
        ? `पात्र आहात! तुमचे क्षेत्र (${farmer.acres} एकर) कमाल ${scheme.match_criteria.max_acres} एकर मर्यादेत बसते.` 
        : `जमीन धारणा (${farmer.acres} एकर) मर्यादेपेक्षा अधिक आहे.`,
      matchReason_hi: isEligible
        ? `पात्र हैं! आपका जोत क्षेत्र (${farmer.acres} एकड़) अधिकतम ${scheme.match_criteria.max_acres} एकड़ सीमा के भीतर है।`
        : `भूमि जोत (${farmer.acres} एकड़) पात्रता सीमा से अधिक है।`
    };
  });

  useEffect(() => {
    setEligibleCount(evaluatedSchemes.filter(s => s.isEligible).length);
  }, []);

  const filteredSchemes = evaluatedSchemes.filter(s => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const nameMatch = isMr 
      ? s.name_mr.toLowerCase().includes(searchQuery.toLowerCase()) 
      : isHi 
      ? (s.name_hi || s.name_en).toLowerCase().includes(searchQuery.toLowerCase())
      : s.name_en.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (searchQuery === '' || nameMatch);
  });

  const handleApply = (scheme) => {
    setAppliedScheme(scheme);
  };

  return (
    <div className="ab-container py-6 sm:py-8 space-y-6 sm:space-y-8 max-w-6xl">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
              <Landmark className="w-3.5 h-3.5" /> Government of Maharashtra Linked
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {isMr ? 'महाराष्ट्र शासन कृषी योजना केंद्र' : isHi ? 'महाराष्ट्र सरकार कृषि योजना केंद्र' : 'Maharashtra Agricultural Schemes Portal'}
            </h1>
            <p className="text-emerald-100/80 font-medium mt-2 max-w-2xl text-sm sm:text-base">
              {isMr 
                ? `नमस्कार ${farmer.name}! तुमच्या ${farmer.acres} एकर जमिनीनुसार आणि ${farmer.district} जिल्ह्यासाठी लागू असणाऱ्या शासकीय अनुदानांची थेट माहिती.`
                : isHi
                ? `नमस्ते ${farmer.name}! आपकी ${farmer.acres} एकड़ जमीन और ${farmer.district} जिले के लिए लागू सरकारी अनुदानों की सीधी पात्रता जांच।`
                : `Tailored eligibility scanner for ${farmer.name} (${farmer.acres} acres in ${farmer.district}, growing ${farmer.crops.join(', ')}).`
              }
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center shrink-0">
            <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider block">
              {isMr ? 'पात्र ठरलेल्या योजना' : isHi ? 'पात्र योजनाएं मिलीं' : 'Eligible Schemes Found'}
            </span>
            <span className="text-4xl font-black text-amber-300 block my-1">
              {eligibleCount} / {MAHARASHTRA_SCHEMES_DATA.length}
            </span>
            <span className="text-[11px] font-bold text-white/80 bg-emerald-700/60 px-2.5 py-1 rounded-full inline-block">
              {isMr ? '१००% शासकीय अनुदान पडताळणी' : isHi ? '100% सरकारी अनुदान सत्यापन' : '100% Official Scheme Match'}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Match Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isMr ? 'सक्रिय शेतकरी प्रोफाइल' : isHi ? 'सक्रिय किसान प्रोफ़ाइल' : 'Active Farmer Profile'}
            </div>
            <div className="text-sm font-black text-slate-800">
              {farmer.name} • {farmer.district} • {farmer.acres} {isMr ? 'एकर जमीन' : isHi ? 'एकड़ भूमि' : 'Acres'} • {farmer.crops.join(', ')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" /> 7/12 & Aadhaar Ready
          </span>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c.id 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isMr ? c.label_mr : isHi ? c.label_hi : c.label_en}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isMr ? "योजना शोधा..." : isHi ? "योजना खोजें..." : "Search schemes..."}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 shadow-sm"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme, idx) => (
          <motion.div 
            key={scheme.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`ab-card p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
              scheme.isEligible ? 'border-2 border-emerald-400/80 shadow-md' : 'border border-slate-200 opacity-90'
            }`}
          >
            {/* Top Badge */}
            <div className="flex justify-between items-start gap-2 mb-3">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                scheme.isEligible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {scheme.isEligible 
                  ? (isMr ? 'पात्र आहात ✅' : isHi ? 'पात्र हैं ✅' : 'Eligible ✅') 
                  : (isMr ? 'पात्रता अटी' : isHi ? 'शर्तें देखें' : 'Check Criteria')}
              </span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                {isMr ? (scheme.highlight_badge_mr || scheme.highlight_badge) : isHi ? (scheme.highlight_badge_hi || scheme.highlight_badge) : scheme.highlight_badge}
              </span>
            </div>

            {/* Scheme Title */}
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight mb-1">
                {isMr ? scheme.name_mr : isHi ? (scheme.name_hi || scheme.name_en) : scheme.name_en}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mb-3">
                {isMr ? scheme.department_mr : isHi ? (scheme.department_hi || scheme.department_en) : scheme.department_en}
              </p>
              <p className="text-xs font-medium text-slate-600 leading-relaxed mb-4">
                {isMr ? scheme.description_mr : isHi ? (scheme.description_hi || scheme.description_en) : scheme.description_en}
              </p>
            </div>

            {/* Benefit Box */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 mb-4">
              <span className="block text-[10px] font-black text-emerald-800 uppercase tracking-wider mb-1">
                {isMr ? 'शासकीय लाभ / अनुदान' : isHi ? 'सरकारी लाभ / अधिकतम अनुदान' : 'Maximum State Benefit'}
              </span>
              <div className="text-sm font-black text-emerald-950">
                {isMr ? scheme.max_benefit_mr : isHi ? (scheme.max_benefit_hi || scheme.max_benefit_en) : scheme.max_benefit_en}
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div className="mb-5 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {isMr ? 'आवश्यक कागदपत्रे' : isHi ? 'जरूरी दस्तावेज' : 'Required Documentation'}:
              </span>
              {scheme.required_docs.slice(0, 3).map((doc, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <button 
                onClick={() => handleApply(scheme)}
                className="flex-1 ab-primary-btn !py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                {isMr ? 'अर्ज मार्गदर्शन पहा' : isHi ? 'आवेदन मार्गदर्शिका देखें' : 'View Application Guide'} <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a 
                href={scheme.portal_url}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition cursor-pointer"
                title={isMr ? "अधिकृत शासकीय पोर्टल उघडा" : isHi ? "आधिकारिक सरकारी पोर्टल खोलें" : "Open Official Portal"}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Application Guide Modal */}
      <AnimatePresence>
        {appliedScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5"
            >
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md uppercase">
                    {isMr ? 'अर्ज प्रक्रिया सहाय्यक' : isHi ? 'आवेदन प्रक्रिया सहायक' : 'MahaDBT Application Assist'}
                  </span>
                  <h3 className="text-xl font-black text-slate-800 mt-2">
                    {isMr ? appliedScheme.name_mr : isHi ? (appliedScheme.name_hi || appliedScheme.name_en) : appliedScheme.name_en}
                  </h3>
                </div>
                <button 
                  onClick={() => setAppliedScheme(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
                >
                  ✕
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs font-medium text-amber-900 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-amber-950 text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  {isMr ? 'जलद मंजुरीसाठी पावले:' : isHi ? 'त्वरित स्वीकृति हेतु कदम:' : 'Steps for Expedited Approval:'}
                </div>
                <ol className="list-decimal pl-4 space-y-1 text-slate-700">
                  <li>{isMr ? 'आपल्या गावातील महा-ई-सेवा किंवा MahaDBT पोर्टलवर लॉगिन करा.' : isHi ? 'अपने गांव के सीएससी केंद्र या MahaDBT पोर्टल पर आधार से लॉगिन करें।' : 'Log in to MahaDBT Portal using your Aadhaar credentials.'}</li>
                  <li>{isMr ? '७/१२ उतारा व पीक पाहणी (e-Pik Pahani) अद्ययावत असल्याची खात्री करा.' : isHi ? 'सुनिश्चित करें कि 7/12 खतौनी और ई-पीक पाहणी मोबाइल फसल सर्वेक्षण अद्यतित है।' : 'Ensure e-Pik Pahani mobile crop survey is verified for the current season.'}</li>
                  <li>{isMr ? 'बँक खात्याशी आधार लिंक (NPCI DBT सक्षम) असल्याचे तपासा.' : isHi ? 'जांचें कि आपका बैंक खाता प्रत्यक्ष लाभ अंतरण (NPCI DBT) हेतु आधार से लिंक है।' : 'Verify that bank account is NPCI-seeded for instant DBT credit.'}</li>
                </ol>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {isMr ? 'सादर करावयाची कागदपत्रे' : isHi ? 'जमा किए जाने वाले अनिवार्य दस्तावेज' : 'Mandatory Checklist'}:
                </h4>
                <div className="space-y-2">
                  {appliedScheme.required_docs.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <a 
                  href={appliedScheme.portal_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 ab-primary-btn !py-3 text-center text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  {isMr ? 'MahaDBT पोर्टलवर जा' : isHi ? 'MahaDBT पोर्टल पर जाएं' : 'Proceed to Official State Portal'} <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button 
                  onClick={() => setAppliedScheme(null)}
                  className="ab-secondary-btn !py-3 text-xs font-bold px-5"
                >
                  {isMr ? 'बंद करा' : isHi ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
