import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CardData, NobleData, PlayerData } from "../util/types";
import { StateProps } from '../util/propTypes';

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

export default function GameConstructor({ state, setState }: StateProps) {
    const navigate = useNavigate();

    const [starter, setStarter] = useState(-1);
    const [error, setError] = useState('init');
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

    useEffect(() => {
        if (!input.playerOne.name || !input.playerTwo.name) {
            setError("Please provide the minimum number of players.");
        } else if (input.playerFour.name && !input.playerThree.name) {
            setError("Your player input data is invalid. Please input players sequential turn order.");
        } else if (error !== 'init' && starter === -1) {
            setError("Please indicate a player to start.");
        } else {
            setError('');
        }
    }, [input, starter])

    const newGame = () => {
        if (error) return;

        let i = 0;
        const newPlayers = Object.values(input).map((val: {name: string, starter: boolean}): PlayerData => {
            i++;

            return {
                name: val.name,
                id: i,
                starter: val.starter,
                turnActive: val.starter,
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

        setState({ ...state, players: newPlayers });
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
            <strong>Start a new game</strong>
            <h2>OR</h2>
            <strong>Enter your previous game data <Link to={'/resume-game'}>here</Link> to pick up where you left off.</strong>

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
                    checked={starter === 0 && input.playerOne.name.length > 0}>
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
                    checked={starter === 1 && input.playerTwo.name.length > 0}>
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
                    checked={starter === 2 && input.playerThree.name.length > 0}>
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
                    id="P4-START"
                    onChange={() => handleRadio(4)}
                    checked={starter === 3 && input.playerFour.name.length > 0}>
                </input>
            </div>

            <p>{error !== 'init' && error}</p>
            <button disabled={error.length > 0} onClick={newGame}>Start Game</button>
        </div>
    )
}