import { expensiveCard, midGameCardOne, midGameCardTwo, midGameState, mockPlayerOne, mockPlayerTwo, mockState } from '../../../util/testUtils';
import { buyCard, tooExpensive } from './buyCardActions';
import getTotalBuyingPower from '../../../util/getTotalBuyingPower';
import { useCurrentPlayer } from '../../../hooks/useCurrentPlayer';
import { AppState, CardData, PlayerData, ResourceCost } from '../../../util/types';
import { test, expect, describe, vi, afterEach } from 'vitest';
import { renderHook } from "@testing-library/react";
import React, { useState } from 'react';
import { turnOrderUtil } from '../../../util/turnOrderUtil';

afterEach(() => {
    vi.restoreAllMocks();
})

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
        
        const totalBuyingPower = getTotalBuyingPower(mockPlayerOne);

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
})

// describe('get chips', () => {})
// describe('reserve card', () => {})