import React, { useState, useEffect, useCallback } from "react";
import { Slider, Typography } from "@material-ui/core";

import "./App.css";

var messageObject = new SpeechSynthesisUtterance();
var timerObject = null;

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [isActive, setIsActive] = useState(false);
  const [tick, setTick] = useState(true);
  const [seconds, setSeconds] = useState(10);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(5);
  const [currentString, setCurrentString] = useState("");

  const directions = ["left", "right"];

  useEffect(() => {
    if (isActive) {
      timerObject = setTimeout(_handleCallout, seconds * 1000);
    } else {
      clearTimeout(timerObject);
    }
  }, [isActive, tick]);

  const _handleCallout = useCallback(() => {
    const value = getRandomInteger(minValue, maxValue);
    const direction = directions[getRandomInteger(0, 1)];
    const newCurrentString = value + " " + direction;
    setCurrentString(newCurrentString);
    messageObject.text = newCurrentString;
    window.speechSynthesis.speak(messageObject);
    setTick((previousValue) => !previousValue);
  }, [minValue, maxValue]);

  return (
    <div className="App">
      <header className="App-header">
        <h3>{"Squash practice app!"}</h3>
        <div style={{ height: 50 }} />
        <div className="App-slider">
          <Typography id="discrete-slider-custom" gutterBottom>
            {"Seconds"}
          </Typography>
          <Slider
            defaultValue={seconds}
            aria-labelledby="discrete-slider-small-steps"
            step={1}
            marks
            min={1}
            max={20}
            valueLabelDisplay="on"
            style={{ marginLeft: 20 }}
            onChange={(_, value) => setSeconds(value)}
          />
        </div>
        <div className="App-slider">
          <Typography id="discrete-slider-custom" gutterBottom>
            {"Number Range"}
          </Typography>
          <Slider
            defaultValue={[minValue, maxValue]}
            aria-labelledby="range-slider"
            step={1}
            marks
            min={0}
            max={10}
            valueLabelDisplay="on"
            style={{ marginLeft: 20 }}
            onChange={(_, value) => {
              setMinValue(value[0]);
              setMaxValue(value[1]);
            }}
          />
        </div>
        <button
          className="App-link"
          onClick={() => {
            if (!isActive) {
              _handleCallout();
            }
            setIsActive((previousValue) => !previousValue);
          }}
          style={{
            padding: 15,
            color: isActive ? "red" : "green",
            fontSize: 20,
          }}
        >
          {isActive ? "Stop" : "Begin!"}
        </button>
        <div style={{ height: 50 }}>
          <p>{currentString ? "Last callout:" : ""}</p>
          <p style={{ fontWeight: "bold" }}>
            {currentString ? currentString : ""}
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
