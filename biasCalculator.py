from webScraper import *
import pickle
import os

def biasScoreGenerator(scraper):

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
    return(y / len(y_bias))