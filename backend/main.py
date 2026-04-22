from fastapi import FastAPI
from models import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True, # Allow cookies/auth headers to be sent in cross-origin requests
    allow_methods=["*"],    # Allow all standard HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],    # Allow all headers, including custom headers
)

@app.get("/")
def health_check():
    return {"status": "healthy"}

@app.post("/login/")
def read_user(user: User):
    return {"user": user}