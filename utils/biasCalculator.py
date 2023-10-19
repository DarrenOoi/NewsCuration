from flask import Flask, request
from flask_cors import CORS
from utils.prompts import webScraper 
import pickle
import math
import os

def biasScoreGeneratorFromScraper(scraper):
    '''
    Load the pre-trained SVM and predict the level of bias
    '''
    loaded_vectorizer = pickle.load(open(os.getcwd() + '\\exploration\\vectorizer.sav', 'rb'))
    loaded_svcBias = pickle.load(open(os.getcwd() + '\\exploration\\svcBias.sav', 'rb'))

    sentences = scraper.getArticle().split('.')
    X_BOW = loaded_vectorizer.transform(sentences)
    y_bias = loaded_svcBias.predict(X_BOW)

    y = 0
    for i in y_bias:
        if i == 'Biased':
            y += 1
    if len(y_bias) == 0:
        return 0
    return y, len(y_bias), 0.72

def biasScoreGeneratorFromText(text):
    '''
    Similar function as above, but predict based on text input
    '''

    sentences = text.split('.')
    X_BOW = loaded_vectorizer.transform(sentences)
    y_bias = loaded_svcBias.predict(X_BOW)

    y = 0
    for i in y_bias:
        if i == 'Biased':
            y += 1
    if len(y_bias) == 0:
        return 0
    return y, len(y_bias), 0.72

def biasRange(p, n, b, percentage):
    '''
    Calculate the bias confidence interval
    '''
    sum = 0
    w = n
    while sum < percentage:
        sum += math.comb(n,w)*((p)**w)*((1-p)**(n-w))
        w -= 1
    if w < n:
        w += 1 #extra -1 removed
    
    y = n - w
    y_dash = math.ceil(y*(b/n))
    b_dash = b -2*y_dash + y

    return b, b_dash

def getBiasRangeFromText(text):
    b, n, p = biasScoreGeneratorFromText(text)
    b, b_dash = biasRange(p, n, b, 0.9)
    return  b/n, b_dash/n

# have to be global otherwise wait until all other threads run
loaded_vectorizer = pickle.load(open(os.getcwd() + '\\exploration\\vectorizer.sav', 'rb'))
loaded_svcBias = pickle.load(open(os.getcwd() + '\\exploration\\svcBias.sav', 'rb'))