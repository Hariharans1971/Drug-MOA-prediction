from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import predict, history, auth
from app.core.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MoA-XFormer",
    description="AI-powered Drug Mechanism of Action Prediction",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router, prefix="/api/predict", tags=["prediction"])
app.include_router(history.router, prefix="/api/history", tags=["history"])
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])

@app.get("/")
async def root():
    return {"message": "MoA-XFormer API is running", "status": "operational"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}
