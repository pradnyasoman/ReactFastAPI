from typing import Union, List
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
import requests
import json
from models import *


"""
Function to get data from the external API
"""


def get_data(input: FormParameters):
    base_url = "https://data.rcsb.org/rest/v1/core/interface/"

    entry_id = input.entry_id
    assembly_id = input.assembly_id
    interface_id = input.interface_id

    url = base_url + entry_id + "/" + assembly_id + "/" + interface_id
    response = requests.get(url)
    return json.loads(response.content.decode('utf-8'))


"""
Function to extract data from response into InterfacePartnerData Class object format
"""


def extract_data(response: json):
    ip_obj_list = []
    interface_partners = response["rcsb_interface_partner"]

    for ip in interface_partners:
        ip_obj = InterfacePartnerData()
        residue_obj_list = []
        ip_obj.entity_id = ip["interface_partner_identifier"]["entity_id"]
        ip_obj.asym_id = ip["interface_partner_identifier"]["asym_id"]

        bound_asa = ip["interface_partner_feature"][0]["feature_positions"]
        for fp in bound_asa:
            seq_id = fp["beg_seq_id"]
            for value in fp["values"]:
                residue_obj = ResidueData()
                residue_obj.seq_id = seq_id
                seq_id = seq_id + 1
                residue_obj.bound_asa = value
                residue_obj_list.append(residue_obj)

        residue_obj_id = 0

        unbound_asa = ip["interface_partner_feature"][1]["feature_positions"]
        for fp in unbound_asa:
            for value in fp["values"]:
                residue_obj_list[residue_obj_id].unbound_asa = value
                residue_obj_id = residue_obj_id+1
        ip_obj.residue_values = residue_obj_list
        ip_obj_list.append(ip_obj)

    return ip_obj_list


"""
Function to calculate the ASA Change
"""


def calculate(ip_obj_list):
    table_data_objs = []

    for ip_obj in ip_obj_list:
        table_data_obj = TableData()
        table_ip = TableIPIdentifier()
        tuple_list = []
        tuple = []
        table_ip.entity_id = ip_obj.entity_id
        table_ip.asym_id = ip_obj.asym_id
        table_data_obj.interface_partner_identifier = table_ip

        for residue in ip_obj.residue_values:
            residue.asa_change = float(residue.unbound_asa - residue.bound_asa)
            tuple = [residue.seq_id, round(residue.unbound_asa, 3),
                     round(residue.bound_asa, 3), round(residue.asa_change, 3)]
            tuple_list.append(tuple)
        table_data_obj.table_data = tuple_list

        table_data_objs.append(table_data_obj)
    return table_data_objs


"""
Function which receives input form parameters and returns ASA change data response
"""


def calculate_asa_change(input: FormParameters):
    response = get_data(input)
    ip_obj_list = extract_data(response)
    asa_change_data = calculate(ip_obj_list)
    return asa_change_data
