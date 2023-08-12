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
# print(run_conversation())

# https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb I'm just going to leave this here for now