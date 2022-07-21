import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../context/Context";
import { CardData, NobleData, PlayerData } from "./types";

interface InputState {
    playerOne: PlayerInput
    playerTwo: PlayerInput
    playerThree: PlayerInput
    playerFour: PlayerInput
}

interface PlayerInput {
    name: string,
    starter: boolean
}

export default function GameConstructor() {
    const AppContext = useContext(Context);
    const navigate = useNavigate();

    const [starter, setStarter] = useState(-1);

    const [input, setInput] = useState<InputState>({
        playerOne: {
            name: '',
            starter: false
        },
        playerTwo: {
            name: '',
            starter: false
        },
        playerThree: {
            name: '',
            starter: false
        },
        playerFour: {
            name: '',
            starter: false
        },
    })

    const newGame = () => {
        if (!input.playerOne.name || !input.playerTwo.name) return;
        if (input.playerFour.name && !input.playerThree.name) return;

        const newPlayers = Object.values(input).map((val: {name: string, starter: boolean}): PlayerData => {
            return {
                name: val.name,
                starter: val.starter,
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
        navigate('/game');
    }

    const handleRadio = (x: number) => {
        const playerKeys = ["playerOne", "playerTwo", "playerThree", "playerFour"]
        const inputKey = playerKeys[x-1];
        setStarter(x-1);

        setInput((prev) => {
            let newState = prev;
            for (let key of Object.keys(prev)) {
                // @ts-ignore
                newState[key].starter = (key === inputKey);
            }

            return newState;
        })
    }

    return (
        <div className="game-constructor App">
            <h1>Configure a new game:</h1>

            <div>
                <label htmlFor="P1-NAME">Player 1 Name:</label>
                <input
                    type="text"
                    id="P1-NAME" required
                    onChange={(e) => setInput({ ...input, playerOne: {...input.playerOne, name: e.target.value}})}>
                </input>
                <input
                    type="radio"
                    id="P1-START"
                    required
                    onChange={() => handleRadio(1)}
                    checked={starter === 0}>
                </input>
            </div>

            <div>
                <label htmlFor="P2-NAME">Player 2 Name:</label>
                <input
                    type="text"
                    id="P2-NAME" required
                    onChange={(e) => setInput({ ...input, playerTwo: {...input.playerTwo, name: e.target.value}})}>
                </input>
                <input
                    type="radio"
                    id="P2-START"
                    required
                    onChange={() => handleRadio(2)}
                    checked={starter === 1}>
                </input>
            </div>

            <div>
                <label htmlFor="P3-NAME">Player 3 Name:</label>
                <input
                    type="text"
                    id="P3-NAME"
                    onChange={(e) => setInput({ ...input, playerThree: {...input.playerThree, name: e.target.value}})}>
                </input>
                <input
                    type="radio"
                    id="P3-START"
                    required
                    onChange={() => handleRadio(3)}
                    checked={starter === 2}>
                </input>
            </div>

            <div>
                <label htmlFor="P4-NAME">Player 4 Name:</label>
                <input
                    type="text"
                    id="P4-NAME"
                    onChange={(e) => setInput({ ...input, playerFour: {...input.playerFour, name: e.target.value}})}>
                </input>
                <input
                    type="radio"
                    id="P1-START"
                    onChange={() => handleRadio(4)}
                    checked={starter === 3}>
                </input>
            </div>

            <button disabled={!input.playerOne.name || !input.playerTwo.name} onClick={newGame}>Start Game</button>
        </div>
    )
}