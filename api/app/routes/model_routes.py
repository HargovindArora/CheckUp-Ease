from ..views.model_views import HeartDiseasePrediction, DiabetesPrediction, CovidPrediction


def initialize_model_routes(api):
    api.add_resource(HeartDiseasePrediction, '/api/predict_heart')
    api.add_resource(DiabetesPrediction, '/api/predict_diabetes')
    api.add_resource(CovidPrediction, '/api/predict_covid')
