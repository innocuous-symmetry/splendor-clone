import { PlayerData, SetActionType, StateProps } from "../../util/types"
import { useEffect, useState } from "react";
import { getChips } from "./ActionMethods";
import { v4 } from "uuid";

interface PlayerProps extends StateProps {
    player: PlayerData,
    setActionState: (value: SetActionType, player?: PlayerData) => void
}

export default function Player({ player, state, setState, setActionState }: PlayerProps) {
    const [dynamic, setDynamic] = useState<PlayerData>();

    useEffect(() => setDynamic(state.players.find((element: PlayerData) => element.id === player.id)), [state]);

    const handleSelection = (input: number) => {
        switch (input) {
            case 0:
                setActionState(SetActionType.GETCHIPS, player);
                getChips('ruby', dynamic, setState);
                break;
            case 1:
                setActionState(SetActionType.BUYCARD, player);
                break;
            default:
                setActionState(SetActionType.AWAIT, player);
                break;
        }
    }

    return (
        <div className="player-ui" key={v4()}>
            {/* Static Data */}
            <p>Name: {player.name}</p>
            <p>Score: {player.points}</p>
            <p>Is {player.starter || "not"} round starter</p>

            {/* Dynamic data from state */}
            <p>{dynamic?.turnActive ? "My turn!" : "..."}</p>
            <button onClick={() => handleSelection(0)}>Get Chips</button>
            <button onClick={() => handleSelection(1)}>Buy Card</button>
            <button onClick={() => handleSelection(2)}>Reserve Card</button>
            <div className="player-cards"></div>
            <div className="player-resources"></div>
        </div>
    )
}