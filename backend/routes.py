from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from services import *

asa_router = APIRouter()


"""
Handles POST request and returns JSON ASA Change data as response
"""


@asa_router.post("/asa-change")
async def asa_change_route(input: FormParameters):
    asa_change_data = calculate_asa_change(input)
    return jsonable_encoder(asa_change_data)
