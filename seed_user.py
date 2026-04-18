import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.security import get_password_hash
from app.models.sql_models import Base, User

# Setup DB connection
SQLALCHEMY_DATABASE_URL = "sqlite:///./backend/moa_app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def seed_user():
    db = SessionLocal()
    email = "admin@example.com"
    password = "password123"
    
    # Check if user exists
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        print(f"User {email} already exists.")
        return

    # Create user
    user = User(
        email=email,
        hashed_password=get_password_hash(password),
        full_name="Admin Researcher",
        is_active=True
    )
    db.add(user)
    db.commit()
    print(f"Successfully created user: {email} / {password}")
    db.close()

if __name__ == "__main__":
    seed_user()
