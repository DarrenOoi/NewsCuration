import openai
from flask import Flask, request
from flask_cors import CORS
import requests

import webScraper as wS
from biasCalculator import *
from similarArticleRetrieval import *
import sessionManager as SM

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
    return {"response": response, "header": header, "article": article}



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


if __name__ == '__main__':
    sm = SM.SessionManager(2)
    app.run()
