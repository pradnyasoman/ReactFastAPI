from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from services import *

asa_router = APIRouter()


@asa_router.post("/asa-change")
async def asa_change_route(input: FormParameters):
    # print("INSIDE BACKEND **********************")
    # print(input)
    asa_change_data = calculate_asa_change(input)
    return jsonable_encoder(asa_change_data)
