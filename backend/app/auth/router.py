from fastapi import APIRouter, HTTPException, status

from app.auth.schemas import LoginRequest, RefreshRequest, TokenResponse
from app.auth.utils import (
    authenticate_user,
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse, summary="Login and get JWT tokens")
def login(credentials: LoginRequest):
    """
    Authenticate with **username** and **password**.

    - Returns an `access_token` valid for **300 seconds**.
    - Returns a `refresh_token` valid for **3600 seconds**.

    Default credentials: `admin` / `admin123`.
    """
    user = authenticate_user(credentials.username, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(user["username"])
    refresh_token = create_refresh_token(user["username"])

    return TokenResponse(access_token=access_token, refresh_token=refresh_token)


@router.post(
    "/refresh",
    response_model=TokenResponse,
    summary="Refresh the access token",
)
def refresh(payload: RefreshRequest):
    """
    Exchange a valid **refresh_token** for a new pair of tokens.

    The old refresh token is consumed and a fresh pair is returned.
    """
    username = decode_refresh_token(payload.refresh_token)
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(username)
    new_refresh_token = create_refresh_token(username)

    return TokenResponse(access_token=access_token, refresh_token=new_refresh_token)
