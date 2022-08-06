import { turnOrderUtil } from "../../../util/turnOrderUtil";
import { AppState, CardData, FullDeck, ResourceCost, setStateType } from "../../../util/types";
import { useCurrentPlayer } from "../../../util/useCurrentPlayer";
import getTotalBuyingPower from "../../../util/getTotalBuyingPower";
import { initialActions } from "../../../util/stateSetters";

export const tooExpensive = (card: CardData, state: AppState): boolean => {
    const currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return true;
    for (let [cardGemType, cardCost] of Object.entries(card.resourceCost)) {
        let totalBuyingPower = getTotalBuyingPower(currentPlayer);
        for (let [heldResource, quantity] of Object.entries(totalBuyingPower)) {
            if (cardGemType === heldResource && quantity < cardCost) {
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
        // shift turn order and identify current player in new player state
        const { newPlayers, roundIncrement } = turnOrderUtil(prev, currentPlayer);
        const idx = newPlayers.indexOf(currentPlayer);
        const updatedPlayer = newPlayers[idx];

        // pointers for each value to be modified
        const cardCost = card.resourceCost;
        const playerBuyingPower = getTotalBuyingPower(currentPlayer);
        const newPlayerInventory = updatedPlayer.inventory;
        const newResourcePool = prev.gameboard.tradingResources;

        for (let key of Object.keys(cardCost)) {
            const typedKey = key as keyof ResourceCost;
            let adjustedCost = cardCost[typedKey];
            let adjustedInventoryValue = newPlayerInventory[typedKey];
            let adjustedResourcePoolValue = newResourcePool[typedKey] || 0;
            if (!adjustedCost || !adjustedInventoryValue) continue;

            // before decrementing player inventory values, account for total buying power
            const buyingPowerDifference = playerBuyingPower[typedKey] - adjustedInventoryValue;
            adjustedCost -= buyingPowerDifference;

            while (adjustedCost > 0) {
                adjustedInventoryValue--;
                adjustedCost--;
                adjustedResourcePoolValue++;
            }
            
            // assign modified values to player inventory and resource pool
            newPlayerInventory[typedKey] = adjustedInventoryValue;
            newResourcePool[typedKey] = adjustedResourcePoolValue;
        }

        // connect modified player state to updated list of all players
        updatedPlayer.inventory = newPlayerInventory;
        updatedPlayer.cards = [...updatedPlayer.cards, card];
        updatedPlayer.points = updatedPlayer.points + (card.points || 0);
        newPlayers[idx] = updatedPlayer;

        // attempt to queue replacement card from full deck
        const typedCardTier = ["tierThree", "tierTwo", "tierOne"][2 - (card.tier-1)] as keyof FullDeck;
        let newFullDeckTargetTier = prev.gameboard.deck[typedCardTier];
        const replacementCard = newFullDeckTargetTier.shift();

        // isolate the affected row of face up cards, remove the purchased card
        let newTargetCardRow = prev.gameboard.cardRows[typedCardTier];
        newTargetCardRow = newTargetCardRow.filter((data: CardData) => data.resourceCost !== card.resourceCost);
        // push replacement card to face up card, if exists
        if (replacementCard) newTargetCardRow.push(replacementCard);

        return {
            ...prev,
            players: newPlayers,
            round: (roundIncrement ? prev.round + 1 : prev.round),
            actions: initialActions,
            gameboard: {
                ...prev.gameboard,
                tradingResources: newResourcePool,
                cardRows: {
                    ...prev.gameboard.cardRows,
                    [typedCardTier]: newTargetCardRow
                },
                deck: {
                    ...prev.gameboard.deck,
                    [typedCardTier]: newFullDeckTargetTier
                }
            }
        }
    })
}
