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
# This allows flask initialisation from all origins
CORS(app)  


@app.route('/GPT', methods=['POST'])
def get_input():
    '''
    WARNING: DEPRECATED FUNCTIONALITY
    Returns the unbiased summary of the article
    {
        'response' : str,
        'header' : str,
        'article' : str
    }
    '''
    data = request.get_json()
    input = data.get('input')
    response, header, article = wS.pipeScrapedArticleToGPT(input)
    return {"response": response, "header": header, "article": article}


@app.route('/BiasFromText', methods=['POST'])
def BiasFromText():
    '''
    WARNING: DEPRECATED FUNCTIONALITY
    {
        'response', <bias_score>
    }
    '''
    data = request.get_json()
    input = data.get('articleText')
    b, n, p = biasScoreGeneratorFromText(input)
    return {"response": round(b/n, 2)}


@app.route('/BiasRangeFromText', methods=['POST'])
def BiasRangeFromText():
    '''
    WARNING: DEPRECATED FUNCTIONALITY
    Retrieves the bias range based on the article text
    {
        <range_lower> : <range_upper>
    }
    '''
    data = request.get_json()
    input = data.get('articleText')
    b, n, p = biasScoreGeneratorFromText(input)
    percentage = 0.9
    b, b_dash = biasRange(p, n, b, percentage)
    return {"b": b/n, "b'": b_dash/n}


@app.route('/BiasFromUrl', methods=['POST'])
def BiasFromUrl():
    '''
    WARNING: DEPRECATED: SEE ArticleInfo
    '''
    data = request.get_json()
    input = data.get('input')
    b, n, p = biasScoreGeneratorFromScraper(input)
    return {"response": b/n}


@app.route('/BiasRangeFromUrl', methods=['POST'])
def BiasRangeFromUrl():
    '''
    WARNING: DEPRECATED FUNCTIONALITY
    Retrieve the bias article score, and respective range based on the article url
    {
        <range_lower> : <range_upper>
    }
    '''
    data = request.get_json()
    input = data.get('input')
    b, n, p = biasScoreGeneratorFromScraper(input)
    percentage = 0.9
    b, b_dash = biasRange(p, n, b, percentage)
    return {"b": b/n, "b'": b_dash/n}


@app.route('/BiasKeywords', methods=['POST'])
def biasKeyWordsFromText():
    '''
    WARNING: DEPRECATED FUNCTIONALITY
    Returns all the biased keywords, and the reason why they are biased
    
    Returns:
    {
        <biased phrase> : <reason>, ... ONE OR MANY 
    }
    '''
    data = request.get_json()
    input = data.get('articleText')
    response = biasSubtext(input)
    return response


def generate_response(prompt):
    '''
    WARNING: DEPRECATED FUNCTIONALITY
    Generates interacts with the chatGPT API to generate the response.
    '''
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
    '''
    WARNING: DEPRECATED FUNCTIONALITY
    '''
    data = request.get_json()
    # either a sentence summary of article  from GPT or article header
    input = data.get('input')
    sortedSimilarArticles = similarArticles(input)

    return [{"url": article[0], "upper_bias": round(article[1], 2), "lower_bias": round(article[2], 2)} for article in sortedSimilarArticles]

################################################
# NEW ROUTE FUNCTION To USE SESSION MANAGER
################################################


@app.route('/ArticleInfo', methods=['POST'])
def summary():
    """Returns information relating to the summarised article

    Returns:
        'article': TEXT,
        'header' : str,
        'response' : str
    """
    data = request.get_json()
    url = data.get('url')
    header = sm.getArticleItem(url, SM.HEADER)
    article = sm.getArticleItem(url, SM.TEXT)
    response = sm.getArticleItem(url, SM.SUMMARY)
    try:
        return {"response": response, "header": header, "article": article}
    finally:
        sm.updateViewCount(url)


@app.route('/ArticleBiasedScore', methods=['POST'])
def score():
    '''
    Returns:
    {
        'response' : int
    }
    '''
    data = request.get_json()
    url = data.get('url')
    b, b_dash = sm.getArticleItem(url, SM.BIAS_RANGE)
    return {"response": round(b, 2)}


