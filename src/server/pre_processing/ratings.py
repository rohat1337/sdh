import pandas as pd
from pre_processing import rating_algorithm as algorithm
from pre_processing import stats_list

def read_df(filename, league):
    temp_df = pd.read_excel(f"pre_processing/{filename}.xlsx")
    temp_df["League"] = league
    temp_df = temp_df[temp_df["Position"].notna()]

    return temp_df

def do_work_ranked():

    # Sweden (1/2/3)
    df_1 = read_df("Allsvenskan_210223", "Allsvenskan")
    df_2 = read_df("Superettan_210223", "Superettan")
    df_3 = read_df("Ettan_U24_210223", "Ettan")
    df_4 = read_df("Ettan_O24_210223", "Ettan")
    # Denmark (1/2)
    df_5 = read_df("Superliga_210223", "Superliga")
    df_6 = read_df("1st_Division_210223", "1. Division")
    # Norway (1/2)
    df_7 = read_df("Eliteserien_210223", "Eliteserien")
    df_8 = read_df("Obos_Ligaen_210223", "OBOS-ligaen")
    # Bosnia (1)
    df_9 = read_df("Premijer_Liga_210223", "Premijer_Liga")
    # Finland (1)
    df_10 = read_df("Veikkausliiga_210223", "Veikkausliiga")
    # Iceland (1)
    df_11 = read_df("Besta-deild_karla_210223", "Besta-deild karla")
    # Netherland (1/2)
    df_12 = read_df("Eredivisie_O25_210223", "Eredivise")
    df_13 = read_df("Eredivisie_U25_210223", "Eredivise")
    df_14 = read_df("Eerste_Divisie_U23_210223", "Eerste Divisie")
    df_15 = read_df("Eerste_Divisie_O23_210223", "Eerste Divisie")
    # Serbia (1)
    df_16 = read_df("Super_Liga_O25_210223", "Super Liga")
    df_17 = read_df("Super_Liga_U25_210223", "Super Liga")
    # Germany
    df_18 = read_df("3_Bundesliga_U25_210223", "3. Bundesliga")
    df_19 = read_df("3_Bundesliga_O25_210223", "3. Bundesliga")



    df = pd.concat([df_1, df_2, df_3, df_4, df_5, df_6, df_7, df_8, df_9, df_10, df_11, df_12, df_13, df_14, df_15, df_16, df_17, df_18, df_19])
    df = df.reset_index(drop=True)
    df = df.rank(pct=True)
    df = df.drop(["Player",
                "Team", 
                "Team within selected timeframe",
                "Position",
                "Age", 
                "Market value", 
                "Contract expires", 
                "Matches played",
                "Passport country",
                "Birth country",
                "Foot",
                "Height",
                "Weight",
                "On loan",
                "League"], axis=1)

    return df

