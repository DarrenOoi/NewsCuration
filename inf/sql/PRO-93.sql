CREATE TABLE Article_ArticleBias (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    KeyPhrase VARCHAR(1000),
    BiasReason TEXT,
    ID_Article INT,
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50),
    FOREIGN KEY (ID_Article) REFERENCES Article(ID)
);


-- this has been inserted as part of PRO-93