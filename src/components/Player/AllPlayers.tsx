import { useEffect, useState } from "react";
import { v4 } from "uuid";
import Player from "./Player";
import { useCurrentPlayer } from "../../hooks/useCurrentPlayer";
import { AllPlayersProps } from "../../util/propTypes";
import AvailableChips from "../Resources/AvailableChips";
import SelectionView from "../Resources/SelectionView";
import "./AllPlayers.scss"

export default function AllPlayers({ state, setState, liftSelection, UICollapse }: AllPlayersProps) {
    const [playerView, setPlayerView] = useState<JSX.Element>();

    useEffect(() => {
        const currentPlayer = useCurrentPlayer(state);
        if (!currentPlayer) return;
        setPlayerView(<Player key={v4()} player={currentPlayer} state={state} setState={setState} />);
    }, [state]);

    return (
        <div className={UICollapse.playerUICollapsed ? "all-players collapsed" : "all-players"}>
            <SelectionView state={state} setState={setState} />
            <AvailableChips state={state} setState={setState} liftSelection={liftSelection} />
            { playerView }
        </div>
    )
}