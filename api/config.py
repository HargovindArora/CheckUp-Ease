import os


class DevelopmentConfig(object):

    DEBUG = True
    TESTING = False

    SECRET_KEY = "akjwerht9834hgpaofjgn38rn"

    # UPLOADS = "/home/username/app/app/static/images/uploads"

    SESSION_COOKIE_SECURE = False

    MONGODB_SETTINGS = {
        'host': 'mongodb://' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE'],
        'connect': False,
    }

    # MONGODB_SETTINGS = {
    #     'host': 'mongodb://mongodb/flask_db'
    # }

    # MONGODB_USERNAME = "root"
    # MONGODB_PASSWORD = "password"

    JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'

    JWT_BLACKLIST_ENABLED = True
