from threading import *
from datetime import datetime

from utils.prompts.webScraper import *
from utils.biasCalculator import *
from utils.nameExtractor import *

from datetime import datetime
from inf.transactionDataClient import *
from inf.transactionHelper import *
from utils.prompts.prompt import *
import json
import queue

import time
HEADER = "header"
TEXT = "text"
SUMMARY = "summary"
BIAS_RANGE = "biasRange"
BIAS_WORDS = "biasWords"
POLITICAL_FIGURES = "politicalFigures"
POLITICIAN = "Politician"
POLITICIAN_CAMPAIGN = "Politician_CampaignPolicies"
POLITICIAN_CAMPAIGN_BY_ID = "Politician_CampaignPoliciesByID"
POLL_PROMPT = "poll"
POLL_VALS = "pollVals"
VIEWS = "views"

# def wait(t):
#     time.sleep(t)
#     return t

# Class used to quantify importance of articles in cache and help decide
# which to remove is cache is full


class RequestRate():
    def __init__(self) -> None:
        self.rate = 1.0
        self.lastRequestTime = datetime.now()
        self.requestCount = 1

    # updates the request rate, used when a request is made by user
    def updateRate(self) -> None:
        rate = self.rate
        lastRequestTime = self.lastRequestTime
        requestCount = self.requestCount

        self.lastRequestTime = datetime.now()
        self.rate = (requestCount + 1) / ((rate/requestCount)**(-1) +
                                          (self.lastRequestTime - lastRequestTime).total_seconds())
        self.requestCount += 1

    # Used to sort based on requestRate objects == != > < >= <=
    def __eq__(self, other: object) -> bool:  # Not Implmented error if objects are not the same
        if not isinstance(other, RequestRate):
            return NotImplemented

        return self.rate == other.rate and self.requestCount == other.requestCount and self.lastRequestTime == other.lastRequestTime

    def __ne__(self, other: object) -> bool:  # Not Implmented error if objects are not the same
        tmp = (self == other)
        if tmp == NotImplemented:
            return NotImplemented
        return not (tmp)

    def __lt__(self, other: object) -> bool:  # Not Implmented error if objects are not the same
        if not isinstance(other, RequestRate):
            return NotImplemented
        return self.rate < other.rate or (self.rate == other.rate and self.lastRequestTime < other.lastRequestTime)

    def __gt__(self, other: object) -> bool:  # Not Implmented error if objects are not the same
        if not isinstance(other, RequestRate):
            return NotImplemented
        return self.rate > other.rate or (self.rate == other.rate and self.lastRequestTime > other.lastRequestTime)

    def __le__(self, other: object) -> bool:  # Not Implmented error if objects are not the same
        tmp = (self > other)
        if tmp == NotImplemented:
            return NotImplemented
        return not (tmp)

    def __ge__(self, other: object) -> bool:  # Not Implmented error if objects are not the same
        tmp = (self < other)
        if tmp == NotImplemented:
            return NotImplemented
        return not (tmp)

    # print() returns readable information
    def __repr__(self) -> str:
        return str(self.rate) + " " + self.lastRequestTime.strftime("%H:%M:%S")

# Parent of ArticleJob, has basic functionality to return abstract (object) values requesed by User


class ArticleElement():
    def __init__(self, url: str, header: str, text: str, summary: str, biasRange: tuple, biasWords: str, politicalFigures: list, politicalFigureIds: list, poll: str, pollVals: list, views: int) -> None:
        self.url = url
        self.header = header
        self.text = text
        self.summary = summary
        self.biasRange = biasRange
        self.biasWords = biasWords
        self.politicalFigures = politicalFigures
        self.politicalFigureIds = politicalFigureIds
        self.poll = poll
        self.pollVals = pollVals
        self.views = views

        self.requestRate = RequestRate()

    # returns item user requested if finished
    # NOTE: relies on variable names in Article (DO NOT CHANGE variable names)
    def get(self, string) -> object:
        return getattr(self, string)

    # print() returns readable information
    def __repr__(self) -> str:
        return f"{self.url[0:15]}... : ['{self.header[0:15]}...', '{self.text[0:15]}...', '{self.summary[0:15]}...', {self.biasRange[0]}, {self.requestRate.__repr__()}]"

