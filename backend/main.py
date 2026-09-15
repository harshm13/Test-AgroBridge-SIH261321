from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import predictions, chatbot, grading, pooling, govt_data, schemes, blockchain, digital_twin, traceability

# Import database components
from db.database import engine, Base

# Automatically create the SQLite database tables when the server starts
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AgroBridge API",
    description="Backend for the SIH26132 Market Linkages Platform - Government Data, Schemes, Blockchain & Digital Twin"
)

# Configure CORS so the React frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:3000",
        "http://127.0.0.1:5173", 
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register your API endpoints
app.include_router(predictions.router)
app.include_router(predictions.recommendation_router)
app.include_router(chatbot.router)
app.include_router(grading.router)
app.include_router(pooling.router)
app.include_router(govt_data.router)
app.include_router(schemes.router)
app.include_router(blockchain.router)
app.include_router(digital_twin.router)
app.include_router(traceability.router)

# A simple root endpoint to verify the server is running
@app.get("/")
def read_root():
    return {"message": "AgroBridge Backend is running perfectly!"}