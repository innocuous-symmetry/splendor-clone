import { AppState, CardData, NobleData, PlayerData, ResourceCost } from "./types";
import CardDeck from '../data/cards.json';

export const initialState = {
    gameboard: {
        nobles: new Array<NobleData>,
        cardRows: {
            tierOne: new Array<CardData>,
            tierTwo: new Array<CardData>,
            tierThree: new Array<CardData>,
        },
        tradingResources: {
            ruby: 7,
            sapphire: 7,
            emerald: 7,
            diamond: 7,
            onyx: 7,
            gold: 5
        },
        deck: CardDeck,
    },
    round: 1,
    players: new Array<PlayerData>,
    actions: {
        buyCard: { active: false },
        getChips: { active: false },
        reserveCard: { active: false }
    }
}

export const setStateGetChips = (prev: AppState) => {
    return {
        ...prev,
        actions: {
            ...initialState.actions,
            getChips: {
                active: true,
                selection: new Array<keyof ResourceCost>,
                valid: false
            }
        }
    }
}

export const setStateBuyCard = (prev: AppState) => {
    return {
        ...prev,
        actions: {
            ...initialState.actions,
            buyCard: {
                active: true,
                valid: false
            }
        }
    }
}

export const setStateReserveCard = (prev: AppState) => {
    return {
        ...prev,
        actions: {
            ...initialState.actions,
            reserveCard: {
                active: true,
                includeGold: false,
                valid: false
            }
        }
    }
}