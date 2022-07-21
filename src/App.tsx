import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gameboard from './components/Gameboard/Gameboard'
import './App.css'
import { useCallback, useContext, useEffect, useState } from 'react'
import { appState, Context } from './context/Context'
import AvailableChips from './components/Resources/AvailableChips';
import GameConstructor from './util/GameConstructor';
import { PlayerData } from './util/types';

function App() {
  let AppContext = useContext(Context);
  let { players } = AppContext;

  return (
    <div className="App">
      <Context.Provider value={appState}>
        <h1>SPLENDOR</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GameConstructor />} />
            <Route path="/game" element={<Gameboard />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App
