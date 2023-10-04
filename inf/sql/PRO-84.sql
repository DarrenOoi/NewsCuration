CREATE TABLE Comments (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Article INT,
    Author VARCHAR(255),
    Comment VARCHAR(2000),
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50),
FOREIGN KEY (ID_Article) REFERENCES Article(ID)
);

-- inserted with the following command:
-- python .\inf\transactionDataClient.py --DDLFromFile PRO-84.sql

-- DROP TABLE Comments