# Child of Article, used to process the required functionalities to
# retrieve/create the data each article contains in a thread-safe manner


class ArticleElementJob(ArticleElement):
    def __init__(self, url: str, webScraper: NewsScraper, tdcLock: Lock, tdc: transactionDataClient) -> None:
        super().__init__(url, webScraper.getHeader(), webScraper.getArticle(),
                         None, None, None, None, None, None, [0, 0, 0, 0], 1)
        self.summaryLock = Condition()
        self.biasRangeLock = Condition()
        self.biasWordsLock = Condition()
        self.politicalFiguresLock = Condition()
        self.politicalFigureIdsLock = Condition()
        self.pollLock = Condition()

        self.jobsDoneLock = Lock()
        self.jobsDone = 0

        # starts the threading for the 4 jobs
        summaryT = Thread(target=self.threadableJob, args=(
            pipeScrapedArticleToGPTFromScraper, webScraper, "summary", "summaryLock"))
        summaryT.start()
        biasRT = Thread(target=self.threadableJob, args=(
            getBiasRangeFromText, webScraper.getArticle(), "biasRange", "biasRangeLock"))
        biasRT.start()
        biasWT = Thread(target=self.threadableJob, args=(
            biasSubtext, webScraper.getArticle(), "biasWords", "biasWordsLock"))
        biasWT.start()
        politicalFT = Thread(target=self.threadableJob, args=(politicianNameExtractorFromDB, [
                             webScraper.getArticle(), tdcLock, tdc], "politicalFigures", "politicalFiguresLock"))
        politicalFT.start()
        politicalFIDT = Thread(target=self.threadableJob, args=(politicianIdExtractorFromDB, [
                               webScraper.getArticle(), tdcLock, tdc], "politicalFigureIds", "politicalFigureIdsLock"))
        politicalFIDT.start()
        pollT = Thread(target=self.threadableJob, args=(
            generate_poll_prompt_dict, webScraper.getArticle(), "poll", "pollLock"))
        pollT.start()

        self.threads = [summaryT, biasRT, biasWT,
                        politicalFT, politicalFIDT, pollT]

    # function to run a given function and once finished, update article job's
    # variable and increment number of jobs done
    def threadableJob(self, function: object, data: object, variable: str, lock: str) -> None:
        tmp = function(data)
        self.jobsDoneLock.acquire()
        with getattr(self, lock):
            setattr(self, variable, tmp)
            getattr(self, lock).notify_all()
        self.jobsDone += 1
        # print(f"variable {variable} updated")
        self.jobsDoneLock.release()

    # returns item user requested if finished otherwise waits until then
    # NOTE: relies on variable names in ArticleJob and Article (DO NOT CHANGE variable names)
    def get(self, string: str) -> object:
        if hasattr(self, string + "Lock"):
            with getattr(self, string + "Lock"):
                while getattr(self, string) == None:
                    getattr(self, string + "Lock").wait()
        if hasattr(self, string):
            return super().get(string)
        return None

    # testing whether the article processes are done
    def isDone(self) -> bool:
        self.jobsDoneLock.acquire()
        tmp = (self.jobsDone >= len(self.threads))
        self.jobsDoneLock.release()
        return tmp

    # removes all dead jobs used to process the article
    def cleanJob(self) -> None:
        for job in self.threads:
            job.join()

# Class used by Session Manager to manage articles searched by User;
# generate and store article information, etc.


