import pandas as pd
import numpy as np
from pre_processing import ratings

def openExcelFile():
    
    #df = pd.read_excel('pre_processing/playersAllsvenskan.xlsx')
    df = ratings.do_work()

    #df = df.fillna(0)
    
    return df

def open_excel_file_ranked():
    df = ratings.do_work_ranked()

    return df



def changePosName(pos_string):
    
    result = []
    
    pos_array = pos_string.lower().replace(" ","").split(",")
    
    for pos in pos_array:
         
        if (pos == "gk"):
            result.append("MV")
        

        elif (pos == "cf"):
            result.append("9")
        

        elif (pos == "lw" or pos == "lmf" or pos == "lamf" or pos == "lwf"):
            result.append("7(v)")
        

        elif (pos == "rw" or pos == "rmf" or pos == "ramf" or pos == "rwf"):
            result.append("7(h)")


        elif (pos == "amf"):
            result.append("10")
        

        elif (pos == ("lcmf") or pos == ("rcmf")):
            result.append("8")
        

        elif (pos == ("dmf") or pos == ("ldmf") or pos == ("rdmf")):
            result.append("6")
        

        elif (pos == "lb" or pos == ("lwb")):
            result.append("WB (v)")
        

        elif (pos == "rb" or pos == ("rwb")):
            result.append("WB (h)")
        

        elif (pos == "lcb" or pos == "rcb" or pos == "cb"): 
            result.append("MB")
        
    return ",".join(result) 

def add_ratings_to_df(data: pd.DataFrame) -> pd.DataFrame:
    pass


def removeZeroEntries(df):
    pass


def contractEntriesToYears(date_string):
    pass
    # return (date_string,months)