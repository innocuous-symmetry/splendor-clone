import { turnOrderUtil } from "../../../util/turnOrderUtil";
import { AppState, CardData, FullDeck, PlayerCards, ResourceCost, setStateType } from "../../../util/types";
import { useCurrentPlayer } from "../../../hooks/useCurrentPlayer";
import getTotalBuyingPower from "../../../util/getTotalBuyingPower";
import { initialActions, setStateGetNoble } from "../../../hooks/stateSetters";
import { canPickUpNoble } from "../../Nobles/canPickUpNoble";
import usePreviousPlayer from "../../../hooks/usePreviousPlayer";

export const tooExpensive = (card: CardData, state: AppState): boolean => {
    const currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return true;

    let availableGold = currentPlayer.inventory.gold || 0;

    // iterate through resource costs on card
    for (let [cardResource, cardQuantity] of Object.entries(card.resourceCost)) {
        let totalBuyingPower = getTotalBuyingPower(currentPlayer);
        // iterate through each section of player's total buying power
        for (let [heldResource, heldQuantity] of Object.entries(totalBuyingPower)) {
            // match card resource to held quantity
            if (cardResource === heldResource) {
                let adjustedQuantity = heldQuantity;
                // enter while loop if adjustedQuantity does not cover cost
                while (adjustedQuantity < cardQuantity) {
                    // if there is no gold available to modify cost, card is too expensive
                    if (!availableGold) return true;
                    // else, add to the insufficient quantity and decrement available gold
                    adjustedQuantity++;
                    availableGold--;
                }
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
        const cardCost: ResourceCost = card.resourceCost;
        const playerBuyingPower = getTotalBuyingPower(currentPlayer);
        const newPlayerInventory = updatedPlayer.inventory;
        const newResourcePool = prev.gameboard.tradingResources;
        let availableGold = updatedPlayer.inventory.gold || 0;

        // evaluate whether gold must be used, assign to boolean
        let buyingPowerTotal = 0;
        let cardCostTotal = 0;
        for (let key of Object.keys(playerBuyingPower)) {
            if (key === 'gold') continue;
            buyingPowerTotal += playerBuyingPower[key as keyof ResourceCost];
            cardCostTotal += cardCost[key as keyof ResourceCost] || 0;
        }

        let useGold = buyingPowerTotal < cardCostTotal;

        for (let key of Object.keys(cardCost)) {
            const typedKey = key as keyof ResourceCost;
            let adjustedCost = cardCost[typedKey];
            let adjustedInventoryValue = newPlayerInventory[typedKey];
            let adjustedResourcePoolValue = newResourcePool[typedKey] || 0;
            if (!adjustedCost || !adjustedInventoryValue) continue;

            // before decrementing player inventory values, account for total buying power
            const buyingPowerDifference = playerBuyingPower[typedKey] - adjustedInventoryValue;
            adjustedCost -= buyingPowerDifference;

            // logic to handle the use of a gold chip
            let newGoldCount = newResourcePool['gold'] || 0;
            while (useGold) {
                availableGold--;
                adjustedCost--;
                buyingPowerTotal++;
                newGoldCount++;
                useGold = buyingPowerTotal < cardCostTotal;
            }

            while (adjustedCost > 0) {
                adjustedInventoryValue--;
                adjustedCost--;
                adjustedResourcePoolValue++;
            }
            
            // assign modified values to player inventory and resource pool
            newPlayerInventory[typedKey] = adjustedInventoryValue;
            newResourcePool[typedKey] = adjustedResourcePoolValue;
            newResourcePool['gold'] = newGoldCount;
        }

        newPlayerInventory['gold'] = availableGold;

        // connect modified player state to updated list of all players
        const typeofCard = card.gemValue as keyof PlayerCards;
        updatedPlayer.cards[typeofCard] = [...updatedPlayer.cards[typeofCard], card]
        updatedPlayer.inventory = newPlayerInventory;
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
    });

    // iterates through gameboard nobles to determine if any can be acquired
    for (let noble of state.gameboard.nobles) {
        const previousPlayer = usePreviousPlayer(state);
        if (!previousPlayer) return;
        
        if (canPickUpNoble(previousPlayer, noble)) {
            setState((prev) => setStateGetNoble(prev, noble, previousPlayer));
        }
    }
}
