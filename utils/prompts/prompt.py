import os
import openai
import json

"""

author: DanielCiccC
"""
openai.api_key = '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'

# https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb I'm just going to leave this here for now
# but it is a good thing for the BA's to look at when they begin testing the GPT's functionality - the prompt can be more of a conversation
# to potentially prompt it to say the right thing

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

#DEPRECATED
BIAS_PROMPT_2 =[
          {"role": "system", "content": "You are an AI language model. Your task is to generate a JSON-formatted output. Please follow the JSON structure guidelines:"},
          {"role": "system", "content": "1. Begin the output with a '{' (left curly brace) and end it with a '}' (right curly brace)." 
            + "2. Use double quotation marks for keys and string values within the JSON."
            + "3. Separate key-value pairs with a colon ':' and separate key-value pairs or elements within arrays with a comma ','." 
            + "4. Ensure that all keys and string values are properly enclosed in double quotation marks." 
            + "5. Use the valid JSON data types, such as integers, strings and arrays" 
            + "6. Avoid any extraneous text or characters outside the JSON structure." 
            + "Now, proceed to generate a JSON output similar to the following:"},
          {"role": "system", "content": "You will be provided with a web-scraped media article." +
           "Read through the text carefully and in its entirety, and identify all emotionally charged words and bias content." +
           " Create a key-value pair as specified in the JSON format. \n" + 
           " I will require three main pieces of information for each biased keyword or phrase." + 
           " The first is an (integer) index of the biased keyword/phrase, which will be calculated by counting the number of words from the word 'BEGIN' in the web-scraped article, up to the first character of the biased phrase" +
           " This will serve as our key. The second piece of information is the biased keyword, related to the index which we calculated earlier. Use this as a key for an inner dictionary in the key value pair. Lastly, " +
           " give an explanation why the given phrase is believed to be emotionally charged or biased." +
           " The following example gives an example web-scraped sentence, and one correct JSON-formatted response.\n " +
           "You must return the JSON response only. Find as many biased examples as you can." 
           },
          {"role": "assistant", "content": 
"""
HEADING: The devastating and tragic house fire kills family dog.
{
  7 : {"devastating and tragic" : "The phrase 'devastating and tragic' suggests a highly intense and terrifying event, potentially biasing the reader's perception of the incident."}
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
          {"role": "user", "content": ''},
      ]

POLL_PROMPT = [
          {"role": "system", "content": "You are methodical assistant."},
          {"role": "system", "content": "You will be provided with a web-scraped media article." + 
           " Read through the text carefully and in its entirety." + 
           " Develop a poll for people to answer after they read the same article which you have just read." +
           " The poll should be an opinion poll only related to the content of the article." + 
           " It should not be a true or false question, but instead each option must be valid given it is an opinion poll." + 
           " Provide me with an output of only five lines, do not output anything else." + 
           " The first line should be the question, the next four should be the four options for the poll." +
           " Do not specify the headings for the question or the options, just output the lines in order."},
           {"role": "user", "content": ''}
      ]   

def generate_bias_prompt(content):
    prompt = BIAS_PROMPT
    prompt[-1]['content'] = content
    return prompt

def generate_summary_prompt(content):
    prompt = SUMMARY_PROMPT
    prompt[-1]['content'] = content
    return prompt

def generate_poll_prompt(content):
    prompt = POLL_PROMPT
    prompt[-1]['content'] = content
    return prompt

def generate_response(prompt):
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo-16k",
    messages=prompt,
    temperature=0.9
  )
  return (response['choices'][0]['message']['content'])