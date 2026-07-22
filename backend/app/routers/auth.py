"""Auth — username/password login issuing a JWT, plus the current-user probe."""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import User
from ..schemas import LoginRequest, TokenResponse, UserOut
from ..security import authenticate_user, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, body.username, body.password)
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "invalid username or password")
    token = create_access_token(user.username)
    return TokenResponse(
        access_token=token, username=user.username, display_name=user.display_name
    )


@router.get("/me", response_model=UserOut)
def me(user: User = Depends(get_current_user)):
    return user
