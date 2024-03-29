import cardTierToKey from "../../../util/mechanics/cardTierToKey";
import { initialActions } from "../../../hooks/stateSetters";
import { turnOrderUtil } from "../../../util/mechanics/TurnOrderUtil";
import { AppState, CardData, FullDeck, PlayerData, setStateType } from "../../../util/types";
import { useCurrentPlayer } from "../../../hooks/useCurrentPlayer";

export const goldAllowable = (player: PlayerData | null): boolean => {
    if (!player) return false;
    let chipCount = 0;
    for (let quantity of Object.values(player.inventory)) {
        chipCount += quantity;
    }

    if (chipCount >= 10) return false;
    return true;
}

export const hasMaxReserved = (player: PlayerData | null): boolean => {
    if (!player) return true;
    if (player.reservedCards && player.reservedCards.length >= 3) return true;
    return false;
}

export const reserveCard = (state: AppState, setState: setStateType, card: CardData) => {
    const currentPlayer = useCurrentPlayer(state);
    if (!currentPlayer) return;
    if (hasMaxReserved(currentPlayer)) return;
    
    setState((prev: AppState) => {
        const { newPlayers, roundIncrement } = turnOrderUtil(prev, currentPlayer);

        const updatedPlayer = currentPlayer;
        updatedPlayer.reservedCards = currentPlayer.reservedCards ? [
            ...currentPlayer.reservedCards, card
        ] : [card];

        const newResources = prev.gameboard.tradingResources;

        if (prev.actions.reserveCard.includeGold && newResources.gold) {
            updatedPlayer.inventory = {
                ...currentPlayer.inventory,
                gold: currentPlayer.inventory.gold ? currentPlayer.inventory.gold + 1 : 1
            }

            newResources.gold = newResources.gold - 1;
        }

        const idx = newPlayers.indexOf(currentPlayer);
        newPlayers[idx] = updatedPlayer;
        
        const newCardRows = prev.gameboard.cardRows;
        const targetTier: keyof FullDeck = cardTierToKey(card.tier);

        let updatedRow = newCardRows[targetTier];
        updatedRow = updatedRow.filter((each: CardData) => each.resourceCost !== card.resourceCost);
        newCardRows[targetTier] = updatedRow;
        
        return {
            ...prev,
            round: (roundIncrement ? prev.round + 1 : prev.round),
            players: newPlayers,
            actions: initialActions,
            gameboard: {
                ...prev.gameboard,
                cardRows: newCardRows
            }
        }
    })
}