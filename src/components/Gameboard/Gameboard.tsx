import { useEffect, useState } from 'react';
import { CardData, NobleData } from '../../util/types';
import CardRow from './CardRow';
import CardDeck from '../../data/cards.json';
import Nobles from '../../data/nobles.json';

export default function Gameboard() {
    const [state, setState] = useState({
        deck: CardDeck,
        nobles: Nobles.nobles,
        cardRows: {
            tierOne: new Array<CardData>,
            tierTwo: new Array<CardData>,
            tierThree: new Array<CardData>
        },
        tradingResources: {
            ruby: 7,
            sapphire: 7,
            emerald: 7,
            diamond: 7,
            onyx: 7,
            gold: 5
        }
    })

    const [view, setView] = useState(<p>Loading...</p>)

    useEffect(() => {
        initializeBoard();
        console.log(state);
    }, [])

    useEffect(() => {
        setView(
            <>
            <CardRow tier={3} cards={state.cardRows.tierThree} />
            <CardRow tier={2} cards={state.cardRows.tierTwo} />
            <CardRow tier={1} cards={state.cardRows.tierOne} />
            </>
        )
    }, [state.cardRows]);

    const shuffleDeck = () => {
        if (!state.deck) return;
        let newDeck = state.deck;

        for (const [key, value] of Object.entries(newDeck)) {
            for (let i = value.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                const temp = value[i];
                value[i] = value[j];
                value[j] = temp;
            }
        }

        setState({ ...state, deck: newDeck });
    }

    const setNobles = () => {
        let newNobles = state.nobles;
        let shuffledNobles = new Array<NobleData>;

        while (shuffledNobles.length < 4) {
            const rand = Math.floor(Math.random() * newNobles.length);
            const randNoble = newNobles.splice(rand,1)[0];
            shuffledNobles.push(randNoble);
        }
        
        setState({ ...state, nobles: shuffledNobles });
    }

    const initializeBoard = () => {
        shuffleDeck();
        setNobles();

        let newState = state;

        for (const [key, value] of Object.entries(state.deck)) {
            // @ts-ignore
            while (newState.cardRows[key].length < 4) {
                const nextCard = value.shift();
                // @ts-ignore
                newState.cardRows[key].push(nextCard);
            }
        }

        setState(newState);
    }

    return (
        <div>
            <h1>SPLENDOR</h1>
            { view }
        </div>
    )
}