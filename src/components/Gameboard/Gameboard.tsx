// types, data, utils
import { AppState, PlayerData, ResourceCost } from '../../util/types';
import { useCallback, useEffect, useState } from 'react';
import { getChipsActions } from '../Player/ActionMethods';
import { StateProps } from '../../util/propTypes';
import { Link } from 'react-router-dom';

// components
import Nobles from '../Nobles/Nobles';
import initializeBoard, { setCardRows } from '../../util/initializeBoard';
import AvailableChips from '../Resources/AvailableChips';
import AllPlayers from '../Player/AllPlayers';
import CardRow from '../Card/CardRow';
import SelectionView from '../Resources/SelectionView';
import { useCurrentPlayer } from '../../hooks/useCurrentPlayer';
import getTotalBuyingPower from '../../util/getTotalBuyingPower';
import usePreviousPlayer from '../../hooks/usePreviousPlayer';
const { validateChips } = getChipsActions;

export default function Gameboard({ state, setState }: StateProps) {
    const [view, setView] = useState(<p>Loading...</p>);
    const [endgame, setEndgame] = useState<PlayerData>();

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
    useEffect(() => {
        initializeBoard(state, setState);
    }, [])

    useEffect(() => {
        setCardRows(state);
    }, [state])

    useEffect(() => {
        if (state.actions.buyCard.active) {
            const currentPlayer = useCurrentPlayer(state);
            currentPlayer && console.log(getTotalBuyingPower(currentPlayer));
        }
    }, [state.actions])

    useEffect(() => {
        const previousPlayer = usePreviousPlayer(state);
        if (previousPlayer && previousPlayer.points >= 15) setEndgame(previousPlayer);
    }, [state])

    useEffect(() => {
        if (endgame) {
            console.log('endgame!');

            const currentPlayer = useCurrentPlayer(state);
            if (!currentPlayer) return;

            if (currentPlayer.id <= endgame.id) {
                let winner: PlayerData;
                const winnerData = state.players;
                winner = winnerData.sort((x,y) => x.points - y.points)[0];
                console.log(winner.name + ' wins!');
            }
        }
    }, [state, endgame])

    // displays state of board if data is populated, otherwise points to game constructor
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
                <div className="gameboard-rows">
                    <strong>Round: {state.round}</strong>
                    <Nobles state={state} setState={setState} />
                    <CardRow tier={3} state={state} setState={setState} />
                    <CardRow tier={2} state={state} setState={setState} />
                    <CardRow tier={1} state={state} setState={setState} />
                    <SelectionView state={state} setState={setState} />
                    <AvailableChips state={state} setState={setState} liftSelection={liftSelection} />
                    <AllPlayers state={state} setState={setState} />
                </div>
            )
        }
    }, [state]);

    // render
    return view
}