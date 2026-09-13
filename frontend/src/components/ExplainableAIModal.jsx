import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../App';
import { X, Sparkles, BrainCircuit, TrendingUp, AlertTriangle, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';

export default function ExplainableAIModal({ isOpen, onClose, crop = "Onion", market = "Lasalgaon APMC" }) {
  const { lang, t } = useContext(AppContext);
  const isMr = lang === 'mr';

  if (!isOpen) return null;

  const featureAttributions = [
    {
      factor_en: "Mandi Arrival Volume Drop (-32%)",
      factor_mr: "बाजार समितीत आवक घट (-३२%)",
      importance: 34,
      trend: "Bullish (+₹180/Qtl)",
      color: "bg-emerald-500",
      description_en: "Lasalgaon daily truck arrivals dipped from 6,200 MT to 4,250 MT today.",
      description_mr: "लासलगाव बाजारपेठेत रोजच्या ६,२०० मे.टन ऐवजी केवळ ४,२५० मे.टन आवक नोंदवली गेली."
    },
    {
      factor_en: "Karnataka Transit Weather Shock",
      factor_mr: "कर्नाटक भागातील पावसाचा अडथळा",
      importance: 28,
      trend: "Bullish (+₹120/Qtl)",
      color: "bg-blue-500",
      description_en: "Unseasonal heavy showers in Hubballi delayed dispatch to Mumbai by 48 hours.",
      description_mr: "हुबळी-बेळगाव भागात जोरदार पावसामुळे मुंबईकडे जाणारी वाहतूक ४८ तास रखडली."
    },
    {
      factor_en: "5-Year Post-Monsoon Seasonality",
      factor_mr: "५ वर्षांचा ऐतिहासिक हंगामी कल",
      importance: 22,
      trend: "Seasonal Uptrend (+₹70/Qtl)",
      color: "bg-purple-500",
      description_en: "Consistent September price rebound observed across 2021-2025 Agmarknet records.",
      description_mr: "गेल्या ५ वर्षांच्या ॲगमार्कनेट आकडेवारीनुसार सप्टेंबरच्या दुसऱ्या पंधरवड्यात भाव वाढतात."
    },
    {
      factor_en: "Inter-Mandi Arbitrage (Mumbai vs Nashik)",
      factor_mr: "मुंबई-नाशिक बाजारपेठेतील भाव फरक",
      importance: 16,
      trend: "High Demand (+₹400 Margin)",
      color: "bg-amber-500",
      description_en: "Vashi APMC quoting ₹3,250/Qtl creates strong procurement pressure on Nashik stock.",
      description_mr: "वाशी एपीएमसीमध्ये दर ₹३,२५० असल्याने नाशिकच्या कांद्याला मोठी मागणी निर्माण झाली आहे."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 relative my-8 overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        {/* Modal Header */}
        <div className="flex justify-between items-start mb-6 relative z-10 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shadow-inner">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                  {isMr ? 'Explainable AI (XAI) निर्णय विश्लेषण' : 'Explainable AI (XAI) Decision Engine'}
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  TFT 93.4% Acc
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {crop} • {market} • {isMr ? 'कारणे व विश्वासार्हता अहवाल' : 'Transparent Causal Attribution'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Causal Summary Banner */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 mb-6 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs font-black text-amber-800 uppercase tracking-wider mb-1">
                {isMr ? 'AI शिफारस: का थांबायचे?' : 'Why AgroBridge Recommends WAIT:'}
              </span>
              <p className="text-sm font-bold text-amber-950 leading-relaxed">
                {isMr 
                  ? 'लासलगाव बाजारपेठेत आवक ३२% ने घटली आहे आणि दक्षिणेकडील पाऊस लांबल्याने मुंबईच्या खरेदीदारांकडून तीव्र मागणी आहे. पुढील ५ ते ७ दिवसांत प्रति क्विंटल ₹२५० ते ₹३०० भाववाढ स्पष्ट दिसत आहे.'
                  : 'Lasalgaon APMC wholesale arrivals dropped 32% due to Karnataka transit rain shocks. High metro procurement in Mumbai is pushing wholesale bids upward. TFT models project a +₹270/Qtl price appreciation over the next 7 days.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Feature Importance Breakdown */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{isMr ? 'निर्णयातील प्रमुख घटकांचे योगदान (% महत्त्व)' : 'Attention Weights & Factor Attribution'}</span>
            <span className="text-emerald-600">{isMr ? 'एकूण: १००%' : 'Total: 100%'}</span>
          </h3>

          <div className="space-y-3">
            {featureAttributions.map((f, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center text-sm font-bold mb-1.5">
                  <span className="text-slate-800">{isMr ? f.factor_mr : f.factor_en}</span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                    {f.importance}% • {f.trend}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div className={`h-full ${f.color} rounded-full`} style={{ width: `${f.importance}%` }} />
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {isMr ? f.description_mr : f.description_en}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Uncertainty Quantile Range (p10 to p90) */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isMr ? 'संभाव्य भाव अंदाज मर्यादा (TFT Quantile Bands)' : 'TFT Model Quantile Prediction Intervals'}
            </span>
            <span className="text-emerald-400 text-xs font-black">Day 7 Forecast</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/10 p-2.5 rounded-xl">
              <span className="block text-[10px] text-slate-300 uppercase font-bold">p10 (Pessimistic)</span>
              <span className="text-base font-black text-slate-200">₹2,990</span>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-400/40 p-2.5 rounded-xl">
              <span className="block text-[10px] text-emerald-300 uppercase font-black">p50 (Median Target)</span>
              <span className="text-xl font-black text-emerald-300">₹3,120</span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-xl">
              <span className="block text-[10px] text-slate-300 uppercase font-bold">p90 (Optimistic)</span>
              <span className="text-base font-black text-slate-200">₹3,280</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onClose}
          className="w-full ab-primary-btn !py-3.5 text-center font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
        >
          {isMr ? 'समजले, विश्लेषणासह पुढे जा' : 'Understood, Continue to Opportunities'} <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
