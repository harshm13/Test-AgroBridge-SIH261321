from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

router = APIRouter(
    prefix="/api/schemes",
    tags=["Government Schemes (Maharashtra)"]
)

MAHARASHTRA_SCHEMES = [
    {
        "id": "SCH-MH-01",
        "name_en": "Punyashlok Ahilyadevi Holkar Shetkari Karjmukti Yojana",
        "name_mr": "पुण्यश्लोक अहिल्यादेवी होळकर शेतकरी कर्जमुक्ती योजना",
        "department": "Department of Co-operation, Marketing and Textiles, Govt of Maharashtra",
        "category": "Debt Relief & Credit",
        "max_benefit": "Waiver up to ₹2,00,000 on crop loan arrears",
        "max_benefit_mr": "पीक कर्ज थकबाकीवर ₹२,००,००० पर्यंत संपूर्ण कर्जमाफी",
        "description_en": "Comprehensive debt relief scheme launched by Maharashtra Govt providing complete loan waiver up to ₹2 lakh for overdue agricultural short-term credit.",
        "description_mr": "थकीत पीक कर्जापासून मुक्ती देण्यासाठी महाराष्ट्र शासनाची कर्जमुक्ती योजना, ज्यामध्ये ₹२ लाखांपर्यंत कर्जमाफी दिली जाते.",
        "eligibility_rules": {
            "max_land_acres": 10,
            "has_crop_loan": True,
            "states": ["Maharashtra"]
        },
        "required_documents": [
            "7/12 Extract (७/१२ उतारा) & 8-A Extract",
            "Aadhaar Card linked to Bank Account",
            "Co-operative / Nationalized Bank Loan Passbook",
            "Crop Loan account statement (खाते उतारा)"
        ],
        "portal_url": "https://mjpsky.maharashtra.gov.in",
        "status": "Active Statewide"
    },
    {
        "id": "SCH-MH-02",
        "name_en": "Namo Shetkari Mahasanman Nidhi Yojana",
        "name_mr": "नमो शेतकरी महासन्मान निधी योजना",
        "department": "Department of Agriculture, Govt of Maharashtra",
        "category": "Direct Income Support",
        "max_benefit": "₹6,000 / year (Direct Bank Transfer in 3 installments)",
        "max_benefit_mr": "दरवर्षी ₹६,००० (३ हप्त्यांमध्ये थेट बँक खात्यात जमा)",
        "description_en": "State government initiative providing an additional ₹6,000 annually to all PM-KISAN beneficiary farmers in Maharashtra, delivering total annual aid of ₹12,000.",
        "description_mr": "पीएम-किसान योजनेसह महाराष्ट्र शासनाकडून अतिरिक्त ₹६,००० वार्षिक अनुदान, एकूण ₹१२,००० लाभ थेट खात्यात.",
        "eligibility_rules": {
            "max_land_acres": 25,
            "has_crop_loan": None,
            "states": ["Maharashtra"]
        },
        "required_documents": [
            "PM-KISAN Registration ID",
            "Aadhaar Number (e-KYC verified)",
            "Active DBT Bank Account",
            "Land title proof (7/12)"
        ],
        "portal_url": "https://krishi.maharashtra.gov.in",
        "status": "Active Statewide"
    },
    {
        "id": "SCH-MH-03",
        "name_en": "MahaDBT Drip & Micro Irrigation Subsidy",
        "name_mr": "महाडीबीटी सूक्ष्म सिंचन (ठिबक व तुषार) अनुदान योजना",
        "department": "Directorate of Horticulture, Govt of Maharashtra",
        "category": "Water & Farm Mechanization",
        "max_benefit": "80% Subsidy for Small/Marginal Farmers (75% for others)",
        "max_benefit_mr": "लहान व सीमांत शेतकऱ्यांसाठी ८०% पर्यंत थेट अनुदान",
        "description_en": "Financial assistance scheme facilitating adoption of micro-irrigation systems to maximize water use efficiency in onion, sugarcane, cotton, and horticulture.",
        "description_mr": "कांदा, ऊस, फळबागांसाठी ठिबक व तुषार सिंचन बसविण्यासाठी ८०% शासकीय अनुदान थेट बँक खात्यात.",
        "eligibility_rules": {
            "max_land_acres": 12.5,
            "crops": ["Onion", "Tomato", "Cotton", "Sugarcane", "Grapes", "Pomegranate"],
            "states": ["Maharashtra"]
        },
        "required_documents": [
            "7/12 Extract with Water Source registered (विहीर/बोअरवेल नोंद)",
            "Authorized Vendor Quoting / Proforma Invoice",
            "Caste Certificate (if applicable for enhanced 80% subsidy)",
            "Bank Passbook copy"
        ],
        "portal_url": "https://mahadbt.maharashtra.gov.in",
        "status": "Active Statewide"
    },
    {
        "id": "SCH-MH-04",
        "name_en": "Mukhyamantri Saur Krushi Pump Yojana (Magel Tyala Solar)",
        "name_mr": "मुख्यमंत्री सौर कृषी पंप योजना (मागेल त्याला सौर कृषी पंप)",
        "department": "MSEDCL / MahaUrja (MEDA)",
        "category": "Clean Energy & Power",
        "max_benefit": "90% to 95% Subsidy on 3HP, 5HP & 7.5HP Solar Pumps",
        "max_benefit_mr": "३, ५ व ७.५ एचपी सौर पंपावर ९०% ते ९५% पर्यंत घसघशीत अनुदान",
        "description_en": "Provides daytime assured green electricity to farmers by deploying off-grid solar water pumping systems at minimal farmer contribution (only 5%-10%).",
        "description_mr": "शेतकऱ्यांना दिवसा सिंचनाची खात्रीशीर वीज मिळण्यासाठी सौर कृषी पंप केवळ ५% ते १०% स्वहिश्श्यावर उपलब्ध.",
        "eligibility_rules": {
            "max_land_acres": 20,
            "has_water_source": True,
            "states": ["Maharashtra"]
        },
        "required_documents": [
            "7/12 and 8-A Land Records",
            "NOC from co-owners (if shared well)",
            "Aadhaar Card",
            "Electricity connection clearance certificate"
        ],
        "portal_url": "https://www.mahadiscom.in/solar",
        "status": "Active Statewide"
    },
    {
        "id": "SCH-MH-05",
        "name_en": "Dr. Punjabrao Deshmukh Jaivik Kheti Mission",
        "name_mr": "डॉ. पंजाबराव देशमुख जैविक शेती मिशन",
        "department": "Agriculture Department, Govt of Maharashtra",
        "category": "Organic Farming & FPO Linkage",
        "max_benefit": "Grant up to ₹50,000/hectare over 3 years + organic certification",
        "max_benefit_mr": "प्रति हेक्टरी ₹५०,००० अनुदान + मोफत सेंद्रिय प्रमाणीकरण",
        "description_en": "Promotes organic cluster farming and FPO marketing linkages to ensure chemical-free premium crop realization in domestic and international markets.",
        "description_mr": "सेंद्रिय शेती गट आणि शेतकरी उत्पादक कंपन्यांना (FPO) प्रोत्साहन देऊन मालाला आंतरराष्ट्रीय व देशांतर्गत वाढीव भाव मिळवून देणे.",
        "eligibility_rules": {
            "max_land_acres": 15,
            "states": ["Maharashtra"]
        },
        "required_documents": [
            "Cluster registration form / FPO membership",
            "7/12 Extract",
            "Soil Health Card (मृदा आरोग्य पत्रिका)"
        ],
        "portal_url": "https://krishi.maharashtra.gov.in",
        "status": "Active in 36 Districts"
    },
    {
        "id": "SCH-MH-06",
        "name_en": "Gopinath Munde Shetkari Apghat Suraksha Vima Yojana",
        "name_mr": "गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा सानुग्रह योजना",
        "department": "Revenue and Forest Department, Maharashtra",
        "category": "Accident Insurance Cover",
        "max_benefit": "₹2,00,000 Financial Aid to Farmer Family",
        "max_benefit_mr": "शेतकरी कुटुंबाला ₹२,००,००० पर्यंतचे आर्थिक सुरक्षा सहाय्य",
        "description_en": "100% state-funded accident insurance for all registered land-holding farmers in Maharashtra aged 10-75 years.",
        "description_mr": "महाराष्ट्रातील सर्व खातेदार शेतकऱ्यांसाठी शासनाकडून मोफत अपघात विमा संरक्षण.",
        "eligibility_rules": {
            "states": ["Maharashtra"]
        },
        "required_documents": [
            "7/12 Extract showing deceased/injured farmer's name",
            "FIR / Police Panchnama",
            "Age Proof & Aadhaar"
        ],
        "portal_url": "https://krishi.maharashtra.gov.in",
        "status": "Active Statewide"
    }
]

