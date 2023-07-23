from fastapi import FastAPI
from models import *
from routes import *

app = FastAPI()

app.include_router(asa_router)
