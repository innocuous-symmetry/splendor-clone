import { AppState, PlayerData } from "./types";

export const TurnOrderUtil = (prev: AppState, dynamic: PlayerData) => {
    let roundIncrement = false;
    const newPlayers = prev.players;

    for (let each of newPlayers) {
        if (each.id === dynamic.id) {
            each.turnActive = false;
        } else if (each.id === dynamic.id + 1) {
            each.turnActive = true;
        } else if (dynamic.id + 1 > newPlayers.length) {
            each.turnActive = false;
            newPlayers[0].turnActive = true;
            roundIncrement = true;
        } else {
            each.turnActive = false;
        }
    }

    return { newPlayers, roundIncrement };
}