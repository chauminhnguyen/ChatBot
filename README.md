# ChatBot

Chat Bot website written with VueJS, BootStrap and Firebase (done).

The Conv AI is used from HuggingFace and is built into API by Flask for js to call.

## Pipeline

1. The conversation will be stored in Firebase each chat.
2. After the user click the button, NodeJS will send a HTTP request (POST) to Flask API.
3. The API will fetch the chat's history from Firebase.
4. Concatnate all the conversation and perform the HuggingFace's model to generate response
5. The response return to NodeJS meanwhile updating the Firebase's storage.

# Visualization

![](./imgs/chatbot.png)

# Installation

### Run the API

Install all requirements

`pip install -r ./public/chatbot/requirements.txt`

Run the API

`python ./public/chatbot/app.py`