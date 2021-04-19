from ..views.model_views import HeartDiseasePrediction

def initialize_model_routes(api):
    api.add_resource(HeartDiseasePrediction, '/api/predict_heart')