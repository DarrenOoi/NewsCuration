from threading import *
from webScraper import *
from biasCalculator import *
from nameExtractor import *
from datetime import datetime

import time

# def wait(t):
# 	time.sleep(t)
# 	return t


class RequestRate():
	def __init__(self):
		self.rate = 1.0
		self.lastRequestTime = datetime.now()
		self.requestCount = 1

	def updateRate(self):
		rate = self.rate
		lastRequestTime = self.lastRequestTime
		requestCount = self.requestCount

		self.lastRequestTime = datetime.now()
		self.rate = (requestCount + 1) / ((rate/requestCount)**(-1) + (self.lastRequestTime - lastRequestTime).total_seconds())
		self.requestCount += 1


	def __eq__(self, other): 
		if not isinstance(other, RequestRate):
			return NotImplemented
		
		return self.rate == other.rate and self.requestCount == other.requestCount and self.lastRequestTime == other.lastRequestTime
	
	def __ne__(self, other):
		tmp = (self == other)
		if tmp == NotImplemented:
			return NotImplemented
		return not (tmp)

	def __lt__(self,other):
		if not isinstance(other, RequestRate):
			return NotImplemented
		return self.rate < other.rate or (self.rate == other.rate and self.lastRequestTime < other.lastRequestTime)

	def __gt__(self,other):
		if not isinstance(other, RequestRate):
			return NotImplemented
		return self.rate > other.rate or (self.rate == other.rate and self.lastRequestTime > other.lastRequestTime)

	def __le__(self,other):
		tmp = (self > other)
		if tmp == NotImplemented:
			return NotImplemented
		return not (tmp)

	def __ge__(self,other):
		tmp = (self < other)
		if tmp == NotImplemented:
			return NotImplemented
		return not (tmp)
	
	def __repr__(self):
		return str(self.rate) + " " + self.lastRequestTime.strftime("%H:%M:%S")


class Article():
	def __init__(self, url, header, text, summary, biasRange, biasWords, politicalFigures):
		self.url = url
		self.header = header
		self.text = text
		self.summary = summary
		self.biasRange = biasRange
		self.biasWords = biasWords
		self.politicalFigures = politicalFigures

		self.requestRate = RequestRate()

	def get(self, string):
		return getattr(self, string)
	
	def __repr__(self):
		return f"{self.url[0:15]}... : ['{self.header[0:15]}...', '{self.text[0:15]}...', '{self.summary[0:15]}...', {self.biasRange[0]}, {self.requestRate.__repr__()}]"


class ArticleJob(Article):
	def __init__(self, url, webScraper, summary, biasRange, biasWords, politicalFigures):
		super().__init__(url, webScraper.getHeader(), webScraper.getArticle(), summary, biasRange, biasWords, politicalFigures)
		self.summaryLock = Condition()
		self.biasRangeLock = Condition()
		self.biasWordsLock = Condition()
		self.politicalFiguresLock = Condition()

		self.jobsDoneLock = Lock()
		self.jobsDone = 0

		summaryT = Thread(target=self.threadableJob, args=(pipeScrapedArticleToGPTFromScraper, webScraper, "summary", "summaryLock"))
		summaryT.start()
		biasRT = Thread(target=self.threadableJob, args=(getBiasRangeFromText, webScraper.getArticle(), "biasRange", "biasRangeLock"))
		biasRT.start()
		biasWT = Thread(target=self.threadableJob, args=(biasSubtext, webScraper.getArticle(), "biasWords", "biasWordsLock"))
		biasWT.start()
		politicalFT = Thread(target=self.threadableJob, args=(nameExtractorFromDB, webScraper.getArticle(), "politicalFigures", "politicalFiguresLock"))
		politicalFT.start()

		self.threads = [summaryT, biasRT, biasWT, politicalFT]

	def threadableJob(self, function, data, variable, lock):
		tmp = function(data)
		self.jobsDoneLock.acquire()
		with getattr(self, lock):
			setattr(self, variable, tmp)
			getattr(self, lock).notify_all()
		self.jobsDone += 1
		print(f"variable {variable} updated")
		self.jobsDoneLock.release()

	def get(self, string):
		if hasattr(self, string + "Lock"):
			with getattr(self, string + "Lock"):
				while getattr(self, string) == None:
					getattr(self, string + "Lock").wait()
		if hasattr(self, string):
				return super().get(string)		
		return None
	
	def isDone(self):
		self.jobsDoneLock.acquire()
		tmp = (self.jobsDone == 4)
		self.jobsDoneLock.release()
		return tmp
	
	def cleanJob(self):
		for job in self.threads:
			job.join()


class ArticleManager():
	def __init__(self, limit):
		self.cacheLimit = limit
		self.cacheLock = Lock()
		self.cache = {} # {url: Article()}
		
		self.jobsLock = Lock()
		self.jobs = {} # {url: ArticleJob()}
		
		self.threadsLock = Lock()
		self.threads = []
	
	def isArticleInCache(self, url):
		if self.cache.get(url, None) != None:
			return True
		return False

	def isArticleInDB(self, url):
		# # tmp = # search DB for article data
		# tmp = 0
		# if len(tmp) == 0:
		# 	return False
		# # add article to cache
		# # update DB to see if new political figures are mentioned
		# return True
		return False
		
	def isArticleBeingProcessed(self, url):
		self.jobsLock.acquire()
		tmp = self.jobs.get(url, None)
		self.jobsLock.release()
		if tmp == None:
			return False
		return True
	
	def preventCacheOverflow(self):
		if len(self.cache.values()) < self.cacheLimit:
			return
		tmp_list = sorted(self.cache.values(), key=lambda x: x.requestRate)
		upper = len(tmp_list)-self.cacheLimit
		for value in tmp_list[0:upper+1]:
			del self.cache[value.get("url")]

	def moveJobToCache(self, url):
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

	def jobMonitor(self, url):
		newsScraper = NewsScraper(url)
		if newsScraper.getHeader() == None:
			return None
		
		self.jobsLock.acquire()
		self.jobs[url] = ArticleJob(url, newsScraper, None, None, None, None)
		self.jobsLock.release()
		
		thread = Thread(target=self.moveJobToCache, args=(url,))
		self.threadsLock.acquire()
		self.threads.append(thread)
		thread.start()
		self.threadsLock.release()

	def getArticle(self, url):
		if self.isArticleInCache(url) or self.isArticleInDB(url):
			self.cache[url].requestRate.updateRate()
			return self.cache[url]
		if self.isArticleBeingProcessed(url):
			return self.jobs[url]
		
		self.jobMonitor(url)
		return self.jobs[url]
	
	def getItem(self, url, itemName):
		article = self.getArticle(url)
		return article.get(itemName)
	
	def clean(self):
		self.threadsLock.acquire()
		for job in self.threads:
			job.join()
		self.threadsLock.release()

	def __repr__(self):
		text = "{\n"
		for (k, v) in self.cache.items():
			text += f"\t{v.__repr__()}, \n"
		text += '}'
		return text


# header, text, summary, biasRange, biasWords, politicalFigures
# am = ArticleManager(3)
# am.getItem("https://theconversation.com/justin-trudeaus-india-accusation-complicates-western-efforts-to-rein-in-china-213922", "summary")
# am.getItem("https://edition.cnn.com/2023/08/25/opinions/trump-georgia-surrender-fani-willis-orentlicher-hanan/index.html", "biasRange")
# am.getItem("https://www.abc.net.au/news/2023-09-20/new-zealand-hit-by-earthquake/102877954", "politicalFigures")
# am.clean()
# print(am)