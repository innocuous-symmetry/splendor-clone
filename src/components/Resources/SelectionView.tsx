import { useEffect, useState } from "react";
import { StateProps } from "../../util/propTypes";
import { useCurrentPlayer } from "../../hooks/useCurrentPlayer";
import { GetChipsHTML, ReserveCardHTML } from "./ViewHTML";
import './SelectionView.scss';

export default function SelectionView({ state, setState }: StateProps) {
    const [currentPlayer, setCurrentPlayer] = useState(useCurrentPlayer(state));
    const actionTypes = [
        state.actions.getChips,
        state.actions.buyCard,
        state.actions.reserveCard
    ]

    const [view, setView] = useState(<></>);

    useEffect(() => {
        setView(() => {
            switch (true) {
                case (actionTypes[0].active):
                    return <GetChipsHTML state={state} setState={setState} />
                case (actionTypes[1].active):
                    return (
                        <div className="selection-view">
                            <h2>{currentPlayer?.name} has elected to purchase a card!</h2>
                            <strong>Choose a card above to purchase.</strong>
                        </div>
                    )
                case (actionTypes[2].active):
                    return <ReserveCardHTML state={state} setState={setState} />;
                default:
                    return (
                        <div className="selection-view">
                            <h2>{currentPlayer ? `It is currently ${currentPlayer.name}'s turn!` : "Loading..."}</h2>
                        </div>
                    );
            }
        })

        setCurrentPlayer(useCurrentPlayer(state));
    }, [state, state.actions, setState])

    return view
}