@app.route('/ArticleBiasedKeyWords', methods=['POST'])
def keywords():
    '''
    {
        'keyword' : 'explanation, ... ZERO, ONE OR MANY
    }
    '''
    data = request.get_json()
    url = data.get('url')
    return sm.getArticleItem(url, SM.BIAS_WORDS)


@app.route('/getPoliticalFigureNames', methods=['POST'])
def politicalFigureNames():
    '''
    Returns:
    {
        'poi' : [
            'name'
        ]
    }
    
    '''
    data = request.get_json()
    url = data.get('url')
    result = sm.getArticleItem(url, SM.POLITICAL_FIGURES)
    return {'poi': result}


@app.route('/GetPolitician', methods=['POST'])
def politicianRequestByName():
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
        Byline : str,
        Political_Position : str, 
        Party : str, 
        COUNTRY : str
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
    data = request.get_json()
    name = data.get('name')
    return sm.getPoliticianItem(None, name)


@app.route('/GetPoliticianByID', methods=['POST'])
def politicianRequestByID():
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
    data = request.get_json()
    id = data.get('id')
    return sm.getPoliticianItem(id, None)


@app.route('/SaveArticle', methods=['POST'])
def saveArticle():
    '''
    Saves an article for the user to view later. IMPORTANT. This assumes the Articlejob is finished an in Cache, i.e.
    on the user, the article has been fully loaded. If this route is asked for an unknown article,
    it will kickstart the prompts to populate and return NOT IN CACHE in the meantime. SUCCESS if saved.
    Input params:
    -------------
      url: the url of the article
    Output params:
    ---------------
    "Result" : <"SUCCESS", "ALREADY_SAVED" "NOT IN CACHE">
    '''
    data = request.get_json()
    url = data.get('url')
    isSuccessful = sm.setSavedArticles(url)
    return {'Result': isSuccessful}


@app.route('/GetSavedArticles', methods=['POST'])
def getSavedArticle():
    '''
    Returns the header of each saved url, along with the URL of each saved Article
    As per specification of PRO-73
    Returns:
    ---------
    {
      "Result" : [
       {"url" : <url1>,
       "header" : <header1>)
       },
       {"url" : <url2>,
       "header" : <header2>)
       },
      ]
    }
    '''
    return sm.getSavedArticles()


@app.route('/GetRecentPoliticians', methods=['POST'])
def getRecentPoliticians():
    '''
    Returns entire record of the most recent three politicians. If there are less
    than three recent visited politicians, the return value is a blank dictionary
    Returns:
    ---------
    {
        "Result" : [{
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
        Byline : str,
        Political_Position : str,
        Party : str,
        COUNTRY : str
        HasCampaign: Bool   } ... <NONE, ONE OR MULTIPLE>
        ]
    }
    '''
    return sm.getRecentPoliticians()


@app.route('/GetPolicitianSearch', methods=['POST'])
def getPoliticianSearchByName():
    '''
    Retrieves all the politicians in the database from the input search
    'nameSearch'.
    Returns:
    ---------
    {
        "Result" : [{
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
        Byline : str,
        Political_Position : str,
        Party : str,
        COUNTRY : str
        HasCampaign: Bool   } ... <NONE, ONE OR MULTIPLE>
        ]
    }
    '''
    data = request.get_json()
    nameQuery = data.get('nameSearch')
    return sm.getPoliticiansBySearch(nameQuery)


@app.route('/GetCampaigningPoliticians', methods=['POST'])
def getPoliticiansCampaigning():
    '''
    Retrieves all the politicians in the database that have an active campaign.
    In order to have an active campaign, they need to have Policies in the
    Politician_CampaignPoliciesByID table.
    Returns:
    ---------
    {
    "Result" : [{
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
    Byline : str,
    Political_Position : str,
    Party : str,
    COUNTRY : str
    HasCampaign: Bool} ... <NONE, ONE OR MULTIPLE>
    ]
    }
    '''
    return sm.getPoliticiansCampaigning()


