from flask import request, Response
from flask_restful import Resource


class Hello(Resource):

    def get(self):

        return {"message": "Hello, I'm Alive!"}, 200