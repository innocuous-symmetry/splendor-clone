import { AppState, PlayerData, ResourceCost, setStateType } from "../../util/types";
import { turnOrderUtil } from "../../util/TurnOrderUtil";

export const _getChips = (resource: string | Array<keyof ResourceCost>, dynamic: PlayerData | undefined, setState: setStateType) => {
    if (!dynamic || !dynamic?.turnActive) return;

    setState((prev: AppState) => {
        const { newPlayers, roundIncrement } = turnOrderUtil(prev, dynamic);

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

export const validateChips = (state: AppState): boolean => {
    if (!state.actions.getChips.active || !state.actions.getChips.selection) return false;

    const selection = state.actions.getChips.selection;
    
    if (selection.length < 2 || selection.length > 3) return false;
    const unique = new Set(selection);

    if (selection.length === 3 && selection.length > unique.size) return false;
    return true;
}

export const getChips = (state: AppState, setState: setStateType): boolean => {
    /**
     * features:
     * identify player to receive currently selected chips
     * update their inventory state
     * update the total available resources
     * change turn order
    */

    setState((prev: AppState) => {
        return prev;
    })

    return true;
}

export const buyCard = () => {
    return;
}

export const reserveCard = () => {
    return;
}