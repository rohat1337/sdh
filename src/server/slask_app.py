
import logging

from multiprocessing.dummy import Array
from re import A
from flask import Flask, redirect, url_for, render_template, request, flash
import pandas as pd
from sklearn import preprocessing
import numpy as np
import json
from flask_cors import CORS

logging.basicConfig(level=logging.INFO,
                    datefmt='%Y-%m-%d %H:%M:%S',
                    format="%(asctime)s [%(name)-12.12s] [%(levelname)-5.5s] %(filename)s %(lineno)s %(message)s")

VERSION="1.1"
logging.info("Backend version {VERSION} started")

from pre_processing import pre_processing

df = pre_processing.openExcelFile()
df_rank = pre_processing.open_excel_file_ranked()
print("df shape after read: ", df.shape[0])

min_max_scaler = preprocessing.MinMaxScaler()

