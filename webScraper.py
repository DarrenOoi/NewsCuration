from bs4 import BeautifulSoup
import requests
import re
import prompts.prompt as prompt
import json

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

        self.header = self.headerScrape()
        self.article = self.articleScrape()

    def getHeader(self):
        return self.header
    
    def getArticle(self):
        return self.article

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
    
    """
    This method generates a structured prompt with a header and main body of text,
    utilising NewsScraper methods defined in this class.
    
    Returns None if issues are encountered with the prompt, else the complete prompt is returned.
    """
    def generateStructuredPrompt(self):
        if self.soup is None:
            return None
        
        return "HEADING: " + self.getHeader() +"\n"+ "TEXT: " + self.getArticle() 

"""
Pipe the web-scraped article as input into chatGPT
"""
def pipeScrapedArticleToGPT(url): 
    article = NewsScraper(url).generateStructuredPrompt()
    if article is None:
        return "An error searching for the URL has occured"
    SummaryPrompt = prompt.generate_summary_prompt(article)
    # biasPrompt = prompt.generate_bias_prompt(article)
    return prompt.generate_response(SummaryPrompt)

'''
generate a JSON output of all the biased subtext in the media article.
Since the chatGPT output doesn't give a perfect account of the locations (indexes) of the biased text, 
we will have to do that and validate it ourselves.
'''
def biasSubtext(url):
    article = NewsScraper.generateStructuredPrompt(url)
    if article is None:
        return "An error searching for the URL has occured"
    SummaryPrompt = prompt.generate_bias_prompt(article)
    response = prompt.generate_response(SummaryPrompt)
    try:
        pass
    except json.decoder.JSONDecodeError:
        return 'An error occurred'


'''
Due to persistent issues with openai reponses finding the biased phrase index

Parameters
----------
    AIIn: json 
        The json file should maintain the following structure
        {
            'lorem ipsum':'dolor sit amet',
            'something':'else'
        }
    article: str
        the original and full article as input to chatGPT
        
    Returns
    -------
        json -> with the following file structure
        {16: {'lorem ipsum': "dolor sit amet."},
         44: {'lorem ipsum': "dolor sit amet."},
         }
DEEPRECATED: no longer used but kept for reference
'''
def generateBiasJson(AIIn=json, article=str):
    in_dict = dict(json.loads(AIIn))
    idx_dict = {}
    for k,v in in_dict.items():
        idx = article.index(k)
        idx_dict[idx] = {str(k): v}
    return json.dumps(idx_dict)
    
    structuredPrompt = prompt.generate_summary_prompt(
        "HEADING: " + scraper.getHeader() +"\n"+ "TEXT: " + scraper.getArticle()
        )
    return prompt.generate_response(structuredPrompt)

def verifyIndex(url, range):
    scraper = NewsScraper(url)
    article = "HEADING: " + scraper.getHeader() +"\n"+ "TEXT: " + scraper.getArticle()
    print(article)
    return article[range : range + 40]

# if __name__ == '__main__':
#     URL = 'https://www.abc.net.au/news/2023-08-27/bail-hearing-suspended-man-charged-sydney-crash-boys-died/102781440'
#     out = ''
#     for i in range(1):
#         out += pipeScrapedArticleToGPT(URL) + '\n\n\n'
#         print(out)
#     with open('testing/out.txt', 'w') as out_file:
#         # out_file.write(out)
#         out_file.write(generateBiasJson(out, NewsScraper(URL).generateStructuredPrompt()))
#     # print(out)

   