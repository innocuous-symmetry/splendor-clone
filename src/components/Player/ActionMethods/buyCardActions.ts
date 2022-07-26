import { AppState, CardData, PlayerData, ResourceCost, setStateType } from "../../../util/types";
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

    console.log('called')

    let currentPlayer = useCurrentPlayer(state);
    console.log(currentPlayer);
    
    setState((prev: AppState) => {
        if (!currentPlayer) return prev;

        let newInventory = currentPlayer.inventory;
        for (let [gem, cost] of Object.entries(card.resourceCost)) {
            if (cost < 1) continue;
            
            let i = cost;
            let newInventoryValue = newInventory[gem as keyof ResourceCost];
            if (!newInventoryValue) continue;

            while (i > 0) {
                newInventoryValue--;
                i--;
            }

            newInventory[gem as keyof ResourceCost] = newInventoryValue;
        }

        let updatedPlayer: PlayerData = {
            ...currentPlayer,
            cards: [
                ...currentPlayer.cards,
                card
            ],
            inventory: newInventory
        }

        let allPlayers = prev.players;
        const idx = allPlayers.findIndex((one: PlayerData) => one.id === currentPlayer?.id);

        allPlayers[idx] = updatedPlayer;

        return {
            ...prev,
            players: allPlayers
        }
    })

    console.log(state);
}