## Using ./inf

The database for this codebase is maintained of an AWS RDS instance. 


### Debugging
From your newcuration directory, run the transactionDataClient in debug mode, i.e.

```powershell
python .\inf\transactionDataClient.py
```

The following functionalities enable easy processing of queries, database inserts and DDL methods:

```
  -h, --help            show this help message and exit
  --query QUERY [QUERY ...]
                        query a table with no applied filters
  --DDLFromFile DDLFROMFILE [DDLFROMFILE ...]
                        a list a filenames to perform custom DDL or database intialisation
  --debugDDL            insert an example records into each table of the database. Inprod = 0
  --buildDB             build all the databases in /sql
  --customImport CUSTOMIMPORT [CUSTOMIMPORT ...]
                        perform a custom query from the import-custom directory
```