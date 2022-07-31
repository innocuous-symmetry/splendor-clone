import { AppState, PlayerData, setStateType } from '../../../util/types';
import { useCurrentPlayer } from '../../../util/useCurrentPlayer';
// @ts-ignore
import { turnOrderUtil } from '../../../util/turnOrderUtil';
import { initialActions } from "../../../util/stateSetters";

export const hasMaxChips = (player: PlayerData | null): boolean => {
    if (!player) return true;
    let sum = 0;
    for (let count of Object.values(player.inventory)) {
        sum += count;
    }
    if (sum >= 10) return true;
    return false;
}

export const validateChips = (state: AppState): boolean => {
    if (!state.actions.getChips.active || !state.actions.getChips.selection) return false;
    const selection = state.actions.getChips.selection;

    // requires a selection to be made, and less than three chips to be selected
    if (selection.length === 0 || selection.length > 3) return false;

    // ensures correct handling of duplicate chips
    const unique = new Set(selection);
    if (selection.length === 3 && selection.length > unique.size) return false;

    // allows only one gold chip to be collected at a time
    if (selection.includes('gold') && unique.size > 1) return false; 

    // ensures the player cannot collect unavailable resources
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

        const { newPlayers, roundIncrement } = turnOrderUtil(prev, targetPlayer);
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