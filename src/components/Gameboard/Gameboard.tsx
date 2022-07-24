import { useCallback, useEffect, useState } from 'react';
import { AppState, ResourceCost, StateProps } from '../../util/types';
import initializeBoard from '../../util/initializeBoard';
import AvailableChips from '../Resources/AvailableChips';
import AllPlayers from '../Player/AllPlayers';
import CardRow from '../Card/CardRow';
import Nobles from './Nobles';

export default function Gameboard({ state, setState }: StateProps) {
    const [view, setView] = useState(<p>Loading...</p>);
    const [selection, setSelection] = useState<string>();

    // callback for lifting state
    const liftSelection = useCallback((value: keyof ResourceCost) => {
        if (!state.actions.getChips.active) return;

        setState((prev: AppState) => {
            let newSelection = prev.actions.getChips.selection;
            newSelection?.push(value);

            return {
                ...prev,
                actions: {
                    ...state.actions,
                    getChips: {
                        active: true,
                        selection: newSelection
                    }
                }
            }
        })

        console.log(state);
    }, []);

    // util functions to set up initial board
    useEffect(() => {
        initializeBoard(state, setState);
    }, [])

    // displays state of board if data is populated
    useEffect(() => {
        if (!state.players.length) {
            setView(
                <div className="error-page">
                    <strong>Sorry! It appears we've lost track of your game data.</strong>
                    <p>Please head back to the <a href="/">home page</a> to start a fresh game.</p>
                </div>
            );
        } else {
            setView(
                <div className="gameboard-rows">
                    <strong>Round: {state.round}</strong>
                    <Nobles state={state} setState={setState} />
                    <CardRow tier={3} cards={state.gameboard.cardRows.tierThree} />
                    <CardRow tier={2} cards={state.gameboard.cardRows.tierTwo} />
                    <CardRow tier={1} cards={state.gameboard.cardRows.tierOne} />
                    <AvailableChips state={state} setState={setState} />
                    <AllPlayers state={state} setState={setState} />
                </div>
            )
        }
    }, [state]);

    // render
    return view
}