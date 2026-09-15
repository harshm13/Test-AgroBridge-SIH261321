import React, { useState, createContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ChatBox from './components/ChatBox';
import Logistics from './pages/Logistics';
import QualityCheck from './pages/QualityCheck';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MarketIntelligence from './pages/MarketIntelligence';
import Marketplace from './pages/Marketplace';
import FarmerOnboarding from './pages/FarmerOnboarding';
import MyCrops from './pages/MyCrops';
import Transactions from './pages/Transactions';
import Support from './pages/Support';
import GovtSchemes from './pages/GovtSchemes';
import Traceability from './pages/Traceability';
import DigitalTwin from './pages/DigitalTwin';
import GovtShowcase from './pages/GovtShowcase';
import { translations } from './data/translations';
import { WifiOff, AlertTriangle } from 'lucide-react';

export const AppContext = createContext();

export default function App() {
  const [userRole, setUserRole] = useState(null); // 'farmer' or 'buyer'
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOffline, setIsOffline] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [farmerProfile, setFarmerProfile] = useState(null);

  const t = translations[lang] || translations.en;

  // i18n representation adhering to react-i18next interface
  const i18n = (typeof window !== 'undefined' && window.i18n?.language)
    ? window.i18n
    : { language: lang };

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Dynamically apply corresponding font class to document.body based on i18n.language
  useEffect(() => {
    const currentLang = i18n.language || 'en';
    const fontClass = currentLang === 'hi'
      ? 'font-hi'
      : currentLang === 'mr'
        ? 'font-mr'
        : 'font-en';

    document.body.classList.remove('font-en', 'font-hi', 'font-mr');
    document.body.classList.add(fontClass);
  }, [i18n.language]);

  if (!userRole) {
    return <Login onLogin={(role) => setUserRole(role)} />;
  }

  // Mandatory Onboarding for Farmers
  if (userRole === 'farmer' && !onboardingComplete) {
    return (
      <AppContext.Provider value={{ userRole, lang, setLang, t, setFarmerProfile, setOnboardingComplete, i18n }}>
        <FarmerOnboarding />
      </AppContext.Provider>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'my_crops': return <MyCrops />;
      case 'market_data': return <MarketIntelligence />;
      case 'govt_schemes': return <GovtSchemes />;
      case 'digital_twin': return <DigitalTwin />;
      case 'traceability': return <Traceability />;
      case 'marketplace': return <Marketplace />;
      case 'logistics': return <Logistics />;
      case 'quality_check': return <QualityCheck />;
      case 'agrobot': return <ChatBox />;
      case 'transactions': return <Transactions />;
      case 'govt_showcase': return <GovtShowcase />;
      case 'support': return <Support />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider value={{ userRole, setUserRole, lang, setLang, t, activeTab, setActiveTab, farmerProfile, setFarmerProfile, i18n }}>
      <div className="ab-page-background min-h-screen flex flex-col">
        {isOffline && (
            <div className="bg-amber-100 text-amber-800 px-4 py-2 text-xs font-bold flex items-center justify-center gap-2">
                <WifiOff className="w-4 h-4" /> Limited Connectivity — Showing saved offline data.
            </div>
        )}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 pb-16 lg:pb-0">
          {renderContent()}
        </main>
      </div>
    </AppContext.Provider>
  );
}