class ArticleManager():
    def __init__(self, limit, transactionClient, transactionClientLock) -> None:
        self.cacheLimit = limit
        self.cacheLock = Lock()
        self.cache = {}  # {url: Article()}

        self.jobsLock = Lock()
        self.jobs = {}  # {url: ArticleJob()}

        self.threadsLock = Lock()
        self.threads = []

        self.transactionClientLock = transactionClientLock
        self.transactionClient = transactionClient

        self.recents = queue.Queue(3)
        self.saved = []

    # checks if article already exists in cache
    def isArticleInCache(self, url: str) -> bool:
        if self.cache.get(url, None) != None:
            return True
        return False

    # checks if article already exists in database
    def isArticleInDB(self, url: str) -> bool:
        results = self.transactionClient.query(
            "Article", filter=f'URL = "{url}"')
        if len(results) == 0:
            print(f"DEBUG: isArticleInDB - No article found")
            return False
        if len(results) != 1:
            print(f"DEBUG: isArticleInDB - More than one article found")
            return None

        # process required jobs to suplement data recieved
        articleDict = results[0]
        articleId = articleDict['ID']
        results = self.transactionClient.query(
            "Politician_KeyTable", filter=f'ID_Article = "{articleId}"')
        politicianIds = [result['ID_Politician'] for result in results]

        results = []
        for id in politicianIds:
            results += self.transactionClient.query(
                "Politician", filter=f'ID = "{id}"')
        politicanNames = [result['Fname'] + ' ' + result['Lname']
                          for result in results]

        if len(politicanNames) != len(politicianIds):
            print("DEBUG: isArticleInDB - politican mentioned IDs no not match Names")
            return None

        biasWords = dict()
        results = self.transactionClient.query(
            "Article_ArticleBias", filter=f'ID_Article = "{articleId}"')
        for result in results:
            biasWords[result['KeyPhrase']] = result['BiasReason']
        biasWords = json.dumps(biasWords)

        results = self.transactionClient.query(
            "Polling", filter=f'ID_Article = "{articleId}"')
        if len(results) != 1:
            print("DEBUG: isArticleInDB - either no poll found or too many polls found")
            return None
        poll = {"question": results[0]["Question"], "options": [
            results[0]["OptionFirst"], results[0]["OptionSecond"], results[0]["OptionThird"], results[0]["OptionFourth"]]}
        pollVals = [results[0]["VotesFirst"], results[0]["VotesSecond"],
                    results[0]["VotesThird"], results[0]["VotesFourth"]]
        poll = json.dumps(poll)

        self.cacheLock.acquire()
        self.preventCacheOverflow()
        self.cache[url] = ArticleElement(articleDict['URL'], articleDict['Header'], articleDict['OriginalText'], articleDict['SummaryParagraph'], (
            articleDict['LowerBias'], articleDict['UpperBias']), biasWords, politicanNames, politicianIds, poll, pollVals, articleDict['Views'])
        self.cacheLock.release()
        print(self)
        return True

    # checks if a job for the requested article is already processing
    def isArticleBeingProcessed(self, url: str) -> bool:
        tmp = self.jobs.get(url, None)
        if tmp == None:
            return False
        return True

    # checks that cache is not overflowing and if so
    # removes article that had the smallest rate of requests made to it;
    # if equal than tests how long ago requested last
    def preventCacheOverflow(self) -> None:
        if len(self.cache.values()) < self.cacheLimit:
            return
        tmp_list = sorted(self.cache.values(), key=lambda x: x.requestRate, reverse=True)
        upper = len(tmp_list)-self.cacheLimit
        for value in tmp_list[0:upper+1]:
            del self.cache[value.get("url")]

    def insertDataFromJobToDB(self, url: str, header: str, text: str, summary: str, lowBias: float, highBias: float, biasWords: dict, politicalFigureIds: list, poll: dict):
        result = self.transactionClient.query(
            "Article", filter=f'URL = "{url}"')
        if len(result) != 0:
            print("DEBUG: insertDataFromJobToDB - Article already exists in DB")
            return None

        # clean data
        if lowBias > highBias:
            tmp = highBias
            highBias = lowBias
            lowBias = tmp
        header = header.replace("'", "")
        text = text.replace("'", "")
        summary = summary.replace("'", "")
        keys = [key.replace("'", "") for key in biasWords.keys()]
        values = [value.replace("'", "") for value in biasWords.values()]
        biasWords = dict()
        for i in range(len(keys)):
            biasWords[keys[i]] = values[i]

        article = Article(url, header, text, summary, highBias, lowBias, False)
        self.transactionClient.insert(article)

        result = self.transactionClient.query(
            "Article", filter=f'URL = "{url}"')
        if len(result) != 1:
            print("ERROR: insertDataFromJobToDB - more than one article created")
            return None
        articleDict = result[0]

        pollQ = poll["question"].replace("'", "")
        pollOp = [value.replace("'", "") for value in poll["options"]]
        polling = Polling(
            articleDict['ID'], pollQ, pollOp[0], pollOp[1], pollOp[2], pollOp[3], 0)
        self.transactionClient.insert(polling)

        insert_bias_keywords(self.transactionClient,
                             articleDict['ID'], biasWords, False)

        for id in politicalFigureIds:
            politicalFigureMentioned = Politician_KeyTable(
                id, articleDict['ID'], False)
            self.transactionClient.insert(politicalFigureMentioned)

        print("DEBUG: insertDataFromJobToDB - inserted data into DB")
        return True

    # waits until all processes of article job are done
    # and then moves it to cache
    def moveJobToCache(self, url: str) -> None:
        tmp = False
        while tmp == False:
            tmp = self.jobs[url].isDone()
        self.jobsLock.acquire()
        self.transactionClientLock.acquire()
        self.cacheLock.acquire()
        tmp = self.jobs[url]
        self.preventCacheOverflow()
        self.cache[url] = ArticleElement(url, tmp.get("header"), tmp.get("text"), tmp.get("summary"), tmp.get("biasRange"), tmp.get(
            "biasWords"), tmp.get("politicalFigures"), tmp.get("politicalFigureIds"), tmp.get("poll"), [0, 0, 0, 0], 1)
        if self.recents.full():
            self.recents.get()
        self.recents.put(self.cache[url])
        tmp.cleanJob()
        print("DEBUG: moveJobToCache - Job Done")
        print(self)
        del self.jobs[url]
        self.cacheLock.release()
        self.insertDataFromJobToDB(url, tmp.get("header"), tmp.get("text"), tmp.get("summary"), tmp.get("biasRange")[0], tmp.get(
            "biasRange")[1], json.loads(tmp.get("biasWords")), tmp.get("politicalFigureIds"), json.loads(tmp.get("poll")))
        self.transactionClientLock.release()
        self.jobsLock.release()

    # Adds a job to the job dictionary (threadsafe) so only one job per url is ever created
    # starts the thread to move the article into the cache once processing if finished
    def jobMonitor(self, url: str) -> True:  # Or None if invalid url
        newsScraper = NewsScraper(url)
        if newsScraper.getHeader() == None:
            print("DEBUG: jobMonitor - Article cannot be read")
            return None

        self.jobsLock.acquire()
        self.jobs[url] = ArticleElementJob(
            url, newsScraper, self.transactionClientLock, self.transactionClient)
        self.jobsLock.release()

        thread = Thread(target=self.moveJobToCache, args=(url,))
        self.threadsLock.acquire()
        self.threads.append(thread)
        thread.start()
        self.threadsLock.release()
        return True

    # checks where the article requested is stored in and if required,
    # starts the process of generating the data
    def getArticle(self, url: str) -> dict:  # Or None if invalid url
        print("DEBUG: getArticle - started")
        self.cacheLock.acquire()
        if self.isArticleInCache(url):
            print("DEBUG: getArticle - article in cache")
            self.cache[url].requestRate.updateRate()
            self.cacheLock.release()
            return self.cache[url]
        self.cacheLock.release()

        self.transactionClientLock.acquire()
        if self.isArticleInDB(url):
            print("DEBUG: getArticle - article in db")
            self.cache[url].requestRate.updateRate()
            self.transactionClientLock.release()
            return self.cache[url]
        self.transactionClientLock.release()

        self.jobsLock.acquire()
        if self.isArticleBeingProcessed(url):
            print("DEBUG: getArticle - Job already processing")
            self.jobsLock.release()
            return self.jobs[url]
        self.jobsLock.release()

        print("DEBUG: getArticle - creating job")
        tmp = self.jobMonitor(url)
        if tmp != None:
            return self.jobs[url]
        return None

    # returns item requested by User
    def getItem(self, url: str, itemName: str) -> str:  # Or None if invalid url
        article = self.getArticle(url)
        if article != None:
            return article.get(itemName)
        return None

    # removes threads initialised in
    def clean(self) -> str:
        self.threadsLock.acquire()
        for job in self.threads:
            job.join()
        self.threadsLock.release()

    # print() returns readable information
    def __repr__(self):
        text = "{\n"
        for (k, v) in self.cache.items():
            text += f"\t{v.__repr__()}, \n"
        text += '}'
        return text

    def updatePoll(self, url: str, optionIndex: int) -> None:
        self.transactionClientLock.acquire()
        self.cacheLock.acquire()
        if self.isArticleInCache(url):
            self.cache[url].pollVals[optionIndex] += 1
        self.cacheLock.release()

        result = self.transactionClient.query(
            "Article", filter=f'URL = "{url}"')
        if len(result) != 1:
            print("DEBUG: updatePoll - more than one article found")
            self.transactionClientLock.release()
            return
        id = result[0]['ID']
        option = ""
        if optionIndex == 0:
            option = "VotesFirst"
        elif optionIndex == 1:
            option = "VotesSecond"
        elif optionIndex == 2:
            option = "VotesThird"
        else:
            option = "VotesFourth"
        result = self.transactionClient.query(
            "Polling", filter=f'ID_Article = {id}')
        if len(result) != 1:
            print("DEBUG: updatePoll - more than one poll found")
            self.transactionClientLock.release()
            return
        value = result[0][option]
        update_table(self.transactionClient, 'Polling',
                     f'{option} = {value + 1}', f'ID_Article = {id}')
        self.transactionClientLock.release()
        return

    def updateViews(self, url: str) -> None:
        self.transactionClientLock.acquire()
        self.cacheLock.acquire()
        if self.isArticleInCache(url):
            self.cache[url].views += 1
        self.cacheLock.release()

        result = self.transactionClient.query(
            "Article", filter=f'URL = "{url}"')
        if len(result) != 1:
            print("DEBUG: updateViews - more than one article found")
            self.transactionClientLock.release()
            return
        update_table(self.transactionClient, 'Article',
                     f'Views = {result[0]["Views"] + 1}', f'ID = {result[0]["ID"]}')
        self.transactionClientLock.release()
        return

    def getMostViewedArticles(self, num: int) -> list:
        results = get_most_viewed_articles(self.transactionClient, num)
        return results

    def setSaved(self, url: str):
        article = self.getArticle(url)
        if self.isArticleInCache(url):
            article = self.cache[url]
            for articleElement in self.saved:
                if articleElement.url == url:
                    return "ALREADY_SAVED"
            self.saved.append(article)
            return "SUCCESS"
        return "NOT IN CACHE"

    def getSaved(self):
        out = {'Result': []}
        for article in self.saved:
            out["Result"].append(
                {"url": article.url,
                 "header": self.getItem(article.url, HEADER)
                 }
            )
        return out

    def getRecents(self):
        self.cacheLock.acquire()
        tmp_list = sorted(self.cache.values(), key=lambda x: x.requestRate.lastRequestTime, reverse=True)
        tmp = {"Result": [{"url": val.url, "Header": val.header} for val in tmp_list[:3]]}
        self.cacheLock.release()
        return tmp

