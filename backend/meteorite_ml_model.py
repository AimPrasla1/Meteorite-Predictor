import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib
import os

# Load the dataset(Download the csv file from the data folder)
file_path = r"C:\Users\aimva\OneDrive\Desktop\Meteorite_Landings_20250318.csv"
df = pd.read_csv(file_path)

# Data Preprocessing
columns_needed = ['year', 'reclat', 'reclong']
df = df[columns_needed].dropna()
df['year'] = df['year'].astype(int)

# Split data into training and testing sets
X = df[['year']]
y_lat = df['reclat']  # Latitude target
y_long = df['reclong']  # Longitude target

X_train, X_test, y_lat_train, y_lat_test = train_test_split(X, y_lat, test_size=0.2, random_state=42)
X_train, X_test, y_long_train, y_long_test = train_test_split(X, y_long, test_size=0.2, random_state=42)

# Train Linear Regression models
lat_model = LinearRegression()
long_model = LinearRegression()
lat_model.fit(X_train, y_lat_train)
long_model.fit(X_train, y_long_train)

# Define the models directory path
models_dir = r"C:\Users\aimva\OneDrive\Desktop\meteorite_prediction_project\models"

# Check if the models directory exists, if not create it
if not os.path.exists(models_dir):
    os.makedirs(models_dir)

# Save the models
joblib.dump(lat_model, os.path.join(models_dir, "lat_model.pkl"))
joblib.dump(long_model, os.path.join(models_dir, "long_model.pkl"))

print("Models saved successfully.")
