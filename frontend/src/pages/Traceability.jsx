import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { 
  QrCode, MapPin, Truck, ShieldCheck, Award, Leaf, Heart, 
  Share2, CheckCircle2, Thermometer, Clock, ArrowRight, Sparkles, Building2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Traceability() {
  const { lang, t } = useContext(AppContext);
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const [selectedLot, setSelectedLot] = useState('LOT-MH-2026-089');
  const [tipSuccess, setTipSuccess] = useState(false);
  const [tipAmount, setTipAmount] = useState(50);

  const lotData = {
    "LOT-MH-2026-089": {
      lot_id: "LOT-MH-2026-089",
      qr_code_id: "QR-AGRO-SINNAR-089",
      commodity_en: "Nashik Premium Red Onion (Unhali Special)",
      commodity_mr: "नाशिक प्रीमियम उन्हाळी लाल कांदा",
      commodity_hi: "नासिक प्रीमियम लाल प्याज (उन्हाली स्पेशल)",
      quantity: "24.0 Quintals (2,400 kg)",
      harvest_date: "11 Sept 2026",
      farmer: {
        name: "Ramesh Bhikaji Patil",
        location: "Sinnar, Nashik, Maharashtra",
        gps: "19.8512° N, 74.0019° E",
        land_record: "Gat No. 142/2 (MahaBhumi 7/12 Verified)",
        experience: "18 Years Experience in Horticulture",
        avatar: "R"
      },
      quality: {
        grade: "Grade A (Premium Export Quality)",
        grade_mr: "ग्रेड A (निर्यात दर्जा)",
        grade_hi: "ग्रेड A (प्रीमियम निर्यात गुणवत्ता)",
        defect_pct: 2.1,
        bulb_size: "58 mm average",
        moisture: "11.4% (Optimal Curing)",
        cert_hash: "a4f890c21e6490bbd4a23fe981e19d70231908bf3c299e44"
      },
      logistics: {
        truck: "MH-15-EG-4402 (Shared Multi-Farmer Pool)",
        transit_temp: "4.2°C (Cold-Chain Maintained)",
        co2_saved: "34.5 kg CO2 Saved via Truck Pooling",
        departure: "12 Sept 2026, 16:00 IST",
        arrival: "13 Sept 2026, 06:15 IST",
        route: "Sinnar Farm → Samruddhi Mahamarg → Vashi Terminal"
      },
      retail: {
        buyer: "FreshMart Retail & Supermarkets",
        store: "Bandra Kurla Complex (BKC), Mumbai",
        price_realization: "₹3,120 / Qtl (+18% premium over unverified mandi lots)"
      },
      story_en: "Ramesh Patil has been practicing Good Agricultural Practices (GAP) for nearly two decades. By curing onions under specialized shaded aeration and booking cold-chain pooling through AgroBridge, his harvest delivers maximum pungency and a guaranteed 6-month kitchen shelf life.",
      story_mr: "रमेश पाटील यांनी सेंद्रिय खतांचा वापर करून आणि सावलीत हवेशीर कांदा वाळवून उत्कृष्ट दर्जा राखला आहे. ॲग्रोब्रिजच्या सामायिक वातानुकूलित वाहनातून हा कांदा केवळ १४ तासांत शेतावरून थेट मुंबईच्या ग्राहकांपर्यंत पोहोचला आहे.",
      story_hi: "रमेश पाटिल लगभग दो दशकों से उत्तम कृषि पद्धतियां (GAP) अपना रहे हैं। विशेष हवादार भंडारण और एग्रोब्रिज शेयर्ड कोल्ड-चेन वाहन के माध्यम से यह प्याज बिना किसी खराबी के सीधे मुंबई के ग्राहकों तक पहुंचा है।"
    },
    "LOT-MH-2026-112": {
      lot_id: "LOT-MH-2026-112",
      qr_code_id: "QR-AGRO-PUNE-112",
      commodity_en: "Vine-Ripened Hybrid Tomatoes",
      commodity_mr: "ताजे दर्जेदार संकरित टोमॅटो",
      commodity_hi: "ताजा गुणवत्ता संकरित टमाटर",
      quantity: "40.0 Quintals (4,000 kg)",
      harvest_date: "13 Sept 2026",
      farmer: {
        name: "Kisan FPO Sinnar (32 Smallholders)",
        location: "Niphad, Nashik, Maharashtra",
        gps: "20.0812° N, 74.1102° E",
        land_record: "Cluster Gat 88/1A (AgriStack ID: MH-NSK-4401)",
        experience: "Collective Farming Cluster",
        avatar: "F"
      },
      quality: {
        grade: "Grade A (Zero Chemical Rot)",
        grade_mr: "ग्रेड A (डागमुक्त फळे)",
        grade_hi: "ग्रेड A (दागमुक्त फल)",
        defect_pct: 1.8,
        bulb_size: "62 mm diameter",
        moisture: "92.1%",
        cert_hash: "88ae9021bc490f119028eac471092a98fba1092490acbe89"
      },
      logistics: {
        truck: "MH-15-AB-9921 (Eco Cold-Van)",
        transit_temp: "11.8°C (Humidity Sealed)",
        co2_saved: "42.0 kg CO2 Saved",
        departure: "13 Sept 2026, 09:30 IST",
        arrival: "13 Sept 2026, 14:00 IST",
        route: "Niphad → Pune Metro Terminal"
      },
      retail: {
        buyer: "Metro Cash & Carry",
        store: "Pune West Mega Store",
        price_realization: "₹1,850 / Qtl (+22% premium for sorted Grade A)"
      },
      story_en: "Harvested at 5:30 AM by 32 smallholder farmers working together in Niphad. Pre-graded with AI vision before loading into shared transport.",
      story_mr: "निफाड तालुक्यातील ३२ अल्पभूधारक शेतकऱ्यांनी एकत्र येऊन पहाटे काढणी केलेला माल. AI तपासणीनंतर दर्जेदार टोमॅटो थेट पुण्याच्या ग्राहकांसाठी.",
      story_hi: "निफाड के 32 छोटे किसानों द्वारा सामूहिक रूप से सुबह 5:30 बजे ताजा तुड़ाई। एआई कंप्यूटर विजन ग्रेडिंग के बाद साझा वाहन द्वारा सीधे पुणे भेजा गया।"
    }
  };

  const lot = lotData[selectedLot];

  const handleSendTip = () => {
    setTipSuccess(true);
    setTimeout(() => setTipSuccess(false), 3500);
  };

  return (
    <div className="ab-container py-6 sm:py-8 space-y-8 max-w-6xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <QrCode className="w-3.5 h-3.5" /> Farm-to-Fork Traceability
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            {isMr ? 'शेत ते ताट (Farm-to-Fork) पारदर्शकता' : isHi ? 'खेत से थाली (Farm-to-Fork) पारदर्शिता' : 'Farm-to-Fork Consumer Provenance'}
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            {isMr 
              ? 'ग्राहकांसाठी आणि निर्यातदारांसाठी शेताच्या ७/१२ नोंदीपासून ते किरकोळ दुकानापर्यंतचा डिजिटल प्रवास.'
              : isHi
              ? 'उपभोक्ताओं और निर्यातकों के लिए खेत के 7/12 रिकॉर्ड से खुदरा दुकान तक की पारदर्शी डिजिटल यात्रा।'
              : 'End-to-end cryptographic journey connecting conscious consumers with Verified Maharashtra Farmers.'
            }
          </p>
        </div>

        {/* Lot Selector */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setSelectedLot('LOT-MH-2026-089')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedLot === 'LOT-MH-2026-089' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            🧅 {isMr ? 'नाशिक कांदा' : isHi ? 'नासिक प्याज' : 'Nashik Onion'} (#089)
          </button>
          <button 
            onClick={() => setSelectedLot('LOT-MH-2026-112')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedLot === 'LOT-MH-2026-112' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            🍅 {isMr ? 'निफाड टोमॅटो' : isHi ? 'निफाड टमाटर' : 'Niphad Tomato'} (#112)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Interactive QR Stamp & Consumer Story */}
        <div className="space-y-6">
          
          {/* QR Passport Box */}
          <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <span className="inline-block bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-400/30 mb-4">
              Verified Digital Passport
            </span>

            {/* SVG Crisp QR Code Representation */}
            <div className="w-48 h-48 mx-auto bg-white p-4 rounded-3xl shadow-xl flex items-center justify-center relative mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* QR Finder Corners */}
                <rect x="5" y="5" width="25" height="25" fill="#0f172a" rx="4" />
                <rect x="9" y="9" width="17" height="17" fill="white" rx="2" />
                <rect x="13" y="13" width="9" height="9" fill="#0f172a" rx="1" />

                <rect x="70" y="5" width="25" height="25" fill="#0f172a" rx="4" />
                <rect x="74" y="9" width="17" height="17" fill="white" rx="2" />
                <rect x="78" y="13" width="9" height="9" fill="#0f172a" rx="1" />

                <rect x="5" y="70" width="25" height="25" fill="#0f172a" rx="4" />
                <rect x="9" y="74" width="17" height="17" fill="white" rx="2" />
                <rect x="13" y="78" width="9" height="9" fill="#0f172a" rx="1" />

                {/* Data Grid Dots */}
                <circle cx="45" cy="15" r="3" fill="#10b981" />
                <circle cx="55" cy="20" r="3" fill="#0f172a" />
                <circle cx="40" cy="35" r="3" fill="#0f172a" />
                <circle cx="50" cy="50" r="4" fill="#10b981" />
                <circle cx="60" cy="45" r="3" fill="#0f172a" />
                <circle cx="35" cy="55" r="3" fill="#10b981" />
                <circle cx="45" cy="70" r="3" fill="#0f172a" />
                <circle cx="70" cy="55" r="3" fill="#10b981" />
                <circle cx="85" cy="45" r="3" fill="#0f172a" />
                <circle cx="75" cy="75" r="3" fill="#0f172a" />
                <circle cx="85" cy="85" r="3" fill="#10b981" />
                <circle cx="55" cy="85" r="3" fill="#0f172a" />
                <circle cx="20" cy="45" r="3" fill="#10b981" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-emerald-600 text-white p-1.5 rounded-xl shadow-lg border-2 border-white">
                  <Leaf className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-emerald-300 font-bold mb-1">{lot.qr_code_id}</div>
            <div className="text-[11px] text-slate-400">{lot.lot_id}</div>

            <div className="mt-4 pt-4 border-t border-white/10 text-left space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{isMr ? 'पीक' : isHi ? 'फसल' : 'Produce'}:</span>
                <span className="font-bold text-white">
                  {isMr ? lot.commodity_mr : isHi ? (lot.commodity_hi || lot.commodity_en) : lot.commodity_en}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{isMr ? 'वजन' : isHi ? 'बैच वजन' : 'Batch Net Weight'}:</span>
                <span className="font-bold text-white">{lot.quantity}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{isMr ? 'काढणी तारीख' : isHi ? 'तुड़ाई तिथि' : 'Harvest Date'}:</span>
                <span className="font-bold text-emerald-300">{lot.harvest_date}</span>
              </div>
            </div>
          </div>

          {/* Direct Consumer Connection: Tip / Thank the Farmer */}
          <div className="ab-card p-6 bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-200 text-amber-900 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 fill-amber-600 text-amber-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-base">
                  {isMr ? 'शेतकऱ्यांचे आभार माना' : isHi ? 'किसान को सीधे धन्यवाद दें' : 'Thank Your Farmer Directly'}
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  {isMr ? '१००% रक्कम थेट शेतकऱ्याच्या खात्यात' : isHi ? '100% राशि सीधे किसान के खाते में' : 'Direct Consumer-to-Farmer Appreciation'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed">
              {isMr ? lot.story_mr : isHi ? (lot.story_hi || lot.story_en) : lot.story_en}
            </p>

            <div className="flex items-center gap-2 mb-3">
              {[20, 50, 100].map(amt => (
                <button
                  key={amt}
                  onClick={() => setTipAmount(amt)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tipAmount === amt ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-amber-200'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <button 
              onClick={handleSendTip}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {tipSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> 
                  {isMr ? 'धन्यवाद! शेतकऱ्यास पाठवले.' : isHi ? 'धन्यवाद! किसान को भेज दिया गया।' : 'Gratitude & Tip Sent to Ramesh!'}
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white" /> 
                  {isMr ? `₹${tipAmount} पाठवा (थेट UPI)` : isHi ? `₹${tipAmount} भेजें (सीधे UPI)` : `Send ₹${tipAmount} Tip via UPI`}
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right 2 Columns: Supply Chain Provenance Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="ab-card p-6 sm:p-8 space-y-8">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              {isMr ? 'प्रमाणित प्रवास तपशील (Audit Trail)' : isHi ? 'प्रमाणित यात्रा विवरण (Audit Trail)' : 'Verified Agricultural Provenance'}
            </h2>

            <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-emerald-200">
              
              {/* Step 1: Farm Origin */}
              <div className="relative">
                <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded tracking-wider">
                        {isMr ? 'टप्पा १: शेतातील उत्पादन' : isHi ? 'चरण 1: खेत उत्पत्ति व 7/12' : 'Stage 1: Farm Provenance'}
                      </span>
                      <h4 className="font-black text-slate-800 text-base mt-1">{lot.farmer.name}</h4>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{lot.harvest_date}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-600">
                    <div>📍 {lot.farmer.location} ({lot.farmer.gps})</div>
                    <div>📜 {lot.farmer.land_record}</div>
                    <div className="col-span-full text-emerald-700 font-semibold mt-1">🌱 {lot.farmer.experience}</div>
                  </div>
                </div>
              </div>

              {/* Step 2: AI Quality Grading */}
              <div className="relative">
                <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded tracking-wider">
                        {isMr ? 'टप्पा २: AI गुणवत्ता तपासणी' : isHi ? 'चरण 2: AI कंप्यूटर विजन ग्रेडिंग' : 'Stage 2: AI Computer Vision Grading'}
                      </span>
                      <h4 className="font-black text-slate-800 text-base mt-1">
                        {isMr ? lot.quality.grade_mr : isHi ? (lot.quality.grade_hi || lot.quality.grade) : lot.quality.grade}
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Defects: {lot.quality.defect_pct}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600 mb-2">
                    <div>📏 Size: {lot.quality.bulb_size}</div>
                    <div>💧 Moisture: {lot.quality.moisture}</div>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 bg-white p-2 rounded-xl border border-slate-100 truncate">
                    Chain Hash: {lot.quality.cert_hash}
                  </div>
                </div>
              </div>

              {/* Step 3: Cold-Chain Logistics */}
              <div className="relative">
                <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded tracking-wider">
                        {isMr ? 'टप्पा ३: सामायिक शीत-वाहतूक' : isHi ? 'चरण 3: कोल्ड-चेन साझा परिवहन' : 'Stage 3: Cold-Chain Pooled Logistics'}
                      </span>
                      <h4 className="font-black text-slate-800 text-base mt-1">{lot.logistics.truck}</h4>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <Thermometer className="w-3 h-3" /> {lot.logistics.transit_temp}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium space-y-1">
                    <div>🛣️ {lot.logistics.route}</div>
                    <div className="text-emerald-700 font-bold">🌿 {lot.logistics.co2_saved}</div>
                    <div className="text-[11px] text-slate-400">{lot.logistics.departure} → {lot.logistics.arrival}</div>
                  </div>
                </div>
              </div>

              {/* Step 4: Final Retail & Consumer Shelf */}
              <div className="relative">
                <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-purple-800 bg-purple-100 px-2 py-0.5 rounded tracking-wider">
                        {isMr ? 'टप्पा ४: ग्राहकांसाठी उपलब्ध' : isHi ? 'चरण 4: खुदरा व उपभोक्ता शेल्फ' : 'Stage 4: Retail & Consumer Shelf'}
                      </span>
                      <h4 className="font-black text-slate-800 text-base mt-1">{lot.retail.buyer}</h4>
                    </div>
                    <span className="text-xs font-black text-emerald-700">Verified Origin</span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium space-y-1">
                    <div>🏪 {lot.retail.store}</div>
                    <div className="text-emerald-800 font-bold">💰 {lot.retail.price_realization}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Economic Impact Summary */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">
                  {isMr ? 'पारदर्शकतेचा आर्थिक परिणाम' : isHi ? 'पारदर्शिता का आर्थिक प्रभाव' : 'Farmer Realization Premium'}
                </span>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  {isMr 
                    ? 'डिजिटल ट्रॅकिंग व प्रमाणपत्रांमुळे किरकोळ साखळ्यांमध्ये १५ ते २०% वाढीव दर मिळतो.'
                    : isHi
                    ? 'डिजिटल ट्रैकिंग व सत्यापन के कारण खुदरा श्रृंखलाओं और निर्यात बाजार में 15-20% प्रीमियम मूल्य मिलता है।'
                    : 'Traceable crops command a 15-20% premium in retail chains and export markets.'}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-2xl font-black text-emerald-700">+₹480 / Qtl</span>
                <span className="block text-[10px] uppercase font-bold text-slate-400">
                  {isMr ? 'अतिरिक्त उत्पन्न' : isHi ? 'अतिरिक्त आय' : 'Additional Realization'}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
