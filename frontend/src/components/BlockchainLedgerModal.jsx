import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../App';
import { X, ShieldCheck, Link2, CheckCircle2, Clock, Zap, ArrowRight, FileCheck, Landmark } from 'lucide-react';

export default function BlockchainLedgerModal({ isOpen, onClose, blockData }) {
  const { lang } = useContext(AppContext);
  const isMr = lang === 'mr';

  if (!isOpen) return null;

  const defaultBlock = {
    block_number: 1,
    contract_id: "SC-MH-2026-041",
    timestamp: "2026-09-12 14:45 IST",
    block_hash: "0000a94bf8c201d4a8e342718ef5591cd5040e32aa57a2cf76189914ad4b8109",
    prev_hash: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    validator: "AgroBridge-MSAMB-APMC-Validator-Node",
    transaction: {
      farmer: "Ramesh Patil (UID: 9812-****-3310)",
      buyer: "FreshMart Retail Solutions Ltd.",
      commodity: "Unhali Onion Grade A",
      quantity: "24.0 Quintals",
      amount: 74880,
      quality_hash: "a4f890c21e6490bbd4a23fe981e19d70231908bf3c299e44",
      settlement_days: 2.1,
      baseline_days: 18.3,
      status: "AUTO_SETTLED_IMPS",
      utr: "IMPS409182740921"
    }
  };

  const block = blockData || defaultBlock;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 relative my-8 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        {/* Modal Header */}
        <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center shadow-inner">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                  {isMr ? 'ब्लॉकचेन स्मार्ट कॉन्ट्रॅक्ट लेजर' : 'Blockchain Smart Contract Ledger'}
                </h2>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  PoAA Verified
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {block.contract_id} • {block.timestamp}
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

        {/* Key Empirical Metric Highlights (Research-Backed) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
            <span className="block text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
              {isMr ? 'पैसे मिळण्याचा कालावधी' : 'Settlement Cycle'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-700">2.1 Days</span>
              <span className="text-xs text-slate-400 line-through font-bold">18.3 Days Mandi</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 block mt-1">
              {isMr ? '⚡ ८.७ पट जलद थेट बँक खात्यात जमा' : '⚡ 8.7x Faster Instant Bank Payout'}
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
            <span className="block text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-1">
              {isMr ? 'उत्पन्नात सरासरी वाढ' : 'Farmer Income Growth'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-blue-700">+38.4%</span>
              <span className="text-xs text-slate-500 font-bold">Net Realization</span>
            </div>
            <span className="text-[10px] font-bold text-blue-700 block mt-1">
              {isMr ? '🛡️ अडत कपातीशिवाय शून्य डीफॉल्ट' : '🛡️ Zero Commission Arhatiya Default'}
            </span>
          </div>
        </div>

        {/* Cryptographic Proof Details */}
        <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 mb-6 space-y-3 text-xs font-mono">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-slate-400">Validator Node:</span>
            <span className="text-emerald-400 font-bold">{block.validator}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-1">Block Hash (SHA-256):</span>
            <span className="text-amber-300 break-all bg-black/40 p-2 rounded block text-[11px]">
              {block.block_hash}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-1">Proof of Quality Certificate Hash:</span>
            <span className="text-blue-300 break-all bg-black/40 p-2 rounded block text-[11px]">
              {block.transaction.quality_hash}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-white/10">
            <span className="text-slate-400">Escrow Settlement Status:</span>
            <span className="bg-emerald-400/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[11px]">
              {block.transaction.status} (UTR: {block.transaction.utr})
            </span>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 text-xs space-y-2">
          <div className="flex justify-between font-medium text-slate-700">
            <span>{isMr ? 'शेतकरी' : 'Farmer'}:</span>
            <span className="font-bold text-slate-900">{block.transaction.farmer}</span>
          </div>
          <div className="flex justify-between font-medium text-slate-700">
            <span>{isMr ? 'खरेदीदार' : 'Buyer'}:</span>
            <span className="font-bold text-slate-900">{block.transaction.buyer}</span>
          </div>
          <div className="flex justify-between font-medium text-slate-700">
            <span>{isMr ? 'पीक व प्रमाण' : 'Commodity & Volume'}:</span>
            <span className="font-bold text-slate-900">{block.transaction.commodity} ({block.transaction.quantity})</span>
          </div>
          <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-200 text-sm">
            <span>{isMr ? 'सुरक्षित रक्कम' : 'Total Escrow Protected'}:</span>
            <span className="text-emerald-700 font-black">₹{block.transaction.amount.toLocaleString()}</span>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full ab-primary-btn !py-3.5 text-center font-bold flex items-center justify-center gap-2 cursor-pointer"
        >
          {isMr ? 'बंद करा' : 'Close Blockchain Receipt'}
        </button>
      </motion.div>
    </div>
  );
}
