# Updating backend for Odense and IK Sirius
    * Download these leagues from Wyscout for Odense:
        - Sverige (1&2)
        - Danmark (1&2)
        - Norge (1&2)
        - Finland
        - Island
        - Tyska (3.)
        - Holland (1&2)
        - Bosnien
        - Serbien
    * Download these leagues from Wyscout for IK Sirius:
        - Sverige - 1/2/3
        - Norge - 1/2
        - Danmark - 1/2 
        - Finland - 1 
        - Island - 1
    ** For every excel file, follow this naming convention: "<league name>_<date>.xlsx" and store them in the pre_processing/ folder, for example:
        -  Allsvenskan_180123.xlsx
        -  Obos_Ligaen_180123.xlsx
        *** If the file from Wyscout contains more than 500 players, the file will have to be divided. Dividing the players by age and adding the information to the filename
            is recommended. Example:
        - 3_Bundesliga_O25.xlsx .. for players with ages 25-40
        - 3_Bundesliga_U25.xlsx .. for players with ages 15-24

