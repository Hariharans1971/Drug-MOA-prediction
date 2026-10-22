import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext

# Never keep a JWT signing key in source control. A missing/short key must fail closed.
SECRET_KEY = os.getenv("SECRET_KEY", "").strip()
if len(SECRET_KEY) < 32 or SECRET_KEY == "replace_with_a_random_32_byte_or_longer_secret":
    raise RuntimeError(
        "SECRET_KEY is missing or too short. Set a unique random value (at least 32 characters); "
        "see .env.example. Do not reuse the historical demo value."
    )
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
