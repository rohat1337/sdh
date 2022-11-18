import pandas as pd
import numpy as np

sirius_players = ["A. Bjarnason", "A. Hellborg", "C. Kouakou", "D. Stensson", "D. Widgren", "E. Sylisufaj", "F. Olsson", "F. Rogić", "J. Roche", "J. Voelkerling Persson", "K. Da Graca", "M. Mathisen", "Ó. Ómarsson", "P. Karlsson Lagemyr", "P. Nwadike", "T. Björkström", "T. Matthews", "Y. Sugita"]

def read_player(filename):
    temp_df = pd.read_excel(f"pre_processing/sirius/{filename}.xlsx")
    temp_df = temp_df.drop(['Match', 'Competition', 'Position', 'Minutes played', 'Yellow card', 'Red card'], axis=1)
    temp_df = temp_df.astype({'Date': np.datetime64})
    temp_df['Date'] = pd.DatetimeIndex(temp_df['Date']).year
    temp_df.rename(columns={'Date': 'Year'}, inplace=True)
    name = []
    for i in range(temp_df.shape[0]):
        name.append(filename)
    temp_df.insert(0, 'Name', name)
    return temp_df

def load_sirius_players():
    result = pd.DataFrame()
    d = {}
    for player in sirius_players:
        d[player] = read_player(player)
    for k in d:
        result = pd.concat([result, d[k]])
    return result