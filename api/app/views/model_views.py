import io
import json
import numpy as np

from ...app import app, logger

from PIL import Image

from flask import request, Response, make_response, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..database.models import Prediction, User

from ..models.load_models import HEART_DISEASE_MODEL, DIABETES_PREDICTION_MODEL, COVID_PREDICTION_MODEL

import torchvision.transforms as transforms


CLASSES = ['Covid-19', 'Normal', 'Pneumonia']


def transform_image(image_bytes):

    my_transforms = transforms.Compose([
        transforms.Resize((180, 180)),
        transforms.ToTensor(),
        transforms.Normalize((0.5,), (0.5,))
    ])
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

    app.logger.info("Uploaded image transformed")

    return my_transforms(image).unsqueeze(0)


def get_prediction(image_bytes):

    tensor = transform_image(image_bytes=image_bytes)
    outputs = COVID_PREDICTION_MODEL.forward(tensor)
    _, y_hat = outputs.max(1)
    predicted_idx = int(y_hat.item())
    return CLASSES[predicted_idx]


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

    @jwt_required()
    def post(self):

        req = request.get_json()

        model = Prediction(**req)
        model.prediction_type = "Heart Disease Prediction"

        values = np.fromiter(req.values(), dtype=float)
        prediction = HEART_DISEASE_MODEL.predict([values])
        prediction = json.dumps(prediction, cls=NumpyEncoder)

        if int(prediction[1]):
            pred = "True"
            app.logger.info("Heart Disease Found")
        else:
            pred = "False"
            app.logger.info("Heart Disease Not Found")


        model.prediction = pred
        model.save()

        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)
        user.update(push__predictions=model)
        user.save()

        app.logger.info("Heart disease prediction")

        res = make_response(jsonify({"Prediction": prediction}), 200)

        return res


class DiabetesPrediction(Resource):

    @jwt_required()
    def post(self):

        req = request.get_json()

        model = Prediction(**req)
        model.prediction_type = "Diabetes Prediction"

        values = np.fromiter(req.values(), dtype=float)
        prediction = DIABETES_PREDICTION_MODEL.predict([values])
        prediction = json.dumps(prediction, cls=NumpyEncoder)

        if int(prediction[1]):
            pred = "True"
            app.logger.info("Diabetes Found")
        else:
            pred = "False"
            app.logger.info("Diabetes Not Found")


        model.prediction = pred
        model.save()

        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)
        user.update(push__predictions=model)
        user.save()

        app.logger.info("Diabetes prediction")

        res = make_response(jsonify({"Prediction": prediction}), 200)

        return res


class CovidPrediction(Resource):

    @jwt_required()
    def post(self):

        model = Prediction()

        image = request.files['image']
        img_bytes = image.read()
        prediction = get_prediction(image_bytes=img_bytes)

        model.prediction_type = "Covid-19 Prediction"
        model.image = image

        model.prediction = prediction
        model.save()

        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)
        user.update(push__predictions=model)
        user.save()

        app.logger.info("Covid-19 prediction")

        res = make_response(jsonify({"Prediction": prediction}), 200)

        return res
