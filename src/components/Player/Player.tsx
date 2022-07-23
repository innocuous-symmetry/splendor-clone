import { AppState, PlayerData, ResourceCost, StateProps } from "../../util/types"
import { v4 } from "uuid";

interface PlayerProps extends StateProps {
    player: PlayerData
}

export default function Player({ player, state, setState }: PlayerProps) {
    const getChips = (resource: string) => {
        setState((prev: AppState) => {
            return {
                ...prev,
                gameboard: {
                    ...prev.gameboard,
                    tradingResources: {
                        ...prev.gameboard.tradingResources,
                        [resource as keyof ResourceCost]: prev.gameboard.tradingResources[resource as keyof ResourceCost] -= 1
                    }
                }
            }
        })
        
        console.log(state);
    }

    return (
        <div className="player-ui" key={v4()}>
            {/* Static Data */}
            <p>Name: {player.name}</p>
            <p>Score: {player.points}</p>
            <p>Is {player.starter || "not"} round starter</p>

            {/* Dynamic data from state */}
            <button onClick={() => getChips('ruby')}>Get Chips</button>
            <div className="player-cards"></div>
            <div className="player-resources"></div>
        </div>
    )
}