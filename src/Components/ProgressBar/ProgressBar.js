import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
  }, []);

  return (
    <div className="outer-container">
      <div
        className="inner-container"
        style={{
          transform: `translateX(${animatedProgress - 100}%)`,
          color: `${animatedProgress}` < 5 ? "black" : "white",
        }}
      >
        {animatedProgress}%
      </div>
    </div>
  );
};

export default ProgressBar;
