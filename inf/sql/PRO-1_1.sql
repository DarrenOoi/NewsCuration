-- ORIGINALLY FROM PRO-65

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