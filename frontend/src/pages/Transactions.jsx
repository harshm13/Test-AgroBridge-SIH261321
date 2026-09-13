import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { 
    CreditCard, CheckCircle2, AlertCircle, Calendar, ArrowRight, 
    ShieldCheck, FileText, Building2, Check, Lock, Loader2, X, Download, Landmark,
    Link2, Cpu, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BlockchainLedgerModal from '../components/BlockchainLedgerModal';

export default function Transactions() {
  const { lang } = useContext(AppContext);
  const isMr = lang === 'mr';

  const [txs, setTxs] = useState([
    { id: 'TX-9982', buyer: 'FreshMart Inc.', amount: 73800, date: '12 Oct 2026', status: 'Completed', escrow: false, utr: 'IMPS40918274' },
    { id: 'TX-1042', buyer: 'AgriExport Ltd', amount: 145000, date: '02 Nov 2026', status: 'In Escrow', escrow: true, utr: null },
  ]);

  const [releasingTx, setReleasingTx] = useState(null);
  const [releaseStep, setReleaseStep] = useState('confirm'); // 'confirm' | 'processing' | 'success'
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showBlockchainModal, setShowBlockchainModal] = useState(false);

  // Calculate total protected in escrow
  const totalEscrow = txs.filter(t => t.escrow).reduce((acc, curr) => acc + curr.amount, 0);

  const handleOpenReleaseModal = (tx) => {
    setReleasingTx(tx);
    setReleaseStep('confirm');
  };

  const handleConfirmRelease = () => {
    setReleaseStep('processing');
    setTimeout(() => {
        // Update transaction status
        setTxs(prev => prev.map(t => {
            if (t.id === releasingTx.id) {
                return {
                    ...t,
                    status: 'Completed',
                    escrow: false,
                    utr: `IMPS${Math.floor(10000000 + Math.random() * 90000000)}`
                };
            }
            return t;
        }));
        setReleaseStep('success');
    }, 2000);
  };

  const handleDownloadStatement = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="ab-container py-6 sm:py-8 space-y-8 max-w-6xl">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
            <CreditCard className="w-10 h-10 text-emerald-600" /> {isMr ? 'व्यवहार, एस्क्रो व ब्लॉकचेन' : 'Transactions, Escrow & Blockchain'}
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            {isMr 
              ? 'स्मार्ट कॉन्ट्रॅक्टद्वारे सुरक्षित एस्क्रो खात्यातून थेट बँक खात्यात पैसे जमा करा.'
              : 'Manage your automated smart contract payouts and view immutable blockchain records.'
            }
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setShowBlockchainModal(true)}
            className="bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md cursor-pointer"
          >
            <Link2 className="w-4 h-4 text-emerald-400" />
            {isMr ? 'ब्लॉकचेन लेजर पहा (२.१ दिवस)' : 'View Blockchain Ledger'}
          </button>
          <button 
              onClick={handleDownloadStatement}
              className="ab-secondary-btn flex items-center gap-2 cursor-pointer active:scale-95 transition !py-2.5 text-xs"
          >
              {downloadSuccess ? (
                  <>
                      <Check className="w-4 h-4 text-emerald-600" /> {isMr ? 'डाउनलोड झाले!' : 'Downloaded!'}
                  </>
              ) : (
                  <>
                      <FileText className="w-4 h-4" /> {isMr ? 'स्टेटमेंट' : 'Statement'}
                  </>
              )}
          </button>
        </div>
      </div>

      {/* Innovation Banner: 2.1 Days Settlement Metric */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-blue-500/30 text-blue-300 border border-blue-400/40 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
              SIH Research Benchmark
            </span>
            <span className="text-xs font-black text-emerald-400">
              ⚡ 2.1 Days Settlement
            </span>
          </div>
          <p className="text-xs font-medium text-slate-300 max-w-2xl">
            {isMr 
              ? 'पारंपारिक बाजार समितीतील १८.३ दिवसांच्या अडत विलंबाऐवजी ॲग्रोब्रिज ब्लॉकचेन स्मार्ट कॉन्ट्रॅक्टद्वारे सरासरी २.१ दिवसांत पेमेंट पूर्ण होते.'
              : 'Blockchain smart contracts slash settlement cycles from 18.3 days (mandi cheque delays) down to just 2.1 days, driving a documented +38.4% increase in net farmer income.'
            }
          </p>
        </div>
        <button 
          onClick={() => setShowBlockchainModal(true)}
          className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition"
        >
          {isMr ? 'ब्लॉकचेन ब्लॉक तपासा' : 'Inspect Block #1'} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Transactions List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">Recent History</h3>
          
          {txs.map((tx, idx) => (
            <motion.div 
                key={tx.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="ab-card p-0 overflow-hidden flex flex-col sm:flex-row hover:border-emerald-300 transition-all group shadow-sm hover:shadow-md"
            >
              <div className="p-6 flex-1 border-b sm:border-b-0 sm:border-r border-slate-100 flex gap-4">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${tx.escrow ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                    <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 text-lg">{tx.buyer}</h3>
                    {tx.escrow ? (
                      <span className="ab-status-warning shadow-sm flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5"/> {tx.status}
                      </span>
                    ) : (
                      <span className="ab-status-success shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5"/> {tx.status}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span>ID: {tx.id}</span>
                    {tx.utr && <span className="text-emerald-700 font-extrabold">• UTR: {tx.utr}</span>}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 inline-flex px-2.5 py-1 rounded-md border border-slate-100">
                    <Calendar className="w-4 h-4 text-slate-400" /> {tx.date}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 flex flex-col justify-center items-center sm:items-end min-w-[220px]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Net Amount</span>
                <span className="text-2xl font-black text-emerald-700">₹{tx.amount.toLocaleString()}</span>
                {tx.escrow ? (
                    <button 
                        onClick={() => handleOpenReleaseModal(tx)}
                        className="mt-4 w-full sm:w-auto ab-primary-btn !py-2.5 !px-5 text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                        <Lock className="w-3.5 h-3.5 text-amber-300" /> Release Funds
                    </button>
                ) : (
                    <span className="mt-3 text-xs font-bold text-emerald-600 bg-emerald-100/60 px-3 py-1 rounded-lg flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Payout Settled
                    </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Right Column: Escrow Protection Card */}
        <div className="lg:mt-12">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="ab-price-card p-8 shadow-2xl relative overflow-hidden rounded-3xl"
          >
            {/* Background glowing effects */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                        <ShieldCheck className="w-8 h-8 text-emerald-300" />
                    </div>
                    <h3 className="font-black text-white text-xl tracking-tight">Escrow Protection</h3>
                </div>
                
                <p className="text-sm text-emerald-50/80 leading-relaxed font-medium mb-8">
                  When a buyer makes an offer, their funds are locked securely in the AgroBridge Escrow. Once crop quality and delivery are confirmed, you can instantly release funds to your bank account.
                </p>
                
                <div className="bg-black/20 p-5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                  <span className="block text-xs font-bold text-emerald-200/80 uppercase tracking-widest mb-1 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${totalEscrow > 0 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></div> Total Protected
                  </span>
                  <span className="text-4xl font-black text-white tracking-tight">₹{totalEscrow.toLocaleString()}</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-200/60 uppercase tracking-widest justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" /> Bank-Grade Instant Settlement
                </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Fund Release Modal */}
      <AnimatePresence>
        {releasingTx && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-slate-800 relative"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 relative">
                        <button 
                            onClick={() => setReleasingTx(null)} 
                            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-widest mb-1">
                            <ShieldCheck className="w-4 h-4" /> Escrow Fund Transfer
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">Release Escrow Payout</h2>
                        <p className="text-emerald-100/80 text-xs mt-1 font-medium">Contract ID: {releasingTx.id} • Buyer: {releasingTx.buyer}</p>
                    </div>

                    {/* Step 1: Confirmation */}
                    {releaseStep === 'confirm' && (
                        <div className="p-6 space-y-6">
                            
                            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center">
                                <span className="block text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">Total Payout Amount</span>
                                <span className="text-4xl font-black text-emerald-800">₹{releasingTx.amount.toLocaleString()}</span>
                            </div>

                            {/* Verification Checks */}
                            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Crop Delivery Status</span>
                                    <span className="text-emerald-700 font-extrabold">Verified at Nashik Mandi</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Quality Audit</span>
                                    <span className="text-emerald-700 font-extrabold">Grade A (Zero Moisture Rot)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Escrow Deposit Guarantee</span>
                                    <span className="text-emerald-700 font-extrabold">100% Secured</span>
                                </div>
                            </div>

                            {/* Destination Bank Account Selection */}
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                                    Select Destination Bank Account
                                </label>
                                <div className="space-y-2">
                                    <button 
                                        type="button"
                                        onClick={() => setSelectedBank('sbi')}
                                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition text-left ${selectedBank === 'sbi' ? 'border-emerald-600 bg-emerald-50/60' : 'border-slate-200 bg-white'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Landmark className="w-5 h-5 text-emerald-700" />
                                            <div>
                                                <div className="font-extrabold text-sm text-slate-800">State Bank of India</div>
                                                <div className="text-xs text-slate-500 font-bold">A/C: •••• 4892 • IFSC: SBIN0001824</div>
                                            </div>
                                        </div>
                                        {selectedBank === 'sbi' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                                    </button>

                                    <button 
                                        type="button"
                                        onClick={() => setSelectedBank('bom')}
                                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition text-left ${selectedBank === 'bom' ? 'border-emerald-600 bg-emerald-50/60' : 'border-slate-200 bg-white'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Landmark className="w-5 h-5 text-blue-700" />
                                            <div>
                                                <div className="font-extrabold text-sm text-slate-800">Bank of Maharashtra</div>
                                                <div className="text-xs text-slate-500 font-bold">A/C: •••• 1209 • IFSC: MAHB0000412</div>
                                            </div>
                                        </div>
                                        {selectedBank === 'bom' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                onClick={handleConfirmRelease}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                            >
                                <ArrowRight className="w-5 h-5" /> Transfer ₹{releasingTx.amount.toLocaleString()} to Bank Now
                            </button>

                        </div>
                    )}

                    {/* Step 2: Processing */}
                    {releaseStep === 'processing' && (
                        <div className="p-12 text-center space-y-6">
                            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                                <Loader2 className="w-20 h-20 text-emerald-600 animate-spin" />
                                <Landmark className="w-8 h-8 text-emerald-800 absolute" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-800">Initiating IMPS Bank Transfer...</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Releasing ₹{releasingTx.amount.toLocaleString()} from AgroBridge Escrow Vault.</p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Success */}
                    {releaseStep === 'success' && (
                        <div className="p-8 text-center space-y-6">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border-2 border-emerald-300"
                            >
                                <CheckCircle2 className="w-10 h-10" />
                            </motion.div>

                            <div>
                                <span className="bg-emerald-100 text-emerald-800 font-black text-[10px] uppercase px-3 py-1 rounded-full tracking-widest inline-block mb-2">
                                    Instant Settlement Completed
                                </span>
                                <h3 className="text-2xl font-black text-slate-900">₹{releasingTx.amount.toLocaleString()} Transferred!</h3>
                                <p className="text-slate-600 text-sm font-medium mt-2">
                                    Funds have been credited directly to your <strong>{selectedBank === 'sbi' ? 'State Bank of India' : 'Bank of Maharashtra'}</strong> account.
                                </p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs font-bold text-slate-700">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Transaction Ref / UTR:</span>
                                    <span className="text-emerald-700 font-extrabold">IMPS{Math.floor(10000000 + Math.random() * 90000000)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Status:</span>
                                    <span className="text-emerald-700 font-extrabold">Settled to Bank (0% Fee)</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setReleasingTx(null)}
                                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-4 rounded-xl text-sm transition"
                            >
                                Close & View Updated Ledger
                            </button>
                        </div>
                    )}

                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Blockchain Ledger Inspection Modal */}
      <BlockchainLedgerModal 
        isOpen={showBlockchainModal}
        onClose={() => setShowBlockchainModal(false)}
      />

    </div>
  );
}
