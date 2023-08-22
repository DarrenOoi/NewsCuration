from bs4 import BeautifulSoup
import requests
import re

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

def articleScraper(url):
    pageToScrape = requests.get(url)

    validator = PageValidator(pageToScrape)
    if not validator.isArticleAccessible():
        print('Paywall detected, if paywall does not exist please use other method of input')
        return None

    soup = BeautifulSoup(pageToScrape.content, "html.parser")

    paragraphsSoup = soup.findAll("p")
    paragraphs = [i.text for i in paragraphsSoup]
    
    dirtyArticle = "\n".join(paragraphs)
    whiteSpaceFilledArticle = re.sub("[\n\t]", " ", dirtyArticle)
    cleanArticle = re.sub(" +", " ", whiteSpaceFilledArticle)
    return cleanArticle
    
if __name__ == '__main__':
    print(articleScraper(input("Enter URL: \n")))