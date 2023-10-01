import openai
from flask import Flask, request
from flask_cors import CORS
import requests

from utils.prompts import webScraper as wS
from utils.biasCalculator import *
from utils.similarArticleRetrieval import *
import utils.sessionManager as SM

openai.api_key = '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'
openai.Model.list()

app = Flask(__name__)
CORS(app)  # This allows all origins; you can configure it for your specific needs


@app.route('/GPT', methods=['POST'])
def get_input():
    data = request.get_json()
    input = data.get('input')
    response, header, article = wS.pipeScrapedArticleToGPT(input)
    return {"response": response, "header": header, "article": article}


@app.route('/BiasFromText', methods=['POST'])
def BiasFromText():
    data = request.get_json()
    input = data.get('articleText')
    b, n, p = biasScoreGeneratorFromText(input)
    return {"response": round(b/n, 2)}


@app.route('/BiasRangeFromText', methods=['POST'])
def BiasRangeFromText():
    data = request.get_json()
    input = data.get('articleText')
    b, n, p = biasScoreGeneratorFromText(input)
    percentage = 0.9
    b, b_dash = biasRange(p, n, b, percentage)
    return {"b": b/n, "b'": b_dash/n}


@app.route('/BiasFromUrl', methods=['POST'])
def BiasFromUrl():
    data = request.get_json()
    input = data.get('input')
    b, n, p = biasScoreGeneratorFromScraper(input)
    return {"response": b/n}


@app.route('/BiasRangeFromUrl', methods=['POST'])
def BiasRangeFromUrl():
    data = request.get_json()
    input = data.get('input')
    b, n, p = biasScoreGeneratorFromScraper(input)
    percentage = 0.9
    b, b_dash = biasRange(p, n, b, percentage)
    return {"b": b/n, "b'": b_dash/n}

@app.route('/BiasKeywords', methods=['POST'])
def biasKeyWordsFromText():
    data = request.get_json()
    input = data.get('articleText')
    response = biasSubtext(input)
    return response

def generate_response(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt},
        ],
        temperature=0.7
    )
    return (response['choices'][0]['message']['content'])


@app.route('/SimilarArticlesRetrieval', methods=['POST'])
def SimilarArticlesRetrieval():
    data = request.get_json()
    # either a sentence summary of article  from GPT or article header 
    input = data.get('input')
    sortedSimilarArticles = similarArticles(input)

    return [{"url" : article[0], "upper_bias" : round(article[1], 2) , "lower_bias" : round(article[2], 2)} for article in sortedSimilarArticles]

################################################
# NEW ROUTE FUNCTION To USE SESSION MANAGER
################################################

@app.route('/ArticleInfo', methods=['POST'])
def summary():
    data = request.get_json()
    url = data.get('url')
    header = sm.getArticleItem(url, SM.HEADER)
    article = sm.getArticleItem(url, SM.TEXT)
    response = sm.getArticleItem(url, SM.SUMMARY)
    try:
        return {"response": response, "header": header, "article": article}
    finally:
        print('need to update viewcount')
        # sm.updateViewCount(url)


@app.route('/ArticleBiasedScore', methods=['POST'])
def score():
    data = request.get_json()
    url = data.get('url')
    b, b_dash = sm.getArticleItem(url, SM.BIAS_RANGE)
    return {"response": round(b, 2)}


@app.route('/ArticleBiasedKeyWords', methods=['POST'])
def keywords():
    data = request.get_json()
    url = data.get('url')
    return sm.getArticleItem(url, SM.BIAS_WORDS)

  
@app.route('/getPoliticalFigureNames', methods=['POST'])
def politicalFigureNames():
    data = request.get_json()
    url = data.get('url')
    result = sm.getArticleItem(url, SM.POLITICAL_FIGURES)
    return {'poi': result}

