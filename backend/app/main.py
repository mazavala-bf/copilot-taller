from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth.router import router as auth_router

app = FastAPI(
    title="JWT Authentication API",
    description="FastAPI service that issues and refreshes JWT tokens.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


@app.get("/health", tags=["health"])
def health_check():
    """Simple health-check endpoint."""
    return {"status": "ok"}
