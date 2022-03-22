
def changePosName(pos_array):
    result = []
    for pos in pos_array: 

        if (pos == "gk"):
            result.append("MV")
        

        elif (pos == "cf"):
            result.append("9")
        

        elif (pos == "lw" or pos == "lmf" or pos == "lamf" or pos == "lwf"):
            result.append("7 (v)")
        

        elif (pos == "rw" or pos == "rmf" or pos == "ramf" or pos == "rwf"):
            result.append("7 (h)")


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
