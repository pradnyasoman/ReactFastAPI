from typing import Union, List
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
import requests
import json
from models import *


def get_data(input: FormParameters):
    # print(input)
    base_url = "https://data.rcsb.org/rest/v1/core/interface/"
    entry_id = input.entry_id
    assembly_id = input.assembly_id
    interface_id = input.interface_id
    url = base_url + entry_id + "/" + assembly_id + "/" + interface_id
    response = requests.get(url)
    return json.loads(response.content.decode('utf-8'))


def extract_data(response: json):
    # print("INSIDE EXTRACT DATA ***************")
    # print(response)
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
        # print("BEFORE UNBOUND ****************")
        # print(jsonable_encoder(residue_obj_list))
        residue_obj_id = 0

        unbound_asa = ip["interface_partner_feature"][1]["feature_positions"]
        for fp in unbound_asa:
            for value in fp["values"]:
                residue_obj_list[residue_obj_id].unbound_asa = value
                residue_obj_id = residue_obj_id+1
        ip_obj.residue_values = residue_obj_list
        ip_obj_list.append(ip_obj)
        # print(" END OF EXTRACTION *****************")
        # print(ip_obj_list)
    return ip_obj_list


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
            tuple = [residue.seq_id, residue.unbound_asa,
                     residue.bound_asa, residue.asa_change]
            tuple_list.append(tuple)
        table_data_obj.table_data = tuple_list
    # print(table_data_obj)
        table_data_objs.append(table_data_obj)
    return table_data_objs


def calculate_asa_change(input: FormParameters):
    # print("INSIDE CALCULATE FUNCTION ************")
    response = get_data(input)
    # print("QUERY SUCCESSFUL ****************")
    # print(response)
    ip_obj_list = extract_data(response)
    # print("DATA EXTRACTION COMPLETE ************")
    # print(ip_obj_list)
    asa_change_data = calculate(ip_obj_list)
    return asa_change_data
