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
    
  def insertSQL(self, insertedBy):
    pass
  
  def querySQL(self):
    return self.isInserted
    
  def getId(self): 
    return self.id
    
  def setId(self, id):
    self.id = id 
  
'''
Each of the following tables are used as a framework to initalise a new record in the database.
all the data must be parsed on initialisation. All objects (subclasses of table) are used as a parameter
for inserting in the transactionDataClient.
'''
class article(table):
  
  def __init__(self, url=str, score=float, summary=str, inProduction=bool):
    super().__init__()
    self.url = url
    self.score = score
    self.summary = summary
    self.inProd = inProduction
    article.tableName = article.__name__
  
  def __str__(self):
    return f'[{self.id}, {self.url}, {self.score}, {self.summary}, {self.inProd}]'
  
  '''
  This insert statement only takes one parameter; the name of the user inserting the record.
  '''
  def insertSQL(self, insertedBy) -> str:
    query = f"""
    INSERT INTO article (URL, Score, Summary, InProduction, InsertedAt, InsertedBy)
    VALUES (
    '{self.url}',
    {self.score},
    '{self.summary}.',
    {1 if self.inProd else 0}, 
    NOW(),
    '{insertedBy}'
    );
    """
    return query
  
  def getName(self):
    return article.tableName
    
    
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
  
    with open('audit/logs.txt', 'a') as auditLog:
      message = f'[{datetime.now()}] [{self.user}] [{status.name}] [{message}]'
      auditLog.write(message + '\n')
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
      with open(f'sql/{sqlFileName}', 'r') as sql:
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
    self.logMessage(messageStatus.SUCCESS, f"Sucessfully transacted query: {query}")
    
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
    self.logMessage(messageStatus.SUCCESS, f"Sucessfully transacted query: {DDLMethod}")
    
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
    
    out = self.retrieveCursorOutput()
    return out[0]['ID']
  
  
if __name__ == '__main__':
  parser = argparse.ArgumentParser(
        description="transaction client handler"
    )
  
  parser.add_argument(
          "--query",
          type=str,
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
    newArticle = article('examplewebsite.com', 10.23, 'a summary of some text', 0)
    tdc.insert(newArticle)
    print(newArticle)
    tdc.closeConnection()
    
  if args.query is not None:
    print(f'performing sql query on table {args.query}')
    tdc = transactionDataClient()
    print(tdc.query(args.query))
    tdc.closeConnection()