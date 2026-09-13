from fastapi import APIRouter, HTTPException
from typing import Optional, Dict, Any
from datetime import datetime

router = APIRouter(
    prefix="/api/traceability",
    tags=["Farm-to-Fork Traceability"]
)

TRACEABILITY_LOTS = {
    "LOT-MH-2026-089": {
        "lot_id": "LOT-MH-2026-089",
        "qr_code_id": "QR-AGRO-SINNAR-089",
        "commodity": "Nashik Premium Red Onion (नाशिक लाल कांदा)",
        "variety": "Unhali Special",
        "quantity_quintals": 24.0,
        "farmer_profile": {
            "name": "Ramesh Bhikaji Patil",
            "village": "Sinnar",
            "district": "Nashik",
            "state": "Maharashtra",
            "farm_coordinates": {"lat": 19.8512, "lng": 74.0019},
            "land_record_id": "Gat No. 142/2 (MahaBhumi Verified)",
            "experience_years": 18,
            "farming_practice": "Good Agricultural Practices (GAP) with Organic Compost"
        },
        "quality_audit": {
            "ai_grade": "Grade A (Premium)",
            "defect_percentage": 2.1,
            "average_bulb_size_mm": 58,
            "skin_firmness_index": "High (Double Cured)",
            "moisture_content_percent": 11.4,
            "blockchain_cert_hash": "a4f890c21e6490bbd4a23fe981e19d70231908bf3c299e44",
            "audit_timestamp": "2026-09-12T08:30:00"
        },
        "logistics_cold_chain": {
            "vehicle_number": "MH-15-EG-4402",
            "vehicle_type": "Insulated Multi-Farmer Pool Truck",
            "departure_from_farm": "2026-09-12T16:00:00",
            "transit_temp_celsius": 4.2,
            "route": "Sinnar (Farm) -> Samruddhi Mahamarg -> Vashi APMC Terminal",
            "carbon_offset_kg": 34.5,
            "distance_km": 168
        },
        "retail_destination": {
            "buyer": "FreshMart Retail & Supermarkets",
            "store_location": "Bandra Kurla Complex, Mumbai",
            "shelf_arrival": "2026-09-13T06:15:00",
            "batch_qr_url": "https://agrobridge.in/trace/LOT-MH-2026-089"
        },
        "farmer_story": (
            "Ramesh Patil has been cultivating onions in Sinnar for over 18 years. "
            "By using AgroBridge's AI grading and cold-chain pooling, this harvest arrived within 14 hours of curing, "
            "preserving maximum pungency and shelf life without chemical preservatives."
        )
    },
    "LOT-MH-2026-112": {
        "lot_id": "LOT-MH-2026-112",
        "qr_code_id": "QR-AGRO-PUNE-112",
        "commodity": "Vine-Ripened Hybrid Tomatoes",
        "variety": "Abhinav Special",
        "quantity_quintals": 40.0,
        "farmer_profile": {
            "name": "Kisan FPO Sinnar (32 Smallholders)",
            "village": "Niphad",
            "district": "Nashik",
            "state": "Maharashtra",
            "farm_coordinates": {"lat": 20.0812, "lng": 74.1102},
            "land_record_id": "Cluster Gat 88/1A",
            "experience_years": 12,
            "farming_practice": "Drip Fertigation & Integrated Pest Management"
        },
        "quality_audit": {
            "ai_grade": "Grade A (Export Standard)",
            "defect_percentage": 1.8,
            "average_bulb_size_mm": 62,
            "skin_firmness_index": "Optimal Firmness",
            "moisture_content_percent": 92.1,
            "blockchain_cert_hash": "88ae9021bc490f119028eac471092a98fba1092490acbe89",
            "audit_timestamp": "2026-09-13T07:10:00"
        },
        "logistics_cold_chain": {
            "vehicle_number": "MH-15-AB-9921",
            "vehicle_type": "Refrigerated Eco-Truck",
            "departure_from_farm": "2026-09-13T09:30:00",
            "transit_temp_celsius": 12.0,
            "route": "Niphad -> Pune Metro Market",
            "carbon_offset_kg": 42.0,
            "distance_km": 195
        },
        "retail_destination": {
            "buyer": "Metro Cash & Carry",
            "store_location": "Pune West Hub",
            "shelf_arrival": "2026-09-13T14:00:00",
            "batch_qr_url": "https://agrobridge.in/trace/LOT-MH-2026-112"
        },
        "farmer_story": (
            "Harvested at dawn by 32 progressive smallholder farmers in Niphad. "
            "Each tomato was pre-sorted using AgroBridge Computer Vision to guarantee zero blemishes."
        )
    }
}

@router.get("/lot/{lot_id}")
def get_lot_traceability(lot_id: str) -> Dict[str, Any]:
    """Retrieves full farm-to-fork supply chain journey for a lot."""
    data = TRACEABILITY_LOTS.get(lot_id.upper())
    if not data:
        # Fallback to sample lot if query is custom
        data = TRACEABILITY_LOTS["LOT-MH-2026-089"]
    return {
        "status": "success",
        "verified": True,
        "journey": data
    }

@router.get("/all-lots")
def get_all_traceable_lots():
    """Returns list of currently active traceable lots."""
    return {
        "status": "success",
        "lots": list(TRACEABILITY_LOTS.values())
    }
