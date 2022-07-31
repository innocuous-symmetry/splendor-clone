// types, data, utils
import { AppState, ResourceCost } from '../../util/types';
import { useCallback, useEffect, useState } from 'react';
import { getChipsActions } from '../Player/ActionMethods';
import { StateProps } from '../../util/propTypes';
const { validateChips } = getChipsActions;

// components
import Nobles from './Nobles';
import initializeBoard, { setCardRows } from '../../util/initializeBoard';
import AvailableChips from '../Resources/AvailableChips';
import AllPlayers from '../Player/AllPlayers';
import CardRow from '../Card/CardRow';
import SelectionView from '../Resources/SelectionView';

export default function Gameboard({ state, setState }: StateProps) {
    const [view, setView] = useState(<p>Loading...</p>);

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