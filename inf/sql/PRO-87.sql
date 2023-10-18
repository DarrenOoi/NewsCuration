-- performed as part of --DDLFromFile import

CREATE TABLE Politician_CampaignPoliciesByID(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Politician INT,
    PolicyNameTitle VARCHAR(1000),
    PolicyInfo VARCHAR(4000),
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50)
)
