import os
import joblib

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))

heart_disease_mdl = os.path.join(THIS_FOLDER, 'heart_disease.mdl')

HEART_DISEASE_MODEL = joblib.load(heart_disease_mdl)