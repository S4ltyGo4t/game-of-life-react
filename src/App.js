import React from 'react';
import './App.css';
import Game from "./components/Game";
import GameMenu from "./components/GameMenu";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h2>
            Game of Life
          </h2>
          <Game/>
          <GameMenu>

          </GameMenu>
        </header>
      </div>
  );
}

export default App;
