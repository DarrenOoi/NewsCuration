import os
import pandas as pd
from inf.transactionDataClient import *


if __name__ == "__main__":
    df = pd.read_excel(os.getcwd() + "\\exploration\\politiciansData.xlsx")
    df = df.reset_index()

    tdc = transactionDataClient()

    for index, row in df.iterrows():

        fname, lname, summary, about, age, gender, byline, position, party = [str(row[value]).encode("ascii", errors="ignore").decode().replace("'", "") for value in ['Fname', 'Lname', 'Summary', 'About', 'Age', 'Gender', 'Byline/motto', 'Political Position', 'Political Party']]

        # pl = Politician(row['Fname'], row['Lname'], about.replace("'", ""), row['Age'], row['Gender'], False, row['ImageLink'], summary.replace("'", ""), byline.replace("'", ""), position, party)
        pl = Politician(fname, lname, about, age, gender, False, row['ImageLink'], summary, byline, position, party)
        tdc.insert(pl)