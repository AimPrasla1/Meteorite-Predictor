from flask import Flask, request, jsonify
import joblib
import os
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the models
lat_model = joblib.load(os.path.join("models", "lat_model.pkl"))
long_model = joblib.load(os.path.join("models", "long_model.pkl"))

@app.route('/')
def home():
    return "Meteorite Prediction API is running."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data (year)
        data = request.get_json()
        year = data['year']
        
        # Predict latitude and longitude using the loaded models
        predicted_lat = lat_model.predict([[year]])
        predicted_long = long_model.predict([[year]])
        
        # Return the predictions as JSON response
        return jsonify({
            'lat': predicted_lat[0],
            'long': predicted_long[0]
        })
    
    except Exception as e:
        # Handle errors
        print(f"Error: {e}")
        return jsonify({'error': 'Unable to make prediction. Please try again later.'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
