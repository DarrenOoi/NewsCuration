-- DROP TABLE IF EXISTS Article
-- DROP TABLE IF EXISTS Politician
<<<<<<< HEAD
DROP TABLE IF EXISTS Politician_Position
DROP TABLE IF EXISTS Politician_PositionNameCodes
DROP TABLE IF EXISTS Politician_NameCodes
DROP TABLE IF EXISTS Politician_KeyTable
DROP TABLE IF EXISTS Polling

=======
-- DROP TABLE IF EXISTS Politician_Position
-- DROP TABLE IF EXISTS Politician_PositionNameCodes
-- DROP TABLE IF EXISTS Politician_NameCodes
-- DROP TABLE IF EXISTS Politician_KeyTable
>>>>>>> master
CREATE TABLE Politician_PositionNameCodes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NameCode VARCHAR(255) NOT NULL UNIQUE,
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50)
);

CREATE TABLE Article (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    URL VARCHAR(255),
    UpperBias DECIMAL(5, 2),
    LowerBias DECIMAL(5, 2),
    Summary TEXT,
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

CREATE TABLE Politician_Position (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    PositionNameCode VARCHAR(255), 
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

CREATE TABLE Polling (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Article INT,
    Question VARCHAR(1000),
    OptionFirst VARCHAR(1000),
    OptionSecond VARCHAR(1000),
    OptionThird VARCHAR(1000),
    OptionFourth VARCHAR(1000),
    VotesFirst INT,
    VotesSecond INT,
    VotesThird INT,
    VotesFourth INT,
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50),
    FOREIGN KEY (ID_Article) REFERENCES Article(ID)
);
