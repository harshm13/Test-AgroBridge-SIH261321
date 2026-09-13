export const MAHARASHTRA_SCHEMES_DATA = [
  {
    id: "SCH-MH-01",
    name_en: "Punyashlok Ahilyadevi Holkar Shetkari Karjmukti Yojana",
    name_mr: "पुण्यश्लोक अहिल्यादेवी होळकर शेतकरी कर्जमुक्ती योजना",
    department_en: "Department of Co-operation, Marketing & Textiles, Maharashtra",
    department_mr: "सहकार, पणन व वस्त्रोद्योग विभाग, महाराष्ट्र शासन",
    category: "Debt Relief",
    category_mr: "कर्जमुक्ती व पतसहाय्य",
    max_benefit_en: "Complete waiver up to ₹2,00,000 on crop loan arrears",
    max_benefit_mr: "थकीत पीक कर्जावर ₹२ लाखांपर्यंत संपूर्ण कर्जमाफी",
    description_en: "Flagship debt relief scheme for distressed small and marginal farmers across Maharashtra suffering from crop damage or price drops, settling credit directly with DCCBs and commercial banks.",
    description_mr: "नैसर्गिक आपत्ती किंवा भावातील घसरणीमुळे थकीत झालेल्या लहान व सीमांत शेतकऱ्यांच्या पीक कर्जाचे ₹२ लाखांपर्यंत संपूर्ण पुनर्वसन.",
    match_criteria: { max_acres: 10, requires_loan: true },
    required_docs: [
      "7/12 Extract (७/१२ उतारा) & 8-A Extract",
      "Aadhaar Card linked with Bank Account",
      "Crop Loan Passbook / Account statement (खाते उतारा)",
      "Farmer Self-Declaration Form"
    ],
    portal_url: "https://mjpsky.maharashtra.gov.in",
    highlight_badge: "High Social Impact",
    status: "Active Statewide"
  },
  {
    id: "SCH-MH-02",
    name_en: "Namo Shetkari Mahasanman Nidhi Yojana",
    name_mr: "नमो शेतकरी महासन्मान निधी योजना",
    department_en: "Department of Agriculture, Maharashtra",
    department_mr: "कृषी विभाग, महाराष्ट्र शासन",
    category: "Direct Income Support",
    category_mr: "थेट उत्पन्न सहाय्य",
    max_benefit_en: "₹6,000 / year (Combined with PM-KISAN = ₹12,000 / year)",
    max_benefit_mr: "दरवर्षी ₹६,००० (पीएम-किसान सह एकूण ₹१२,००० थेट बँक खात्यात)",
    description_en: "Provides an additional ₹6,000 annually in three installments of ₹2,000 each to all registered landholder farmers in Maharashtra via Direct Benefit Transfer.",
    description_mr: "महाराष्ट्रातील पात्र शेतकऱ्यांना दर ४ महिन्यांनी ₹२,००० प्रमाणे वर्षाला अतिरिक्त ₹६,००० चा लाभ थेट खात्यात.",
    match_criteria: { max_acres: 25, requires_loan: false },
    required_docs: [
      "Active PM-KISAN Beneficiary ID",
      "e-KYC Verified Aadhaar Card",
      "Aadhaar-seeded Bank Passbook",
      "Land Ownership Proof (7/12)"
    ],
    portal_url: "https://krishi.maharashtra.gov.in",
    highlight_badge: "Direct Cash Benefit",
    status: "Active Statewide"
  },
  {
    id: "SCH-MH-03",
    name_en: "MahaDBT Drip & Micro-Irrigation Subsidy",
    name_mr: "महाडीबीटी सूक्ष्म सिंचन (ठिबक व तुषार) अनुदान योजना",
    department_en: "Directorate of Horticulture, Maharashtra",
    department_mr: "फलोत्पादन संचालनालय, महाराष्ट्र शासन",
    category: "Farm Modernization",
    category_mr: "सिंचन व शेती आधुनिकीकरण",
    max_benefit_en: "Up to 80% Subsidy for Small/Marginal Farmers (75% Others)",
    max_benefit_mr: "लहान व सीमांत शेतकऱ्यांसाठी ८०% पर्यंत थेट शासकीय अनुदान",
    description_en: "Encourages adoption of micro-irrigation for water-intensive crops like Onion, Sugarcane, Cotton, Grapes, reducing water consumption by 50% while boosting yield by 30%.",
    description_mr: "कांदा, कापूस, फळबागांसाठी ठिबक सिंचन बसवून पाण्याचा अपव्यय टाळणे व उत्पादनात भरघोस वाढ करणे.",
    match_criteria: { max_acres: 12.5, requires_loan: false },
    required_docs: [
      "7/12 Extract with Water Source Registration (विहीर/शेततळे नोंद)",
      "Authorized Dealer Quotation / GST Bill",
      "Caste Certificate (if claiming enhanced 80% category)",
      "Electricity Bill / Solar Pump receipt"
    ],
    portal_url: "https://mahadbt.maharashtra.gov.in",
    highlight_badge: "80% Subsidy",
    status: "Active Statewide"
  },
  {
    id: "SCH-MH-04",
    name_en: "Mukhyamantri Saur Krushi Pump Yojana (Magel Tyala Solar)",
    name_mr: "मुख्यमंत्री सौर कृषी पंप योजना (मागेल त्याला सौर कृषी पंप)",
    department_en: "MSEDCL & Maharashtra Energy Development Agency (MEDA)",
    department_mr: "महावितरण व महाऊर्जा (MEDA)",
    category: "Green Energy & Power",
    category_mr: "सौर ऊर्जा व अखंड वीज",
    max_benefit_en: "90% to 95% Subsidy on 3HP, 5HP & 7.5HP Solar Pumps",
    max_benefit_mr: "३, ५ व ७.५ एचपी सौर पंपावर ९०% ते ९५% शासकीय अनुदान",
    description_en: "Ensures reliable daytime irrigation for farmers by replacing conventional diesel/grid pumps with standalone DC solar pumps at only 5-10% farmer share.",
    description_mr: "रात्रीच्या अनिश्चित विजेऐवजी दिवसा भरवशाचे सिंचन मिळण्यासाठी सौर कृषी पंप नाममात्र स्वहिश्श्यावर उपलब्ध.",
    match_criteria: { max_acres: 20, requires_loan: false },
    required_docs: [
      "7/12 and 8-A Land Extract",
      "No-Objection Certificate (NOC) if shared water source",
      "Aadhaar Card and Passport Photo",
      "Bank Account details"
    ],
    portal_url: "https://www.mahadiscom.in/solar",
    highlight_badge: "Daytime Irrigation",
    status: "Active Statewide"
  },
  {
    id: "SCH-MH-05",
    name_en: "Dr. Punjabrao Deshmukh Jaivik Kheti Mission",
    name_mr: "डॉ. पंजाबराव देशमुख जैविक शेती मिशन",
    department_en: "Agriculture Department, Maharashtra",
    department_mr: "कृषी विभाग, महाराष्ट्र शासन",
    category: "Organic Certification",
    category_mr: "सेंद्रिय शेती व FPO गट",
    max_benefit_en: "₹50,000 / hectare over 3 years + Free Organic Certification",
    max_benefit_mr: "प्रति हेक्टरी ₹५०,००० अनुदान + मोफत सेंद्रिय प्रमाणीकरण",
    description_en: "Supports cluster-based chemical-free organic farming and connects FPOs with domestic retail and export marketing channels for premium pricing.",
    description_mr: "रासायनिक खतांचा वापर कमी करून सेंद्रिय मालाला वाढीव बाजारभाव मिळवून देण्यासाठी शेतकरी गटांना पाठबळ.",
    match_criteria: { max_acres: 15, requires_loan: false },
    required_docs: [
      "FPO / Farmer Group Membership Deed",
      "Soil Health Card (मृदा आरोग्य पत्रिका)",
      "7/12 Land Title Extract"
    ],
    portal_url: "https://krishi.maharashtra.gov.in",
    highlight_badge: "Export Premium",
    status: "Active in 36 Districts"
  },
  {
    id: "SCH-MH-06",
    name_en: "Gopinath Munde Shetkari Apghat Suraksha Vima Yojana",
    name_mr: "गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा सानुग्रह योजना",
    department_en: "Revenue and Forest Department, Maharashtra",
    department_mr: "महसूल व वन विभाग, महाराष्ट्र शासन",
    category: "Insurance & Social Safety",
    category_mr: "अपघात विमा व सामाजिक सुरक्षा",
    max_benefit_en: "₹2,00,000 Accidental Life & Disability Coverage (100% Free)",
    max_benefit_mr: "₹२,००,००० मोफत अपघात विमा संरक्षण शेतकरी कुटुंबाला",
    description_en: "State-funded universal accident insurance cover for all registered landholders aged 10-75 years against agricultural and road mishaps.",
    description_mr: "शेतात किंवा प्रवासात अपघात झाल्यास शेतकरी कुटुंबाला ₹२ लाखांचे थेट आर्थिक संरक्षण.",
    match_criteria: { max_acres: 100, requires_loan: false },
    required_docs: [
      "7/12 Extract with farmer's name",
      "Police FIR / Accident Panchnama",
      "Post-mortem report / Medical certificate",
      "Legal Heir Certificate & Aadhaar"
    ],
    portal_url: "https://krishi.maharashtra.gov.in",
    highlight_badge: "100% State Funded",
    status: "Active Statewide"
  }
];
