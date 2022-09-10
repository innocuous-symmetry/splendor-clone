import { v4 } from "uuid";
import Player from "./Player";
import { PlayerData } from "../../util/types";
import { ResourceProps } from "../../util/propTypes";
import "./AllPlayers.scss"
import AvailableChips from "../Resources/AvailableChips";
import SelectionView from "../Resources/SelectionView";
import { useEffect, useState } from "react";
import { useCurrentPlayer } from "../../hooks/useCurrentPlayer";

export default function AllPlayers({ state, setState, liftSelection }: ResourceProps) {
    const [playerView, setPlayerView] = useState<JSX.Element>();

    const playerPool = state.players?.map((player: PlayerData) => <Player key={v4()} player={player} state={state} setState={setState} />);

    useEffect(() => {
        const currentPlayer = useCurrentPlayer(state);
        if (!currentPlayer) return;
        setPlayerView(<Player key={v4()} player={currentPlayer} state={state} setState={setState} />);
    }, [state]);

    return (
        <div className="all-players">
            <SelectionView state={state} setState={setState} />
            <AvailableChips state={state} setState={setState} liftSelection={liftSelection} />
            { playerView }
        </div>
    )
}