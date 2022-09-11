import { useEffect, useState } from "react";
import { SelectionProps } from "../../util/propTypes";
import { useCurrentPlayer } from "../../hooks/useCurrentPlayer";
import { GetChipsHTML, ReserveCardHTML } from "./ViewHTML";
import { shouldRightSideCollapse } from "../../util/mechanics/shouldRightSideCollapse";

export default function SelectionView({ state, setState, UICollapse }: SelectionProps) {
    const [currentPlayer, setCurrentPlayer] = useState(useCurrentPlayer(state));
    const actionTypes = [
        state.actions.getChips,
        state.actions.buyCard,
        state.actions.reserveCard
    ]

    const [view, setView] = useState(<></>);

    useEffect(() => {
        setCurrentPlayer(useCurrentPlayer(state));
        setView(() => {
            switch (true) {
                case (actionTypes[0].active):
                    return <GetChipsHTML state={state} setState={setState} UICollapse={UICollapse} />
                case (actionTypes[1].active):
                    return (
                        <div className={shouldRightSideCollapse(UICollapse) ? "selection-view-mini" : "selection-view"}>
                            <h2>{currentPlayer?.name} has elected to purchase a card!</h2>
                            <strong>Choose a card above to purchase.</strong>
                        </div>
                    )
                case (actionTypes[2].active):
                    return <ReserveCardHTML state={state} setState={setState} UICollapse={UICollapse} />;
                default:
                    return (
                        <div className="selection-view">
                            <h2>{currentPlayer ? `It is currently ${currentPlayer.name}'s turn!` : "Loading..."}</h2>
                        </div>
                    );
            }
        })
    }, [state, setState])

    return view
}