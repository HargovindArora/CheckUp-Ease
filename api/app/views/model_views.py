import json
import numpy as np
from flask import request, Response, make_response, jsonify
from flask_restful import Resource

from ..database.models import Prediction, User

from ..models.load_models import HEART_DISEASE_MODEL
from ..models.load_models import DIABETES_PREDICTION_MODEL


class NumpyEncoder(json.JSONEncoder):
    """ Special json encoder for numpy types """
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


class HeartDiseasePrediction(Resource):

    def post(self):

        req = request.get_json()

        model = Prediction(**req)
        model.prediction_type = "Heart Disease Prediction"

        # age = values["age"]
        # sex = values["sex"]
        # chest_pain = values["chest_pain"]
        # max_heart_rate = values["max_heart_rate"]
        # exercise_angina = values["exercise_angina"]
        # depression_by_exercise = values["depression_by_exercise"]
        # number_of_major_vessels = values["number_of_major_vessels"]
        # thal = values["thal"]
        
        values = np.fromiter(req.values(), dtype=float)
        prediction = HEART_DISEASE_MODEL.predict([values])
        prediction = json.dumps(prediction, cls=NumpyEncoder)

        if int(prediction[1]):
            pred = "True"
        else:
            pred = "False"

        model.prediction = pred
        model.save()

        res = make_response(jsonify({"Prediction": prediction}), 200)

        return res


class DiabetesPrediction(Resource):

    def post(self):

        req = request.get_json()

        model = Prediction(**req)
        model.prediction_type = "Diabetes Prediction"

        values = np.fromiter(req.values(), dtype=float)
        prediction = DIABETES_PREDICTION_MODEL.predict([values])
        prediction = json.dumps(prediction, cls=NumpyEncoder)

        if int(prediction[1]):
            pred = "True"
        else:
            pred = "False"

        model.prediction = pred
        model.save()

        res = make_response(jsonify({"Prediction": prediction}), 200)

        return res