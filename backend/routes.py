from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from services import *

asa_router = APIRouter()


@asa_router.post("/asa-change")
async def asa_change_route(input: InputParameters):
    asa_change_data = calculate_asa_change(input)
    # print(asa_change_data)
    return jsonable_encoder(asa_change_data)
