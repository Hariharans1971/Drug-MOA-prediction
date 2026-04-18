from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime
from app.core.database import get_db
from app.models.sql_models import AnalysisSession

router = APIRouter()

class AnalysisSessionResponse(BaseModel):
    id: int
    filename: str
    predicted_moa: str
    confidence: float
    timestamp: datetime
    
    class Config:
        orm_mode = True

@router.get("/", response_model=List[AnalysisSessionResponse])
def get_history(db: Session = Depends(get_db)):
    return db.query(AnalysisSession).order_by(AnalysisSession.timestamp.desc()).limit(50).all()
