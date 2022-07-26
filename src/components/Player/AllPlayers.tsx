import Player from "./Player";
import { v4 } from "uuid";
import "./AllPlayers.css"
import { PlayerData } from "../../util/types";
import { useState } from "react";
import { AllPlayersProps } from "../../util/propTypes";

export default function AllPlayers({ state, setState, setActionState }: AllPlayersProps) {
    const [activePlayer, setActivePlayer] = useState();
    const playerPool = state.players?.map((player: PlayerData) => <Player key={v4()} player={player} state={state} setState={setState} setActionState={setActionState} />);

    return (
        <div className="all-players">
            {
                playerPool
            }
        </div>
    )
}