import { useEffect, useState } from 'react';
import { CardData, NobleData, GemValue } from '../../util/types';
import CardDeck from '../../util/cards.json';

export default function Gameboard() {
    const [state, setState] = useState({
        deck: CardDeck,
        nobles: new Array<NobleData>,
        cardRows: {
            tierOne: new Array<CardData>,
            tierTwo: new Array<CardData>,
            tierThree: new Array<CardData>
        },
    })

    useEffect(() => {
        initializeBoard();
        console.log(state || null);
    }, [])

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

    const initializeBoard = () => {
        shuffleDeck();

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
            <h1>Gameboard</h1>
        </div>
    )
}