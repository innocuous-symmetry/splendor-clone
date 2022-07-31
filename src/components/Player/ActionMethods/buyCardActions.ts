import cardTierToKey from "../../../util/cardTierToKey";
import { turnOrderUtil } from "../../../util/turnOrderUtil";
import { AppState, CardData, FullDeck, PlayerData, ResourceCost, setStateType } from "../../../util/types";
import { useCurrentPlayer } from "../../../util/useCurrentPlayer";

export const tooExpensive = (card: CardData, state: AppState): boolean => {
    const currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return true;
    for (let [gemType, cost] of Object.entries(card.resourceCost)) {
        let totalBuyingPower = {
            ruby: 0,
            sapphire: 0,
            emerald: 0,
            diamond: 0,
            onyx: 0,
            gold: 0,
        }

        for (let [key,quantity] of Object.entries(currentPlayer.inventory)) {
            totalBuyingPower[key as keyof ResourceCost] += quantity;
        }

        for (let each of currentPlayer.cards) {
            totalBuyingPower[each.gemValue as keyof ResourceCost] += 1;
        }
        
        for (let [heldResource, quantity] of Object.entries(totalBuyingPower)) {
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
            cards: [...currentPlayer.cards, card],
            inventory: newPlayerInventory
        }

        let newScore = updatedPlayer.points;
        for (let each of updatedPlayer.cards) {
            newScore += each.points || 0;
        }

        updatedPlayer.points = newScore;
        const idx = newPlayers.findIndex((one: PlayerData) => one.id === currentPlayer?.id);
        newPlayers[idx] = updatedPlayer;
        let updatedRows = prev.gameboard.cardRows;

        if (card.tier) {
            const tierKey = cardTierToKey(card.tier);
            updatedRows[tierKey] = prev.gameboard.cardRows[tierKey].filter((found: CardData) => found.resourceCost !== card.resourceCost);
        }

        return {
            ...prev,
            round: (roundIncrement ? prev.round + 1 : prev.round),
            players: newPlayers,
            gameboard: {
                ...prev.gameboard,
                tradingResources: prev.gameboard.tradingResources,
                cardRows: updatedRows
            }
        }
    })
}