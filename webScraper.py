from bs4 import BeautifulSoup
import requests
import re
import prompts.prompt as prompt

class PageValidator:
    def __init__(self, pageToScrape) -> None:
        self.pageToScrape = pageToScrape

    def isStatusSuccessful(self): # Need to handle redirect message
        status = self.pageToScrape.status_code
        if status >= 200 and status < 300:
            return True
        return False

    def isAccessibleForFree(self):
        match = re.search(r'"isAccessibleForFree"\:"?(\w+)"?', self.pageToScrape.text)

        if match and match.group(1).lower() == "false":
            return False
        return True
    
    # Cant read without subscription
        # paywall detected: New York Times, Wall Street Journal, Financial Times, Atlantic
        # paywall not detected, partially read: Nikkei (isAccessible not present, 200 sttus code), Caixin (isAccessible not present, 200 sttus code)
    # Can read without subscription
        # paywall detected: Washington Post (isAccessible:false present)
        # fully read: ABC, CNN, Guardian, Economist, Game Informer

    def isArticleAccessible(self):
        if self.isStatusSuccessful() and self.isAccessibleForFree():
            return True
        return False

class NewsScraper:

    def __init__(self, url):
        self.soup = None
        self.url = url

        pageToScrape = requests.get(url)
        validator = PageValidator(pageToScrape)
        if validator.isArticleAccessible():
            self.soup = BeautifulSoup(pageToScrape.content, "html.parser")

    def headerScrape(self):
        if self.soup is None:
            return None
        
        paragraphsSoup = self.soup.findAll("h1")
        paragraphs = [i.text for i in paragraphsSoup]
        
        dirtyArticle = "\n".join(paragraphs)
        whiteSpaceFilledArticle = re.sub("[\n\t]", " ", dirtyArticle)
        cleanArticle = re.sub(" +", " ", whiteSpaceFilledArticle)
        return cleanArticle

    def articleScrape(self):
        if self.soup is None:
            return None
        
        paragraphsSoup = self.soup.findAll("p")
        paragraphs = [i.text for i in paragraphsSoup]
        
        dirtyArticle = "\n".join(paragraphs)
        whiteSpaceFilledArticle = re.sub("[\n\t]", " ", dirtyArticle)
        cleanArticle = re.sub(" +", " ", whiteSpaceFilledArticle)
        return cleanArticle


def pipeScrapedArticleToGPT(url):
    scraper = NewsScraper(url)
    if scraper.soup is None:
        return "Paywall Encountered, please seek another method"
    print(scraper.articleScrape())
    
    structuredPrompt = prompt.generate_summary_prompt(
        "HEADING: " + scraper.headerScrape() +"\n"+ "TEXT: " + scraper.articleScrape()
        )
    return "GPT RESPONSE - " + prompt.generate_response(structuredPrompt)

if __name__ == '__main__':
    URL = 'https://www.abc.net.au/news/2023-08-27/bail-hearing-suspended-man-charged-sydney-crash-boys-died/102781440'
    output = pipeScrapedArticleToGPT(URL)
    print(output)