import os
import pandas as pd
from inf.transactionDataClient import *


def addPoliticians():
    df = pd.read_excel(os.getcwd() + "\\exploration\\politiciansData.xlsx")
    df = df.reset_index()

    tdc = transactionDataClient()

    for index, row in df.iterrows():
        fname, lname, summary, about, age, gender, byline, position, party = [
            str(row[value]).encode("ascii", errors="ignore").decode().replace("'", "")
            for value in [
                "Fname",
                "Lname",
                "Summary",
                "About",
                "Age",
                "Gender",
                "Byline/motto",
                "Political Position",
                "Political Party",
            ]
        ]

        pl = Politician(
            fname,
            lname,
            about,
            age,
            gender,
            False,
            row["ImageLink"],
            summary,
            byline,
            position,
            party,
        )
        tdc.insert(pl)


def addCampaigns():
    df = pd.read_excel(
        os.getcwd() + "\\exploration\\campaignsData.xlsx",
        sheet_name="Politician_CampaignPolicies",
    )
    df = df.reset_index()

    tdc = transactionDataClient()

    for index, row in df.iterrows():
        fname, lname, policyTitle, policyInfo = [
            str(row[value]).encode("ascii", errors="ignore").decode().replace("'", "")
            for value in ["Fname", "Lname", "PolicyNameTitle", "PolicyInfo"]
        ]

        pl = Politician_CampaignPolicies(fname, lname, policyTitle, policyInfo, False)
        tdc.insert(pl)


if __name__ == "__main__":
    addCampaigns()
