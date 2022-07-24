import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gameboard from './components/Gameboard/Gameboard'
import GameConstructor from './util/GameConstructor';
import { initialState } from './util/stateSetters';
import './App.css'

function App() {
  const [state, setState] = useState(initialState);

  return (
    <div className="App">
      <h1>SPLENDOR</h1>
      <BrowserRouter>
        <Routes>
          {/* @ts-ignore */}
          <Route path="/" element={<GameConstructor state={state} setState={setState} />} />
          {/* @ts-ignore */}
          <Route path="/game" element={<Gameboard state={state} setState={setState} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
