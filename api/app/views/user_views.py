import datetime

from .. import logger

from flask import request, Response, make_response, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, get_jwt_identity

from ..database.models import User, TokenBlocklist, Prediction


class SignupApi(Resource):

    def post(self):

        body = request.get_json()
        user = User(**body)
        user.hash_password()
        user.save()
        id = user.id

        logger.info(f"New user created with id {id}")

        res = make_response(jsonify({"msg": "User successfully created"}), 200)

        return res


class LoginApi(Resource):

    def post(self):

        body = request.get_json()
        user = User.objects.get(username=body.get('username'))
        authorized = user.verify_password_hash(body.get('password'))

        if not authorized:
            
            logger.error(f"Incorrect username/password")

            return {"msg": "Username or password is invalid"}, 401

        expires = datetime.timedelta(days=1)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires)

        logger.info(f"User logged in")

        res = make_response(jsonify({"token": access_token}), 200)

        return res


class LogoutApi(Resource):

    @jwt_required()
    def post(self):

        jti = get_jwt()["jti"]
        revoked_token = TokenBlocklist(jti=jti)
        revoked_token.save()

        logger.info(f"User logged out")

        res = make_response(jsonify({"msg": "Successfully logged out"}), 200)

        return res


class UserProfileApi(Resource):

    @jwt_required()
    def get(self):
        
        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)

        result = {}
        result['name'] = user.name
        result['predictions'] = user.predictions

        logger.info(f"User accessing their profile information and previous predictions")

        res = make_response(jsonify({"profile": result}), 200)

        return res