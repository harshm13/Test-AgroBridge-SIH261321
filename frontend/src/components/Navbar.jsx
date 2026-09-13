import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { 
    Sprout, UserCircle, Globe, Check, ChevronDown, Bot, Sparkles, 
    ArrowRightLeft, Menu, X, Home, Leaf, TrendingUp, Store, Truck, 
    ShieldCheck, CreditCard, LifeBuoy, Landmark, Dna, QrCode, Award 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { lang, setLang, activeTab, setActiveTab, userRole, setUserRole, t } = useContext(AppContext);
    const [langOpen, setLangOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleRole = () => {
        setUserRole(userRole === 'farmer' ? 'buyer' : 'farmer');
    };

    const languages = [
        { code: 'en', native: 'English', flag: '🇬🇧' },
        { code: 'hi', native: 'हिंदी', flag: '🇮🇳' },
        { code: 'mr', native: 'मराठी', flag: '🚩' }
    ];

    // Farmer Navigation Tabs
    const farmerTabs = [
        { id: 'dashboard', label: t.dashboard, icon: Home },
        { id: 'market_data', label: t.market_data, icon: TrendingUp },
        { id: 'govt_schemes', label: t.govt_schemes || 'Govt Schemes', icon: Landmark },
        { id: 'digital_twin', label: t.digital_twin || 'Digital Twin', icon: Dna },
        { id: 'traceability', label: t.traceability || 'Farm-to-Fork', icon: QrCode },
        { id: 'my_crops', label: t.my_crops, icon: Leaf },
        { id: 'marketplace', label: t.find_buyers, icon: Store },
        { id: 'logistics', label: t.logistics, icon: Truck },
        { id: 'quality_check', label: t.quality_check, icon: ShieldCheck },
        { id: 'agrobot', label: t.agrobot, icon: Bot, highlight: true },
        { id: 'transactions', label: t.transactions, icon: CreditCard },
        { id: 'govt_showcase', label: t.govt_showcase || 'SIH Showcase', icon: Award, highlight: true },
        { id: 'support', label: t.support, icon: LifeBuoy },
    ];

    // Buyer Navigation Tabs
    const buyerTabs = [
        { id: 'dashboard', label: 'Buyer Hub', icon: Home },
        { id: 'marketplace', label: 'Browse Produce', icon: Store },
        { id: 'market_data', label: 'Price Trends', icon: TrendingUp },
        { id: 'traceability', label: 'Farm-to-Fork', icon: QrCode },
        { id: 'logistics', label: 'Transport Share', icon: Truck },
        { id: 'quality_check', label: 'Quality Audit', icon: ShieldCheck },
        { id: 'agrobot', label: 'MahaVISTAAR AI', icon: Bot, highlight: true },
        { id: 'transactions', label: 'Escrow Ledger', icon: CreditCard },
        { id: 'govt_showcase', label: 'SIH Showcase', icon: Award },
    ];

    const currentTabs = userRole === 'farmer' ? farmerTabs : buyerTabs;

    // Mobile Bottom Navigation Bar Items (5 key items)
    const mobileBottomTabs = [
        { id: 'dashboard', label: t.dashboard, icon: Home },
        { id: 'market_data', label: 'Prices', icon: TrendingUp },
        { id: 'agrobot', label: 'Copilot', icon: Bot },
        { id: 'logistics', label: 'Logistics', icon: Truck },
        { id: 'marketplace', label: 'Market', icon: Store },
    ];

    const handleTabClick = (id) => {
        setActiveTab(id);
        setMobileOpen(false);
    };

    return (
        <>
            <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white shadow-xl sticky top-0 z-40 border-b border-emerald-800/80 backdrop-blur-md">
                <div className="max-w-[1536px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
                    
                    {/* Brand Logo - Fixed Left */}
                    <div 
                        className="flex items-center gap-2.5 cursor-pointer shrink-0 pr-2 select-none" 
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <div className="bg-emerald-700/80 p-2 rounded-xl shadow-inner border border-emerald-500/40 hover:bg-emerald-600 transition shrink-0">
                            <Sprout className="w-6 h-6 text-emerald-300" />
                        </div>
                        <div className="flex flex-col justify-center shrink-0">
                            <div className="flex items-center gap-1.5">
                                <span className="text-xl font-black tracking-tight text-white whitespace-nowrap">AgroBridge</span>
                                <span className="hidden xl:inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                    <Sparkles className="w-2.5 h-2.5" /> ENGINE™
                                </span>
                            </div>
                            <span className="text-[10px] uppercase font-bold text-emerald-300/90 tracking-wider whitespace-nowrap">
                                {userRole === 'farmer' ? '🌾 Farmer View' : '🛒 Buyer View'}
                            </span>
                        </div>
                    </div>

                    {/* Desktop Horizontal Navigation - Flexible & Clean Left-Aligned */}
                    <nav className="hidden lg:flex items-center gap-1.5 min-w-0 flex-1 justify-start overflow-x-auto hide-scrollbar py-1 px-1">
                        {currentTabs.map((tab) => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.id;
                            const isHighlight = tab.highlight;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                        active 
                                            ? 'bg-emerald-800/90 text-amber-300 shadow-md border border-emerald-600/80 ring-1 ring-amber-400/30' 
                                            : isHighlight
                                            ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 hover:bg-amber-400/25'
                                            : 'text-emerald-100/90 hover:bg-emerald-800/50 hover:text-white border border-transparent'
                                    }`}
                                >
                                    <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-amber-300' : isHighlight ? 'text-amber-400 animate-pulse' : 'text-emerald-300'}`} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right Hand Controls - Fixed Right */}
                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
                        
                        {/* Role Switcher Pill */}
                        <button
                            onClick={toggleRole}
                            title="Toggle between Farmer and Buyer view"
                            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-800/70 hover:bg-emerald-700/80 text-emerald-100 rounded-xl border border-emerald-600/50 transition text-xs font-bold shadow-sm whitespace-nowrap"
                        >
                            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-300" />
                            <span>{userRole === 'farmer' ? 'Farmer' : 'Buyer'}</span>
                            <span className="bg-amber-400 text-emerald-950 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Switch</span>
                        </button>

                        {/* Language Selector */}
                        <div className="relative shrink-0">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-1.5 text-emerald-100 hover:text-white px-2.5 py-1.5 bg-emerald-800/70 hover:bg-emerald-700/80 rounded-xl transition border border-emerald-600/50 shadow-sm text-xs font-bold uppercase whitespace-nowrap"
                            >
                                <Globe className="w-3.5 h-3.5 text-emerald-300" />
                                <span>{lang}</span>
                            </button>

                            {/* Dropdown Popover */}
                            <AnimatePresence>
                                {langOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)}></div>
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95, y: 5 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 5 }}
                                            className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden text-slate-800"
                                        >
                                            <div className="p-1">
                                                {languages.map((l) => (
                                                    <button
                                                        key={l.code}
                                                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                                                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl transition ${
                                                            lang === l.code ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50 text-slate-700'
                                                        }`}
                                                    >
                                                        <span className="flex items-center gap-1.5">
                                                            <span>{l.flag}</span>
                                                            <span>{l.native}</span>
                                                        </span>
                                                        {lang === l.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile Link */}
                        <button 
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border shadow-sm shrink-0 whitespace-nowrap ${
                                activeTab === 'profile' 
                                    ? 'bg-emerald-950 text-amber-300 border-emerald-700 ring-1 ring-amber-400/30' 
                                    : 'bg-emerald-800/70 text-emerald-100 hover:bg-emerald-700/80 border-emerald-600/50'
                            }`}
                        >
                            <UserCircle className="w-4 h-4 text-emerald-300" />
                            <span className="hidden sm:inline">{t.profile}</span>
                        </button>
                        
                        {/* Mobile Drawer Button */}
                        <button 
                            className="lg:hidden p-2 text-emerald-100 hover:bg-emerald-800 rounded-xl border border-emerald-700/60 transition shrink-0"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 lg:hidden" onClick={() => setMobileOpen(false)} />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-4/5 max-w-xs bg-white z-50 shadow-2xl flex flex-col lg:hidden text-slate-800 overflow-y-auto"
                        >
                            <div className="p-4 bg-emerald-900 text-white flex justify-between items-center border-b border-emerald-800">
                                <div className="flex items-center gap-2">
                                    <Sprout className="w-5 h-5 text-emerald-300" />
                                    <span className="font-black text-lg">AgroBridge</span>
                                </div>
                                <button onClick={() => setMobileOpen(false)} className="p-1.5 text-emerald-200 hover:bg-emerald-800 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Mode</div>
                                    <div className="font-extrabold text-emerald-900">{userRole === 'farmer' ? '🌾 Farmer View' : '🛒 Buyer View'}</div>
                                </div>
                                <button 
                                    onClick={toggleRole}
                                    className="bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
                                >
                                    <ArrowRightLeft className="w-3 h-3" /> Switch
                                </button>
                            </div>

                            <div className="p-3 space-y-1 flex-1">
                                {currentTabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const active = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabClick(tab.id)}
                                            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition ${
                                                active 
                                                    ? 'bg-emerald-700 text-white shadow-md' 
                                                    : 'text-slate-700 hover:bg-slate-100'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className={`w-5 h-5 ${active ? 'text-amber-300' : 'text-slate-500'}`} />
                                                <span>{tab.label}</span>
                                            </div>
                                            {tab.highlight && !active && (
                                                <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">AI</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="p-4 border-t border-slate-100 bg-slate-50">
                                <button
                                    onClick={() => handleTabClick('profile')}
                                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition ${
                                        activeTab === 'profile' 
                                            ? 'bg-emerald-700 text-white shadow-md' 
                                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                    }`}
                                >
                                    <UserCircle className="w-5 h-5 text-slate-500" />
                                    <span>{t.profile}</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Mobile Bottom Navigation Bar */}
            <div className="ab-bottom-nav lg:hidden">
                {mobileBottomTabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`ab-bottom-nav-item ${active ? 'active' : ''}`}
                        >
                            <div className={`ab-bottom-nav-icon p-1.5 rounded-xl transition-all ${active ? 'bg-emerald-700 text-white shadow-md' : 'text-slate-500'}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className={`mt-0.5 text-[11px] font-bold ${active ? 'text-emerald-800' : 'text-slate-500'}`}>{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </>
    );
}