# # COMMON FUNCTIONALITY:
#
# # initialise article manager
# am = ArticleManager(3)
#
# # retrieve unbiased summary from a given url (url1)
# am.getItem(url1, SUMMARY)
#
# # clean threads at the end of functionality
# am.clean()

# : int, ys: List[float]) -> str:

# # Example
# am = ArticleManager(2)
# url1 = "https://theconversation.com/justin-trudeaus-india-accusation-complicates-western-efforts-to-rein-in-china-213922"
# url2 = "https://www.abc.net.au/news/2023-09-20/new-zealand-hit-by-earthquake/102877954"
# url3 = "https://www.9news.com.au/national/victoria-news-officers-injured-in-police-chase-armed-man-on-the-run-in-katandra-west-in-northern-victoria/6ee1eb85-b5a6-45ef-a991-a3292490ba98"
# print(am.getItem(url1, SUMMARY))
# print(am.getItem(url1, BIAS_RANGE))
# print(am.getItem(url2, BIAS_WORDS))
# print(am.getItem(url3, SUMMARY))
# am.clean()


class PoliticianManager():

    def __init__(self):
        # this is a list of dicts, where each dict is a record in the db.
        self.cache = []
        # this is a list of dicts of the Politician_CampaignPolicies table, where each dict is a record in the db.
        self.campaignCache = []
        self.recents = queue.Queue(3)

    '''
    Queries the database to retrieve politicians by name 
    Parameters:
    -----------
    tdc : transactionDataClient
    nameList : a list of politician first and last names, e.g. ['Donald Trump', 'Theoedore Roosevelt']
    '''

    def getPoliticianByName(self, tdc=transactionDataClient, name=str) -> list(dict()):
        # Add function here to assist finding all related articles
        filter = ""
        if len(name) == 0:
            return []
        nameSplit = name.split(' ')
        record = self.checkInCache(names=nameSplit)
        if record is None:
            for name in nameSplit:
                filter += f"(Fname LIKE '%{name}%' OR Lname LIKE '%{name}%') OR \n"
            filter += '0=1'
            # This would return a list of dicts
            politiciansInfo = tdc.query(POLITICIAN, filter)
            # we're going to return the first name from the list
            record = politiciansInfo[0]
            related_articles = find_related_articles(tdc, record['ID'])
            record['Articles'] = related_articles if related_articles is not None else []
            # Add it to the cache
            self.cache.append(record)
            # add to recents queue
            if self.recents.full():
                self.recents.get()
            self.recents.put(record)
        return record

    '''
    Queries the database to retrieve politicians by name 
    Parameters:
    -----------
    tdc : transactionDataClient
    name : a list of politician first and last names, e.g. ['Donald Trump', 'Theoedore Roosevelt']
    '''

    def getPoliticiansNameSearch(self, tdc=transactionDataClient, name=str) -> list(dict()):
        # Add function here to assist finding all related articles
        filter = ""
        if len(name) == 0:
            return []
        nameSplit = name.split(' ')
        record = None
        if record is None:
            for name in nameSplit:
                filter += f"(Fname LIKE '%{name}%' OR Lname LIKE '%{name}%') OR \n"
            filter += '0=1'
            # This would return a list of dicts
            politiciansInfo = tdc.query(POLITICIAN, filter)

        return {"Result": politiciansInfo}

    '''
    Queries the database to retrieve politicians that have active campaigns
    Parameters:
    -----------
    tdc : transactionDataClient
    '''

    def getPoliticiansCampaigning(self, tdc=transactionDataClient):
        result = tdc.query(POLITICIAN, 'HasCampaign = 1')
        result = tdc.query(POLITICIAN,
                           'HasCampaign = 1')
        return {'Result': result}

    def getPoliticianCampaignDetails(self, tdc=transactionDataClient, id=int):
        # Add function here to assist finding all related articles
        campaignRecords = self.checkCampaignsInCache(ID=id)
        if len(campaignRecords) == 0:
            campaignRecords = tdc.query(POLITICIAN_CAMPAIGN_BY_ID,
                                        f'ID_Politician = {id}')
            # Add it to the cache
            self.campaignCache += campaignRecords
        return {"Result": campaignRecords}
    
    def checkCampaignsInCache(self, ID):
        out = []
        for campaignPolicy in self.campaignCache:
            if campaignPolicy['ID_Politician'] == ID:
                print(campaignPolicy)
                out.append(campaignPolicy)
        return out
    
    #Check whether a record is in the cache, by its name
    def checkInCache(self, names=None, ID=None):
        if names is not None:
            for name in names:
                for record in self.cache:
                    if name in record['Fname'] or name in record['Lname']:
                        return record
        elif ID is not None:
            for record in self.cache:
                if ID == record['ID']:
                    return record
        return None

    # Check whether campaign details are in the cache, by its name
    def checkInCampaignCache(self, names=None):
        out = []
        if names is not None:
            for name in names:
                for record in self.campaignCache:
                    if name in record['Fname'] or name in record['Lname']:
                        out.append(record)
        return None if len(out) == 0 else out

    '''
    Queries the database to retrieve politicians by ID 
    Parameters:
    -----------
    tdc : transactionDataClient
    ID: the ID of the politician
    '''

    def getPoliticianByID(self, tdc: transactionDataClient, ID: int) -> list:
        politicianInfo = tdc.query(POLITICIAN, f'ID = {ID}')
        politicianInfo['articles'] = find_related_articles(tdc, ID)
        record = self.checkInCache(ID=politicianInfo['ID'])
        if record is None:
            # Add it to the cache
            self.cache.append(record)
            # add to recents queue
            if self.recents.full():
                self.recents.get()
            self.recents.put(record)
        return record

    def getRecents(self):
        # recents = {}
        out = {"Result": []}
        tempQueue = queue.Queue(3)
        while self.recents.empty() is False:
            politician = self.recents.get()
            out["Result"].append(politician)
            tempQueue.put(politician)
        self.recents = tempQueue
        return out


