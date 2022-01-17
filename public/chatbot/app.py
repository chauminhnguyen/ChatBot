from flask import Flask
from flask_restful import Resource, Api, reqparse
import ast
from main import generate_conv

app = Flask(__name__)
api = Api(app)

class ChatBot(Resource):
    # methods go here
    def get(self):
        return {'data': "hehe"}, 200  # return data and 200 OK code

    def post(self):
        parser = reqparse.RequestParser()  # initialize
        
        parser.add_argument('user', required=True)  # add args
        
        args = parser.parse_args()  # parse arguments to dictionary
        
        # create new dataframe containing new values
        new_data = {
            'user': args['user'],
            'bot': generate_conv(args['user'])
        }

        return {'data': new_data}, 200  # return data with 200 OK


api.add_resource(ChatBot, '/chatbot')  # '/users' is our entry point

if __name__ == '__main__':
    app.run()  # run our Flask app