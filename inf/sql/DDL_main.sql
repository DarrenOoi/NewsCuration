DROP TABLE IF EXISTS Article
DROP TABLE IF EXISTS Politician
DROP TABLE IF EXISTS Politician_Position
DROP TABLE IF EXISTS Politician_PositionNameCodes
DROP TABLE IF EXISTS Politician_NameCodes
DROP TABLE IF EXISTS Politician_KeyTable

CREATE TABLE Politician_PositionNameCodes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NameCode VARCHAR(255) NOT NULL UNIQUE,
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50)
);

CREATE TABLE Article (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    URL VARCHAR(255), -- Adjust the length as needed for your URLs
    UpperBias DECIMAL(5, 2), -- 5 total digits with 2 decimal places
    LowerBias DECIMAL(5, 2), -- lower bias score
    Summary TEXT, -- TEXT type allows up to 65,535 characters
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50)
);

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

/* A unique store of the politician's positions,
such as 'Prime Minister of Australia' or 'Member of Parliament; Senate'
etc.
*/
CREATE TABLE Politician_Position (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    PositionNameCode VARCHAR(255), --e.g. 'Prime minister of Australia' etc,
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50),
    FOREIGN KEY (PositionNameCode) REFERENCES Politician_PositionNameCodes(NameCode)
);

CREATE TABLE Politician_KeyTable (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Politician INT,
    ID_Article INT,
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50),
    FOREIGN KEY (ID_Politician) REFERENCES Politician(ID),
    FOREIGN KEY (ID_Article) REFERENCES Article(ID)
);