class EligibilityRequest(BaseModel):
    farmer_name: str = "Ramesh Patil"
    land_acres: float = 2.5
    crops: List[str] = ["Onion", "Tomato"]
    district: str = "Nashik"
    state: str = "Maharashtra"
    has_crop_loan: bool = True
    has_drip: bool = False

@router.get("/list")
def list_all_schemes():
    """Returns all Government of Maharashtra agricultural schemes."""
    return {
        "state": "Maharashtra",
        "schemes_count": len(MAHARASHTRA_SCHEMES),
        "schemes": MAHARASHTRA_SCHEMES
    }

@router.post("/check-eligibility")
def check_farmer_eligibility(profile: EligibilityRequest) -> Dict[str, Any]:
    """
    Evaluates farmer profile against Maharashtra schemes and returns personalized eligibility matches.
    """
    eligible = []
    recommended = []

    for s in MAHARASHTRA_SCHEMES:
        rules = s["eligibility_rules"]
        is_eligible = True
        reasons = []

        # Check state
        if "states" in rules and profile.state not in rules["states"]:
            is_eligible = False
            reasons.append(f"Applicable only in {', '.join(rules['states'])}")

        # Check landholding
        if "max_land_acres" in rules and profile.land_acres > rules["max_land_acres"]:
            is_eligible = False
            reasons.append(f"Land exceeds maximum {rules['max_land_acres']} acres")

        # Check crop match for specific subsidies
        if "crops" in rules:
            matching_crops = [c for c in profile.crops if c.lower() in [rc.lower() for rc in rules["crops"]]]
            if not matching_crops:
                is_eligible = False
                reasons.append("Crop does not match designated subsidy schedule")

        # Check loan status for Karjmukti
        if rules.get("has_crop_loan") is True and not profile.has_crop_loan:
            is_eligible = False
            reasons.append("Requires active or overdue short-term crop credit")

        scheme_card = {
            **s,
            "is_eligible": is_eligible,
            "eligibility_reasons": reasons if not is_eligible else ["All criteria satisfied ✅"],
            "match_score": 95 if is_eligible else 40
        }

        if is_eligible:
            eligible.append(scheme_card)
        else:
            recommended.append(scheme_card)

    return {
        "farmer_name": profile.farmer_name,
        "district": profile.district,
        "land_acres": profile.land_acres,
        "eligible_count": len(eligible),
        "total_schemes_checked": len(MAHARASHTRA_SCHEMES),
        "eligible_schemes": eligible,
        "other_schemes": recommended,
        "advisory_mr": f"तुमच्या {profile.land_acres} एकर जमिनीनुसार आणि {', '.join(profile.crops)} पिकासाठी तुम्ही {len(eligible)} शासकीय योजनांसाठी पात्र आहात!",
        "advisory_en": f"Based on your {profile.land_acres} acre farm and {', '.join(profile.crops)} crops, you are eligible for {len(eligible)} Maharashtra Government schemes!"
    }
