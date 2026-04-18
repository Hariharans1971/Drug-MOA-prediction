from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from app.core.database import Base
from datetime import datetime

class AnalysisSession(Base):
    __tablename__ = "analysis_sessions"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    predicted_moa = Column(String)
    confidence = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
    details = Column(JSON) # Store full probabilities/genes as JSON

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, nullable=True)
    is_active = Column(Integer, default=1) # 1=Active, 0=Inactive
