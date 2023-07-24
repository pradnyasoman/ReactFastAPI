from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import *
from routes import *

app = FastAPI()


origins = [
    "http://localhost:5173",  # React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(asa_router)