'''
Returns:
    ID int,
    Fname : str 
    Lname : str 
    About : str 
    Age : int
    Gender : str 
    CountryCode : str
    InProduction : bool
    InsertedAt : DATETIME
    InsertedBy : str
    ImageLink : str
    Summary : str
    Articles : [
        {ID : int
        URL : str,
        UpperBias : float,
        LowerBias : float,
        Summary TEXT,
        InProduction : bool,
        InsertedAt : DATETIME,
        InsertedBy : str
        Header : str,
        OriginalText : str,
        SummaryParagraph : str},
    ]
'''
@app.route('/GetPolitician', methods=['POST'])
def politicianRequestByName():
    data = request.get_json()
    name = data.get('name')
    return sm.getPoliticianItem(None, name)

'''
Returns:
    ID int,
    Fname : str 
    Lname : str 
    About : str 
    Age : int
    Gender : str 
    CountryCode : str
    InProduction : Boolean
    InsertedAt : DATETIME
    InsertedBy : str
    ImageLink : str
    Summary : str
    Articles : [
        {ID : int
        URL : str,
        UpperBias : float,
        LowerBias : float,
        Summary TEXT,
        InProduction : bool,
        InsertedAt : DATETIME,
        InsertedBy : str
        Header : str,
        OriginalText : str,
        SummaryParagraph : str},
    ]
'''
@app.route('/GetPoliticianByID', methods=['POST'])
def politicianRequestByID():
    data = request.get_json()
    id = data.get('id')
    return sm.getPoliticianItem(id, None)

###
# Saves an article for the user to view later. IMPORTANT. This assumes the Articlejob is finished an in Cache, i.e.
# on the user, the article has been fully loaded. If this route is asked for an unknown article,
# it will kickstart the prompts to populate and return FAIL in the meantime. SUCCESS if saved 
# Input params:
# -------------
#   url: the url of the article
#
# Output params:
#---------------
# "Result" : <"SUCCESS" or "FAIL">
###
@app.route('/SaveArticle', methods=['POST'])
def saveArticle():
    data = request.get_json()
    url = data.get('url')
    isSuccessful = sm.setSavedArticles(url)
    return {'Result' : isSuccessful}

###
# Returns the header of each saved url, along with the URL of each saved Article
# As per specification of PRO-73
# Returns:
#---------
# {
#   "Result" : [
#    {"url" : <url1>,
#    "header" : <header1>)
#    }, 
#    {"url" : <url2>,
#    "header" : <header2>)
#    },
#   ]
# }
###
@app.route('/GetSavedArticles', methods=['POST'])
def getSavedArticle():
    return sm.getSavedArticles()

###
# Returns entire record of the most recent three politicians. If there are less
# than three recent visited politicians, the return value is a blank dictionary
# Returns:
#---------
# {
#   "0" : {
#    ID int,
#    Fname : str 
#    Lname : str 
#    About : str 
#    Age : int
#    Gender : str 
#    CountryCode : str
#    InProduction : bool
#    InsertedAt : DATETIME
#    InsertedBy : str
#    ImageLink : str
#    Summary : str } OR {}
#   "1" : {<AS ABOVE>}  OR {}
#   "2" : {<AS ABOVE>}  OR {}
#   "LEN" : {<NUMBER OF FILLED POLITICIANS}
#}
###
@app.route('/GetRecentPoliticians', methods=['POST'])
def getRecentPoliticians():
    return sm.getRecentPoliticians()

###
# Returns the header of each saved url, along with the URL of each saved Article
# Returns:
#---------
# {
#   "0" : {
#    url : str,
#    Header : str } OR {}
#   "1" : {<AS ABOVE>}  OR {}
#   "2" : {<AS ABOVE>}  OR {}
#   "LEN" : {<NUMBER OF FILLED POLITICIANS}
#}
###
@app.route('/GetRecentArticles', methods=['POST'])
def getRecentArticles():
    return sm.getRecentArticles()

  
if __name__ == '__main__':
    sm = SM.SessionManager(2)
    app.run()
