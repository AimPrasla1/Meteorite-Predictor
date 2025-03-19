import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app"; // or wherever your root component is located
import './index.css';  // Your CSS file

// For React 18 and above, use `createRoot` instead of `render`
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
