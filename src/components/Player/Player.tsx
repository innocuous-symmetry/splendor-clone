import { PlayerData, SetActionType, StateProps } from "../../util/types"
import { useEffect, useState } from "react";
import { v4 } from "uuid";

interface PlayerProps extends StateProps {
    player: PlayerData,
    setActionState: (value: SetActionType, player?: PlayerData) => void
}

export default function Player({ player, state, setState, setActionState }: PlayerProps) {
    const [dynamic, setDynamic] = useState<PlayerData>();
    const [prompt, setPrompt] = useState("Your turn! Select an action type below.");
    const [actionSelection, setActionSelection] = useState(-1);

    useEffect(() => {
        setDynamic(state.players.find((element: PlayerData) => element.id === player.id))
    }, [state]);

    useEffect(() => {
        setActionState(actionSelection, dynamic);

        if (state.actions.getChips.active) {
            setPrompt('Make your selection of up to three chips.');
        } else if (state.actions.buyCard.active) {
            setPrompt('Choose a card above to purchase.');
        } else if (state.actions.reserveCard.active) {
            setPrompt('Choose a card above to reserve.');
        } else {
            setPrompt("Your turn! Select an action type below.");
        }
    }, [actionSelection])

    return (
        <div className="player-ui" key={v4()}>
            {/* Static Data */}
            <p>Name: {player.name}</p>
            <p>Score: {player.points}</p>
            <p>Is {player.starter || "not"} round starter</p>

            {/* Dynamic data from state */}
            <p>{dynamic?.turnActive ? prompt : '...'}</p>
            <button onClick={() => setActionSelection(0)}>Get Chips</button>
            <button onClick={() => setActionSelection(1)}>Buy Card</button>
            <button onClick={() => setActionSelection(2)}>Reserve Card</button>
            <div className="player-cards">
                <strong>{dynamic?.name}'s Resources</strong>
                { dynamic && Object.entries(dynamic?.inventory).map(([key,value]) => {
                    return value > 0 && <p key={v4()}>{key}: {value}</p>
                })}
            </div>
            <div className="player-resources"></div>
        </div>
    )
}