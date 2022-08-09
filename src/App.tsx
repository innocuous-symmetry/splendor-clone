import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { initialState } from './hooks/stateSetters';
import { useState } from 'react'

import Gameboard from './components/Gameboard/Gameboard'
import GameConstructor from './components/GameConstructor';
import ResumeGame from './components/ResumeGame';
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
          <Route path="/resume-game" element={<ResumeGame state={state} setState={setState} /> } />
          {/* @ts-ignore */}
          <Route path="/game" element={<Gameboard state={state} setState={setState} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
