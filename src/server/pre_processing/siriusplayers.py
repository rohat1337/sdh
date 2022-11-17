import pandas as pd
import numpy as np

def read_player(filename):
    temp_df = pd.read_excel(f"pre_processing/{filename}.xlsx")
    temp_df = temp_df.drop(['Match', 'Competition', 'Position', 'Minutes played'], axis=1)
    temp_df = temp_df.astype({'Date': np.datetime64})
    temp_df['Date'] = pd.DatetimeIndex(temp_df['Date']).year
    temp_df.rename(columns={'Date': 'Year'}, inplace=True)
    return temp_df
