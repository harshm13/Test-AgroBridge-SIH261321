import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { 
  Dna, Sprout, Droplets, Warehouse, ShieldAlert, TrendingUp, 
  Sparkles, CheckCircle2, Sliders, RefreshCw, ArrowRight, DollarSign, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DigitalTwin() {
  const { lang, t, farmerProfile } = useContext(AppContext);
  const isMr = lang === 'mr';

  // Digital Twin state
  const [holdingDays, setHoldingDays] = useState(7);
  const [hasChawl, setHasChawl] = useState(true);
  const [liquidityPressure, setLiquidityPressure] = useState('low'); // 'low' | 'high'
  const [lotQuantity, setLotQuantity] = useState(80); // quintals

  const farmerName = farmerProfile?.name || "Ramesh Patil";
  const district = farmerProfile?.district || "Nashik";
  const landAcres = parseFloat(farmerProfile?.farmSize === '< 1' ? 0.8 : farmerProfile?.farmSize === '10+' ? 12 : 2.5);

  // Economic calculations based on physical twin parameters
  const basePricePerQtl = 2850; // Lasalgaon today
  const dailyAppreciation = 38.5; // Expected gain per day
  const projectedPrice = Math.round(basePricePerQtl + (dailyAppreciation * holdingDays));

  // Shrinkage rate: Ventilated chawl is only 0.1% per day; without chawl, 0.6% per day rot/weight loss
  const shrinkageFactor = hasChawl ? (1 - (0.001 * holdingDays)) : (1 - (0.006 * holdingDays));
  const effectiveWeight = Math.round(lotQuantity * shrinkageFactor * 10) / 10;

  const todayGross = lotQuantity * basePricePerQtl;
  const projectedGross = Math.round(effectiveWeight * projectedPrice);
  const netGain = projectedGross - todayGross;

  return (
    <div className="ab-container py-6 sm:py-8 space-y-8 max-w-6xl">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
              <Dna className="w-3.5 h-3.5" /> Innovation Feature • Farmer Digital Twin
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {isMr ? 'शेतकरी डिजिटल मॉडेल (Farmer Digital Twin)' : 'Farmer Digital Twin Engine'}
            </h1>
            <p className="text-indigo-100/80 font-medium mt-2 max-w-2xl text-sm sm:text-base">
              {isMr 
                ? `एक व्हर्च्युअल मॉडेल जे तुमची जमीन, मातीचा प्रकार, कांदा चाळ साठवणूक आणि पैशांची निकड समजून वैयक्तिक सल्ला देते.`
                : `A virtual simulation of ${farmerName}'s physical farm parameters (soil chemistry, Kanda Chawl storage, and working capital) for zero-distress selling.`
              }
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center shrink-0">
            <span className="text-xs uppercase font-bold text-indigo-200 tracking-wider block">
              {isMr ? 'डिजिटल आरोग्य निर्देशांक' : 'Twin Fidelity Score'}
            </span>
            <span className="text-4xl font-black text-emerald-400 block my-1">96 / 100</span>
            <span className="text-[11px] font-bold text-white/80 bg-indigo-800/60 px-2.5 py-1 rounded-full inline-block">
              {isMr ? 'मृदा व चाळ मॅपिंग पूर्ण' : 'Physical Farm Synced'}
            </span>
          </div>
        </div>
      </div>

      {/* The 4 Physical Pillars of the Farmer's Digital Twin */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Pillar 1: Soil Health Profile */}
        <div className="ab-card p-5 border-t-4 border-t-amber-500 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-amber-700 tracking-wider">
              {isMr ? 'मातीचा प्रकार' : 'Soil Profile'}
            </span>
            <Sprout className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-base font-black text-slate-800">
            {isMr ? 'काळी कसदार रेगूर जमीन' : 'Black Regur Soil'}
          </div>
          <div className="space-y-1 text-xs font-semibold text-slate-500">
            <div>pH: <span className="text-slate-800">7.4 (Optimal Alkaline)</span></div>
            <div>NPK: <span className="text-slate-800">240 : 48 : 380 kg/ha</span></div>
            <div>Organic Carbon: <span className="text-slate-800">0.68%</span></div>
          </div>
          <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            High Moisture Retention
          </span>
        </div>

        {/* Pillar 2: Water & Irrigation */}
        <div className="ab-card p-5 border-t-4 border-t-blue-500 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-blue-700 tracking-wider">
              {isMr ? 'सिंचन सुविधा' : 'Water Assets'}
            </span>
            <Droplets className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-base font-black text-slate-800">
            {isMr ? 'सौर ठिबक सिंचन' : 'Solar Drip Irrigation'}
          </div>
          <div className="space-y-1 text-xs font-semibold text-slate-500">
            <div>Source: <span className="text-slate-800">Open Well + Farm Pond</span></div>
            <div>Availability: <span className="text-slate-800">12 hrs/day</span></div>
            <div>Subsidy: <span className="text-emerald-700 font-bold">MahaDBT 80%</span></div>
          </div>
          <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
            Drought Resilient
          </span>
        </div>

        {/* Pillar 3: On-Farm Storage */}
        <div className="ab-card p-5 border-t-4 border-t-emerald-500 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">
              {isMr ? 'चाळ साठवणूक' : 'Storage Asset'}
            </span>
            <Warehouse className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-base font-black text-slate-800">
            {isMr ? 'हवेशीर कांदा चाळ' : 'Ventilated Kanda Chawl'}
          </div>
          <div className="space-y-1 text-xs font-semibold text-slate-500">
            <div>Capacity: <span className="text-slate-800">150 Quintals</span></div>
            <div>Holding Limit: <span className="text-slate-800">Up to 60 Days</span></div>
            <div>Loss Rate: <span className="text-emerald-700 font-bold">&lt; 0.4% / week</span></div>
          </div>
          <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            Zero Distress Selling
          </span>
        </div>

        {/* Pillar 4: Financial Liquidity Index */}
        <div className="ab-card p-5 border-t-4 border-t-purple-500 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-purple-700 tracking-wider">
              {isMr ? 'आर्थिक क्षमता' : 'Financial Index'}
            </span>
            <DollarSign className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-base font-black text-slate-800">
            {isMr ? 'मजबूत आर्थिक क्षमता' : 'Strong Holding Power'}
          </div>
          <div className="space-y-1 text-xs font-semibold text-slate-500">
            <div>KCC Limit: <span className="text-slate-800">₹1,50,000 (0% Int)</span></div>
            <div>Distress Level: <span className="text-emerald-700 font-bold">Low (Can wait)</span></div>
            <div>Credit Health: <span className="text-slate-800">Score 780</span></div>
          </div>
          <span className="inline-block text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
            Market Power High
          </span>
        </div>

      </div>

      {/* Interactive What-If Simulation Sandbox */}
      <div className="ab-card p-6 sm:p-10 space-y-8 bg-gradient-to-br from-white to-indigo-50/30 border-2 border-indigo-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-black text-indigo-700 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Sliders className="w-4 h-4" /> Interactive Simulation Sandbox
            </span>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {isMr ? 'निर्णय सिमुलेशन: "आज विकू की चाळीत ठेवू?"' : '"Sell Today vs Hold in Chawl" Simulator'}
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            Lot: {lotQuantity} Qtl Unhali Onion
          </span>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Slider: Holding Days */}
          <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {isMr ? 'साठवणूक कालावधी' : 'Holding Duration'}
              </label>
              <span className="text-lg font-black text-indigo-700">{holdingDays} Days</span>
            </div>
            <input 
              type="range"
              min="0"
              max="21"
              value={holdingDays}
              onChange={(e) => setHoldingDays(parseInt(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>0 (Today)</span>
              <span>7 Days</span>
              <span>14 Days</span>
              <span>21 Days</span>
            </div>
          </div>

          {/* Toggle: Ventilated Chawl vs Open Barn */}
          <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {isMr ? 'साठवणूक पद्धत' : 'Storage Infrastructure'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setHasChawl(true)}
                className={`p-2.5 rounded-xl text-xs font-bold transition ${
                  hasChawl ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isMr ? 'हवेशीर चाळ ✅' : 'Ventilated Chawl ✅'}
              </button>
              <button
                onClick={() => setHasChawl(false)}
                className={`p-2.5 rounded-xl text-xs font-bold transition ${
                  !hasChawl ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isMr ? 'खुले शेड / गोणी' : 'Open Barn'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {hasChawl 
                ? 'Minimal curing loss (0.1%/day), preserves bulb hardness.' 
                : 'Higher moisture rot & weight loss (0.6%/day).'
              }
            </p>
          </div>

          {/* Toggle: Liquidity Urgency */}
          <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {isMr ? 'तात्काळ पैशांची गरज' : 'Cash Liquidity Pressure'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLiquidityPressure('low')}
                className={`p-2.5 rounded-xl text-xs font-bold transition ${
                  liquidityPressure === 'low' ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isMr ? 'शांत (थांबू शकतो)' : 'Low (Can Hold)'}
              </button>
              <button
                onClick={() => setLiquidityPressure('high')}
                className={`p-2.5 rounded-xl text-xs font-bold transition ${
                  liquidityPressure === 'high' ? 'bg-red-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isMr ? 'तातडीने हवेत' : 'Urgent Need'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {liquidityPressure === 'low' 
                ? 'KCC credit active, zero forced distress selling.' 
                : 'Recommends split pooled sale to secure immediate cash.'
              }
            </p>
          </div>

        </div>

        {/* Dynamic Simulation Result Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <div>
              <span className="text-xs font-black uppercase text-indigo-300 tracking-wider block mb-1">
                {isMr ? 'आजची तात्काळ विक्री' : 'Selling Today (0 Days)'}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-300">
                ₹{todayGross.toLocaleString()}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                80 Qtl @ ₹{basePricePerQtl}/Qtl
              </span>
            </div>

            <div className="border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0 md:px-6 text-center">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block mb-1">
                {isMr ? `${holdingDays} दिवस थांबल्यास फायदा` : `Gain After ${holdingDays} Days in Chawl`}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                {netGain >= 0 ? `+₹${netGain.toLocaleString()}` : `-₹${Math.abs(netGain).toLocaleString()}`}
              </div>
              <span className="text-xs text-slate-300 font-medium">
                {effectiveWeight} Qtl @ ₹{projectedPrice}/Qtl
              </span>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs font-black uppercase text-amber-300 tracking-wider block mb-1">
                {isMr ? 'AI डिजिटल सल्ला' : 'Twin Strategy'}
              </span>
              <div className="text-xl font-black text-white mb-2">
                {netGain > 0 ? (isMr ? 'चाळीत ठेवा (WAIT & HOLD)' : 'HOLD IN CHAWL') : (isMr ? 'आजच विका (SELL TODAY)' : 'SELL TODAY')}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {isMr 
                  ? `तुमच्याकडे हवेशीर कांदा चाळ असल्याने ${holdingDays} दिवस थांबून विकल्यास तुम्हाला निव्वळ ₹${netGain.toLocaleString()} चा जास्तीचा नफा होईल.`
                  : `With your verified Kanda Chawl, waiting ${holdingDays} days produces a net gain of ₹${netGain.toLocaleString()} (+${Math.round((netGain/todayGross)*100)}%).`
                }
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
