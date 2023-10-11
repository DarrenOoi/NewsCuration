ALTER TABLE Politician
ADD Byline VARCHAR(400),
ADD Political_Position VARCHAR(1000), 
ADD Party VARCHAR(1000), 
ADD COUNTRY VARCHAR(10) DEFAULT 'AUS'

-- DROP TABLE Politician_Position
-- DROP TABLE Politician_PositionNameCodes

-- ALTER TABLE Politician_CampaignPolicies


-- inserted with the following:
--  python .\inf\transactionDataClient.py --DDLFromFile PRO-101.SQL