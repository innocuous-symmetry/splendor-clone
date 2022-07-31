import cardTierToKey from "../../../util/cardTierToKey";
import { initialActions } from "../../../util/stateSetters";
import { turnOrderUtil } from "../../../util/turnOrderUtil";
import { AppState, CardData, PlayerData, ResourceCost, setStateType } from "../../../util/types";
import { useCurrentPlayer } from "../../../util/useCurrentPlayer";
import { getTotalBuyingPower } from "./buyCardActions";

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
        const totalBuyingPower = getTotalBuyingPower(state);

        // iterate through cost values of card to purchase
        for (let [gem, cost] of Object.entries(card.resourceCost)) {
            if (cost < 1) continue;
            let inventoryValue = newPlayerInventory[gem as keyof ResourceCost];
            let globalResource = newResourcePool[gem as keyof ResourceCost];
            
            if (!inventoryValue || !globalResource) {
                continue;
            } else {
                let i = cost;

                // prevents duplication of resources when purchasing a card using permanent resources from cards
                if (totalBuyingPower[gem as keyof ResourceCost] !== inventoryValue) {
                    console.log('caught');
                }

                while (i > 0) {
                    inventoryValue -= 1;
                    globalResource += 1;
                    i--;
                }
    
                newResourcePool[gem as keyof ResourceCost] = globalResource;
                newPlayerInventory[gem as keyof ResourceCost] = inventoryValue;
            }
        }

        let updatedPlayer: PlayerData = {
            ...currentPlayer,
            cards: [...currentPlayer.cards, card],
            inventory: newPlayerInventory
        }

        let newScore = 0;
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
            },
            actions: initialActions
        }
    })
}