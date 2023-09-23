import pymysql
import time
from datetime import datetime
from enum import Enum
import argparse
import os
import subprocess

ENDPOINT = 'newscuration-2.c97gf2vuuvlf.us-east-1.rds.amazonaws.com'
USER = 'admin'
PWD = 'password'
DB = 'newscuration'
PORT = 3306
CHARSET = 'utf8mb4'

class messageStatus(Enum):
  FAIL = 0,
  WARN = 1,
  SUCCESS = 2

'''
The generic class object used to initalise a new record in the database
'''
class table():
  
  tableName = ''
    
  def __init__(self):
    self.isInserted = False
    self.id = None
    self.name = None
    
  def insertSQL(self, insertedBy):
    pass
  
  def querySQL(self):
    return self.isInserted
    
  def getId(self): 
    return self.id
    
  def setId(self, id):
    self.id = id 
    
  def getName(self):
    return self.name
  
'''
Each of the following tables are used as a framework to initalise a new record in the database.
all the data must be parsed on initialisation. All objects (subclasses of table) are used as a parameter
for inserting in the transactionDataClient.

FIELDS:
ID INT AUTO_INCREMENT PRIMARY KEY,
URL VARCHAR(255), -- Adjust the length as needed for your URLs
UpperBias DECIMAL(5, 2), -- 5 total digits with 2 decimal places
LowerBias DECIMAL(5, 2), -- lower bias score
Summary TEXT, -- TEXT type allows up to 65,535 characters
InProduction BOOLEAN,
InsertedAt DATETIME,
InsertedBy VARCHAR(50)
'''
class Article(table):
  
  def __init__(self, url=str, upperBias=float, lowerBias=float, summary=str, inProduction=bool):
    super().__init__()
    self.url = url
    self.upperBias = upperBias
    self.lowerBias = lowerBias
    self.summary = summary
    self.inProd = inProduction
    Article.tableName = Article.__name__
  
  def __str__(self):
    if self.id is None:
      return 'Record has not been inserted into DB - ID is NONE'
    else:
      return f'{Article.tableName}[{self.id}, {self.url}, {self.upperBias}, {self.lowerBias}, {self.summary}, {self.inProd}]'
  
  '''
  This insert statement only takes one parameter; the name of the user inserting the record.
  '''
  def insertSQL(self, insertedBy) -> str:
    query = f"""
    INSERT INTO {Article.tableName} (URL, upperBias, lowerBias, Summary, InProduction, InsertedAt, InsertedBy)
    VALUES (
    '{self.url}',
    {self.upperBias},
    {self.lowerBias},
    '{self.summary}.',
    {1 if self.inProd else 0}, 
    NOW(),
    '{insertedBy}'
    );
    """
    return query
  
  def getName(self):
    return Article.tableName
    
'''
ID 
NameCode VARCHAR(255) NOT NULL UNIQUE,
InProduction BOOLEAN,
InsertedAt DATETIME,
InsertedBy VARCHAR(50)
'''
class Politician_PositionNameCodes(table):
  
  def __init__(self, nameCode=str, inProduction=bool):
    super().__init__()
    self.nameCode = nameCode
    self.inProd = inProduction
    self.name = Politician_PositionNameCodes.__name__
    

  def __str__(self):
    if self.id is None:
      return 'Record has not been inserted into DB - ID is NONE'
    else:
      return f'{self.name}[{self.id}, {self.nameCode}, {self.inProd}]'
  
  '''
  This insert statement only takes one parameter; the name of the user inserting the record.
  '''
  def insertSQL(self, insertedBy) -> str:
    query = f"""
    INSERT INTO {self.name} (NameCode, InProduction, InsertedAt, InsertedBy)
    VALUES (
    '{self.nameCode}',
    {1 if self.inProd else 0}, 
    NOW(),
    '{insertedBy}'
    );
    """
    return query
  
  def getName(self):
    return 

