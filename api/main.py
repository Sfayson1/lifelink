from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import users, posts
from authenticator import authenticator

app = FastAPI()

# Fixed CORS configuration - only one allow_origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts.router, tags=["Posts"])
app.include_router(authenticator.router, tags=["Auth"])
app.include_router(users.router, tags=["Auth"])

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
