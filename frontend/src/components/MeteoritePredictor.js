// src/components/MeteoritePredictor.js
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import axios from "axios";

const MeteoritePredictor = () => {
  const [year, setYear] = useState(2025);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(null); // New error state

  const predictMeteorites = async () => {
    setLoading(true);
    setError(null); // Reset error state before making request

    try {
      // Send a request to your backend API to get predictions
      const response = await axios.post("http://localhost:5000/predict", { year });
      const { lat, long } = response.data;

      setPredictions([{ year, lat, long }]);
    } catch (error) {
      console.error("Error loading models or making predictions", error);
      setError("Failed to fetch predictions. Please try again later."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">Meteorite Strike Predictor</h2>
          
          {/* Year input */}
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="mb-4"
            disabled={loading} // Disable input while loading
          />

          {/* Predict button */}
          <Button 
            onClick={predictMeteorites} 
            className="w-full" 
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Predict"} {/* Display loading state */}
          </Button>

          {/* Display predictions */}
          <div className="mt-4">
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            {predictions.length > 0 && (
              <div>
                <h3 className="font-semibold">Predicted Strike Locations:</h3>
                {predictions.map((p, index) => (
                  <p key={index}>
                    Year {p.year}: Latitude {p.lat.toFixed(2)}, Longitude {p.long.toFixed(2)}
                  </p>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeteoritePredictor;
