from ..views.user_views import Hello

def initialize_routes(api):
    api.add_resource(Hello, '/api/hello')