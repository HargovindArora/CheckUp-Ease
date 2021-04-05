from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from .routes.user_routes import initialize_routes


app = Flask(__name__)


app.config.from_object("config.DevelopmentConfig")

api = Api(app)
initialize_routes(api)

CORS(app)

