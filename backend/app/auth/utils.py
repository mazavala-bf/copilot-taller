import os
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
from jose import JWTError, jwt

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 300   # 5 minutes
REFRESH_TOKEN_EXPIRE_SECONDS = 3600  # 1 hour

# ---------------------------------------------------------------------------
# Fake user database (password: "admin123")
# ---------------------------------------------------------------------------
_ADMIN_HASHED_PASSWORD = "$2b$12$4JY5WBHpsoiizMZdVzqGNOfHTbLfQ/BlhI6Ey87iQg6on/gIVYTjW"

FAKE_USERS_DB: dict[str, dict] = {
    "admin": {
        "username": "admin",
        "hashed_password": _ADMIN_HASHED_PASSWORD,
    }
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())


def authenticate_user(username: str, password: str) -> Optional[dict]:
    user = FAKE_USERS_DB.get(username)
    if not user:
        return None
    if not verify_password(password, user["hashed_password"]):
        return None
    return user


def _create_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(username: str) -> str:
    return _create_token(
        {"sub": username, "type": "access"},
        timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS),
    )


def create_refresh_token(username: str) -> str:
    return _create_token(
        {"sub": username, "type": "refresh"},
        timedelta(seconds=REFRESH_TOKEN_EXPIRE_SECONDS),
    )


def decode_refresh_token(token: str) -> Optional[str]:
    """Decode a refresh token and return the username, or None if invalid."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            return None
        username: str = payload.get("sub")
        return username
    except JWTError:
        return None
