from fastapi import FastAPI, HTTPException 
from pydantic import BaseModel
import pickle
import warnings
import uvicorn

# Load the models
maternal_model = pickle.load(open("model/finalized_maternal_model.sav", 'rb'))
fetal_model = pickle.load(open("model/fetal_health_classifier.sav", 'rb'))

app = FastAPI()

# Request models
class PregnancyRiskInput(BaseModel):
    age: int
    diastolicBP: int
    blood_sugar: float
    body_temp: float
    heart_rate: int

class FetalHealthInput(BaseModel):
    baseline_value: float
    accelerations: float
    fetal_movement: float
    uterine_contractions: float
    light_decelerations: float
    severe_decelerations: float
    prolongued_decelerations: float
    abnormal_short_term_variability: float
    mean_short_term_variability: float
    abnormal_long_term_variability: float
    mean_long_term_variability: float
    histogram_width: float
    histogram_min: float
    histogram_max: float
    histogram_peaks: float
    histogram_zeroes: float
    histogram_mode: float
    histogram_mean: float
    histogram_median: float
    histogram_variance: float
    histogram_tendency: float

@app.get("/")
def read_root():
    return {"message": "Welcome to MedPredict API"}

@app.post("/predict/pregnancy-risk/")
def predict_pregnancy_risk(input_data: PregnancyRiskInput):
    try:
        # Prepare input for the model
        features = [[
            input_data.age, 
            input_data.diastolicBP, 
            input_data.blood_sugar, 
            input_data.body_temp, 
            input_data.heart_rate
        ]]
        # Suppress warnings
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            prediction = maternal_model.predict(features)

        risk_levels = {0: "Low Risk", 1: "Medium Risk", 2: "High Risk"}
        return {"risk_level": risk_levels.get(prediction[0], "Unknown")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/fetal-health/")
def predict_fetal_health(input_data: FetalHealthInput):
    try:
        # Prepare input for the model
        features = [[
            input_data.baseline_value,
            input_data.accelerations,
            input_data.fetal_movement,
            input_data.uterine_contractions,
            input_data.light_decelerations,
            input_data.severe_decelerations,
            input_data.prolongued_decelerations,
            input_data.abnormal_short_term_variability,
            input_data.mean_short_term_variability,
            input_data.abnormal_long_term_variability,
            input_data.mean_long_term_variability,
            input_data.histogram_width,
            input_data.histogram_min,
            input_data.histogram_max,
            input_data.histogram_peaks,
            input_data.histogram_zeroes,
            input_data.histogram_mode,
            input_data.histogram_mean,
            input_data.histogram_median,
            input_data.histogram_variance,
            input_data.histogram_tendency
        ]]
        # Suppress warnings
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            prediction = fetal_model.predict(features)

        health_status = {0: "Normal", 1: "Suspect", 2: "Pathological"}
        return {"fetal_health_status": health_status.get(prediction[0], "Unknown")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/dashboard/")
def dashboard_placeholder():
    # This is a placeholder for the dashboard feature.
    return {"message": "Dashboard endpoint is under development."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
