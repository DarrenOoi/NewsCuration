--performed as part of --DDLFromFile import

UPDATE Politician P
SET HasCampaign = 1 WHERE EXISTS (
    SELECT * FROM 
    Politician_CampaignPoliciesByID PCP
    WHERE PCP.ID_Policitian = P.ID
)