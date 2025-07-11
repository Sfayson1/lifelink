from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from models import UserOut
from routers import users, posts, auth_routes
from authenticator import authenticator

app = FastAPI()

# Fixed CORS configuration - only one allow_origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://lifelink-mv0n.onrender.com",
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts.router, prefix="/api/posts", tags=["Posts"])
app.include_router(auth_routes.router, prefix="/api/auth", tags=["Auth"])
app.include_router(users.router, prefix="/api/users", tags=["Auth"])

@app.get("/test-token")
def test_token():
    return {"message": "CORS is working"}

@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
