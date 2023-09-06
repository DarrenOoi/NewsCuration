import os
import openai
import json

"""

author: DanielCiccC
"""
openai.api_key = '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'

BIAS_PROMPT =[
          {"role": "system", "content": "You are an AI language model. Your task is to generate a JSON-formatted output. Please follow the JSON structure guidelines:"},
          {"role": "system", "content": "1. Begin the output with a '{' (left curly brace) and end it with a '}' (right curly brace)." 
            + "2. Use double quotation marks for keys and string values within the JSON."
            + "3. Separate key-value pairs with a colon ':' and separate key-value pairs or elements within arrays with a comma ','." 
            + "4. Ensure that all keys and string values are properly enclosed in double quotation marks." 
            + "5. Use the valid JSON data string integer, and array type" 
            + "6. Avoid any extraneous text or characters outside the JSON structure." 
            + "Now, proceed to generate a JSON output similar to the following:"},
          {"role": "system", "content": "You will be provided with a web-scraped media article." +
           "Read through the text carefully and in its entirety, and identify all emotionally charged words and bias content." +
           "Create a key-value pair of words as specified in the JSON format. I want the key to be the emotionally charged word or phase. The  " + 
           "value must be an explanation why the given phrase is believed to be emotionally charged or biased." +
           "You must return the JSON response only."
           },
          {"role": "assistant", "content": 
"""
{
  "killed" : "The word 'killed' indicates a tragic loss of life, evoking strong emotions."
  ,
  "most blatant tax violations" : "The text may be potentially biased because it uses subjective language like "blatant" to pass judgment on tax violations, implying a clear and intentional wrongdoing without considering the complexities and nuances of tax-related matters"
}
"""},
          {"role": "user", "content": ''},
      ]


SUMMARY_PROMPT = [
          {"role": "system", "content": "You are a methodical assistant."},
          {"role": "system", "content": "You will be provided with a web-scraped media article." + 
           "Read through the text carefully and in its entirety, and identify all emotionally charged words and bias content." +
           "List in bullet point form all major points of the article, making sure to remove all the emotionally charged words and bias content you identified earlier." +
           "Make sure the bullet points are maintaining an unbaised, neutral tone. \n" + 
           "Sometimes, the footer is accidentally included in the web scraped article. When reading the article in its entirety," +
           " note the last few sentences and see if they are related to the above article. If it is not related to the article, do not include it in the summary."},
          # {"role": "assistant", "content": "House burned down in Victoria following forest fires in neighbouring suburb"},
          {"role": "user", "content": ''},
      ]

def generate_bias_prompt(content):
    prompt = BIAS_PROMPT
    prompt[-1]['content'] = content
    return prompt

def generate_summary_prompt(content):
    prompt = SUMMARY_PROMPT
    prompt[-1]['content'] = content
    return prompt

def generate_response(prompt):
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo-16k",
    messages=prompt,
    temperature=0.9
  )
  return (response['choices'][0]['message']['content'])