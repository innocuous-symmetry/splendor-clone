import { initialActions } from "../../../util/stateSetters";
import { turnOrderUtil } from "../../../util/turnOrderUtil";
import { AppState, CardData, ResourceCost, setStateType } from "../../../util/types";
import { useCurrentPlayer } from "../../../util/useCurrentPlayer";

export const getTotalBuyingPower = (state: AppState) => {
    const currentPlayer = useCurrentPlayer(state);
    
    let totalBuyingPower = {
        ruby: 0,
        sapphire: 0,
        emerald: 0,
        diamond: 0,
        onyx: 0,
        gold: 0,
    }

    if (!currentPlayer) return totalBuyingPower;
    
    for (let [key,quantity] of Object.entries(currentPlayer.inventory)) {
        totalBuyingPower[key as keyof ResourceCost] += quantity;
    }

    for (let each of currentPlayer.cards) {
        totalBuyingPower[each.gemValue as keyof ResourceCost] += 1;
    }

    return totalBuyingPower;
}

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

export const updateResources = (state: AppState, card: CardData) => {
    let currentPlayer = useCurrentPlayer(state);
    let newTradingResources = state.gameboard.tradingResources;
    let updatedPlayer = currentPlayer;
    const totalBuyingPower = getTotalBuyingPower(state);

    let difference = 0;
    for (let [key, value] of Object.entries(card.resourceCost)) {
        if (value < 1) continue;
        if (value !== totalBuyingPower[key as keyof ResourceCost]) {
            difference += Math.abs(totalBuyingPower[key as keyof ResourceCost] - value);
        }
    }

    return { newTradingResources, updatedPlayer }
}

export const buyCard = (state: AppState, setState: setStateType, card: CardData) => {
    let currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return;
    const { newPlayers, roundIncrement } = turnOrderUtil(state, currentPlayer);
    
    setState((prev: AppState) => {
        if (!currentPlayer) return prev;

        const { newTradingResources, updatedPlayer } = updateResources(state, card);
        const idx = newPlayers.indexOf(currentPlayer);
        updatedPlayer && (newPlayers[idx] = updatedPlayer);
        
        return {
            ...prev,
            gameboard: {
                ...prev.gameboard,
                cardRows: prev.gameboard.cardRows,
                tradingResources: newTradingResources
            },
            round: (roundIncrement ? prev.round + 1 : prev.round),
            players: newPlayers,
            actions: initialActions
        }
    })
}