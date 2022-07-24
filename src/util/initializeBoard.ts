import { Dispatch, SetStateAction } from "react";
import { AppState, FullDeck, NobleData } from "./types";
import NobleStore from '../data/nobles.json';

const shuffleDeck = (state: AppState, setState: Dispatch<SetStateAction<AppState>>) => {
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

const setNobles = (state: AppState, setState: Dispatch<SetStateAction<AppState>>) => {
    let newNobles = NobleStore.nobles;
    let shuffledNobles = new Array<NobleData>;

    while (shuffledNobles.length < 4) {
        const rand = Math.floor(Math.random() * newNobles.length);
        const randNoble = newNobles.splice(rand,1)[0];
        shuffledNobles.push(randNoble);
    }
    
    setState({ ...state, gameboard: { ...state.gameboard, nobles: shuffledNobles }})
}

export default function initializeBoard(state: AppState, setState: Dispatch<SetStateAction<AppState>>) {
    shuffleDeck(state, setState);

    let newDeck = state.gameboard.cardRows;
    for (const [key, value] of Object.entries(state.gameboard.deck)) {
        while (newDeck[key as keyof FullDeck].length < 4) {
            // @ts-ignore
            const nextCard = value.shift();
            newDeck[key as keyof FullDeck].push(nextCard);
        }
    }

    setState({ ...state, gameboard: { ...state.gameboard, cardRows: newDeck } })
    setNobles(state, setState);
}