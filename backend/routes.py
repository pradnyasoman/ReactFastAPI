from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from services import *

asa_router = APIRouter()


@asa_router.get("/asa-change")
def asa_change_route():
    asa_change_data = calculate_asa_change()
    # print(asa_change_data)
    return jsonable_encoder(asa_change_data)
