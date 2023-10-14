-- This query was run with the following terminal command: python .\inf\transactionDataClient.py --customImport politician_campaign_policies.sql

INSERT INTO Politician_CampaignPoliciesByID (ID_Policitian, PolicyNameTitle, PolicyInfo, InProduction, InsertedAt, InsertedBy)

(SELECT P.ID, PCP.PolicyNameTitle, PCP.PolicyInfo, PCP.InProduction, PCP.InsertedAt, PCP.InsertedBy 
FROM Politician_CampaignPolicies PCP, Politician P
WHERE PCP.Fname = P.Fname 
AND PCP.Lname = P.Lname)
