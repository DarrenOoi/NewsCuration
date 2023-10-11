
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
