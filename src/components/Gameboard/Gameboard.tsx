// types, data, utils
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import initializeBoard, { setCardRows } from '../../util/setup/initializeBoard';
import { AppState, PlayerData, ResourceCost, UIState } from '../../util/types';
import { defaultUIState } from '../../util/setup/defaultUIState';
import { StateProps } from '../../util/propTypes';
import './Gameboard.scss';

// components
import Nobles from '../Nobles/Nobles';
import AllPlayers from '../Player/AllPlayers';
import CardRow from '../Card/CardRow';
import { useCurrentPlayer } from '../../hooks/useCurrentPlayer';
import usePreviousPlayer from '../../hooks/usePreviousPlayer';
import { shouldRightSideCollapse } from '../../util/mechanics/shouldRightSideCollapse';
import { setStateUpdateSelection } from '../../hooks/stateSetters';

export default function Gameboard({ state, setState }: StateProps) {
    const [view, setView] = useState(<p>Loading...</p>);
    const [endgame, setEndgame] = useState<PlayerData>();
    const [UICollapse, setUICollapse] = useState<UIState>(defaultUIState);

    // callbacks for lifting state
    const liftSelection = useCallback((value: keyof ResourceCost) => {
        if (!state.actions.getChips.active) return;
        setState((prev: AppState) => setStateUpdateSelection(prev, value));
    }, [state]);

    const liftCollapsed = useCallback((collapsed: boolean, tier = 5) => {
        setUICollapse((prev: UIState) => {
            switch (tier) {
                case 1:
                    return {
                        ...prev,
                        tierOneCollapsed: collapsed
                    }
                case 2:
                    return {
                        ...prev,
                        tierTwoCollapsed: collapsed
                    }
                case 3:
                    return {
                        ...prev,
                        tierThreeCollapsed: collapsed
                    }
                default:
                    return {
                        ...prev,
                        noblesCollapsed: collapsed
                    }
            }
        });
    }, [UICollapse, setUICollapse])

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
                        <section className={shouldRightSideCollapse(UICollapse) ? "gameboard-left-expanded" : "gameboard-left"}>
                            <Nobles state={state} setState={setState} liftCollapsed={liftCollapsed} />
                            <CardRow tier={3} state={state} setState={setState} liftCollapsed={liftCollapsed} />
                            <CardRow tier={2} state={state} setState={setState} liftCollapsed={liftCollapsed} />
                            <CardRow tier={1} state={state} setState={setState} liftCollapsed={liftCollapsed} />
                        </section>
                        <section className={shouldRightSideCollapse(UICollapse) ? "gameboard-right-compact" : "gameboard-right"}>
                            <AllPlayers
                                state={state} setState={setState} liftSelection={liftSelection}
                                UICollapse={UICollapse} setUICollapse={setUICollapse} liftCollapsed={liftCollapsed} />
                        </section>
                    </div>
                </div>
            )
        }
    }, [state, UICollapse]);

    return view
}