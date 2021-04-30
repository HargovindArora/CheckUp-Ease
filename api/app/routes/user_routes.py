from ..views.user_views import SignupApi, LoginApi, LogoutApi, UserProfileApi


def initialize_user_routes(api):
    api.add_resource(SignupApi, '/api/signup')
    api.add_resource(LoginApi, '/api/login')
    api.add_resource(UserProfileApi, '/api/profile')
    api.add_resource(LogoutApi, '/api/logout')
