import os
import joblib

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))

heart_disease_mdl = os.path.join(THIS_FOLDER, 'heart_disease.mdl')
diabetes_mdl = os.path.join(THIS_FOLDER, 'diabetes_prediction.mdl')

HEART_DISEASE_MODEL = joblib.load(heart_disease_mdl)
DIABETES_PREDICTION_MODEL = joblib.load(diabetes_mdl)