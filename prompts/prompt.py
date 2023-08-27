import os
import openai
import json

"""

author: DanielCiccC
"""
openai.api_key = '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'

BIAS_PROMPT =[
          {"role": "system", "content": "You are a methodical assistant."}, # You follow a consistent process, noting in great depth using simple terms, and you give examples to help people learn."},
          {"role": "system", "content": "You will be provided with a web-scraped media article that is believed to have bias and emotionally charged content." + 
           "List and number each case of emotionally charged content. Each case should have reference to the original word or phrase in the heading (enclosed in quotations), with a formal description " + 
           "of why the subtext is biased. In addition to this, there should be a small paragraph at the beginning of the response (no more than 50 words) summarising the overall bias of the text." +
           "Use only the following text for your analysis"},
          {"role": "assistant", "content": "The overall bias of the text seems to be positive towards the Essendon Bombers, emphasizing that they still have a chance to make it to the finals." +
           "1. \"still have finals chances in their own hands\":" +
           " this use of this term portrays a sense of control and agency, implying that the " + 
           " Bombers have complete control over their destiny. "},
          {"role": "user", "content": ''},
      ]

SUMMARY_PROMPT = [
          {"role": "system", "content": "You are a methodical assistant."},
          {"role": "system", "content": "You will be provided with a web-scraped media article" + 
           "Read through the text carefully and in its entirety, and identify all emotionally charged words and bias content." +
           "List in bullet point form all major points of the article, while maintaining a neutral tone." +
           "Note: sometimes, the footer is accidentally included in the web scraped article. When reading the article in its entirety," +
           " note the last few sentences and see if they are related to the above article. If it is not related to the article, do not summarise it."},
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
    model="gpt-3.5-turbo",
    messages=prompt,
    temperature=0.9
  )
  return (response['choices'][0]['message']['content'])