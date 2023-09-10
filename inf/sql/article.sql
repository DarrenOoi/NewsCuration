CREATE TABLE article (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    URL VARCHAR(255), -- Adjust the length as needed for your URLs
    Score DECIMAL(5,2), -- 5 total digits with 2 decimal places
    Summary TEXT, -- TEXT type allows up to 65,535 characters
    InProduction BOOLEAN,
    InsertedAt DATETIME,
    InsertedBy VARCHAR(50)
);

-- DROP TABLE article