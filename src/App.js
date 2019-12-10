import React from 'react';
import './App.css';
import Game from "./Game";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <p>
            Game of Life
          </p>
          <Game/>
        </header>
      </div>
  );
}

export default App;
