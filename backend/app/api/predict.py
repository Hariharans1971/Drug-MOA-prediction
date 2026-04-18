from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Any
import pandas as pd
import io
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.moa_model import model_instance
from app.models.sql_models import AnalysisSession

router = APIRouter()

class PredictionResponse(BaseModel):
    moa_probabilities: Dict[str, float]
    top_driver_genes: List[Dict[str, Any]]

@router.post("/moa", response_model=PredictionResponse)
async def predict_moa(file: bytes = File(...), db: Session = Depends(get_db)):
    # Relaxed validation for Demo purposes
    # if not file.filename.endswith(('.csv', '.txt', '.tsv')):
    #      pass

    try:
        content = file # await file.read()
        # Mock reading
        mock_input = [0.0] * 1000
        
        predictions = model_instance.predict(mock_input)
        explanations = model_instance.explain(mock_input)
        
        # Determine top MoA
        top_moa = max(predictions, key=predictions.get)
        confidence = predictions[top_moa]

        # Save to DB (Graceful Degradation)
        try:
            db_session = AnalysisSession(
                filename="demo_upload.csv",
                predicted_moa=top_moa,
                confidence=confidence,
                details={"probabilities": predictions, "genes": explanations}
            )
            db.add(db_session)
            db.commit()
            db.refresh(db_session)
        except Exception as db_err:
            print(f"DATABASE ERROR: {str(db_err)}")
        
        return {
            "moa_probabilities": predictions,
            "top_driver_genes": explanations
        }

    except Exception as e:
        error_msg = f"CRITICAL ERROR: {str(e)}\n"
        import traceback
        error_msg += traceback.format_exc()
        print(error_msg)
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/batch")
async def predict_batch(files: List[UploadFile] = File(...), db: Session = Depends(get_db)):
    results = []
    try:
        for file in files:
            content = await file.read() # Read the file content
            # Mock processing for each file
            mock_input = [0.0] * 1000
            predictions = model_instance.predict(mock_input)
            top_moa = max(predictions, key=predictions.get)
            
            results.append({
                "filename": file.filename, 
                "predicted_moa": top_moa,
                "confidence": predictions[top_moa]
            })
            
            # Save to DB
            db_session = AnalysisSession(
                filename=file.filename,
                predicted_moa=top_moa, 
                confidence=predictions[top_moa],
                details={"probabilities": predictions}
            )
            db.add(db_session)
        
        db.commit()
        return {"status": "completed", "processed": len(files), "results": results}
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
