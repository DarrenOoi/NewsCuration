ALTER TABLE Politician
ADD Byline VARCHAR(400),
ADD Political_Position VARCHAR(1000), 
ADD Party VARCHAR(1000), 
ADD COUNTRY VARCHAR(10) DEFAULT 'AUS'

CREATE TABLE Politician_CampaignPolicies(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Fname VARCHAR(255),
    Lname VARCHAR(255),
    PolicyNameTitle VARCHAR(1000),
    PolicyInfo VARCHAR(4000),
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50)
)

DROP TABLE Politician_Position
DROP TABLE Politician_PositionNameCodes

-- ALTER TABLE Politician_CampaignPolicies


-- inserted with the following:
--  python .\inf\transactionDataClient.py --DDLFromFile PRO-101.SQL