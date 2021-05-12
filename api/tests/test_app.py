import json, flask, pytest

from flask_jwt_extended import create_access_token

from app.database.models import User


user = {
    "username": "tom",
    "password": "jerry",
    "name": "thomas"
}

@pytest.fixture(scope='module')
def new_user():
    user_ = User(**user)
    return user_


def test_login(app, client, new_user):

    assert new_user.username == "tom"
    assert new_user.password == "jerry"
    assert new_user.name == "thomas"