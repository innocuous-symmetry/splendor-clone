import { AppState, FullDeck, NobleData, setStateType } from "./types";
import NobleStore from '../data/nobles.json';

const shuffleDeck = (state: AppState, setState: setStateType) => {
    if (!state.gameboard.deck) return;
    let newDeck: FullDeck = state.gameboard.deck;

    for (const [key, value] of Object.entries(newDeck)) {
        for (let i = value.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = value[i];
            value[i] = value[j];
            value[j] = temp;
        }
    }

    setState({ ...state, gameboard: { ...state.gameboard, deck: newDeck }})
}

const setNobles = (state: AppState, setState: setStateType) => {
    let newNobles = NobleStore.nobles;
    let shuffledNobles = new Array<NobleData>;

    while (shuffledNobles.length < 4) {
        const rand = Math.floor(Math.random() * newNobles.length);
        const randNoble = newNobles.splice(rand,1)[0];
        shuffledNobles.push(randNoble);
    }
    
    setState({ ...state, gameboard: { ...state.gameboard, nobles: shuffledNobles }})
}

export const setCardRows = (state: AppState) => {
    let newDeck = state.gameboard.cardRows;
    for (const [key, value] of Object.entries(state.gameboard.deck)) {
        while (newDeck[key as keyof FullDeck].length < 4) {
            const nextCard = value.shift();
            newDeck[key as keyof FullDeck].push(nextCard);
        }
    }
    return newDeck;
}

export default function initializeBoard(state: AppState, setState: setStateType) {
    shuffleDeck(state, setState);
    const newDeck = setCardRows(state);
    setState({ ...state, gameboard: { ...state.gameboard, cardRows: newDeck } })
    setNobles(state, setState);
}