'''
ID
Fname VARCHAR(255),
Lname VARCHAR(255),
About VARCHAR(1500),
Age INT,
Gender VARCHAR(255),
InProduction BOOLEAN,
InsertedAt DATETIME,
InsertedBy VARCHAR(50)
'''
class Politician(table):
  def __init__(self, fName=str, lName=str, about=str, age=int, gender=str, inProduction=bool, imageLink=str, summary=str):
    super().__init__()
    self.fName = fName
    self.lName = lName
    self.about = about
    self.age = age
    self.gender = gender
    self.inProd = inProduction
    self.summary = summary
    self.imageLink = imageLink
    self.name = Politician.__name__
  
  '''
  This insert statement only takes one parameter; the name of the user inserting the record.
  '''
  def insertSQL(self, insertedBy) -> str:
    query = f"""
    INSERT INTO {self.name} (Fname, Lname, About, Age, Gender, InProduction, InsertedAt, InsertedBy)
    VALUES (
    '{self.fName}',
    '{self.lName}',
    '{self.about}',
    '{self.age}',
    '{self.gender}',
    {1 if self.inProd else 0}, 
    NOW(),
    '{insertedBy}',
    '{self.imageLink}',
    '{self.summary}'
    );
    """
    return query
  
  def __str__(self):
    if self.id is None:
      return 'Record has not been inserted into DB - ID is NONE'
    else:
      return f'{self.name}[{self.id}, {self.fName}, {self.lName}, {self.about}, {self.age}, {self.gender}, {self.inProd}, {self.imageLink}, {self.summary}]'

'''
ID 
PositionNameCode VARCHAR(255),
InProduction BOOLEAN,
InsertedAt DATETIME,
InsertedBy VARCHAR(50),
'''
class Politician_Position(table):
  
  def __init__(self, positionNameCode=str, inProduction=bool):
    super().__init__()
    self.posNameCode = positionNameCode
    self.inProd = inProduction
    self.name = Politician_Position.__name__
    
  '''
  This insert statement only takes one parameter; the name of the user inserting the record.
  '''
  def insertSQL(self, insertedBy) -> str:
    query = f"""
    INSERT INTO {self.name}(PositionNameCode, InProduction, InsertedAt, InsertedBy)
    VALUES (
    '{self.posNameCode}',
    {1 if self.inProd else 0}, 
    NOW(),
    '{insertedBy}'
    );
    """
    return query
    
  def __str__(self):
    if self.id is None:
      return 'Record has not been inserted into DB - ID is NONE'
    else:
      return f'{self.name}[{self.id}, {self.posNameCode}, {self.inProd}]'
    
'''
ID 
ID_Politician INT,
ID_Article INT,
InProduction BOOLEAN,
InsertedAt DATETIME,
InsertedBy VARCHAR(50),
'''
class Politician_KeyTable(table):

  def __init__(self, politicianID=str, articleID=str, inProduction=bool):
    super().__init__()
    self.politicianID = politicianID
    self.articleID = articleID
    self.inProd = inProduction
    self.name = Politician_KeyTable.__name__
    
  def __str__(self):
    if self.id is None:
      return f'{self.name} record has not been inserted into DB - ID is NONE'
    else:
      return f'{self.name}[{self.id}, {self.politicianID}, {self.articleID}, {self.inProd}]'
    
  '''
  This insert statement only takes one parameter; the name of the user inserting the record.
  '''
  def insertSQL(self, insertedBy) -> str:
    query = f"""
    INSERT INTO {self.name}(ID_Politician, ID_Article, InProduction, InsertedAt, InsertedBy)
    VALUES (
    {self.politicianID},
    {self.articleID},
    {1 if self.inProd else 0}, 
    NOW(),
    '{insertedBy}'
    );
    """
    return query

