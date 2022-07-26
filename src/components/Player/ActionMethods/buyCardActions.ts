import { turnOrderUtil } from "../../../util/turnOrderUtil";
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

    let currentPlayer = useCurrentPlayer(state);
    console.log(currentPlayer);
    
    setState((prev: AppState) => {
        if (!currentPlayer) return prev;

        const { newPlayers, roundIncrement } = turnOrderUtil(prev, currentPlayer);

        let newPlayerInventory = currentPlayer.inventory;
        let newResourcePool = prev.gameboard.tradingResources;

        for (let [gem, cost] of Object.entries(card.resourceCost)) {
            if (cost < 1) continue;
            
            let resourceToReplenish = newResourcePool[gem as keyof ResourceCost];
            let newInventoryValue = newPlayerInventory[gem as keyof ResourceCost];
            if (!newInventoryValue || !resourceToReplenish) continue;
            
            let i = cost;
            while (i > 0) {
                newInventoryValue--;
                i--;
            }

            resourceToReplenish += cost;

            newPlayerInventory[gem as keyof ResourceCost] = newInventoryValue;
            newResourcePool[gem as keyof ResourceCost] = resourceToReplenish;
        }

        let updatedPlayer: PlayerData = {
            ...currentPlayer,
            cards: [
                ...currentPlayer.cards,
                card
            ],
            inventory: newPlayerInventory
        }

        let newScore = updatedPlayer.points;
        for (let each of updatedPlayer.cards) {
            newScore += each.points || 0;
        }

        updatedPlayer.points = newScore;

        const idx = newPlayers.findIndex((one: PlayerData) => one.id === currentPlayer?.id);
        newPlayers[idx] = updatedPlayer;

        return {
            ...prev,
            gameboard: {
                ...prev.gameboard,
                tradingResources: prev.gameboard.tradingResources
            },
            round: (roundIncrement ? prev.round + 1 : prev.round),
            players: newPlayers
        }
    })
}