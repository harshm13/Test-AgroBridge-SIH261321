from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

router = APIRouter(
    prefix="/api/digital-twin",
    tags=["Farmer Digital Twin (Personalized Advisory)"]
)

class TwinSimulateRequest(BaseModel):
    farmer_name: str = "Ramesh Patil"
    district: str = "Nashik"
    soil_type: str = "Medium Black (Regur)"
    land_acres: float = 2.5
    crop: str = "Onion"
    quantity_quintals: float = 80.0
    storage_facility: str = "Ventilated Kanda Chawl (150 Qtl capacity)"
    storage_available: bool = True
    liquidity_pressure: str = "Low (Can hold up to 30 days)" # "Low", "Medium", "High (Urgent Cash)"
    irrigation_source: str = "Solar-powered Drip Irrigation"

# Pre-seeded Digital Twins
FARMER_TWINS = {
    "farmer-1": {
        "farmer_id": "farmer-1",
        "name": "Ramesh Patil",
        "village": "Sinnar",
        "district": "Nashik",
        "state": "Maharashtra",
        "gps": {"lat": 19.8512, "lng": 74.0019},
        "total_land_acres": 2.5,
        "soil_profile": {
            "type": "Black Regur Soil (काळी कसदार जमीन)",
            "ph": 7.4,
            "nitrogen_kg_ha": 240,
            "phosphorus_kg_ha": 48,
            "potassium_kg_ha": 380,
            "organic_carbon_percent": 0.68,
            "drainage": "Well-drained with high moisture retention"
        },
        "farm_infrastructure": {
            "irrigation": "Drip Irrigation (80% subsidized via MahaDBT)",
            "water_source": "Perennial Open Well + Farm Pond (शेततळे)",
            "storage": "Traditional Kanda Chawl (कांदा चाळ - 150 Qtl capacity)",
            "storage_holding_capacity_days": 45,
            "spoilage_rate_per_week_percent": 0.4
        },
        "financial_profile": {
            "kcc_limit": 150000,
            "working_capital_status": "Comfortable (Low immediate liquidity distress)",
            "recommended_holding_power": "Strong (Up to 2-3 weeks)"
        },
        "active_harvests": [
            {
                "crop": "Unhali Onion",
                "estimated_yield_qtl": 80.0,
                "current_maturity_stage": "Harvested & Cured in Chawl",
                "optimal_sell_window": "Next 5 to 10 Days"
            }
        ]
    }
}

@router.get("/{farmer_id}")
def get_farmer_digital_twin(farmer_id: str) -> Dict[str, Any]:
    """Retrieves the full virtual farm model / digital twin for a farmer."""
    twin = FARMER_TWINS.get(farmer_id)
    if not twin:
        # Generate default twin if not specifically matched
        twin = FARMER_TWINS["farmer-1"]
    
    return {
        "status": "success",
        "digital_twin": twin,
        "twin_health_score": 94,
        "climate_resilience_rating": "High (Drip + Chawl enabled)"
    }

@router.post("/simulate")
def simulate_decision(sim: TwinSimulateRequest) -> Dict[str, Any]:
    """
    Executes a multi-variable simulation comparing 'Sell Today' vs 'Hold in Storage'
    based on the farmer's unique physical soil, storage, and financial constraints.
    """
    base_mandi_price = 2850 # Current Lasalgaon rate per Qtl
    projected_price_7_days = 3120 # Expected price in 7 days
    projected_price_14_days = 3280

    gross_today = sim.quantity_quintals * base_mandi_price
    
    if sim.storage_available and "chawl" in sim.storage_facility.lower():
        # Minimal weight loss in proper ventilated chawl (approx 1% over 10 days)
        weight_retained_qtl = round(sim.quantity_quintals * 0.99, 1)
        gross_wait_7_days = round(weight_retained_qtl * projected_price_7_days, 2)
        extra_net_gain = round(gross_wait_7_days - gross_today, 2)
        strategy = "WAIT_AND_STORE"
        
        explanation_en = (
            f"Based on your {sim.land_acres}-acre plot with {sim.soil_type} in {sim.district} and your "
            f"ventilated {sim.storage_facility}, you have high holding capacity. "
            f"Holding your {sim.quantity_quintals} Qtl for 7-10 days yields an extra ₹{extra_netGain_formatted(extra_net_gain)} "
            f"(+9.5% net profit) after factoring minimal 1% curing shrinkage. Recommendation: Wait and sell to FreshMart in Pune."
        )
        explanation_mr = (
            f"तुमच्या {sim.district} मधील {sim.land_acres} एकर काळ्या जमिनीच्या उत्पादनानुसार व तुमच्याकडे उपलब्ध असलेल्या "
            f"{sim.storage_facility} मुळे तुमचा कांदा सुरक्षित राहू शकतो. "
            f"पुढील ७ दिवस थांबून माल विकल्यास तुम्हाला तब्बल ₹{extra_netGain_formatted(extra_net_gain)} चा अतिरिक्त नफा मिळेल!"
        )
    elif "high" in sim.liquidity_pressure.lower():
        strategy = "SELL_POOLED_NOW"
        extra_net_gain = 0
        explanation_en = (
            f"Because you indicated immediate liquidity urgency, AgroBridge recommends selling 50% lot today "
            f"via our Shared Logistics Pool to Pune APMC to secure instant ₹{gross_today/2:,.0f} cash flow with 60% freight savings, "
            f"while holding remainder for 5 days."
        )
        explanation_mr = (
            "तातडीच्या पैशांच्या गरजेमुळे ५०% माल आजच लॉजिस्टिक्स शेअरींगने विक्री करा आणि उर्वरित माल ५ दिवस थांबवून विका."
        )
    else:
        # Standard perishable or partial storage
        extra_net_gain = round(sim.quantity_quintals * 150, 2)
        strategy = "SPLIT_LOT_STRATEGY"
        explanation_en = (
            f"Without long-term storage facility, perishable losses can offset price gains. "
            f"Best strategy: Dispatch 60% of produce to Mumbai APMC via tomorrow's pooled truck."
        )
        explanation_mr = (
            "नाशवंत मालाचे नुकसान टाळण्यासाठी उद्या सकाळी मुंबई APMC साठी जाणाऱ्या सामायिक ट्रकमधून माल रवाना करा."
        )

    return {
        "farmer_name": sim.farmer_name,
        "recommended_strategy": strategy,
        "extra_net_gain_inr": extra_net_gain,
        "current_lot_value": gross_today,
        "projected_stored_value": gross_today + extra_net_gain,
        "explanation_en": explanation_en,
        "explanation_mr": explanation_mr,
        "digital_twin_factors": {
            "soil_fertility_index": "88/100",
            "storage_safety_index": "95/100" if sim.storage_available else "40/100",
            "financial_holding_score": "High" if "low" in sim.liquidity_pressure.lower() else "Constrained",
            "optimal_buyer_matched": "FreshMart Inc (Pune Route) / Lasalgaon APMC"
        }
    }

def extra_netGain_formatted(val: float) -> str:
    return f"{int(val):,}"
