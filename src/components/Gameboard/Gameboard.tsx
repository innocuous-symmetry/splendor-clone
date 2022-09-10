// types, data, utils
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import initializeBoard, { setCardRows } from '../../util/initializeBoard';
import { AppState, PlayerData, ResourceCost } from '../../util/types';
import { getChipsActions } from '../Player/ActionMethods';
import { StateProps } from '../../util/propTypes';
import './Gameboard.scss';

// components
import Nobles from '../Nobles/Nobles';
import AvailableChips from '../Resources/AvailableChips';
import AllPlayers from '../Player/AllPlayers';
import CardRow from '../Card/CardRow';
import SelectionView from '../Resources/SelectionView';
import { useCurrentPlayer } from '../../hooks/useCurrentPlayer';
import usePreviousPlayer from '../../hooks/usePreviousPlayer';
const { validateChips } = getChipsActions;

export default function Gameboard({ state, setState }: StateProps) {
    const [view, setView] = useState(<p>Loading...</p>);
    const [endgame, setEndgame] = useState<PlayerData>();
    const [winner, setWinner] = useState<PlayerData>();

    // callbacks for lifting state
    const liftSelection = useCallback((value: keyof ResourceCost) => {
        if (!state.actions.getChips.active) return;
        setState((prev: AppState) => {
            let newSelection = prev.actions.getChips.selection;
            newSelection?.push(value);

            let newState = {
                ...prev,
                actions: {
                    ...state.actions,
                    getChips: {
                        active: true,
                        selection: newSelection,
                        valid: false
                    }
                }
            }

            const result = validateChips(newState);
            newState.actions.getChips.valid = result;
            return newState;
        })
    }, [state]);

    // util functions, setup on mount
    useEffect(() => initializeBoard(state, setState), [])

    useEffect(() => {
        setCardRows(state);
    }, [state])

    // endgame logic: once triggered, sets "endgame" to the player who triggered the effect
    useEffect(() => {
        const previousPlayer = usePreviousPlayer(state);
        if (previousPlayer && previousPlayer.points >= 15) setEndgame(previousPlayer);
    }, [state])

    // endgame logic: determines the player with highest score after remaining allowed turns
    useEffect(() => {
        if (endgame) {
            let winner: PlayerData;
            const winnerData = state.players;
            const currentPlayer = useCurrentPlayer(state);
            if (!currentPlayer) return;

            if (currentPlayer.id <= endgame.id) {
                winner = winnerData.sort((x,y) => x.points + y.points)[0];
                console.log(winner.name + ' wins!');
            }
        }
    }, [state, endgame])

    // rendering: displays state of board if data is populated, otherwise points to game constructor
    useEffect(() => {
        if (!state.players.length) {
            setView(
                <div className="error-page">
                    <strong>Sorry! It appears we've lost track of your game data.</strong>
                    <p>Please head back to the <Link to="/">home page</Link> to start a fresh game.</p>
                </div>
            );
        } else {
            setView(
                <div className="gameboard">
                    <h2 id="round-marker">Round: {state.round}</h2>
                    <div className="gameboard-columns">
                        <section className="gameboard-left">
                            <Nobles state={state} setState={setState} />
                            <CardRow tier={3} state={state} setState={setState} />
                            <CardRow tier={2} state={state} setState={setState} />
                            <CardRow tier={1} state={state} setState={setState} />
                        </section>
                        <section className="gameboard-right">
                            <AllPlayers state={state} setState={setState} liftSelection={liftSelection} />
                        </section>
                    </div>
                </div>
            )
        }
    }, [state]);

    return view
}