class SessionManager():
    def __init__(self, limit: int) -> None:
        self.politicianManager = PoliticianManager()

        self.tdcLock = Lock()
        self.tdc = transactionDataClient()
        self.articleManager = ArticleManager(limit, self.tdc, self.tdcLock)

    def getArticleItem(self, url: str, itemName: str):
        result = self.articleManager.getItem(url, itemName)
        if result == None:
            return "Paywall Encountered, will not display article"
        return result

    def updatePoll(self, url: str, optionIndex: int) -> None:
        return self.articleManager.updatePoll(url, optionIndex)

    def updateViewCount(self, url: str) -> None:
        return self.articleManager.updateViews(url)

    def getMostViewedArticles(self, num: int) -> list:
        return self.articleManager.getMostViewedArticles(num)

    # Call this method, either by the ID, or by a list of names. Prefernce is by name
    # Although ID is recommended. Returns a dictionary of the record,
    def getPoliticianItem(self, ID=str, nameList=str):
        if ID == '' or ID is None:
            return self.politicianManager.getPoliticianByName(self.tdc, nameList)
        else:
            return self.politicianManager.getPoliticianByID(self.tdc, ID)

    def getPoliticiansBySearch(self, nameList: str):
        return self.politicianManager.getPoliticiansNameSearch(self.tdc, nameList)

    def getRecentPoliticians(self):
        return self.politicianManager.getRecents()

    def getRecentArticles(self):
        return self.articleManager.getRecents()

    def getSavedArticles(self):
        return self.articleManager.getSaved()

    def setSavedArticles(self, url: str):
        return self.articleManager.setSaved(url)

    def getCampaignDetails(self, id: int):
        return self.politicianManager.getPoliticianCampaignDetails(self.tdc, id)

    def getArticleComments(self, url: int):
        return {'Result': retrieve_article_comments(self.tdc, url)}

    def saveArticleComment(self, author, message, url):
        create_comment(self.tdc, author, message, url)

    def getPoliticiansCampaigning(self):
        return self.politicianManager.getPoliticiansCampaigning(self.tdc)

    def close(self):
        self.tdc.closeConnection()

# sm = SessionManager(2)
# url1 = "https://theconversation.com/justin-trudeaus-india-accusation-complicates-western-efforts-to-rein-in-china-213922"
# url2 = "https://www.abc.net.au/news/2023-09-20/new-zealand-hit-by-earthquake/102877954"
# url3 = "https://www.9news.com.au/national/victoria-news-officers-injured-in-police-chase-armed-man-on-the-run-in-katandra-west-in-northern-victoria/6ee1eb85-b5a6-45ef-a991-a3292490ba98"
# print(sm.getArticleItem(url1, SUMMARY))
# # print(sm.getArticleItem(url1, BIAS_RANGE))
# # print(sm.getArticleItem(url2, BIAS_WORDS))
# # print(sm.getArticleItem(url3, SUMMARY))
# sm.am.clean()
# sm.tdc.closeConnection()
