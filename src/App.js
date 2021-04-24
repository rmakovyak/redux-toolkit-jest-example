import React from 'react';

import Pokedex from 'components/Pokedex';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h2>Pokedex</h2>
      </header>
      <Pokedex />
    </div>
  );
}

export default App;
