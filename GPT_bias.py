import os
import openai
import json

openai.api_key = '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'
openai.Model.list()

def generate_response(prompt):
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
          {"role": "system", "content": "You are a methodical assistant."}, # You follow a consistent process, noting in great depth using simple terms, and you give examples to help people learn."},
          {"role": "system", "content": "You will be provided with a web-scraped media article that is believed to have bias and emotionally charged content." + 
           "List and number each case of emotionally charged content. Each case should have reference to the original word or phrase in the heading (enclosed in quotations), with a formal description " + 
           "of why the subtext is biased. In addition to this, there should be a small paragraph at the beginning of the response (no more than 50 words) summarising the overall bias of the text." +
           "Use only the following text for your analysis"},
          {"role": "assistant", "content": "The overall bias of the text seems to be positive towards the Essendon Bombers, emphasizing that they still have a chance to make it to the finals." +
           "1. \"still have finals chances in their own hands\":" +
           " this use of this term portrays a sense of control and agency, implying that the " + 
           " Bombers have complete control over their destiny. "},
          {"role": "user", "content": prompt},
      ],
    temperature=0.7
  )
  return (response)

# https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb I'm just going to leave this here for now
# but it is a good thing for the BA's to look at when they begin testing the GPT's functionality - the prompt can be more of a conversation
# to potentially prompt it to say the right thing

newsText = ''
with open('testing/test1.txt', 'r', encoding='utf-8') as f:
    newsText = f.readlines()
# print(newsText)
print(generate_response(newsText[0]))

out = """
"Modality of Bias: The heading of the article suggests a negative bias towards Biden and the Democratic Party. 
The use of the phrase \"Biden crime family\" implies that there is criminal activity associated with Biden and his family, without providing any evidence.
Additionally, the phrase \"Democrats, media resort to nothing to see\" portrays the Democrats and the media as dismissive or uninterested in potential wrongdoings, 
further indicating a negative bias.

1. (Biden crime family) - The use of the term \"Biden crime family\" is emotionally charged and biased. 
It implies that there is criminal activity associated with Biden and his family without providing any substantive evidence.
This phrase is intended to create a negative perception of Biden and his family without presenting any factual basis.

2. (Democrats, media resort to \u2018nothing to see\u2019) - The phrase \"Democrats, media resort to \u2018nothing to see\u2019\" is emotionally charged and biased. 
It portrays Democrats and the media as dismissive or uninterested in potential wrongdoings, without providing any context or evidence. 
This statement aims to create the perception that the Democrats and the media are intentionally ignoring or covering up any negative information about Biden and his family."

"""

out2 = """
Summary: The overall bias of the text seems to be positive towards the Essendon Bombers, emphasizing that they still have a chance to make it to the finals.

1. "No panic"implies that there is a reason to panic, suggesting that the situation is dire. 

(panic)
1. "still have finals chances in their own hands": this use of this term portrays a sense of control and agency, implying that the Bombers have complete control over their destiny. 
(own hands)\n\n
These emotionally charged phrases create a biased tone by downplaying any concerns and presenting the Bombers in a positive light."

"""