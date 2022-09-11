import { useEffect, useState } from "react";
import { v4 } from "uuid";
import Player from "./Player";
import { useCurrentPlayer } from "../../hooks/useCurrentPlayer";
import { AllPlayersProps } from "../../util/propTypes";
import AvailableChips from "../Resources/AvailableChips";
import SelectionView from "../Resources/SelectionView";
import "./AllPlayers.scss"
import { shouldRightSideCollapse } from "../../util/mechanics/shouldRightSideCollapse";

export default function AllPlayers({ state, setState, liftSelection, UICollapse }: AllPlayersProps) {
    const [playerView, setPlayerView] = useState<JSX.Element>();
    const [collapseClass, setCollapseClass] = useState("all-players");

    useEffect(() => {
        const currentPlayer = useCurrentPlayer(state);
        if (!currentPlayer) return;
        setPlayerView(<Player key={v4()} player={currentPlayer} state={state} setState={setState} />);
    }, [state]);

    useEffect(() => {
        setCollapseClass( shouldRightSideCollapse(UICollapse) ? "mini-player-ui" : "all-players" );
    }, [UICollapse]);

    return (
        <div className={collapseClass}>
            <SelectionView state={state} setState={setState} />
            <AvailableChips state={state} setState={setState} liftSelection={liftSelection} />
            { playerView }
        </div>
    )
}