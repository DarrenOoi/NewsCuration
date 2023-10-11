-- DROP TABLE IF EXISTS Article
-- DROP TABLE IF EXISTS Politician
-- DROP TABLE IF EXISTS Politician_Position
-- DROP TABLE IF EXISTS Politician_PositionNameCodes
-- DROP TABLE IF EXISTS Politician_NameCodes
-- DROP TABLE IF EXISTS Politician_KeyTable

-- CREATE TABLE Politician_PositionNameCodes (
--     ID INT AUTO_INCREMENT PRIMARY KEY,
--     NameCode VARCHAR(255) NOT NULL UNIQUE,
--     InProduction BOOLEAN,
--     InsertedAt DATETIME,
--     InsertedBy VARCHAR(50)
-- );

-- ORIGINALLY FROM PRO-65

CREATE TABLE Politician (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Fname VARCHAR(255),
    Lname VARCHAR(255),
    About VARCHAR(1500),
    Age INT,
    Gender VARCHAR(255),
    CountryCode VARCHAR(10),
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50)
);

-- CREATE TABLE Politician_Position (
--     ID INT AUTO_INCREMENT PRIMARY KEY,
--     PositionNameCode VARCHAR(255), 
--     InProduction BOOLEAN,
--     InsertedAt DATETIME,
--     InsertedBy VARCHAR(50),
--     FOREIGN KEY (PositionNameCode) REFERENCES Politician_PositionNameCodes(NameCode)
-- );
