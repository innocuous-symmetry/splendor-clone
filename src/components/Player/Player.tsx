import { PlayerData, SetActionType, StateProps } from "../../util/types"
import { useEffect, useState } from "react";
import { v4 } from "uuid";

interface PlayerProps extends StateProps {
    player: PlayerData,
    setActionState: (value: SetActionType, player?: PlayerData) => void
}

export default function Player({ player, state, setState, setActionState }: PlayerProps) {
    const [dynamic, setDynamic] = useState<PlayerData>();
    const [prompt, setPrompt] = useState("My turn!");
    const [actionSelection, setActionSelection] = useState(-1);

    useEffect(() => setDynamic(state.players.find((element: PlayerData) => element.id === player.id)), [state]);

    useEffect(() => {
        setActionState(actionSelection, dynamic);
        setPrompt(() => {
            switch (actionSelection) {
                case -1:
                    return "My turn!"
                case 0:
                    return "Select up to three different chips, or two of the same color."
                case 1:
                    return "Buy a card from the ones above using your available resources."
                case 2:
                    return "Choose a card from the ones above to reserve for later purchase. \
                    If you have less than ten chips, you may also pick up a gold chip."
                default:
                    return ""
            }
        })
    }, [actionSelection, prompt])

    return (
        <div className="player-ui" key={v4()}>
            {/* Static Data */}
            <p>Name: {player.name}</p>
            <p>Score: {player.points}</p>
            <p>Is {player.starter || "not"} round starter</p>

            {/* Dynamic data from state */}
            {dynamic?.turnActive ? <p>{prompt}</p> : <p>...</p>}
            <button onClick={() => setActionSelection(0)}>Get Chips</button>
            <button onClick={() => setActionSelection(1)}>Buy Card</button>
            <button onClick={() => setActionSelection(2)}>Reserve Card</button>
            <div className="player-cards"></div>
            <div className="player-resources"></div>
        </div>
    )
}