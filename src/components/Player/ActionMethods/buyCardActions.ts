import { AppState, CardData, setStateType } from "../../../util/types";
import { useCurrentPlayer } from "../../../util/useCurrentPlayer";

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

export const buyCard = (card: CardData, state: AppState, setState: setStateType) => {
    /**
     * functionality: adds target card's data to current player's collection of cards,
     * removes the card from the active state of the gameboard, replaces it with
     * a new card in the correct tier, and runs turn order utility
     * 
     * @param card -> the target card, @param state -> current app state
    */

    const currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return;

    setState((prev: AppState) => {
        let updatedPlayer = {
            ...currentPlayer,
            cards: [
                ...currentPlayer.cards,
                card
            ]
        }

        return {
            ...prev
        }
    })
}