-- ORIGINALLY FROM PRO-65

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
