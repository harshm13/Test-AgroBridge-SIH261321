import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../App';
import { 
  Send, Bot, User, Sparkles, TrendingUp, HandCoins, Mic, MicOff, 
  Volume2, VolumeX, RefreshCw, Copy, Check, Truck, ShieldCheck, 
  BarChart2, ArrowRight, Zap, Info, Maximize2, Minimize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBox() {
    const { lang, t, setActiveTab, userRole, farmerProfile } = useContext(AppContext);

    const farmerData = farmerProfile || { name: "Ramesh", district: "Nashik" };

    const initialMessages = [
        { 
            sender: 'bot', 
            text: lang === 'mr' 
                ? 'नमस्कार! मी तुमचा ॲग्रोब्रिज AI सहका-या आहे. नाशिक व पुणे बाजार समितीतील कांदा व टोमॅटोचे दर, वाहतूक पुलिंग किंवा पीक गुणवत्ता ग्रेडिंग बद्दल मला विचारू शकता!'
                : lang === 'hi'
                ? 'नमस्ते! मैं आपका एग्रोब्रिज AI सह-पायलट हूँ। आप मुझसे नासिक और पुणे मंडी के भाव, लॉजिस्टिक्स शेयरिंग या फसल गुणवत्ता ग्रेडिंग के बारे में पूछ सकते हैं!'
                : 'Namaste! I am your AgroBridge AI Copilot powered by Groq Llama-3. Ask me about live mandi prices, 7-day price forecasts, logistics truck pooling, or crop quality grading!',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actions: [
                { label: '📊 Market Intel', tab: 'market_data' },
                { label: '🚛 Logistics Pool', tab: 'logistics' },
                { label: '🛡️ Quality Check', tab: 'quality_check' }
            ]
        }
    ];

    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [isOnline, setIsOnline] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(true); // Default to expansive view

    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Speech-to-Text setup
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            
            // Set language based on active app language
            recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onerror = () => setIsListening(false);

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, [lang]);

    // Text-to-Speech function
    const speakText = (text) => {
        if (isMuted || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        
        // Clean text of markdown/emojis for smoother speech
        const cleanText = text.replace(/[*_~#`]/g, '').slice(0, 300);
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert('Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
            recognitionRef.current.start();
        }
    };

    // Render formatted text helper for markdown bolding and bullet points
    const renderFormattedText = (text) => {
        if (!text) return null;
        const lines = text.split('\n');
        return lines.map((line, lIdx) => {
            // Process **bold** text inside line
            const parts = line.split(/(\*\*.*?\*\*)/g);
            const formattedLine = parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={pIdx} className="font-bold text-emerald-950">{part.slice(2, -2)}</strong>;
                }
                return part;
            });

            // Check if bullet point line
            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                return (
                    <div key={lIdx} className="flex items-start gap-2 my-1 pl-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                        <span>{formattedLine}</span>
                    </div>
                );
            }

            return (
                <div key={lIdx} className={line.trim() === '' ? 'h-2' : 'my-0.5'}>
                    {formattedLine}
                </div>
            );
        });
    };

    // Offline Smart Fallback Response Engine
    const getOfflineFallbackResponse = (query) => {
        const q = query.toLowerCase();
        
        if (q.includes('onion') || q.includes('कांदा') || q.includes('प्याज़') || q.includes('प्याज')) {
            return {
                text: lang === 'mr'
                    ? "🧅 **नाशिक बाजार समिती अंदाज**: सध्याचा दर ₹२,४५०/क्विंटल आहे. सोलापूर भागातील आवक घटल्याने पुढील ४ दिवसांत १२% भाववाढ अपेक्षित आहे. **शिफारस**: अधिक नफ्यासाठी आपला माल ३ दिवस राखून ठेवा."
                    : lang === 'hi'
                    ? "🧅 **नासिक एपीएमसी मंडी पूर्वानुमान**: वर्तमान भाव ₹2,450/क्विंटल है। सोलापुर में आवक घटने के कारण अगले 4 दिनों में 12% की मूल्य वृद्धि संभावित है। **सिफारिश**: अधिकतम शुद्ध आय के लिए अपना माल 3 दिन रोककर रखें।"
                    : "🧅 **Nashik APMC Mandi Forecast**: Current rate is ₹2,450/Qtl. Price trends suggest a +12% increase over the next 4 days due to supply contraction in Solapur. **Recommendation**: Hold your stock for 3 days to maximize net realization.",
                actions: [
                    { label: lang === 'mr' ? '📊 दर आलेख पहा' : lang === 'hi' ? '📊 भाव चार्ट देखें' : '📊 View Price Charts', tab: 'market_data' },
                    { label: lang === 'mr' ? '🛒 खरेदीदार तपासा' : lang === 'hi' ? '🛒 खरीदार देखें' : '🛒 Check Buyers', tab: 'marketplace' }
                ]
            };
        } else if (q.includes('tomato') || q.includes('टोमॅटो') || q.includes('टमाटर')) {
            return {
                text: lang === 'mr'
                    ? "🍅 **पुणे बाजार समिती दर**: ग्रेड 'अ' टोमॅटो ₹१,८५०/क्विंटल दराने विकला जात आहे. ग्रेड 'ब' चा दर ₹१,४००/क्विंटल आहे. विक्रीपूर्वी संगणक दृष्टी AI गुणवत्ता तपासणी वापरून ग्रेडिंग करा!"
                    : lang === 'hi'
                    ? "🍅 **पुणे मंडी भाव**: ग्रेड A टमाटर ₹1,850/क्विंटल पर बिक रहा है। ग्रेड B का भाव लगभग ₹1,400/क्विंटल है। बेचने से पहले हमारे कंप्यूटर विज़न AI क्वालिटी चेक से ग्रेडिंग करें!"
                    : "🍅 **Pune Mandi Rate**: Grade A Tomatoes are trading at ₹1,850/Qtl. Quality Grade B trades around ₹1,400/Qtl. Use our Computer Vision AI Quality Check to grade your harvest before selling!",
                actions: [
                    { label: lang === 'mr' ? '🛡️ गुणवत्ता तपासा' : lang === 'hi' ? '🛡️ गुणवत्ता जांचें' : '🛡️ Grade Tomatoes Now', tab: 'quality_check' },
                    { label: lang === 'mr' ? '📊 बाजार कल' : lang === 'hi' ? '📊 मंडी रुझान' : '📊 View Market Trends', tab: 'market_data' }
                ]
            };
        } else if (q.includes('truck') || q.includes('transport') || q.includes('logistics') || q.includes('वाहना') || q.includes('गाडी') || q.includes('ट्रक') || q.includes('गाड़ी') || q.includes('भाड़ा')) {
            return {
                text: lang === 'mr'
                    ? "🚛 **स्थानिक सामायिक वाहतूक**: आपल्या तालुक्यातील ३ शेतकरी उद्या सकाळी वाशी मार्केटला माल घेऊन जात आहेत. सामायिक वाहनामुळे प्रति शेतकरी **₹१,२०० बचत** (४०% कमी खर्च) होईल."
                    : lang === 'hi'
                    ? "🚛 **हाइपर-लोकल साझा परिवहन पूल**: आपके तालुका से 3 किसान कल सुबह वाशी मंडी जा रहे हैं। साझा ट्रक से प्रति किसान **₹1,200 की बचत** (40% भाड़ा कमी) होगी।"
                    : "🚛 **Hyper-Local Logistics Pooling**: Found 3 active farmers in your Taluka heading to Vashi Market tomorrow morning. Shared truck savings: **₹1,200 per farmer** (40% freight reduction).",
                actions: [{ label: lang === 'mr' ? '🚛 सामायिक वाहनात सामील व्हा' : lang === 'hi' ? '🚛 साझा वाहन में शामिल हों' : '🚛 Join Logistics Pool', tab: 'logistics' }]
            };
        } else if (q.includes('soybean') || q.includes('सोयाबीन')) {
            return {
                text: lang === 'mr'
                    ? "🌱 **लातूर बाजार समिती**: सध्याचा दर ₹४,६८०/क्विंटल आहे (ग्रेड 'अ', ओलावा < १०%). लातूर आणि नांदेड भागात शेतकरी उत्पादक कंपन्यांची (FPO) थेट खरेदी सुरू आहे."
                    : lang === 'hi'
                    ? "🌱 **लातूर एपीएमसी मंडी**: वर्तमान भाव ₹4,680/क्विंटल है (ग्रेड A, नमी < 10%)। लातूर और नांदेड़ में किसान उत्पादक कंपनियों (FPO) द्वारा सीधी खरीद सक्रिय है।"
                    : "🌱 **Latur APMC Mandi**: Current rate is ₹4,680/Qtl (Grade A moisture < 10%). Demand is steady with FPO procurement active in Latur and Nanded.",
                actions: [{ label: lang === 'mr' ? '🌾 संधी शोधा' : lang === 'hi' ? '🌾 अवसर देखें' : '🌾 Explore Opportunities', tab: 'marketplace' }]
            };
        } else {
            return {
                text: lang === 'mr'
                    ? "ॲग्रोब्रिज AI: विचारल्याबद्दल धन्यवाद! महाराष्ट्र शासन ॲगमार्कनेट आकडेवारीनुसार राज्यातील आवक आज स्थिर आहे. उत्तम नफ्यासाठी पिकाची गुणवत्ता ग्रेडिंग करून घ्या आणि सामायिक वाहनाचा वापर करून वाहतूक खर्चात ४०% बचत करा."
                    : lang === 'hi'
                    ? "एग्रोब्रिज AI: पूछने के लिए धन्यवाद। महाराष्ट्र मंडी आंकड़ों (Agmarknet) के अनुसार आज थोक मंडियों में आवक स्थिर है। अधिकतम लाभ के लिए अपनी फसल की गुणवत्ता ग्रेडिंग करवाएं और 40% तक भाड़ा बचाने के लिए साझा वाहन का उपयोग करें।"
                    : "AgroBridge AI: Thank you for asking. Based on Maharashtra Mandi data (Agmarknet), wholesale market arrivals are stable today. For maximum returns, ensure your produce is graded (Grade A/B) and consider logistics pooling with neighboring farmers to save up to 40% transport costs.",
                actions: [
                    { label: lang === 'mr' ? '📊 बाजार भाव' : lang === 'hi' ? '📊 मंडी भाव' : '📊 Check Market Intel', tab: 'market_data' },
                    { label: lang === 'mr' ? '🚛 सामायिक वाहतूक' : lang === 'hi' ? '🚛 साझा वाहन' : '🚛 Logistics Sharing', tab: 'logistics' }
                ]
            };
        }
    };

    const handleSend = async (e, customText = null) => {
        if (e) e.preventDefault();
        const messageText = customText || input;
        if (!messageText.trim()) return;

        const userMsg = {
            sender: 'user',
            text: messageText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        if (!customText) setInput('');
        setIsLoading(true);

        try {
            // Attempt live backend API call to FastAPI Groq Endpoint
            const response = await fetch('http://localhost:8000/api/chat/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText, lang })
            });

            if (response.ok) {
                const data = await response.json();
                const botReplyText = data.reply || "No response received.";
                setIsOnline(true);

                // Contextual action detection
                const actions = [];
                const lowerReply = botReplyText.toLowerCase();
                if (lowerReply.includes('price') || lowerReply.includes('mandi') || lowerReply.includes('rate') || lowerReply.includes('market') || lowerReply.includes('भाव') || lowerReply.includes('दर')) {
                    actions.push({ label: lang === 'mr' ? '📊 बाजार भाव' : lang === 'hi' ? '📊 मंडी भाव' : '📊 Market Intel', tab: 'market_data' });
                }
                if (lowerReply.includes('pool') || lowerReply.includes('truck') || lowerReply.includes('transport') || lowerReply.includes('logistics') || lowerReply.includes('वाहतूक') || lowerReply.includes('परिवहन') || lowerReply.includes('ट्रक')) {
                    actions.push({ label: lang === 'mr' ? '🚛 सामायिक वाहतूक' : lang === 'hi' ? '🚛 साझा वाहन' : '🚛 Logistics Sharing', tab: 'logistics' });
                }
                if (lowerReply.includes('grade') || lowerReply.includes('quality') || lowerReply.includes('defect') || lowerReply.includes('गुणवत्ता') || lowerReply.includes('प्रतवारी')) {
                    actions.push({ label: lang === 'mr' ? '🛡️ गुणवत्ता तपासणी' : lang === 'hi' ? '🛡️ गुणवत्ता जांच' : '🛡️ Quality Check', tab: 'quality_check' });
                }

                const botMsg = {
                    sender: 'bot',
                    text: botReplyText,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    actions: actions.length > 0 ? actions : null
                };

                setMessages(prev => [...prev, botMsg]);
                speakText(botReplyText);
            } else {
                throw new Error('Backend HTTP error');
            }
        } catch (error) {
            // Smart offline fallback
            setIsOnline(false);
            const fallback = getOfflineFallbackResponse(messageText);
            const botMsg = {
                sender: 'bot',
                text: fallback.text,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actions: fallback.actions
            };
            setMessages(prev => [...prev, botMsg]);
            speakText(fallback.text);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const promptChips = [
        { 
            label: lang === 'mr' ? '🧅 नाशिक कांदा भाव अंदाज' : lang === 'hi' ? '🧅 नासिक प्याज मूल्य पूर्वानुमान' : '🧅 Onion Price Forecast in Nashik', 
            query: lang === 'mr' ? 'नाशिक बाजार समितीमध्ये पुढील ७ दिवसांचा कांद्याचा अपेक्षित भाव काय आहे?' : lang === 'hi' ? 'नासिक एपीएमसी में अगले 7 दिनों का प्याज का अपेक्षित भाव क्या है?' : 'What is the 7-day expected onion price in Nashik APMC?' 
        },
        { 
            label: lang === 'mr' ? '🚛 सामायिक वाहन शोधा' : lang === 'hi' ? '🚛 साझा वाहन (ट्रक) खोजें' : '🚛 Find Shared Truck Pools', 
            query: lang === 'mr' ? 'माझ्या तालुक्यात इतर शेतकऱ्यांसोबत सामायिक वाहतूक उपलब्ध आहे का?' : lang === 'hi' ? 'क्या मेरे जिले के पास उपज ले जाने के लिए साझा लॉजिस्टिक्स उपलब्ध है?' : 'Are there active logistics pools for transport near my district?' 
        },
        { 
            label: lang === 'mr' ? '📸 पिकाची प्रतवारी कशी करावी?' : lang === 'hi' ? '📸 फसल गुणवत्ता ग्रेडिंग कैसे करें?' : '📸 How to Grade Crop Quality?', 
            query: lang === 'mr' ? 'टोमॅटो आणि कांद्यासाठी AI गुणवत्ता तपासणी कशी काम करते?' : lang === 'hi' ? 'टमाटर और प्याज के लिए AI क्वालिटी ग्रेडिंग कैसे काम करती है?' : 'How does the AI quality grading feature work for tomatoes and onions?' 
        },
        { 
            label: lang === 'mr' ? '🌱 लातूर सोयाबीन दर' : lang === 'hi' ? '🌱 लातूर सोयाबीन आज का भाव' : '🌱 Soybean Mandi Rates Today', 
            query: lang === 'mr' ? 'लातूर बाजार समितीतील आजचे सोयाबीनचे दर दाखवा.' : lang === 'hi' ? 'लातूर मंडी में आज सोयाबीन का थोक भाव क्या है?' : 'Show me current wholesale market rates for Soybean in Latur.' 
        }
    ];

    return (
        <div className={`transition-all duration-300 flex flex-col bg-white/95 backdrop-blur-2xl text-slate-800 relative z-30 ${
            isFullScreen 
                ? 'fixed inset-x-0 top-16 bottom-0 z-50 rounded-none border-none shadow-none w-full h-[calc(100vh-4rem)]' 
                : 'w-full max-w-6xl mx-auto my-4 h-[calc(100vh-8rem)] min-h-[600px] rounded-3xl border border-slate-200 shadow-2xl overflow-hidden'
        }`}>
            
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

            {/* Chat Header */}
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 px-4 sm:px-8 py-4 sm:py-5 text-white flex items-center justify-between shadow-md relative z-10 border-b border-emerald-800">
                <div className="flex items-center gap-3.5">
                    <div className="relative">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-700/80 border border-emerald-500/40 flex items-center justify-center text-amber-300 shadow-inner">
                            <Bot className="w-6 h-6" />
                        </div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-emerald-950 ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} title={isOnline ? 'Backend Connected' : 'Offline Intelligent Fallback'} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black tracking-tight text-white">AgroBridge AI Copilot</h2>
                            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Llama-3
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-200/90 font-medium">
                            <span>User: <strong className="text-white font-bold">{farmerData.name} ({farmerData.district})</strong></span>
                            <span>•</span>
                            <p className="opacity-90">
                                {isOnline ? 'AI Connected — Voice & Vernacular Enabled' : 'Offline Intelligence Mode Active'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-2 relative z-10">
                    <button 
                        onClick={() => setIsMuted(!isMuted)} 
                        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                        className={`p-2.5 rounded-xl border transition ${isMuted ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-emerald-800/80 border-emerald-600/50 text-emerald-100 hover:bg-emerald-700'}`}
                    >
                        {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                    </button>

                    <button 
                        onClick={() => setIsFullScreen(!isFullScreen)} 
                        title={isFullScreen ? 'Exit Full Screen' : 'Expand Full Screen'}
                        className="p-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/50 text-amber-300 transition flex items-center gap-1.5 font-bold text-xs cursor-pointer"
                    >
                        {isFullScreen ? (
                            <>
                                <Minimize2 className="w-4.5 h-4.5" />
                                <span className="hidden sm:inline">Compact</span>
                            </>
                        ) : (
                            <>
                                <Maximize2 className="w-4.5 h-4.5" />
                                <span className="hidden sm:inline">Full Screen</span>
                            </>
                        )}
                    </button>
                    
                    <button 
                        onClick={() => setMessages(initialMessages)}
                        title="Clear Chat History"
                        className="p-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/50 text-emerald-100 transition cursor-pointer"
                    >
                        <RefreshCw className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="bg-emerald-50/90 border-x border-b border-emerald-100 px-4 sm:px-8 py-2.5 flex items-center gap-2 overflow-x-auto hide-scrollbar shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1 shrink-0">
                    <Zap className="w-3.5 h-3.5 text-amber-500" /> 
                    {lang === 'mr' ? 'त्वरित प्रश्न:' : lang === 'hi' ? 'त्वरित पूछें:' : 'Quick Ask:'}
                </span>
                {promptChips.map((chip, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => handleSend(e, chip.query)}
                        className="bg-white hover:bg-emerald-100/70 border border-emerald-200/80 text-emerald-900 text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap shadow-2xs transition hover:scale-102 active:scale-98 cursor-pointer"
                    >
                        {chip.label}
                    </button>
                ))}
            </div>

            {/* Listening Banner Overlay */}
            <AnimatePresence>
                {isListening && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-amber-50 border-x border-b border-amber-200 px-4 sm:px-8 py-2 flex items-center justify-between text-amber-800 text-xs font-bold shrink-0"
                    >
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                            <span>Listening... Speak clearly in {lang === 'hi' ? 'Hindi (हिंदी)' : lang === 'mr' ? 'Marathi (मराठी)' : 'English'}</span>
                        </div>
                        <button onClick={toggleListening} className="text-amber-900 underline hover:text-amber-700">Cancel</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat History Messages Stream */}
            <div className="flex-1 p-4 sm:p-8 md:p-10 overflow-y-auto space-y-6 bg-slate-50/50">
                <div className="w-full max-w-full sm:max-w-6xl md:max-w-7xl mx-auto space-y-6">
                    {messages.map((msg, idx) => {
                        const isUser = msg.sender === 'user';
                        return (
                            <div 
                                key={idx} 
                                className={`flex gap-4 w-full ${isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-3.5 max-w-[95%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${
                                        isUser 
                                            ? 'bg-emerald-700 text-white border-emerald-600' 
                                            : 'bg-white text-emerald-800 border-slate-200'
                                    }`}>
                                        {isUser ? <User className="w-5.5 h-5.5" /> : <Bot className="w-5.5 h-5.5" />}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                                        <div className={`p-4 sm:p-5 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed font-medium ${
                                            isUser 
                                                ? 'bg-emerald-800 text-white rounded-tr-xs border border-emerald-900/40' 
                                                : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs'
                                        }`}>
                                            <div className="text-sm sm:text-base leading-relaxed break-words">
                                                {isUser ? msg.text : renderFormattedText(msg.text)}
                                            </div>

                                            {/* Action Shortcuts inside Bot Reply */}
                                            {msg.actions && (
                                                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                                                    {msg.actions.map((act, aIdx) => (
                                                        <button
                                                            key={aIdx}
                                                            onClick={() => setActiveTab(act.tab)}
                                                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-2xs hover:shadow-xs cursor-pointer"
                                                        >
                                                            <span>{act.label}</span>
                                                            <ArrowRight className="w-3 h-3 text-emerald-600" />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Timestamp & Quick Actions */}
                                        <div className={`flex items-center gap-2 px-1 text-[11px] font-semibold text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                                            <span>{msg.timestamp}</span>
                                            <button 
                                                onClick={() => handleCopy(msg.text, idx)}
                                                className="hover:text-slate-600 transition p-0.5 cursor-pointer"
                                                title="Copy message"
                                            >
                                                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="flex gap-3 max-w-[70%]">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                                <Bot className="w-5 h-5 animate-spin" />
                            </div>
                            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-xs shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100"></span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-200"></span>
                                <span className="text-xs font-semibold text-slate-400 ml-2">
                                    {lang === 'mr' 
                                        ? 'ॲग्रोब्रिज AI बाजार माहितीचे विश्लेषण करत आहे...' 
                                        : lang === 'hi' 
                                        ? 'एग्रोब्रिज AI मंडी डेटा का विश्लेषण कर रहा है...' 
                                        : 'AgroBridge AI is analyzing mandi data...'}
                                </span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Form Bar */}
            <div className="p-3 sm:p-5 bg-white border-t border-slate-200/80 relative z-10">
                <form onSubmit={handleSend} className="w-full max-w-full sm:max-w-6xl md:max-w-7xl mx-auto flex items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleListening}
                        className={`p-3.5 rounded-2xl border transition flex items-center justify-center shrink-0 cursor-pointer ${
                            isListening 
                                ? 'bg-red-500 text-white border-red-600 animate-pulse shadow-md' 
                                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border-slate-200'
                        }`}
                        title={isListening ? 'Stop Listening' : 'Voice Input (Vernacular Speech)'}
                    >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            lang === 'mr'
                                ? "येथे प्रश्न विचारा (उदा. नाशिकमध्ये कांद्याचा दर काय आहे?)..."
                                : lang === 'hi'
                                ? "यहाँ प्रश्न पूछें (उदा. नासिक में प्याज का भाव क्या है?)..."
                                : "Ask a question (e.g. Expected onion price in Nashik mandi)..."
                        }
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-inner"
                    />

                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white p-3.5 sm:px-8 rounded-2xl font-bold transition flex items-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed shrink-0 cursor-pointer text-base"
                    >
                        <span className="hidden sm:inline">
                            {lang === 'mr' ? 'पाठवा' : lang === 'hi' ? 'भेजें' : 'Send'}
                        </span>
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}