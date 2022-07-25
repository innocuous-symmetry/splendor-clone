import { AppState, PlayerData } from "./types";

export const useCurrentPlayer = (state: AppState): PlayerData | null => {
    /**
     * takes in current app state and the current active player
     * @param state = current app state
     * @returns: @PlayerData if a matching player is found,
     * or @null if one is not found
     */

    const currentPlayers = state.players;
    if (!currentPlayers) return null;

    for (let each of currentPlayers) {
        if (each.turnActive) return each;
    }

    return null;
}