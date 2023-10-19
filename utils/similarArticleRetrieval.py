from GoogleNews import GoogleNews
from utils.prompts.webScraper import *
from utils.biasCalculator import *
import base64

'''
WARNING: DECREPED
THESE METHODs ARE NOW OUT OF SCOPE FOR THE PURPOSES OF THIS ASSIGNMENT
'''

def similarArticles(articleTitle):
    googleNews = GoogleNews(lang='en')
    googleNews.get_news(articleTitle)

    similarArticles = []
    for url in googleNews.get_links():
        actual_url = convertGoogleNewsUrlToAccessible(url)

        try:
            ns = NewsScraper(actual_url)
            if ns.getArticle() != None:
                b, n, p = biasScoreGeneratorFromText(ns.getArticle())
                b, b_dash = biasRange(p, n, b, 0.8)
                similarArticles.append((actual_url, max([b/n,b_dash/n]), min([b/n,b_dash/n])))
                # print(actual_url, b/n, b_dash/n)
            else:
                # print(f"article {actual_url} inaccessible")
                continue
        except:
            # print(f"article {url} could nto be extracted")
            continue

    return sorted(similarArticles, key=lambda element: (element[1], element[2]))

# need to be tested to improve extraction of url from news.google encoding
def convertGoogleNewsUrlToAccessible(url):
    url_in_process_A = str(base64.urlsafe_b64decode(url))
    url_in_process_B = url_in_process_A.split("?")[1]
    url_in_process_C = url_in_process_B.replace("https", "?https").split("?")[-1]
    url_in_process_D = url_in_process_C.split("\\x")[0]
    actual_url = url_in_process_D.split("/!")[0]
    return actual_url