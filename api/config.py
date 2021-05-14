import os


class ProductionConfig(object):

    DEBUG = False
    TESTING = False

    SECRET_KEY = "akjwerht9834hgpaofjgn38rn"

    SESSION_COOKIE_SECURE = False

    MONGODB_SETTINGS = {
        'host': 'mongodb://mongodb:27017/flaskdb',
        'connect': False,
    }

    JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'

    JWT_BLACKLIST_ENABLED = True


class DevelopmentConfig(object):

    DEBUG = True
    TESTING = False

    SECRET_KEY = "akjwerht9834hgpaofjgn38rn"

    SESSION_COOKIE_SECURE = False

    MONGODB_SETTINGS = {
        'host': 'mongodb://localhost:27017/flaskdb',
        'connect': False,
    }

    JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'

    JWT_BLACKLIST_ENABLED = True
