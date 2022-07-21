import { CardData, NobleData, PlayerData } from '../util/types';
import CardDeck from '../data/cards.json';
import { createContext } from 'react';
import { AppState } from './types';

export const appState: AppState = {
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
    round: 0,
    players: new Array<PlayerData>,
}

export const Context = createContext(appState);