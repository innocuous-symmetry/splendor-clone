import { AppState, PlayerData, ResourceCost, StateProps } from "../../util/types"
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { TurnOrderUtil } from "../../util/TurnOrderUtil";

interface PlayerProps extends StateProps {
    player: PlayerData
}

export default function Player({ player, state, setState }: PlayerProps) {
    const [dynamic, setDynamic] = useState<PlayerData>();

    useEffect(() => {
        setDynamic(state.players.find((element: PlayerData) => element.id === player.id));
    }, [state]);

    const getChips = (resource: string) => {
        if (!dynamic?.turnActive) return;

        setState((prev: AppState) => {
            const { newPlayers, roundIncrement } = TurnOrderUtil(prev, dynamic);

            return {
                ...prev,
                round: (roundIncrement ? prev.round + 1 : prev.round),
                gameboard: {
                    ...prev.gameboard,
                    tradingResources: {
                        ...prev.gameboard.tradingResources,
                        [resource as keyof ResourceCost]: prev.gameboard.tradingResources[resource as keyof ResourceCost] -= 1
                    }
                },
                players: newPlayers
            }
        })
    }

    return (
        <div className="player-ui" key={v4()}>
            {/* Static Data */}
            <p>Name: {player.name}</p>
            <p>Score: {player.points}</p>
            <p>Is {player.starter || "not"} round starter</p>

            {/* Dynamic data from state */}
            <p>{dynamic?.turnActive ? "My turn!" : "..."}</p>
            <button onClick={() => getChips('ruby')}>Get Chips</button>
            <div className="player-cards"></div>
            <div className="player-resources"></div>
        </div>
    )
}