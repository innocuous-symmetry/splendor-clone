import { AppState } from "../util/types";
import { useCurrentPlayer } from "./useCurrentPlayer";

export default function usePreviousPlayer(state: AppState) {
    const currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return;

    const numPlayers = state.players.length;
    const targetID = currentPlayer.id;
    const idx = ((targetID - 2) < 0) ? (numPlayers - 1) : (targetID - 2);
    return state.players[idx];
}