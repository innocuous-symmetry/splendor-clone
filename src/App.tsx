import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { initialState } from './util/stateSetters';
import { useEffect, useState } from 'react'

import Gameboard from './components/Gameboard/Gameboard'
import GameConstructor from './components/GameConstructor';
import './App.css'

function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    return;
  }, [state]);

  return (
    <div className="App">
      <h1>SPLENDOR</h1>
      <BrowserRouter>
        <Routes>
          {/* @ts-ignore */}a
          <Route path="/" element={<GameConstructor state={state} setState={setState} />} />
          {/* @ts-ignore */}
          <Route path="/game" element={<Gameboard state={state} setState={setState} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
