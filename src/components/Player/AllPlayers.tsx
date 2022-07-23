import Player from "./Player";
import { v4 } from "uuid";
import "./AllPlayers.css"
import { PlayerData, StateProps } from "../../util/types";

export default function AllPlayers({ state, setState }: StateProps) {
    return (
        <div className="all-players">
            {
                state.players?.map((player: PlayerData) => <Player key={v4()} player={player} state={state} setState={setState} />)
            }
        </div>
    )
}