from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash
from mongoengine.queryset import DoesNotExist
from datetime import datetime


class Prediction(db.DynamicDocument):
    prediction_type = db.StringField(required=True)
    prediction = db.StringField(required=True)
    date_created = db.DateTimeField(default=datetime.utcnow)
    image = db.ImageField(required=False)

    meta = {
        "indexes": ["date_created"],
        "ordering": ["-date_created"]
    }


class User(db.Document):

    username = db.StringField(required=True, unique=True)
    password = db.StringField(required=True, unique=True)
    name = db.StringField(required=True, unique=True)
    predictions = db.ListField(db.ReferenceField('Prediction'))
    date_created = db.DateTimeField(default=datetime.utcnow)

    meta = {
        "indexes": ["username"],
        "ordering": ["-date_created"]
    }

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def verify_password_hash(self, password):
        return check_password_hash(self.password, password)



class TokenBlocklist(db.Document):
    jti = db.StringField()
    date_created = db.DateTimeField(default=datetime.utcnow)

    @classmethod
    def is_jti_blacklisted(cls, jti):
        try:
            token = cls.objects(jti=jti).get()
        except DoesNotExist:
            return None
        return bool(token)