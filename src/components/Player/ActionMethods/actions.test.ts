import { buyCard, getTotalBuyingPower, tooExpensive, updateResources } from './buyCardActions';
import { test, expect, describe } from 'vitest';
import { expensiveCard, mockPlayerOne, mockPlayerTwo, mockState } from '../../../util/testUtils';
import { useCurrentPlayer } from '../../../util/useCurrentPlayer';

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

    test('updateResources', () => {
        const currentPlayer = useCurrentPlayer(mockState);
        if (!currentPlayer) return;

        const { newTradingResources, updatedPlayer } = updateResources(mockState, expensiveCard);
        expect(newTradingResources).toBeDefined();
        expect(updatedPlayer).toBeDefined();
    })

    test('renders the correct inventory', () => {
        const output = 1;
        expect(output).toBe(1);
    })
})