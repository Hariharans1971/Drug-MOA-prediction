# Drug Mechanism of Action (MoA) Prediction — Research Prototype

A full-stack research/learning project exploring drug mechanism-of-action prediction from gene-expression features. The repository contains a React frontend and a FastAPI/Python backend with authentication scaffolding and ML-related dependencies.

> **Research prototype only.** Predictions are not medical advice, clinical evidence, or a substitute for expert review. Do not use this application to make treatment or drug-development decisions.

## Project structure

```text
backend/
  app/
  requirements.txt
frontend/
  package.json
  src/
seed_user.py
test_auth.py
test_backend.py
test_simple.py
```

## Technology

- **Frontend:** React, TypeScript, Vite (see `frontend/package.json` for exact scripts)
- **Backend:** Python, FastAPI, Uvicorn
- **ML/data:** NumPy, pandas, scikit-learn, Transformers, Captum, SHAP, PyTorch
- **Database:** SQLite for local development

## Run locally

### Backend

Use Python 3.10+ and create a virtual environment.

```bash
cd backend
python -m venv .venv
python -m pip install -r requirements.txt
```

Activate the virtual environment, then return to the repository root before running the account seeding script if needed.

Set a strong local admin password first:

Windows PowerShell:
```powershell
$env:MOA_ADMIN_EMAIL = "admin@example.com"
$env:MOA_ADMIN_PASSWORD = "choose-a-strong-unique-password"
python seed_user.py
```

macOS/Linux:
```bash
export MOA_ADMIN_EMAIL="admin@example.com"
export MOA_ADMIN_PASSWORD="choose-a-strong-unique-password"
python seed_user.py
```

Do not commit real passwords or local database files. The database is generated locally and ignored by Git.

Start the API from the repository root using the actual module path in the backend:

```bash
uvicorn app.main:app --app-dir backend --reload
```

Check the API's OpenAPI documentation at `http://127.0.0.1:8000/docs` if the application starts successfully.

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Use the URL printed by Vite. Check the frontend environment configuration and backend URL before testing end-to-end behavior.

## Tests

The repository includes test scripts at the root. Run them in the backend environment after checking their imports and required services:

```bash
python test_simple.py
python test_backend.py
python test_auth.py
```

These commands are not a claim that all tests currently pass; record actual test results before presenting them as verified.

## Security and reproducibility

- Admin account creation requires a password supplied through the local environment.
- `backend/moa_app.db` is generated output and must not be committed.
- Keep API keys, credentials, local databases, and private data out of Git.
- Verify the provenance of datasets, model weights, and evaluation splits.
- Report the dataset, train/test methodology, baseline, class imbalance, and metrics before making model-performance claims.
- Do not describe the system as clinically validated or production-ready without independent evidence.

## Roadmap

- Add pinned dependencies and reproducible environment setup.
- Add API and frontend integration tests in CI.
- Document dataset provenance and model evaluation.
- Add explainability checks with limitations and example outputs.
- Improve authentication, rate limiting, and production security before deployment.

## Author

Hariharan S. — B.Tech Computer Science and Engineering (AI & ML), 2026
