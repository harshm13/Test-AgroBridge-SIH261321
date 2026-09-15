import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { 
    TrendingUp, ArrowRight, CheckCircle2, MapPin, Truck, 
    Info, Store, Sparkles, Navigation, ShieldCheck, Activity, 
    Users, Leaf, HandCoins, BrainCircuit, Landmark, Dna, QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OpportunityEngine from '../components/OpportunityEngine';
import ExplainableAIModal from '../components/ExplainableAIModal';

export default function Dashboard() {
    const { userRole, t, farmerProfile, setActiveTab, lang } = useContext(AppContext);
    const isMr = lang === 'mr';
    const isHi = lang === 'hi';
    
    // Toggle between standard analytical view and ultra-simple view
    const [simpleMode, setSimpleMode] = useState(false);
    const [showXaiModal, setShowXaiModal] = useState(false);
    
    const [crop] = useState('Onion');
    const todayPrice = 2850;
    const predictedPrice = 3120;
    
    // Using farmerProfile data if available, otherwise defaults
    const farmerName = farmerProfile ? farmerProfile.name : "Ramesh";
    const farmerLocation = farmerProfile ? `${farmerProfile.village}, ${farmerProfile.district}` : "Sinnar, Nashik, Maharashtra";

    return (
        <div className="ab-container py-6 sm:py-8 space-y-6 sm:space-y-8 max-w-6xl">
            
            {/* Command Center Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-2 border-slate-200/50 pb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                        {isMr ? 'नमस्कार' : isHi ? 'नमस्ते' : 'Namaste'}, {farmerName} <span className="inline-block origin-bottom-right hover:animate-wave">👋</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {farmerLocation}
                    </p>
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                    <button 
                        onClick={() => setSimpleMode(true)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${simpleMode ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        {isMr ? 'सुलभ दृश्य' : isHi ? 'सरल दृश्य' : 'Simple View'}
                    </button>
                    <button 
                        onClick={() => setSimpleMode(false)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!simpleMode ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        {isMr ? 'प्रगत कमांड सेंटर' : isHi ? 'एडवांस्ड कमांड सेंटर' : 'Advanced'}
                    </button>
                </div>
            </div>

            {/* Official Government Data Sync Badge */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <Landmark className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                        {isMr ? 'अधिकृत शासकीय थेट माहिती:' : isHi ? 'आधिकारिक सरकारी लाइव डेटा:' : 'Official Live Feed:'} Government of India Open Data Portal (data.gov.in) & Agmarknet
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-full font-bold text-[11px]">
                        {isMr ? 'लासलगाव बाजारपेठ जोडणी' : isHi ? 'लासलगांव मंडी लिंक' : 'Lasalgaon APMC Linked'}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold text-[11px]">
                        e-NAM Verified
                    </span>
                </div>
            </div>

            {/* Quick Action Banners for Maharashtra Schemes and Digital Twin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                    onClick={() => setActiveTab('govt_schemes')}
                    className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm transition flex items-center justify-between cursor-pointer group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                            <Landmark className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase text-amber-700">
                                {isMr ? 'महाराष्ट्र शासन योजना' : isHi ? 'महाराष्ट्र सरकारी योजनाएं' : 'Maharashtra State Schemes'}
                            </div>
                            <div className="text-xs font-black text-slate-800 mt-0.5">
                                {isMr 
                                    ? '६ योजनांसाठी पात्र (कर्जमुक्ती, नमो शेतकरी, ८०% ठिबक)' 
                                    : isHi 
                                    ? '6 योजनाओं के लिए पात्र (कर्जमाफी, नमो शेतकरी, 80% ड्रिप)' 
                                    : 'Eligible for 6 Schemes (Karjmukti, Namo Shetkari, MahaDBT)'}
                            </div>
                        </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
                </div>

                <div 
                    onClick={() => setActiveTab('digital_twin')}
                    className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 shadow-sm transition flex items-center justify-between cursor-pointer group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                            <Dna className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase text-indigo-700">
                                {isMr ? 'शेतकरी डिजिटल ट्विन' : isHi ? 'किसान डिजिटल ट्विन' : 'Farmer Digital Twin'}
                            </div>
                            <div className="text-xs font-black text-slate-800 mt-0.5">
                                {isMr 
                                    ? '१५० क्विंटल कांदा चाळ व काळी जमीन मॉडेल सक्रिय' 
                                    : isHi 
                                    ? '150 क्विंटल प्याज भंडारण व काली मिट्टी मॉडल सक्रिय' 
                                    : '150 Qtl Kanda Chawl & Black Soil Model Active'}
                            </div>
                        </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {simpleMode ? (
                    /* =========================================
                       SIMPLE MODE (High accessibility)
                       ========================================= */
                    <motion.div 
                        key="simple"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6 max-w-2xl mx-auto pt-4"
                    >
                        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-slate-200 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full opacity-50"></div>
                            
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-500 mb-2">
                                {isMr ? `${crop} साठी आजचा बाजारभाव` : isHi ? `${crop === 'Onion' ? 'प्याज' : crop} का आज का भाव` : `Today's Price for ${crop}`}
                            </h2>
                            <div className="text-6xl sm:text-7xl font-black text-slate-800 mb-12">₹{todayPrice}</div>
                            
                            <div className="bg-amber-50 border-4 border-amber-400 rounded-3xl p-8 mb-8">
                                <span className="block text-sm font-black text-amber-600 uppercase tracking-widest mb-2">
                                    {isMr ? 'ॲग्रोब्रिज AI सल्ला' : isHi ? 'एग्रोब्रिज AI सलाह' : 'AgroBridge Advice'}
                                </span>
                                <span className="block text-4xl font-black text-amber-900 mb-4">
                                    {isMr ? 'थांबा (WAIT)' : isHi ? 'रुकें (WAIT)' : 'WAIT'}
                                </span>
                                <p className="text-lg font-bold text-amber-800">
                                    {isMr ? '३ दिवसांत भावात ₹२५० ची वाढ अपेक्षित आहे.' : isHi ? '3 दिनों में भाव ₹250 तक बढ़ने की संभावना है।' : 'Prices will go up by ₹250 in 3 days.'}
                                </p>
                            </div>
                            
                            <button 
                                onClick={() => setActiveTab('agrobot')}
                                className="w-full bg-slate-800 text-white font-black py-5 rounded-2xl text-xl shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <Sparkles className="w-6 h-6 text-amber-400" /> {isMr ? 'AI सहकाऱ्यास विचारा' : isHi ? 'AI सहायक से पूछें' : 'Ask AI Assistant'}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    /* =========================================
                       ADVANCED MODE (Command Center)
                       ========================================= */
                    <motion.div 
                        key="advanced"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6 sm:space-y-8"
                    >
                        {/* THE OPPORTUNITY ENGINE (Hero Section) */}
                        <div className="overflow-hidden rounded-3xl shadow-2xl relative">
                            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="text-xs font-bold text-white uppercase tracking-widest">
                                    {isMr ? 'थेट स्कॅन सक्रिय' : isHi ? 'लाइव स्कैन सक्रिय' : 'Live Scan Active'}
                                </span>
                            </div>
                            <OpportunityEngine crop={crop} market={farmerProfile?.district || 'Nashik'} />
                        </div>

                        {/* Impact & Quick Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-emerald-300 transition" onClick={() => setActiveTab('transactions')}>
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600"><HandCoins className="w-6 h-6"/></div>
                                <div>
                                    <div className="text-sm font-bold text-slate-400 uppercase">
                                        {isMr ? 'अतिरिक्त उत्पन्न' : isHi ? 'अतिरिक्त कमाई' : 'Extra Earned'}
                                    </div>
                                    <div className="text-xl font-black text-slate-800">₹14,500</div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-300 transition" onClick={() => setActiveTab('logistics')}>
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><Truck className="w-6 h-6"/></div>
                                <div>
                                    <div className="text-sm font-bold text-slate-400 uppercase">
                                        {isMr ? 'वाहतूक खर्च बचत' : isHi ? 'भाड़ा बचत' : 'Transport Saved'}
                                    </div>
                                    <div className="text-xl font-black text-slate-800">₹3,200</div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-purple-300 transition" onClick={() => setActiveTab('marketplace')}>
                                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600"><Store className="w-6 h-6"/></div>
                                <div>
                                    <div className="text-sm font-bold text-slate-400 uppercase">
                                        {isMr ? 'प्रमाणित खरेदीदार' : isHi ? 'सत्यापित खरीदार' : 'Verified Buyers'}
                                    </div>
                                    <div className="text-xl font-black text-slate-800">
                                        {isMr ? '१४ सक्रिय' : isHi ? '14 सक्रिय' : '14 Active'}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-amber-300 transition" onClick={() => setActiveTab('my_crops')}>
                                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600"><Leaf className="w-6 h-6"/></div>
                                <div>
                                    <div className="text-sm font-bold text-slate-400 uppercase">
                                        {isMr ? 'नोंदवलेली पिके' : isHi ? 'सूचीबद्ध फसलें' : 'Crops Listed'}
                                    </div>
                                    <div className="text-xl font-black text-slate-800">
                                        {farmerProfile ? farmerProfile.crops.length : 1} {isMr ? 'लॉट' : isHi ? 'लॉट' : 'Lots'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                            
                            {/* AI Selling Copilot */}
                            <div className="ab-ai-card p-6 sm:p-8 flex flex-col h-full border-t-4 border-t-emerald-500">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                            <Sparkles className="w-6 h-6 text-emerald-500" /> 
                                            {isMr ? 'AI विक्री सल्ला' : isHi ? 'AI बिक्री सह-पायलट' : 'AI Selling Copilot'}
                                        </h2>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">
                                            {isMr ? 'बाजार स्थिती: ' : isHi ? 'बाजार रुझान: ' : 'Market Outlook: '}
                                            <span className="text-emerald-600">
                                                {isMr ? 'तेजी' : isHi ? 'तेजी (Bullish)' : 'Bullish'}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-200 transition" onClick={() => setActiveTab('market_data')}>
                                        <span className="text-sm font-bold text-slate-700">
                                            {crop === 'Onion' ? (isMr ? 'कांदा' : isHi ? 'प्याज' : 'Onion') : crop}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="ab-recommendation ab-recommendation-wait p-6 text-center mb-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-bl-full pointer-events-none"></div>
                                        <span className="block text-xs font-black text-amber-600 uppercase tracking-widest mb-2">
                                            {isMr ? 'शिफारस केलेली कृती' : isHi ? 'अनुशंसित कदम' : 'Recommended Action'}
                                        </span>
                                        <span className="block text-4xl font-black text-amber-900 mb-2">
                                            {isMr ? '३ दिवस थांबा' : isHi ? '3 दिन रुकें (WAIT)' : 'WAIT 3 DAYS'}
                                        </span>
                                        <span className="block text-sm font-bold text-amber-700 bg-white/50 py-1.5 px-3 rounded-lg inline-block">
                                            {isMr ? `अपेक्षित भाव: ₹${predictedPrice}/क्विंटल (+₹२५०)` : isHi ? `अपेक्षित भाव: ₹${predictedPrice}/क्विंटल (+₹250)` : `Expected Price: ₹${predictedPrice}/Qtl (+₹250)`}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex gap-3 items-start">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                            <p className="text-sm font-medium text-slate-700">
                                                {isMr 
                                                    ? 'सणासुदीच्या (दिवाळी) मागणीमुळे प्रक्रियेसाठी मोठ्या प्रमाणावर खरेदी सुरू आहे.' 
                                                    : isHi 
                                                    ? 'त्योहारी मांग (दिवाली) के कारण प्रसंस्करण इकाइयों द्वारा खरीद में भारी उछाल आया है।' 
                                                    : 'Festival demand (Diwali) is causing a spike in procurement by processors.'}
                                            </p>
                                        </div>
                                        <div className="flex gap-3 items-start">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                            <p className="text-sm font-medium text-slate-700">
                                                {isMr 
                                                    ? 'कर्नाटकातील आवक लांबल्याने नाशिकच्या स्थानिक मालाला उच्च मागणी मिळत आहे.' 
                                                    : isHi 
                                                    ? 'कर्नाटक से आवक में देरी होने से स्थानीय नासिक स्टॉक पर निर्भरता बढ़ गई है।' 
                                                    : 'Supply from Karnataka is delayed, increasing reliance on local Nashik stock.'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Explainable AI Trigger Button */}
                                    <button
                                        onClick={() => setShowXaiModal(true)}
                                        className="mt-4 w-full py-2.5 px-4 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer border border-amber-300/60 shadow-sm"
                                    >
                                        <BrainCircuit className="w-4 h-4 text-amber-700" />
                                        {isMr ? 'AI निर्णयाचे सविस्तर कारण पहा (Explainable AI)' : isHi ? 'AI निर्णय का विस्तृत कारण देखें (Explainable AI)' : 'View AI Decision Factors & Causal Reasons'}
                                    </button>
                                </div>

                                <button 
                                    onClick={() => setActiveTab('agrobot')}
                                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl transition mt-8 shadow-md cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4 text-amber-400" /> {isMr ? 'महाविस्तार AI मार्गदर्शकाशी बोला' : isHi ? 'महाविस्तार AI सह-पायलट से पूछें' : 'Ask MahaVISTAAR AI Copilot'}
                                </button>
                            </div>

                            {/* Live Logistics Saving Opportunity */}
                            <div className="ab-logistics-card p-6 sm:p-8 flex flex-col h-full bg-gradient-to-br from-white to-blue-50/50">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                        <Truck className="w-6 h-6 text-blue-500" /> 
                                        {isMr ? 'सामायिक वाहतूक पूल' : isHi ? 'साझा वाहन (Logistics Pool)' : 'Logistics Pooling'}
                                    </h2>
                                    <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-sm flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> {isMr ? 'थेट' : isHi ? 'लाइव' : 'Live'}
                                    </span>
                                </div>

                                <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5 mb-6 hover:border-blue-300 transition cursor-pointer" onClick={() => setActiveTab('logistics')}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-lg">
                                                {isMr ? 'मुंबई APMC मार्ग' : isHi ? 'मुंबई एपीएमसी रूट' : 'Mumbai APMC Route'}
                                            </h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                                                {isMr ? '४ तासांत निघणार' : isHi ? '4 घंटे में रवाना' : 'Leaves in 4 hours'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-2xl font-black text-emerald-600">60%</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                {isMr ? 'सवलत' : isHi ? 'सस्ता' : 'Cheaper'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-slate-500">
                                                {isMr ? 'वाहन क्षमता' : isHi ? 'ट्रक क्षमता' : 'Truck Capacity'}
                                            </span>
                                            <span className="text-blue-700">60 / 100 Qtl {isMr ? 'भरले' : isHi ? 'भरा' : 'Filled'}</span>
                                        </div>
                                        <div className="ab-progress border border-blue-100 bg-blue-50">
                                            <div className="ab-progress-fill bg-blue-500" style={{ width: '60%' }}></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600 bg-slate-50 p-3 rounded-xl">
                                        <Users className="w-4 h-4 text-slate-400" /> 
                                        {isMr ? '३ जवळचे शेतकरी सामील' : isHi ? '3 नजदीकी किसान शामिल' : '3 nearby farmers joined'}
                                    </div>
                                </div>

                                <div className="flex-1"></div>

                                <button 
                                    onClick={() => setActiveTab('logistics')}
                                    className="w-full ab-primary-btn !py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 !bg-blue-600 hover:!bg-blue-700 cursor-pointer"
                                >
                                    {isMr ? 'वाहनात सामील व्हा व ₹४,५०० वाचवा' : isHi ? 'पूल में शामिल हों व ₹4,500 बचाएं' : 'Join Pool & Save ₹4,500'} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Explainable AI Modal Inspection */}
            <ExplainableAIModal 
                isOpen={showXaiModal}
                onClose={() => setShowXaiModal(false)}
                crop={crop}
                market="Lasalgaon APMC"
            />
        </div>
    );
}