def do_work():

    # Sweden (1/2/3)
    df_1 = read_df("Allsvenskan_210223", "Allsvenskan")
    df_2 = read_df("Superettan_210223", "Superettan")
    df_3 = read_df("Ettan_U24_210223", "Ettan")
    df_4 = read_df("Ettan_O24_210223", "Ettan")
    # Denmark (1/2)
    df_5 = read_df("Superliga_210223", "Superliga")
    df_6 = read_df("1st_Division_210223", "1. Division")
    # Norway (1/2)
    df_7 = read_df("Eliteserien_210223", "Eliteserien")
    df_8 = read_df("Obos_Ligaen_210223", "OBOS-ligaen")
    # Bosnia (1)
    df_9 = read_df("Premijer_Liga_210223", "Premijer_Liga")
    # Finland (1)
    df_10 = read_df("Veikkausliiga_210223", "Veikkausliiga")
    # Iceland (1)
    df_11 = read_df("Besta-deild_karla_210223", "Besta-deild karla")
    # Netherland (1/2)
    df_12 = read_df("Eredivisie_O25_210223", "Eredivise")
    df_13 = read_df("Eredivisie_U25_210223", "Eredivise")
    df_14 = read_df("Eerste_Divisie_U23_210223", "Eerste Divisie")
    df_15 = read_df("Eerste_Divisie_O23_210223", "Eerste Divisie")
    # Serbia (1)
    df_16 = read_df("Super_Liga_O25_210223", "Super Liga")
    df_17 = read_df("Super_Liga_U25_210223", "Super Liga")
    # Germany
    df_18 = read_df("3_Bundesliga_U25_210223", "3. Bundesliga")
    df_19 = read_df("3_Bundesliga_O25_210223", "3. Bundesliga")



    df = pd.concat([df_1, df_2, df_3, df_4, df_5, df_6, df_7, df_8, df_9, df_10, df_11, df_12, df_13, df_14, df_15, df_16, df_17, df_18, df_19])
    df = df.reset_index(drop=True)

    DF_LEN_ALL = df.shape[0]

    df["Accurate forward passes per 90"] = df["Forward passes per 90"] / df["Accurate forward passes, %"]
    df["Accurate aerial duels per 90"] = df["Aerial duels per 90"] / df["Aerial duels won, %"]
    df["Accurate defensive duels per 90"] = df["Defensive duels per 90"] / df["Defensive duels won, %"] 
    df["Accurate passes to final third per 90"] = df["Passes to final third per 90"] / df["Accurate passes to final third, %"]
    df["Accurate passes per 90"] = df["Passes per 90"] / df["Accurate passes, %"]
    df["Accurate progressive passes per 90"] = df["Progressive passes per 90"] / df["Accurate progressive passes, %"]
    df["Accurate dribbles per 90"] = df["Dribbles per 90"] / df["Successful dribbles, %"]

    # %%
    is_gk = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["GK"])

    # Mittbackar
    is_centreback = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["RCB", "CB", "LCB"])

    # Wingbacks
    is_wingback = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["RB", "RWB", "LB", "LWB"])
    is_wingback_right = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["RB", "RWB"])
    is_wingback_left = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["LB", "LWB"])

    # Sexor
    is_six = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["DMF", "RDMF", "LDMF"])

    # Åttor
    is_eight = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["CMF", "RCMF", "LCMF"])

    # Tior
    is_ten = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["AMF", "RAMF", "LAMF"])

    # Sjuor
    is_seven = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["RAMF", "LAMF", "RW", "LW", "LMF", "RMF", "LWF", "RWF"])
    is_seven_right = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["RAMF", "RW", "RMF", "RWF"])
    is_seven_left = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["LAMF", "LW", "LMF", "LWF"])

    # Nior
    is_nine = algorithm.filter_for_position_arr(df["Position"], df["Minutes played"], ["CF"])

    #df[is_gk].head()

    # %%
    df_cb = df.loc[is_centreback, stats_list.cb]
    #df_wb_right = df.loc[is_wingback_right, stats_list.wb]
    #df_wb_left = df.loc[is_wingback_left, stats_list.wb]
    df_wb = df.loc[is_wingback, stats_list.wb]
    df_six = df.loc[is_six, stats_list.six]
    df_eight = df.loc[is_eight, stats_list.eight]
    df_seven = df.loc[is_seven, stats_list.seven]
    df_ten = df.loc[is_ten, stats_list.ten]
    df_nine = df.loc[is_nine, stats_list.nine]

    # %%
    df_cb = algorithm.calc_score(df_cb,stats_list.cb[5:])
    df_wb = algorithm.calc_score(df_wb,stats_list.wb[5:])
    df_six = algorithm.calc_score(df_six,stats_list.six[5:])
    df_eight = algorithm.calc_score(df_eight,stats_list.eight[5:])
    df_seven = algorithm.calc_score(df_seven,stats_list.seven[5:])
    df_ten = algorithm.calc_score(df_ten,stats_list.ten[5:])
    df_nine = algorithm.calc_score(df_nine,stats_list.nine[5:])

    df_cb["Rating as CB"] = round(df_cb[list(df_cb.columns)[5:]].sum(axis=1))
    df_wb["Rating as WB"] = round(df_wb[list(df_wb.columns)[5:]].sum(axis=1))
    df_six["Rating as SIX"] = round(df_six[list(df_six.columns)[5:]].sum(axis=1))
    df_eight["Rating as EIGHT"] = round(df_eight[list(df_eight.columns)[5:]].sum(axis=1))
    df_seven["Rating as SEVEN"] = round(df_seven[list(df_seven.columns)[5:]].sum(axis=1))
    df_ten["Rating as TEN"] = round(df_ten[list(df_ten.columns)[5:]].sum(axis=1))
    df_nine["Rating as NINE"] = round(df_nine[list(df_nine.columns)[5:]].sum(axis=1))

    df_cb = df_cb.sort_values(by=["Rating as CB"], ascending=False)
    df_wb = df_wb.sort_values(by=["Rating as WB"], ascending=False)
    df_six = df_six.sort_values(by=["Rating as SIX"], ascending=False)
    df_eight = df_eight.sort_values(by=["Rating as EIGHT"], ascending=False)
    df_seven = df_seven.sort_values(by=["Rating as SEVEN"], ascending=False)
    df_ten = df_ten.sort_values(by=["Rating as TEN"], ascending=False)
    df_nine = df_nine.sort_values(by=["Rating as NINE"], ascending=False)

    df["Rating as CB"] = df_cb["Rating as CB"]
    df["Rating as WB"] = df_wb["Rating as WB"]
    df["Rating as SIX"] = df_six["Rating as SIX"]
    df["Rating as EIGHT"] = df_eight["Rating as EIGHT"]
    df["Rating as SEVEN"] = df_seven["Rating as SEVEN"]
    df["Rating as TEN"] = df_ten["Rating as TEN"]
    df["Rating as NINE"] = df_nine["Rating as NINE"]

    if DF_LEN_ALL != df.shape[0]:
        print("ERROR: LENGTHS OF DF DO NOT MATCH UP")
    else:
        return df
