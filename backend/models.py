from typing import Union, List
import requests
import json
from pydantic import BaseModel


class ResidueData(BaseModel):
    seq_id: float = 0.0
    bound_asa: float = 0.0
    unbound_asa: float = 0.0
    asa_change: float = 0.0


class InterfacePartnerData(BaseModel):
    entity_id: str = ""
    asym_id: str = ""
    residue_values: List[ResidueData] = []


class FormParameters(BaseModel):
    entry_id: str = ""
    assembly_id: str = ""
    interface_id: str = ""


class TableIPIdentifier(BaseModel):
    entity_id: str = ""
    asym_id: str = ""


class TableData(BaseModel):
    interface_partner_identifier: TableIPIdentifier = {}
    table_data: List = []
