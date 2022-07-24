import { AppState, PlayerData, ResourceCost, setStateType } from "../../util/types";
import { TurnOrderUtil } from "../../util/TurnOrderUtil";

export const getChips = (resource: string, dynamic: PlayerData | undefined, setState: setStateType) => {
    if (!dynamic || !dynamic?.turnActive) return;

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

export const buyCard = () => {
    return;
}

export const reserveCard = () => {
    return;
}