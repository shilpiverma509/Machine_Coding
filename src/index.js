import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ProgressBar from "./Components/ProgressBar/ProgressBar";

const ProgresMap = ["10", "20", "30", "50", "70", "80", "100"];

ReactDOM.render(
  <React.StrictMode>
    <App />
    {ProgresMap.map((value) => (
      <ProgressBar progress={value} key={value} />
    ))}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
