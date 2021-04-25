from ..views.model_views import HeartDiseasePrediction, DiabetesPrediction

def initialize_model_routes(api):
    api.add_resource(HeartDiseasePrediction, '/api/predict_heart')
    api.add_resource(DiabetesPrediction, '/api/predict_diabetes')