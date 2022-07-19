import Gameboard from './components/Gameboard/Gameboard'
import './App.css'
import { useCallback, useEffect, useState } from 'react'

function App() {
  const [state, setState] = useState({
    gameboard: null,
    store: null,
    players: null,
    round: 0
  })

  useEffect(() => {
    if (!state.players) {
      console.log('no players!');
    }
  }, []);

  const getGameboard = useCallback(() => {

  }, [])

  return (
    <div className="App">
      <Gameboard />
      {/* 

      < INVENTORY />
      < PLAYERS />
      
      */}
    </div>
  )
}

export default App
