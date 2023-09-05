from flask import Flask, request
from flask_cors import CORS
from webScraper import *
import pickle
import math
import os

def biasScoreGeneratorFromScraper(scraper):

    loaded_vectorizer = pickle.load(open(os.getcwd() + '\\biasCalculator\\vectorizer.sav', 'rb'))
    loaded_svcBias = pickle.load(open(os.getcwd() + '\\biasCalculator\\svcBias.sav', 'rb'))

    sentences = scraper.getArticle().split('.')
    X_BOW = loaded_vectorizer.transform(sentences)
    y_bias = loaded_svcBias.predict(X_BOW)
    # y_opinion = loaded_svcOpinion.predict(X_BOW)

    y = 0
    for i in y_bias:
        if i == 'Biased':
            y += 1
    if len(y_bias) == 0:
        return 0
    return y, len(y_bias), 0.72

def biasScoreGeneratorFromText(text):

    loaded_vectorizer = pickle.load(open(os.getcwd() + '\\biasCalculator\\vectorizer.sav', 'rb'))
    loaded_svcBias = pickle.load(open(os.getcwd() + '\\biasCalculator\\svcBias.sav', 'rb'))

    sentences = text.split('.')
    X_BOW = loaded_vectorizer.transform(sentences)
    y_bias = loaded_svcBias.predict(X_BOW)
    # y_opinion = loaded_svcOpinion.predict(X_BOW)

    y = 0
    for i in y_bias:
        if i == 'Biased':
            y += 1
    if len(y_bias) == 0:
        return 0
    return y, len(y_bias), 0.72

def biasRange(p, n, b, percentage):
    sum = 0
    w = n
    while sum < percentage:
        sum += math.comb(n,w)*((p)**w)*((1-p)**(n-w))
        w -= 1
    if w < n:
        w += 1 #extra -1 removed
    
    print(w)
    y = n - w
    y_dash = math.ceil(y*(b/n))
    b_dash = b -2*y_dash + y

    return b, b_dash


app = Flask(__name__)
CORS(app)  # This allows all origins; you can configure it for your specific needs

@app.route('/BiasFromText', methods=['POST'])
def BiasFromText():
    data = request.get_json()
    input = data.get('articleText')
    b, n, p = biasScoreGeneratorFromText(input)
    return {"response": b/n}

@app.route('/BiasRangeFromText', methods=['POST'])
def BiasRangeFromText():
    data = request.get_json()
    input = data.get('articleText')
    b, n, p = biasScoreGeneratorFromText(input)
    percentage = 0.9
    b, b_dash = biasRange(p, n, b, percentage):
    return {"b": b/n, "b'": b_dash/n}

@app.route('/BiasFromUrl', methods=['POST'])
def BiasFromUrl():
    data = request.get_json()
    input = data.get('input')
    b, n, p = biasScoreGeneratorFromScraper(NewsScraper(input))
    return {"response": b/n}

@app.route('/BiasRangeFromUrl', methods=['POST'])
def BiasRangeFromUrl():
    data = request.get_json()
    input = data.get('input')
    b, n, p = biasScoreGeneratorFromScraper(NewsScraper(input))
    percentage = 0.9
    b, b_dash = biasRange(p, n, b, percentage):
    return {"b": b/n, "b'": b_dash/n}

if __name__ == '__main__':
    app.run()