from typing import Union, List
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
import requests
import json
from models import *


def get_data():
    url = "https://data.rcsb.org/rest/v1/core/interface/1RH7/1/1/"
    response = requests.get(url)
    return json.loads(response.content.decode('utf-8'))


def calculate(ip_info_objs):
    table_data_objs = []
    for ip_info in ip_info_objs:
        table_data_obj = TableData()
        tuple_list = []
        tuple = []
        table_data_obj.interface_partner_identifier["entity_id"] = ip_info.entity_id
        table_data_obj.interface_partner_identifier["asym_id"] = ip_info.asym_id
        size = len(ip_info.bound_asa)
        for i in range(size):
            seq_no = i+1
            unbound = ip_info.unbound_asa[i]
            bound = ip_info.bound_asa[i]
            change = unbound - bound
            tuple = [seq_no, unbound, bound, change]
            tuple_list.append(tuple)
        table_data_obj.table_data = tuple_list
    # print(table_data_obj)
        table_data_objs.append(table_data_obj)
    return table_data_objs


def calculate_asa_change():
    response = get_data()
    ip_info_objs = list()
    interface_partners = response["rcsb_interface_partner"]
    for ip in interface_partners:
        ip_obj = IPInfo()
        ip_obj.entity_id = ip["interface_partner_identifier"]["entity_id"]
        ip_obj.asym_id = ip["interface_partner_identifier"]["asym_id"]
        ip_obj.bound_asa = ip["interface_partner_feature"][0]["feature_positions"][0]["values"]
        ip_obj.unbound_asa = ip["interface_partner_feature"][1]["feature_positions"][0]["values"]
        print(" IP INFO **********************")
        print(ip_obj)
        ip_info_objs.append(ip_obj)
    asa_change_data = calculate(ip_info_objs)
    return jsonable_encoder(asa_change_data)
