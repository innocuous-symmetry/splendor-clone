import { AppState } from "../../../util/types";
import { useCurrentPlayer } from "../../../util/useCurrentPlayer";

export const reserveCard = (state: AppState) => {
    const currentPlayer = useCurrentPlayer(state);
    console.log(currentPlayer);
}