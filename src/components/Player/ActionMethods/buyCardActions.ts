import { initialActions } from "../../../util/stateSetters";
import { turnOrderUtil } from "../../../util/turnOrderUtil";
import { AppState, CardData, ResourceCost, setStateType } from "../../../util/types";
import { useCurrentPlayer } from "../../../util/useCurrentPlayer";
import getTotalBuyingPower from "../../../util/getTotalBuyingPower";

export const tooExpensive = (card: CardData, state: AppState): boolean => {
    const currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return true;
    for (let [gemType, cost] of Object.entries(card.resourceCost)) {
        let totalBuyingPower = getTotalBuyingPower(state);
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

    setState(() => {
        const { newPlayers, roundIncrement } = turnOrderUtil(state, currentPlayer);
        const idx = newPlayers.indexOf(currentPlayer);
        const updatedPlayer = newPlayers[idx];

        const cardCost = card.resourceCost;
        const newPlayerInventory = updatedPlayer.inventory;
        const newResourcePool = state.gameboard.tradingResources;

        for (let key of Object.keys(cardCost)) {
            const typedKey = key as keyof ResourceCost;

            let adjustedCost = cardCost[typedKey];
            let adjustedInventoryValue = newPlayerInventory[typedKey];
            let adjustedResourcePoolValue = newResourcePool[typedKey];

            if (!adjustedCost || !adjustedInventoryValue || !adjustedResourcePoolValue) continue;

            while (adjustedCost > 0) {
                adjustedCost--;
                adjustedInventoryValue--;
                adjustedResourcePoolValue++;
            }
            
            newPlayerInventory[typedKey] = adjustedInventoryValue;
            newResourcePool[typedKey] = adjustedResourcePoolValue;
        }

        updatedPlayer.inventory = newPlayerInventory;
        newPlayers[idx] = updatedPlayer;

        state.gameboard.tradingResources = newResourcePool;
        roundIncrement && (state.round = state.round + 1);
        state.players = newPlayers;

        return state;
    })
}

// export const updateResources = (state: AppState, card: CardData) => {
//     console.log('updateResources called');
//     let currentPlayer = useCurrentPlayer(state);
//     let newTradingResources = state.gameboard.tradingResources;
//     let updatedPlayer = currentPlayer;
//     const totalBuyingPower = getTotalBuyingPower(state);

//     let difference = 0;
//     for (let [key, value] of Object.entries(card.resourceCost)) {
//         if (value < 1) continue;
//         if (value !== totalBuyingPower[key as keyof ResourceCost]) {
//             difference += Math.abs(totalBuyingPower[key as keyof ResourceCost] - value);
//         }
//     }

//     return { newTradingResources, updatedPlayer }
// }

// export const buyCard = (state: AppState, setState: setStateType, card: CardData) => {
//     let currentPlayer = useCurrentPlayer(state);
//     if (!currentPlayer) return;
//     const { newPlayers, roundIncrement } = turnOrderUtil(state, currentPlayer);

//     console.log('cleared to setstate');
    
//     setState((prev: AppState) => {
//         if (!currentPlayer) return prev;

//         const { newTradingResources, updatedPlayer } = updateResources(state, card);
//         const idx = newPlayers.indexOf(currentPlayer);
//         updatedPlayer && (newPlayers[idx] = updatedPlayer);
        
//         return {
//             ...prev,
//             gameboard: {
//                 ...prev.gameboard,
//                 cardRows: prev.gameboard.cardRows,
//                 tradingResources: newTradingResources
//             },
//             round: (roundIncrement ? prev.round + 1 : prev.round),
//             players: newPlayers,
//             actions: initialActions
//         }
//     })

//     // for testing?
//     return state;
// }