'''
The transactionDataClient. Communicates with the AWS RDS.

On initialisation, the TDC establishes connections with the database. The TDC
has functionality to query, perform table updates and query from a sql file under directory "/sql".
This should only opened once per session
'''
class transactionDataClient():
  
  def __init__(self):
    self.cursor = None
    self.cnx = None
    self.user = subprocess.run(['git', 'config', 'user.name'], capture_output=True, text=True).stdout.strip()
    self.cursor, self.cnx = self.establishConnection()  
    
  
  """Builds a log message in the audit file, for safekeeping
  """
  def logMessage(self, status=messageStatus, message=str):
    red_text = "\033[91m"
    yellow_text = "\033[93m"
    default_colour = "\033[0m"
  
    with open('inf/audit/logs.txt', 'a') as auditLog:
      message = f'[{datetime.now()}] [{self.user}] [{status.name}] [{message}]'
      auditLog.write(message + '\n')
      if status == messageStatus.FAIL:
        print(f'{red_text}{message}{default_colour}')
      elif status == messageStatus.WARN:
        print(f'{yellow_text}{message}{default_colour}')
      else:
        print(message)
  
  """Establishes connections with the AWS RDS server. 
  
    Returns:
    Cursor -> cursor object for DB DDL.
  """
  def establishConnection(self):
    
    if self.cursor is not None or self.cnx is not None:
       self.logMessage(messageStatus.WARN, f'Connection and cursor already established.')
       
    # Create a cursor object   
    cnx = pymysql.connect(host=ENDPOINT, user=USER, password=PWD,
                          charset=CHARSET, cursorclass=pymysql.cursors.DictCursor, port=PORT)
    self.logMessage(messageStatus.SUCCESS, f'Established connection {cnx}')
    cursor = cnx.cursor()
    self.logMessage(messageStatus.SUCCESS, f'Established cursor {cursor}')
    cursor.execute(f"USE {DB}")
    cnx.commit()
    self.logMessage(messageStatus.SUCCESS, f'Established connection to database {DB}')
    return cursor, cnx
  
  def closeConnection(self):
    self.logMessage(messageStatus.SUCCESS, f'Closing Connection {self.cnx}')
    self.logMessage(messageStatus.SUCCESS, f'Closing cursor {self.cursor}')
    self.cursor.close()
    self.cnx.close()
    self.cursor = None
    self.cnx = None
  
  """ Retrieves the cursor output for the query. Will not return any output for a DDL, for example.
  Selection queries will return an output.
  """
  def retrieveCursorOutput(self):
    try:
      results = self.cursor.fetchall()
      return results
    except Exception as e:
      self.logMessage(messageStatus.FAIL, f'Unable to retrieve results from cursor {e}')
      
  """
  Perform database creation from a sql file. This should be used as a once-off, and not for transactional
  database DDL. For example, creating a new table to host all the politicians.
  NOTE: looks in the /sql directory (give the file name only)
  """    
  def generateFromSqlFile(self, sqlFileName=str):
    try:
      with open(f'inf/sql/{sqlFileName}', 'r') as sql:
        sqlIn = sql.read()
    except FileNotFoundError:
      self.logMessage(messageStatus.FAIL, f'Unable to find file path: {sqlFileName}')
      self.closeConnection()
      exit(1)
    except Exception as e:
      self.logMessage(messageStatus.FAIL, f'an exception occured in the execution statement: \n {e}')
      self.closeConnection()
    try:
      self.cursor.execute(sqlIn)
    except Exception as e: #error handling is vague, have to assume basket case here
      self.logMessage(messageStatus.FAIL, f'Unable to execute sql \n {sqlIn} with error {e}')
    self.cnx.commit()
    self.logMessage(messageStatus.SUCCESS, f"{sqlIn}")
  
  '''
  Queries a given table, and applies a filter if given
  '''
  def query(self, table, filter=None):
    if self.cursor is None:
      self.logMessage(messageStatus.WARN, 'Connection is closed. Query failed')

    query = f"""
    SELECT * 
    FROM {table}
    WHERE {filter if filter is not None else '1=1'}
    """
    try: 
      self.cursor.execute(query)    
    except Exception as e:
      self.logMessage(messageStatus.FAIL, f'error building sql statement with error {e}')
    
    try: 
      self.cnx.commit()
    except Exception as e:
      self.logMessage(messageStatus.FAIL, f'failed to commit query \n {sql} \n reason: {e}')
    self.logMessage(messageStatus.SUCCESS, f"Successfully attempted query: {query}")
    
    return self.retrieveCursorOutput()
  
  def insert(self, table=type(table)):
    if self.cursor is None:
      self.logMessage(messageStatus.WARN, 'Connection is closed. Query failed')
    
    DDLMethod = table.insertSQL(self.user)
    
    try: 
      self.cursor.execute(DDLMethod)    
    except Exception as e:
      self.logMessage(messageStatus.FAIL, f'error parsing SQL statement {DDLMethod}: \n error {e}')
    
    try: 
      self.cnx.commit()
    except Exception as e:
      self.logMessage(messageStatus.FAIL, f'failed to commit query \n {DDLMethod} \n reason: {e}')
    self.logMessage(messageStatus.SUCCESS, f"Successfully attempted query: {DDLMethod}")
    
    #next, find the id of the newly inserted tuple and update the object
    id = self.get_id(table)
    table.setId(id)
   
  def get_id(self, table=type(table)):
    query = f"""
    SELECT MAX(ID) AS ID FROM {table.getName()};
    """
    try: 
      self.cursor.execute(query)    
    except Exception as e:
      self.logMessage(messageStatus.FAIL, f'error parsing SQL statement {query}: \n error {e}')
    try: 
      self.cnx.commit()
    except Exception as e:
      self.logMessage(messageStatus.FAIL, f'failed to commit query \n {query} \n reason: {e}')
    self.logMessage(messageStatus.SUCCESS, f"Sucessfully transacted query: {query}")
    
    try:
      out = self.retrieveCursorOutput()
      return out[0]['ID']
    except IndexError as e:
      self.logMessage(messageStatus.FAIL, f'failed to properly insert record. Check table name exists and/or is correct.')
      return None
  
  