@app.route('/GetRecentArticles', methods=['POST'])
def getRecentArticles():
    '''
    Returns the header of each saved url, along with the URL of each saved Article
    Returns:
    ---------
    {
    "Result" : [{
    'url' : str,
    'Header' : str } ... <NONE, ONE OR MULTIPLE>
    ]
    }
    '''
    return sm.getRecentArticles()


@app.route('/SaveArticleComment', methods=['POST'])
def setArticleComment():
    '''
    Persist a comment to the database.
    Requires the following ---
    "Comment" : the comment they are making
    "Author" : the name of the person making the comment
    url : the url of the article the comment is being saved to.

    Returns:
    --------
    None
    '''
    data = request.get_json()
    comment = data.get('Comment')
    author = data.get('Author')
    url = data.get('url')
    sm.saveArticleComment(author, comment, url)
    return {"RESULT": "SUCCESS"}


@app.route('/getArticleComments', methods=['POST'])
def getArticleComments():
    '''
    Persist a comment to the database.
    Requires the following ---

    url : the url of the article the comment is being saved to.

    Returns:
    --------
    {
    "Result" : [
    {ID : int
    ID_Article : int
    Author : str
    Comment : str
    InProduction : bool
    InsertedAt : DATETIME
    InsertedBy : str} ]
    }
    '''
    data = request.get_json()
    url = data.get('url')
    return sm.getArticleComments(url)


@app.route('/GetPoll', methods=['POST'])
def getPoll():
    '''
    Daniel is writing a comment here bc Manav got too tired

    Returns:
    {
        'question': str
        'results': [
            {
            'opinion': str
            'votes' : int
            } (LEN 4)
        ]
    }
    '''
    data = request.get_json()
    url = data.get('url')
    pollStr = sm.getArticleItem(url, SM.POLL_PROMPT)
    pollDict = json.loads(pollStr)
    pollVals = sm.getArticleItem(url, SM.POLL_VALS)
    results = [{"opinion": pollDict["options"][i], "votes":pollVals[i]}
               for i in range(len(pollVals))]
    del pollDict["options"]
    pollDict["results"] = results
    prompt = json.dumps(pollDict)
    return prompt


@app.route('/UpdatePoll', methods=['POST'])
def updatePoll():
    '''
    Input: url string of article, int value corresponding to 1,2,3,4 indicating which poll option was clicked
    Output: {"response":"updated"}
    '''
    data = request.get_json()
    url = data.get('url')
    optionIndex = data.get('optionIndex')
    sm.updatePoll(url, optionIndex)
    return {"response": "updated"}


@app.route('/GetViews', methods=['POST'])
def getArticleViews():
    '''
    Input: url string
    OUput: int number of views article recieved
    '''
    data = request.get_json()
    url = data.get('url')
    return {"response": sm.getArticleItem(url, SM.VIEWS)}


@app.route('/GetMostViewedArticles', methods=['POST'])
def getMostViewedArticles():
    '''
    Input: int number of articles to return
    Output: list of dictionaries in the form [{"header": "hello world", "url": "http://helloworld.com"}]
    in order from most viewed to least (of the top x requested)
    '''
    data = request.get_json()
    number = data.get('number')
    return {"response": sm.getMostViewedArticles(number)}


@app.route('/getCampaignDetails', methods=['POST'])
def campaignDetailsByName():
    '''
    Returns the Campaign details of each politician by their id as input
    Returns
    -------
        Result: [{
        ID : int,
        ID_Politician : int,
        PolicyNameTitle : str,
        PolicyInfo : str,
        InProduction BOOLEAN,
        InsertedAt DATETIME,
        InsertedBy : str
        }... ZERO, ONE OR MANY]
    '''
    data = request.get_json()
    id = data.get('id')
    return sm.getCampaignDetails(id)


if __name__ == '__main__':
    sm = SM.SessionManager(20)
    app.run()
