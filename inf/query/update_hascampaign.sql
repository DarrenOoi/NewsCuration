UPDATE Politician
JOIN Politician_CampaignPoliciesByID PCP ON Politician.ID = PCP.ID_Politician
SET Politician.HasCampaign = 1;