if __name__ == '__main__':
  parser = argparse.ArgumentParser(
        description="transaction client handler"
    )
  
  parser.add_argument(
          "--query",
          type=str,
          nargs='+',
          help="query a table, with no applied filters"
      )
  
  parser.add_argument(
          "--DDLFromFile",
          type=str,
          nargs='+',
          help="a list a filenames to perform custom DDL or database intialisation"
      )
  
  parser.add_argument(
          "--debugDDL",
          action="store_true",
          help="debug an insert DDL"
      )
  args = parser.parse_args()
  
  if args.DDLFromFile is not None:
    print(f'performing custom SQL file import for all {args.DDLFromFile}')
    tdc = transactionDataClient()
    for sql in args.DDLFromFile:
      tdc.generateFromSqlFile(sql)
    tdc.closeConnection()
    
  if args.debugDDL:
    print(f'performing DDL for article table, DEBUGGING {args.debugDDL}')
    tdc = transactionDataClient()
    newArticle = Article('examplewebsite.com', 10.23, 22.40, 'a summary of some text', 0)
    tdc.insert(newArticle)
    newPoliticianName = Politician_PositionNameCodes('Prime Minister of Australia', 0)
    tdc.insert(newPoliticianName)
    newPolitician = Politician('John', 'Doe', 'John did some incredible things', 32, 'Male', 0, '\img\imghere', 'another more general summary here')
    tdc.insert(newPolitician)
    newPoliticianPosition = Politician_Position('Prime Minister of Australia', 0)
    tdc.insert(newPoliticianPosition)
    newPoliticianKeyTable = Politician_KeyTable(newPolitician.getId(), newArticle.getId())
    tdc.insert(newPoliticianKeyTable)
    print(newPoliticianName)
    print(newPolitician)
    print(newPoliticianPosition)
    print(newPoliticianKeyTable)
    print(newArticle)
    tdc.closeConnection()
    
  if args.query is not None:
    print(f'performing sql query on table/s {args.query}')
    tdc = transactionDataClient()
    for i in args.query:
      print(tdc.query(i))
    tdc.closeConnection()