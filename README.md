# MoA-XFormer

**MoA-XFormer** is an AI-powered Drug Mechanism of Action (MoA) Prediction Platform. It utilizes Transformer architectures and Explainable AI (XAI) to predict drug mechanisms from gene expression profiles with high transparency and accuracy.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Framer Motion
- **Backend**: FastAPI, PyTorch
- **Key Features**:
  - Gene Expression Analysis
  - Transformer-based MoA Prediction
  - Explainable AI Visualizations (SHAP, Attention Maps)

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
# Activate venv
pip install -r requirements.txt
uvicorn app.main:app --reload
```
