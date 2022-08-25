import { v4 } from "uuid";
import Player from "./Player";
import { PlayerData } from "../../util/types";
import { StateProps } from "../../util/propTypes";
import "./AllPlayers.scss"

export default function AllPlayers({ state, setState }: StateProps) {
    const playerPool = state.players?.map((player: PlayerData) => <Player key={v4()} player={player} state={state} setState={setState} />);

    return (
        <div className="all-players">
            { playerPool }
        </div>
    )
}