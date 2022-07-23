import Player from "./Player";
import { v4 } from "uuid";
import { PlayerData, StateProps } from "../../util/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import "./AllPlayers.css"

interface AllPlayersProps extends StateProps {
    liftFromChildren?: any,
    chipSelection: {
        selection: String[],
        setSelection: Dispatch<SetStateAction<Array<String>>>
    }
}

export default function AllPlayers({ state, setState, chipSelection, liftFromChildren }: AllPlayersProps) {
    useEffect(() => {
        console.log(state);
    }, [state])

    return (
        <div className="all-players">
            {
                state.players?.map((player: PlayerData) => <Player key={v4()} liftFromChildren={liftFromChildren} chipSelection={chipSelection} player={player} state={state} setState={setState} />)
            }
        </div>
    )
}