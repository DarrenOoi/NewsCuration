from bs4 import BeautifulSoup
import requests
import re

def check_accessible(pageToScrape):
    # needs to check if isAccessibleForFree:"False" exists when inspected
    return True

def articleScraper(url):
    pageToScrape = requests.get(url)
    soup = BeautifulSoup(pageToScrape.text, "html.parser")

    if check_accessible(pageToScrape):
        paragraphsSoup = soup.findAll("p")
        paragraphs = [i.text for i in paragraphsSoup]
        
        dirtyArticle = "\n".join(paragraphs)
        whiteSpaceFilledArticle = re.sub("[\n\t]", " ", dirtyArticle)
        cleanArticle = re.sub(" +", " ", whiteSpaceFilledArticle)
        return cleanArticle
    else:
        print('Paywall detected, if paywall does not exist please use other method of input')
        return None
    
if __name__ == '__main__':
    print(articleScraper(input("Enter URL: \n")))