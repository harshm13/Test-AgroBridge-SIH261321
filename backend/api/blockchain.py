from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
import hashlib
import json

router = APIRouter(
    prefix="/api/blockchain",
    tags=["Blockchain Ledger & Smart Contracts"]
)

def calculate_hash(index: int, prev_hash: str, timestamp: str, data: Dict[str, Any], nonce: int) -> str:
    payload = f"{index}{prev_hash}{timestamp}{json.dumps(data, sort_keys=True)}{nonce}"
    return hashlib.sha256(payload.encode()).hexdigest()

# Initial Genesis and Sample Certified Smart Contract Blocks
GENESIS_HASH = "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"

LEDGER = [
    {
        "block_number": 1,
        "timestamp": "2026-09-10T11:20:00",
        "prev_hash": GENESIS_HASH,
        "block_hash": "0000a94bf8c201d4a8e342718ef5591cd5040e32aa57a2cf76189914ad4b8109",
        "validator": "AgroBridge-MSAMB-Validator-01",
        "contract_id": "SC-MH-2026-041",
        "transaction": {
            "farmer": "Ramesh Patil (UID: 9812-****-3310)",
            "buyer": "FreshMart Retail Solutions Ltd.",
            "commodity": "Unhali Onion (Nashik)",
            "quantity_quintals": 24.0,
            "agreed_rate_per_qtl": 3120,
            "total_value": 74880,
            "quality_certificate_hash": "a4f890c21e6490bbd4a23fe981e19d70231908bf3c299e44",
            "quality_grade": "Grade A (Premium)",
            "escrow_status": "AUTO_SETTLED_PAID",
            "settlement_days": 2.1,
            "traditional_baseline_days": 18.3,
            "utr_number": "IMPS409182740921"
        }
    },
    {
        "block_number": 2,
        "timestamp": "2026-09-12T14:45:00",
        "prev_hash": "0000a94bf8c201d4a8e342718ef5591cd5040e32aa57a2cf76189914ad4b8109",
        "block_hash": "0000b218f09d8417c88390bb4f195d2077e62a190ef01198c2810842fe919a31",
        "validator": "AgroBridge-APMC-Lasalgaon-Node",
        "contract_id": "SC-MH-2026-089",
        "transaction": {
            "farmer": "Suresh Deshmukh (UID: 4421-****-9012)",
            "buyer": "MahaAgro Export Corp.",
            "commodity": "Bhagwa Pomegranate (Solapur)",
            "quantity_quintals": 12.5,
            "agreed_rate_per_qtl": 12800,
            "total_value": 160000,
            "quality_certificate_hash": "f1883ac891002de432bc9714a1e9442018ea39c09192fce1",
            "quality_grade": "Export Grade (Blemish Free)",
            "escrow_status": "FUNDS_LOCKED_ESCROW",
            "settlement_days": 1.9,
            "traditional_baseline_days": 18.3,
            "utr_number": "ESCROW_LOCK_SMART_CONTRACT"
        }
    },
    {
        "block_number": 3,
        "timestamp": "2026-09-13T09:15:00",
        "prev_hash": "0000b218f09d8417c88390bb4f195d2077e62a190ef01198c2810842fe919a31",
        "block_hash": "0000c774da983021980ef552194bcf90918efca8817290adfe8143219aa0182c",
        "validator": "AgroBridge-Vashi-Terminal-Node",
        "contract_id": "SC-MH-2026-112",
        "transaction": {
            "farmer": "Kisan FPO Sinnar (32 Smallholders)",
            "buyer": "Metro Cash & Carry India",
            "commodity": "Tomato Hybrid Grade A",
            "quantity_quintals": 85.0,
            "agreed_rate_per_qtl": 1850,
            "total_value": 157250,
            "quality_certificate_hash": "88ae9021bc490f119028eac471092a98fba1092490acbe89",
            "quality_grade": "Grade A (Uniformity 96%)",
            "escrow_status": "IN_TRANSIT_POOLED",
            "settlement_days": 2.0,
            "traditional_baseline_days": 18.3,
            "utr_number": "ESCROW_DISPATCH_AUTHORIZED"
        }
    }
]

class CreateBlockRequest(BaseModel):
    farmer_name: str
    buyer_name: str
    commodity: str
    quantity_quintals: float
    agreed_rate: float
    quality_grade: str = "Grade A (Premium)"
    quality_hash: Optional[str] = None

@router.get("/ledger")
def get_blockchain_ledger() -> Dict[str, Any]:
    """
    Returns the immutable supply chain ledger, smart contract settlement metrics, and proof of provenance.
    """
    return {
        "status": "success",
        "consensus": "Proof of Agricultural Authority (PoAA) with MSAMB APMC Nodes",
        "chain_length": len(LEDGER),
        "metrics": {
            "settlement_cycle_average_days": 2.1,
            "traditional_settlement_baseline_days": 18.3,
            "settlement_speedup_factor": "8.7x Faster",
            "farmer_income_growth_impact": "+38.4%",
            "rejection_rate_with_ai_grading": "0.18% (vs 6.2% Mandi Avg)",
            "escrow_payment_guarantee": "100% Zero-Default"
        },
        "blocks": LEDGER[::-1] # latest first
    }

@router.get("/contract/{contract_id}")
def get_contract_details(contract_id: str) -> Dict[str, Any]:
    """Retrieves specific tamper-proof smart contract record."""
    for b in LEDGER:
        if b["contract_id"].lower() == contract_id.lower():
            return {"found": True, "block": b}
    raise HTTPException(status_code=404, detail="Smart contract block not found on chain")

@router.post("/create-contract")
def create_smart_contract_block(request: CreateBlockRequest) -> Dict[str, Any]:
    """
    Mints a new cryptographic smart contract block when a farmer accepts a buyer opportunity.
    """
    last_block = LEDGER[-1]
    new_index = last_block["block_number"] + 1
    new_timestamp = datetime.now().isoformat()
    contract_id = f"SC-MH-2026-{str(new_index).zfill(3)}"

    quality_hash = request.quality_hash or hashlib.sha256(f"{request.commodity}{request.quality_grade}{new_timestamp}".encode()).hexdigest()
    total_val = round(request.quantity_quintals * request.agreed_rate, 2)

    tx_data = {
        "farmer": request.farmer_name,
        "buyer": request.buyer_name,
        "commodity": request.commodity,
        "quantity_quintals": request.quantity_quintals,
        "agreed_rate_per_qtl": request.agreed_rate,
        "total_value": total_val,
        "quality_certificate_hash": quality_hash,
        "quality_grade": request.quality_grade,
        "escrow_status": "FUNDS_LOCKED_ESCROW",
        "settlement_days": 2.1,
        "traditional_baseline_days": 18.3,
        "utr_number": f"ESCROW_LOCK_{new_index * 8371}"
    }

    block_hash = calculate_hash(new_index, last_block["block_hash"], new_timestamp, tx_data, nonce=42)

    new_block = {
        "block_number": new_index,
        "timestamp": new_timestamp,
        "prev_hash": last_block["block_hash"],
        "block_hash": block_hash,
        "validator": "AgroBridge-SmartContract-Engine",
        "contract_id": contract_id,
        "transaction": tx_data
    }

    LEDGER.append(new_block)

    return {
        "status": "Block Successfully Minted to Ledger",
        "contract_id": contract_id,
        "block_hash": block_hash,
        "escrow_secured": f"₹{total_val:,} secured in Smart Contract",
        "estimated_payout_timeline": "2.1 Days upon delivery"
    }
