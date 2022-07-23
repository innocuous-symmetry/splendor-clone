import Player from "./Player";
import { v4 } from "uuid";
import { PlayerData, StateProps } from "../../util/types";
import { Dispatch, SetStateAction } from "react";
import "./AllPlayers.css"

interface AllPlayersProps extends StateProps {
    chipSelection: {
        selection: String[],
        setSelection: Dispatch<SetStateAction<Array<String>>>
    }
}

export default function AllPlayers({ state, setState, chipSelection }: AllPlayersProps) {
    const {selection, setSelection} = chipSelection;

    return (
        <div className="all-players">
            {
                state.players?.map((player: PlayerData) => <Player key={v4()} chipSelection={chipSelection} player={player} state={state} setState={setState} />)
            }
        </div>
    )
}