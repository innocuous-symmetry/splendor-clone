import { CardData, NobleData, PlayerData } from "./types";
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