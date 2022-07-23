import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Gameboard from './components/Gameboard/Gameboard'
import GameConstructor from './util/GameConstructor';
import { PlayerData, NobleData, CardData } from './util/types';
import CardDeck from './data/cards.json';
import './App.css'

function App() {
  const [state, setState] = useState({
    gameboard: {
      nobles: new Array<NobleData>,
      cardRows: {
          tierOne: new Array<CardData>,
          tierTwo: new Array<CardData>,
          tierThree: new Array<CardData>,
      },
      tradingResources: {
          ruby: 7,
          sapphire: 7,
          emerald: 7,
          diamond: 7,
          onyx: 7,
          gold: 5
      },
      deck: CardDeck,
  },
  round: 1,
  players: new Array<PlayerData>,
  })

  return (
    <div className="App">
      <h1>SPLENDOR</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameConstructor state={state} setState={setState} />} />
          <Route path="/game" element={<Gameboard state={state} setState={setState} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
