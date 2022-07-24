import Player from "./Player";
import { v4 } from "uuid";
import "./AllPlayers.css"
import { PlayerData, SetActionType, StateProps } from "../../util/types";

interface AllPlayersProps extends StateProps {
    setActionState: (value: SetActionType, player?: PlayerData) => void
}

export default function AllPlayers({ state, setState, setActionState }: AllPlayersProps) {
    return (
        <div className="all-players">
            {
                state.players?.map((player: PlayerData) => <Player key={v4()} player={player} state={state} setState={setState} setActionState={setActionState} />)
            }
        </div>
    )
}