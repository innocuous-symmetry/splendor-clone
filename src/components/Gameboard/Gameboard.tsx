import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import GameConstructor from '../../util/GameConstructor';
import { NobleData } from '../../util/types';
import AllPlayers from '../Player/AllPlayers';
import AvailableChips from '../Resources/AvailableChips';
import CardRow from './CardRow';
import Nobles from './Nobles';
import NobleStore from '../../data/nobles.json';

export default function Gameboard() {
    let AppContext = useContext(Context);
    let { gameboard, players } = AppContext;
    const [view, setView] = useState(<p>Loading...</p>)

    useEffect(() => {
        initializeBoard();
    }, [])

    useEffect(() => {
        if (!players.length) {
            setView(
                <div className="error-page">
                    <strong>Sorry! It appears we've lost track of your game data.</strong>
                    <p>Please head back to the <a href="/">home page</a> to start a fresh game.</p>
                </div>
            );
        } else {
            setView(
                <div className="gameboard-rows">
                    <Nobles />
                    <CardRow tier={3} cards={gameboard.cardRows.tierThree} />
                    <CardRow tier={2} cards={gameboard.cardRows.tierTwo} />
                    <CardRow tier={1} cards={gameboard.cardRows.tierOne} />
                    <AvailableChips />
                    <AllPlayers />
                </div>
            )
        }
    }, [players]);

    const shuffleDeck = () => {
        if (!gameboard.deck) return;
        let newDeck = gameboard.deck;

        for (const [key, value] of Object.entries(newDeck)) {
            for (let i = value.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                const temp = value[i];
                value[i] = value[j];
                value[j] = temp;
            }
        }

        gameboard.deck = newDeck;
    }

    const setNobles = () => {
        let newNobles = NobleStore.nobles;
        let shuffledNobles = new Array<NobleData>;

        while (shuffledNobles.length < 4) {
            const rand = Math.floor(Math.random() * newNobles.length);
            const randNoble = newNobles.splice(rand,1)[0];
            shuffledNobles.push(randNoble);
        }
        
        gameboard.nobles = shuffledNobles;
    }

    const initializeBoard = () => {
        shuffleDeck();
        setNobles();

        let newState = gameboard;

        for (const [key, value] of Object.entries(gameboard.deck)) {
            // @ts-ignore
            while (newState.cardRows[key].length < 4) {
                const nextCard = value.shift();
                // @ts-ignore
                newState.cardRows[key].push(nextCard);
            }
        }

        gameboard = newState;
    }

    return view;
}