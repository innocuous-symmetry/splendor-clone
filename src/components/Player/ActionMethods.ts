import { AppState, PlayerData, ResourceCost, setStateType } from "../../util/types";
import { turnOrderUtil } from "../../util/TurnOrderUtil";
import { initialActions } from "../../util/stateSetters";

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
    
    if (selection.length === 0 || selection.length > 3) return false;
    const unique = new Set(selection);

    if (selection.length === 3 && selection.length > unique.size) return false;
    return true;
}

export const getChips = (state: AppState, setState: setStateType): boolean => {
    /**
     * features:
     * update their inventory state
     * update the total available resources
    */

    let targetPlayer: PlayerData;

    for (let each in state.players) {
        if (state.players[each].turnActive) {
            targetPlayer = state.players[each];
        }
    }

    setState((prev) => {
        const { newPlayers, roundIncrement } = turnOrderUtil(state, targetPlayer);
        const idx = newPlayers.indexOf(targetPlayer);
        const resources = state.actions.getChips.selection;
        let newResources = prev.gameboard.tradingResources;

        if (resources) {
            for (let value of resources) {

                // update player inventory
                for (let each in newPlayers[idx].inventory) {
                    if (value === each) {
                        newPlayers[idx].inventory[value] += 1;
                    }
                }

                // update globally available resources 
                for (let each in newResources) {
                    if (value === each) {
                        newResources[value] -= 1;
                    }
                }
            }

        }


        return {
            ...prev,
            round: (roundIncrement ? prev.round + 1 : prev.round),
            gameboard: {
                ...prev.gameboard,
                tradingResources: newResources
            },
            players: newPlayers,
            actions: initialActions
        }
    })

    console.log(state.players);

    return true;
}

export const buyCard = () => {
    return;
}

export const reserveCard = () => {
    return;
}