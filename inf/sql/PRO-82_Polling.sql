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