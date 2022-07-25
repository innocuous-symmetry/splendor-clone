import { AppState, CardData, PlayerData, setStateType } from "../../util/types";
import { turnOrderUtil } from "../../util/TurnOrderUtil";
import { initialActions } from "../../util/stateSetters";
import { useCurrentPlayer } from "../../util/useCurrentPlayer";

// GET CHIPS ACTION HANDLERS
export const validateChips = (state: AppState): boolean => {
    if (!state.actions.getChips.active || !state.actions.getChips.selection) return false;

    const selection = state.actions.getChips.selection;
    
    if (selection.length === 0 || selection.length > 3) return false;
    const unique = new Set(selection);

    if (selection.length === 3 && selection.length > unique.size) return false;

    let globalResourceCopy = { ...state.gameboard.tradingResources }

    for (let item of selection) {
        for (let key of Object.keys(globalResourceCopy)) {
            if (item === key) {
                globalResourceCopy[key] -= 1;
            }
        }
    }

    for (let value of Object.values(globalResourceCopy)) {
        if (value < 0) return false;
    }

    return true;
}

export const getChips = (state: AppState, setState: setStateType) => {
    let targetPlayer = useCurrentPlayer(state);

    setState((prev) => {
        if (!targetPlayer) return prev;

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
}

// BUY CARDS ACTION HANDLERS
export const tooExpensive = (card: CardData, state: AppState): boolean => {
    const currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return true;

    for (let [gemType, cost] of Object.entries(card.resourceCost)) {
        for (let [heldResource, quantity] of Object.entries(currentPlayer.inventory)) {
            if (gemType === heldResource && quantity < cost) {
                return true;
            }
        }
    }

    return false;
}

export const buyCard = () => {
    return;
}

export const reserveCard = () => {
    return;
}