import pandas as pd

def calc_score(df : pd.DataFrame, stat_arr) -> pd.DataFrame:    
    df[stat_arr[0] + " - Points (Max 18.5)"] = df[stat_arr[0]].rank(pct=True)*18.5
    df[stat_arr[1] + " - Points (Max 16.0)"] = df[stat_arr[1]].rank(pct=True)*16.0
    df[stat_arr[2] + " - Points (Max 14.5)"] = df[stat_arr[2]].rank(pct=True)*14.5
    df[stat_arr[3] + " - Points (Max 13.0)"] = df[stat_arr[3]].rank(pct=True)*13.0
    df[stat_arr[4] + " - Points (Max 11.5)"] = df[stat_arr[4]].rank(pct=True)*11.5
    df[stat_arr[5] + " - Points (Max 10.0)"] = df[stat_arr[5]].rank(pct=True)*10.0
    df[stat_arr[6] + " - Points (Max 8.5)"] = df[stat_arr[6]].rank(pct=True)*8.5
    df[stat_arr[7] + " - Points (Max 8.0)"] = df[stat_arr[7]].rank(pct=True)*8.0

    df = df.drop(columns=stat_arr)
    return df

def filter_for_position_arr(series_position: pd.Series, series_minutes:pd.Series, arr) -> pd.Series: 
        result = {}
        
        for index, value in series_position.iteritems():
            #also removes spaces after split, if there are any (there were in some)
            new_arr = [x.strip() for x in value.split(",")]
            #ugly done flag
            done = False
            for val in new_arr:
                # Check if any position in df["Position"] exists in arr
                if val in arr and not done:
                    # To make sure we do not return true for many positions
                    # Ex. if a player has ["RCB", "CB", "RB"] and we are checking for defender positions
                    # We only want to return true once, and not for all their positions
                    # To keep len(result) == len(series) true
                    
                    if series_minutes[index] > 500:
                        # Make sure we only add players with minutes played > 500
                        result[index] = True
                        done = True
            if not done:
                result[index] = False
        return pd.Series(result)