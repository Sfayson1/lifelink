from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import users, posts
from authenticator import authenticator

app = FastAPI()
app.include_router(posts.router, tags=["Posts"])
app.include_router(authenticator.router, tags=["Auth"])
app.include_router(users.router, tags=["Auth"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://lifelink-mv0n.onrender.com",  
        "http://localhost:5173",             
        "http://localhost:3000",             
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
