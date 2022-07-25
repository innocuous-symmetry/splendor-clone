// types, data, utils
import { AppState, PlayerData, ResourceCost, SetActionType, StateProps } from '../../util/types';
import { setStateBuyCard, setStateGetChips, setStateReserveCard } from '../../util/stateSetters';
import { useCallback, useEffect, useState } from 'react';
import Nobles from './Nobles';

// components
import initializeBoard from '../../util/initializeBoard';
import AvailableChips from '../Resources/AvailableChips';
import AllPlayers from '../Player/AllPlayers';
import CardRow from '../Card/CardRow';
import { validateChips } from '../Player/ActionMethods';
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

    const setActionState = useCallback((value: SetActionType, player: PlayerData) => {
        if (!player?.turnActive) return;

        switch (value) {
            case 0:
                if (!state.actions.getChips.active) setState((prev) => setStateGetChips(prev));
                break;
            case 1:
                if (!state.actions.buyCard.active) setState((prev) => setStateBuyCard(prev));
                break;
            case 2:
                if (!state.actions.reserveCard.active) setState((prev) => setStateReserveCard(prev));
                break;
            default:
                break;
        }
    }, []);

    // util functions, setup on mount
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
                    <CardRow tier={3} state={state} setState={setState} />
                    <CardRow tier={2} state={state} setState={setState} />
                    <CardRow tier={1} state={state} setState={setState} />
                    <SelectionView state={state} setState={setState} />
                    <AvailableChips state={state} setState={setState} liftSelection={liftSelection} />
                    {/* @ts-ignore */}
                    <AllPlayers state={state} setState={setState} setActionState={setActionState} />
                </div>
            )
        }
    }, [state]);

    // render
    return view
}