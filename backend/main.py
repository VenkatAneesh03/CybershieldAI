from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.vulnerabilities import router as vulnerability_router
from routes.investment import router as investment_router
from services.risk_service import calculate_enterprise_risk
from data_loader import load_data
from routes.dashboard import router as dashboard_router
from routes.recommendations import router as recommendations_router
app = FastAPI(
    title="CyberRisk AI Platform",
    description="AI Powered Continuous Cyber Risk Quantification and Investment Optimization Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(vulnerability_router)
app.include_router(investment_router)
app.include_router(dashboard_router)
app.include_router(recommendations_router)
@app.get("/")
def root():
    return {
        "message": "CyberRisk API is running",
        "status": "online"
    }


@app.get("/api/risk")
def get_risk():
    df = load_data()
    result = calculate_enterprise_risk(df)

    return result