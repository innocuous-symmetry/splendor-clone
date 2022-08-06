import { turnOrderUtil } from "../../../util/turnOrderUtil";
import { AppState, CardData, ResourceCost, setStateType } from "../../../util/types";
import { useCurrentPlayer } from "../../../util/useCurrentPlayer";
import getTotalBuyingPower from "../../../util/getTotalBuyingPower";
import { initialActions } from "../../../util/stateSetters";

export const tooExpensive = (card: CardData, state: AppState): boolean => {
    const currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return true;
    for (let [gemType, cost] of Object.entries(card.resourceCost)) {
        let totalBuyingPower = getTotalBuyingPower(currentPlayer);
        for (let [heldResource, quantity] of Object.entries(totalBuyingPower)) {
            if (gemType === heldResource && quantity < cost) {
                return true;
            }
        }
    }

    return false;
}

export const buyCard = (state: AppState, setState: setStateType, card: CardData) => {
    const currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return;

    setState((prev) => {
        const { newPlayers, roundIncrement } = turnOrderUtil(prev, currentPlayer);
        const idx = newPlayers.indexOf(currentPlayer);
        const updatedPlayer = newPlayers[idx];

        const cardCost = card.resourceCost;
        const playerBuyingPower = getTotalBuyingPower(currentPlayer);
        const newPlayerInventory = updatedPlayer.inventory;
        const newResourcePool = prev.gameboard.tradingResources;

        for (let key of Object.keys(cardCost)) {
            const typedKey = key as keyof ResourceCost;

            let adjustedCost = cardCost[typedKey];
            let adjustedInventoryValue = newPlayerInventory[typedKey];
            let adjustedResourcePoolValue = newResourcePool[typedKey];

            if (!adjustedCost || !adjustedInventoryValue || !adjustedResourcePoolValue) continue;

            const buyingPowerDifference = playerBuyingPower[typedKey] - adjustedInventoryValue;
            adjustedCost -= buyingPowerDifference;

            while (adjustedCost > 0) {
                adjustedInventoryValue--;
                adjustedResourcePoolValue++;

                adjustedCost--;
            }
            
            newPlayerInventory[typedKey] = adjustedInventoryValue;
            newResourcePool[typedKey] = adjustedResourcePoolValue;
        }

        updatedPlayer.inventory = newPlayerInventory;
        updatedPlayer.cards = [...updatedPlayer.cards, card];
        newPlayers[idx] = updatedPlayer;

        return {
            ...prev,
            players: newPlayers,
            round: (roundIncrement ? prev.round + 1 : prev.round),
            actions: initialActions,
            gameboard: {
                ...prev.gameboard,
                tradingResources: newResourcePool
            }
        }
    })
}
