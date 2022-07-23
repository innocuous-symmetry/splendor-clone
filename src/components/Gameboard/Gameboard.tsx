import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CardData, FullDeck, NobleData, StateProps } from '../../util/types';
import AllPlayers from '../Player/AllPlayers';
import AvailableChips from '../Resources/AvailableChips';
import CardRow from './CardRow';
import Nobles from './Nobles';
import NobleStore from '../../data/nobles.json';

export default function Gameboard({ state, setState }: StateProps) {
    const [view, setView] = useState(<p>Loading...</p>)

    useEffect(() => {
        initializeBoard();
    }, [])

    useEffect(() => {
        if (!state.players.length) {
            setView(
                <div className="error-page">
                    <strong>Sorry! It appears we've lost track of your game data.</strong>
                    <p>Please head back to the <a href="/">home page</a> to start a fresh game.</p>
                </div>
            );
        } else {
            setView(
                <div className="gameboard-rows">
                    <strong>Round: {state.round}</strong>
                    <Nobles state={state} setState={setState} />
                    <CardRow tier={3} cards={state.gameboard.cardRows.tierThree} />
                    <CardRow tier={2} cards={state.gameboard.cardRows.tierTwo} />
                    <CardRow tier={1} cards={state.gameboard.cardRows.tierOne} />
                    <AvailableChips state={state} setState={setState} />
                    <AllPlayers state={state} setState={setState} />
                </div>
            )
        }
    }, [state]);

    const shuffleDeck = () => {
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

    const setNobles = () => {
        let newNobles = NobleStore.nobles;
        let shuffledNobles = new Array<NobleData>;

        while (shuffledNobles.length < 4) {
            const rand = Math.floor(Math.random() * newNobles.length);
            const randNoble = newNobles.splice(rand,1)[0];
            shuffledNobles.push(randNoble);
        }
        
        setState({ ...state, gameboard: { ...state.gameboard, nobles: shuffledNobles }})
    }

    const initializeBoard = () => {
        shuffleDeck();

        let newDeck = state.gameboard.cardRows;
        for (const [key, value] of Object.entries(state.gameboard.deck)) {
            while (newDeck[key as keyof FullDeck].length < 4) {
                // @ts-ignore
                const nextCard = value.shift();
                newDeck[key as keyof FullDeck].push(nextCard);
            }
        }

        setState({ ...state, gameboard: { ...state.gameboard, cardRows: newDeck } })
        setNobles();
    }

    return view
}