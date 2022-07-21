import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../context/Context";
import { CardData, NobleData, PlayerData } from "./types";

export default function GameConstructor() {
    const AppContext = useContext(Context);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        playerOne: '',
        playerTwo: '',
        playerThree: '',
        playerFour: '',
    })

    const newGame = () => {
        if (!input.playerOne || !input.playerTwo) return;
        if (input.playerFour && !input.playerThree) return;

        const newPlayers = Object.values(input).map((name: string): PlayerData => {
            return {
                name: name,
                starter: false,
                points: 0,
                nobles: new Array<NobleData>,
                cards: new Array<CardData>,
                inventory: {
                    ruby: 0,
                    sapphire: 0,
                    emerald: 0,
                    diamond: 0,
                    onyx: 0,
                    gold: 0
                }
            }
        })

        for (let player of newPlayers) {
            if (!player.name) newPlayers.splice(newPlayers.indexOf(player));
        }

        AppContext.players = newPlayers;

        console.log(AppContext)
        navigate('/game');
    }

    return (
        <div className="game-constructor App">
            <h1>Configure a new game:</h1>

            <div>
                <label htmlFor="P1-NAME">Player 1 Name:</label>
                <input type="text" id="P1-NAME" required onChange={(e) => setInput({ ...input, playerOne: e.target.value})}></input>
                <label htmlFor="P2-NAME">Player 2 Name:</label>
                <input type="text" id="P2-NAME" required onChange={(e) => setInput({ ...input, playerTwo: e.target.value})}></input>
            </div>

            <div>
                <label htmlFor="P3-NAME">Player 3 Name:</label>
                <input type="text" id="P3-NAME" onChange={(e) => setInput({ ...input, playerThree: e.target.value})}></input>
                <label htmlFor="P4-NAME">Player 4 Name:</label>
                <input type="text" id="P4-NAME" onChange={(e) => setInput({ ...input, playerFour: e.target.value})}></input>
            </div>

            <button onClick={newGame}>Start Game</button>
        </div>
    )
}