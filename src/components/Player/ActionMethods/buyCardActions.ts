import { turnOrderUtil } from "../../../util/turnOrderUtil";
import getTotalBuyingPower from "../../../util/getTotalBuyingPower";
import { AppState, CardData, PlayerCards, ResourceCost, setStateType } from "../../../util/types";
import cardTierToKey from "../../../util/cardTierToKey";
import { canPickUpNoble } from "../../Nobles/canPickUpNoble";
import { initialActions, setStateGetNoble } from "../../../hooks/stateSetters";
import { useCurrentPlayer } from "../../../hooks/useCurrentPlayer";
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

        // assign pointers
        const newResourcePool = prev.gameboard.tradingResources;
        const cardCost = card.resourceCost;
        const updatedPlayer = newPlayers[idx];
        let availableGold = updatedPlayer.inventory['gold'] || 0;

        // iterate and perform purchase logic
        for (let key of Object.keys(updatedPlayer.inventory)) {
            const typedKey = key as keyof ResourceCost;
            if (key === 'gold') continue;
            if (cardCost[typedKey] === 0) continue;

            // derived pointers for sections of state
            let inventoryPointer = updatedPlayer.inventory[typedKey] || 0;
            let resourcePoolPointer = newResourcePool[typedKey] || 0;
            let cardCostPointer = cardCost[typedKey] || 0;
            let heldCardPointer = updatedPlayer.cards[key as keyof PlayerCards].length || 0;
            let goldToReturn = 0;

            // reduce required cost by number of permanent resources
            while (heldCardPointer > 0) {
                heldCardPointer--;
                cardCostPointer--;
            }

            // use available gold to account for difference between cardCost and inventory
            while (cardCostPointer > inventoryPointer) {
                if (availableGold > 0) {
                    availableGold--;
                    cardCostPointer--;
                    goldToReturn++;
                } else {
                    break;
                }
            }

            // redistribute gold back into resource pool
            while (goldToReturn > 0) {
                updatedPlayer.inventory['gold'] && updatedPlayer.inventory['gold']--;
                newResourcePool['gold'] && newResourcePool['gold']++;
                goldToReturn--;
            }

            // complete remaining details of transaction
            while (cardCostPointer > 0) {
                cardCostPointer--;
                inventoryPointer--;
                resourcePoolPointer++;
            }

            // reassign to higher scope variables
            newResourcePool[typedKey] = resourcePoolPointer;
            updatedPlayer.inventory[typedKey] = inventoryPointer;
            updatedPlayer.inventory['gold'] = availableGold;
        }

        // update player's held cards
        updatedPlayer.cards = {
            ...updatedPlayer.cards,
            [card.gemValue]: [...updatedPlayer.cards[card.gemValue as keyof PlayerCards], card]
        }

        let reservedCardCheck = false;
        // checks if current card was bought from reserved cards, removing it if so
        if (updatedPlayer.reservedCards) {
            let beforeLength = updatedPlayer.reservedCards.length;
            updatedPlayer.reservedCards = updatedPlayer.reservedCards.filter((each: CardData) => each.resourceCost !== card.resourceCost);
            let afterLength = updatedPlayer.reservedCards.length;
            if (beforeLength !== afterLength) reservedCardCheck = true;
        }

        let newScore = 0;
        for (let each in updatedPlayer.cards) {
            updatedPlayer.cards[each as keyof PlayerCards].forEach((value: CardData) => newScore += (value.points || 0));
            // newScore += updatedPlayer.cards[each as keyof PlayerCards].length;
        }

        newScore += (updatedPlayer.nobles.length * 3)
        updatedPlayer.points = newScore;

        const typedCardTier = cardTierToKey(card.tier);
        let newFullDeckTargetTier = prev.gameboard.deck[typedCardTier];
        let newTargetCardRow = prev.gameboard.cardRows[typedCardTier];

        if (!reservedCardCheck) {
            const replacementCard = newFullDeckTargetTier.shift();
            newTargetCardRow = newTargetCardRow.filter((data: CardData) => data.resourceCost !== card.resourceCost);
            if (replacementCard) newTargetCardRow.push(replacementCard);
        }

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

    console.log(state.players);

    // iterates through gameboard nobles to determine if any can be acquired
    for (let noble of state.gameboard.nobles) {
        const previousPlayer = usePreviousPlayer(state);
        if (!previousPlayer) return;
        
        if (canPickUpNoble(previousPlayer, noble)) {
            setState((prev) => setStateGetNoble(prev, noble, previousPlayer));
        }
    }
}
