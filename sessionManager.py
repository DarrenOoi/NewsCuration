from threading import *
from webScraper import *
from biasCalculator import *
from nameExtractor import *
from datetime import datetime

import time

# def wait(t):
# 	time.sleep(t)
# 	return t

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
		self.rate = (requestCount + 1) / ((rate/requestCount)**(-1) + (self.lastRequestTime - lastRequestTime).total_seconds())
		self.requestCount += 1

	# Used to sort based on requestRate objects == != > < >= <=
	def __eq__(self, other: object) -> bool: # Not Implmented error if objects are not the same 
		if not isinstance(other, RequestRate):
			return NotImplemented
		
		return self.rate == other.rate and self.requestCount == other.requestCount and self.lastRequestTime == other.lastRequestTime
	
	def __ne__(self, other: object) -> bool: # Not Implmented error if objects are not the same
		tmp = (self == other)
		if tmp == NotImplemented:
			return NotImplemented
		return not (tmp)

	def __lt__(self,other: object) -> bool: # Not Implmented error if objects are not the same
		if not isinstance(other, RequestRate):
			return NotImplemented
		return self.rate < other.rate or (self.rate == other.rate and self.lastRequestTime < other.lastRequestTime)

	def __gt__(self,other: object) -> bool: # Not Implmented error if objects are not the same
		if not isinstance(other, RequestRate):
			return NotImplemented
		return self.rate > other.rate or (self.rate == other.rate and self.lastRequestTime > other.lastRequestTime)

	def __le__(self, other: object) -> bool: # Not Implmented error if objects are not the same
		tmp = (self > other)
		if tmp == NotImplemented:
			return NotImplemented
		return not (tmp)

	def __ge__(self, other: object) -> bool: # Not Implmented error if objects are not the same
		tmp = (self < other)
		if tmp == NotImplemented:
			return NotImplemented
		return not (tmp)
	
	# print() returns readable information
	def __repr__(self) -> str:
		return str(self.rate) + " " + self.lastRequestTime.strftime("%H:%M:%S")

# Parent of ArticleJob, has basic functionality to return abstract (object) values requesed by User
class Article():
	def __init__(self, url: str, header: str, text: str, summary: str, biasRange: str, biasWords: str, politicalFigures: str) -> None:
		self.url = url
		self.header = header
		self.text = text
		self.summary = summary
		self.biasRange = biasRange
		self.biasWords = biasWords
		self.politicalFigures = politicalFigures

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
class ArticleJob(Article):
	def __init__(self, url: str, webScraper: NewsScraper) -> None:
		super().__init__(url, webScraper.getHeader(), webScraper.getArticle(), None, None, None, None)
		self.summaryLock = Condition()
		self.biasRangeLock = Condition()
		self.biasWordsLock = Condition()
		self.politicalFiguresLock = Condition()

		self.jobsDoneLock = Lock()
		self.jobsDone = 0

		# starts the threading for the 4 jobs
		summaryT = Thread(target=self.threadableJob, args=(pipeScrapedArticleToGPTFromScraper, webScraper, "summary", "summaryLock"))
		summaryT.start()
		biasRT = Thread(target=self.threadableJob, args=(getBiasRangeFromText, webScraper.getArticle(), "biasRange", "biasRangeLock"))
		biasRT.start()
		biasWT = Thread(target=self.threadableJob, args=(biasSubtext, webScraper.getArticle(), "biasWords", "biasWordsLock"))
		biasWT.start()
		politicalFT = Thread(target=self.threadableJob, args=(nameExtractorFromDB, webScraper.getArticle(), "politicalFigures", "politicalFiguresLock"))
		politicalFT.start()

		self.threads = [summaryT, biasRT, biasWT, politicalFT]

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
		tmp = (self.jobsDone == 4)
		self.jobsDoneLock.release()
		return tmp
	
	# removes all dead jobs used to process the article
	def cleanJob(self) -> None:
		for job in self.threads:
			job.join()

# Class used by Session Manager to manage articles searched by User;
# generate and store article information, etc. 
class ArticleManager():
	def __init__(self, limit) -> None:
		self.cacheLimit = limit
		self.cacheLock = Lock()
		self.cache = {} # {url: Article()}
		
		self.jobsLock = Lock()
		self.jobs = {} # {url: ArticleJob()}
		
		self.threadsLock = Lock()
		self.threads = []
	
	# checks if article already exists in cache
	def isArticleInCache(self, url: str) -> bool:
		if self.cache.get(url, None) != None:
			return True
		return False

	# checks if article already exists in database
	def isArticleInDB(self, url: str) -> bool:
		# # tmp = # search DB for article data
		# tmp = 0
		# if len(tmp) == 0:
		# 	return False
		# # add article to cache
		# # update DB to see if new political figures are mentioned
		# return True
		return False
		
	# checks if a job for the requested article is already processing
	def isArticleBeingProcessed(self, url: str) -> bool:
		self.jobsLock.acquire()
		tmp = self.jobs.get(url, None)
		self.jobsLock.release()
		if tmp == None:
			return False
		return True
	
	# checks that cache is not overflowing and if so 
	# removes article that had the smallest rate of requests made to it;
	# if equal than tests how long ago requested last
	def preventCacheOverflow(self) -> None:
		if len(self.cache.values()) < self.cacheLimit:
			return
		tmp_list = sorted(self.cache.values(), key=lambda x: x.requestRate)
		upper = len(tmp_list)-self.cacheLimit
		for value in tmp_list[0:upper+1]:
			del self.cache[value.get("url")]

	# waits until all processes of article job are done 
	# and then moves it to cache
	def moveJobToCache(self, url: str) -> None:
		tmp = False
		while tmp == False:
			tmp = self.jobs[url].isDone()
		print("job done")
		self.jobsLock.acquire()
		self.cacheLock.acquire()
		tmp = self.jobs[url]
		self.preventCacheOverflow()
		self.cache[url] = Article(url, tmp.get("header"), tmp.get("text"), tmp.get("summary"), tmp.get("biasRange"), tmp.get("biasWords"), tmp.get("politicalFigures"))
		tmp.cleanJob()
		del self.jobs[url]
		self.cacheLock.release()
		self.jobsLock.release()

	# Adds a job to the job dictionary (threadsafe) so only one job per url is ever created
	# starts the thread to move the article into the cache once processing if finished
	def jobMonitor(self, url: str) -> True: # Or None if invalid url
		newsScraper = NewsScraper(url)
		if newsScraper.getHeader() == None:
			return None
		
		self.jobsLock.acquire()
		self.jobs[url] = ArticleJob(url, newsScraper)
		self.jobsLock.release()
		
		thread = Thread(target=self.moveJobToCache, args=(url,))
		self.threadsLock.acquire()
		self.threads.append(thread)
		thread.start()
		self.threadsLock.release()
		return True

	# checks where the article requested is stored in and if required, 
	# starts the process of generating the data
	def getArticle(self, url: str) -> dict: # Or None if invalid url
		if self.isArticleInCache(url) or self.isArticleInDB(url):
			self.cache[url].requestRate.updateRate()
			return self.cache[url]
		if self.isArticleBeingProcessed(url):
			return self.jobs[url]
		
		tmp = self.jobMonitor(url)
		if tmp != None:
			return self.jobs[url]
		return None
	
	# returns item requested by User 
	def getItem(self, url: str, itemName: str) -> str: # Or None if invalid url
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

HEADER = "header"
TEXT = "text"
SUMMARY = "summary"
BIAS_RANGE = "biasRange"
BIAS_WORDS = "biasWords"
POLITICAL_fIGURES = "politicalFigures"

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