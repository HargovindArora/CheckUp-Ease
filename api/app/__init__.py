from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from .routes.user_routes import initialize_routes
from .database.db import initialize_db


app = Flask(__name__)


app.config.from_object("config.DevelopmentConfig")

api = Api(app)
initialize_routes(api)

CORS(app)

jwt = JWTManager(app)

initialize_db(app)

bcrypt = Bcrypt(app)

