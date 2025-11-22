import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/andenacitelli/credit-card-bonuses-api/main/exports/data.json", {
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error("Error fetching card information:", error));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
