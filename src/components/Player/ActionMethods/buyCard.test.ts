import { expensiveCard, midGameCardOne, midGameCardTwo, midGameState, mockPlayerOne, mockPlayerTwo, mockState, playerTwoMidGame } from '../../../util/testUtils';
import { buyCard, tooExpensive } from './buyCardActions';
import getTotalBuyingPower from '../../../util/getTotalBuyingPower';
import { useCurrentPlayer } from '../../../util/useCurrentPlayer';
import { AppState, PlayerData } from '../../../util/types';
import { test, expect, describe } from 'vitest';
import { renderHook } from "@testing-library/react";
import { useState } from 'react';
import { initialState } from '../../../util/stateSetters';

describe('buy cards', () => {
    test('detects unaffordable cards', () => {
        const result = tooExpensive(expensiveCard, mockState);
        expect(result).toBeTruthy();
    })

    test('calculates total buying power', () => {
        let modifiedState = {
            ...mockState,
            players: [
                {
                    ...mockPlayerOne,
                    inventory: {
                        ruby: 3,
                        sapphire: 3,
                        emerald: 3,
                        onyx: 3,
                        diamond: 3,
                        gold: 3
                    },
                    cards: [expensiveCard]
                },
                mockPlayerTwo
            ]
        }
        
        const totalBuyingPower = getTotalBuyingPower(modifiedState);

        const expectedValue = {
            ruby: 3,
            sapphire: 3,
            emerald: 3,
            onyx: 3,
            diamond: 4,
            gold: 3
        }

        expect(totalBuyingPower).toStrictEqual(expectedValue);
    })

    test('buyCard and updateResources', () => {
        const { result } = renderHook(() => {
            const [state, setState] = useState(midGameState);

            return { state, setState }
        })

        const { state, setState } = result.current;

        const currentPlayer = useCurrentPlayer(state);
        if (!currentPlayer) return;

        /**
         * actions in test:
         * midGameState :: playerOneMidGame, playerTwoMidGame
         * playerOneMidGame => buy midGameCardTwo
         * playerTwoMidGame => buy midGameCardOne
        */

        let P1UPDATED = state.players.filter((p: PlayerData) => p.name === "Player One")[0];
        let P2UPDATED = state.players.filter((p: PlayerData) => p.name === "Player Two")[0];

        // playerOne receives midGameCardTwo and pays three diamonds back to resource pool
        P1UPDATED = {
            ...P1UPDATED,
            cards: [...P1UPDATED.cards, midGameCardTwo],
            turnActive: false,
            inventory: {
                ...P1UPDATED.inventory,
                diamond: 0
            }
        }

        P2UPDATED = { ...P2UPDATED, turnActive: true }

        const moveOneExpectedState: AppState = {
            ...state,
            players: [P1UPDATED, P2UPDATED],
            gameboard: {
                ...state.gameboard,
                tradingResources: {
                    ...state.gameboard.tradingResources,
                    diamond: 4
                }
            }
        }

        // first player action
        // @ts-ignore
        const newState = buyCard(state, setState, midGameCardTwo);
        expect(newState).toStrictEqual(moveOneExpectedState);

        // playerTwo receives midGameCardOne and pays four rubies back to resource pool
        P2UPDATED = {
            ...P2UPDATED,
            cards: [...P2UPDATED.cards, midGameCardOne],
            turnActive: false,
            inventory: {
                ...P2UPDATED.inventory,
                ruby: 0
            }
        }

        P1UPDATED = { ...P1UPDATED, turnActive: true }

        const moveTwoExpectedState: AppState = {
            ...moveOneExpectedState,
            players: [P1UPDATED, P2UPDATED],
            gameboard: {
                ...moveOneExpectedState.gameboard,
                tradingResources: {
                    ...moveOneExpectedState.gameboard.tradingResources,
                    ruby: 4
                }
            }
        }
        
        expect(() => {
            if (!newState) throw Error();
        }).not.toThrowError();

        if (newState) {
            // @ts-ignore
            const finalState = buyCard(newState, setState, midGameCardOne);
            expect(finalState).toStrictEqual(moveTwoExpectedState);
        }
    })
})

// describe('get chips', () => {})
// describe('reserve card', () => {})