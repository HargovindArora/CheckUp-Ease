import logging
import logging.config

from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from .database.db import initialize_db
from .database.models import TokenBlocklist


app = Flask(__name__)


logging.config.fileConfig(fname="logging.conf", disable_existing_loggers=False)
logger = logging.getLogger(__name__)

if app.config["ENV"] == "production":
    app.config.from_object("config.ProductionConfig")
else:
    app.config.from_object("config.DevelopmentConfig")


from .routes.user_routes import initialize_user_routes
from .routes.model_routes import initialize_model_routes


api = Api(app)
initialize_user_routes(api)
initialize_model_routes(api)

CORS(app)

jwt = JWTManager(app)

initialize_db(app)

bcrypt = Bcrypt(app)

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return TokenBlocklist.is_jti_blacklisted(jti)