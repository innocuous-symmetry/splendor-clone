import { PlayerProps } from "../../util/propTypes";
import { PlayerData } from "../../util/types"
import { useEffect, useState } from "react";
import { v4 } from "uuid";

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
            <section className="player-constants">
                <p>Name: {player.name}</p>
                <p>Score: {player.points}</p>
                <p>Is {player.starter || "not"} round starter</p>
            </section>

            {/* Dynamic data from state */}
            <section className="turn-and-action-based">
                <p>{dynamic?.turnActive ? prompt : '...'}</p>
                <button onClick={() => setActionSelection(0)}>Get Chips</button>
                <button onClick={() => setActionSelection(1)}>Buy Card</button>
                <button onClick={() => setActionSelection(2)}>Reserve Card</button>
            </section>

            <section className="resources">
                <strong>{dynamic?.name}'s Resources</strong>

                <div className="player-chips">
                    { dynamic && Object.entries(dynamic?.inventory).map(([key,value]) => {
                        return value > 0 && <p key={v4()}>{key}: {value}</p>
                    })}
                </div>

                <div className="player-cards">
                    { dynamic && dynamic.cards.length > 0 && Object.entries(dynamic.cards).map(([key, value]) => {
                        return (
                            <p key={v4()}></p>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}