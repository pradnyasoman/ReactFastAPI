from typing import Union, List
import requests
import json
from pydantic import BaseModel


class IPInfo(BaseModel):
    entity_id: str = ""
    asym_id: str = ""
    bound_asa: list = []
    unbound_asa: list = []


class IPIdentifier(BaseModel):
    entity_id: str = ""
    asym_id: str = ""


class TableData(BaseModel):
    interface_partner_identifier: IPIdentifier = {}
    table_data: List = []
