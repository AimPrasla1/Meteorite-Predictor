// src/App.js
import React from 'react';
import MeteoritePredictor from './components/MeteoritePredictor'; 

const App = () => {
  return (
    <div className="App">
      <h1>Hello, Meteorite Predictor!</h1> {/* This should display on the page */}
      <MeteoritePredictor />
    </div>
  );
};

export default App;
