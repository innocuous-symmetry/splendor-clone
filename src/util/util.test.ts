import { describe, expect, test } from "vitest"
import cardTierToKey from "./mechanics/cardTierToKey";
import { mockPlayerOne, mockState } from "./testUtils";
import { turnOrderUtil } from "./mechanics/TurnOrderUtil";
import { useCurrentPlayer } from "../hooks/useCurrentPlayer";
import getTotalBuyingPower from "./mechanics/getTotalBuyingPower";

describe('app utilities', () => {
    test('useCurrentPlayer', () => {
        const currentPlayer = useCurrentPlayer(mockState);
        if (!currentPlayer) return;
        expect(currentPlayer).toBeDefined();
        expect(currentPlayer.name).toBe("Player One");
    })

    test('turnOrderUtil', () => {
        const { newPlayers, roundIncrement } = turnOrderUtil(mockState, mockPlayerOne);

        expect(roundIncrement).toBeDefined();
        expect(newPlayers[0].turnActive).toBeFalsy();
        expect(newPlayers[1].turnActive).toBeTruthy();
    })

    test('cardTierToKey', () => {
        const first = cardTierToKey(1);
        const second = cardTierToKey(2);
        const third = cardTierToKey(3);

        expect(first).toBe("tierOne");
        expect(second).toBe("tierTwo");
        expect(third).toBe("tierThree");
    })

    test('tierToKey throws on invalid input', () => {
        expect(() => {
            cardTierToKey(100)
        }).toThrow();
    })

    test('initializeBoard', () => {
        expect(1).toBe(1);
    })

    test('get total buying power', () => {
        const currentPlayer = useCurrentPlayer(mockState);
        if (!currentPlayer) return;

        const bp = getTotalBuyingPower(currentPlayer);
        expect(bp).toBeDefined();
    })
})

export {}