CREATE TABLE Comments (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    URL VARCHAR(1000),
    Author VARCHAR(255),
    Comment VARCHAR(2000),
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50)
);

-- inserted with the following command:
-- python .\inf\transactionDataClient.py --DDLFromFile PRO-84.sql

-- DROP TABLE Comments