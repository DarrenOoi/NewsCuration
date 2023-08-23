import openai
from flask import Flask, request
from flask_cors import CORS
import requests

import webScraper as wS

openai.api_key = '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'
openai.Model.list()

app = Flask(__name__)
CORS(app)  # This allows all origins; you can configure it for your specific needs


@app.route('/GPT', methods=['POST'])
def get_input():
    data = request.get_json()
    input = data.get('input')
    response = wS.pipeScrapedArticleToGPT(input)
    return {"response": response}

def generate_response(prompt):
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
          {"role": "user", "content": prompt},
      ],
    temperature=0.7
  )
  return (response['choices'][0]['message']['content'])

# https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb I'm just going to leave this here for now
# but it is a good thing for the BA's to look at when they begin testing the GPT's functionality - the prompt can be more of a conversation
# to potentially prompt it to say the right thing

if __name__ == '__main__':
    app.run()