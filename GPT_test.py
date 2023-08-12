import os
import openai
import json

openai.api_key = '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'
openai.Model.list()

response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "user", "content": "Who won the world series in 2020?"},
    ],
  temperature=0.7
)
print(response['choices'][0]['message']['content'])

# https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb I'm just going to leave this here for now
# but it is a good thing for the BA's to look at when they begin testing the GPT's functionality - the prompt can be more of a conversation
# to potentially prompt it to say the right thing