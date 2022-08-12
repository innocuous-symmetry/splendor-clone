import { describe, expect, it, test } from "vitest";
import { initialActions } from "../../../../hooks/stateSetters";
import { mockPlayerOne, mockState } from "../../../../util/testUtils";
import { AppState, PlayerData } from "../../../../util/types";
import { hasMaxChips, validateChips } from "../getChipsActions";

const getChipsState: AppState = {
    ...mockState,
    actions: {
        ...initialActions,
        getChips: {
            active: true,
            selection: []
        }
    }
}

describe('get chips', () => {
    test('hasMaxChips', () => {
        const illegalPlayer: PlayerData = {
            ...mockPlayerOne,
            inventory: {
                ruby: 2,
                sapphire: 2,
                emerald: 2,
                diamond: 2,
                onyx: 2,
                gold: 2
            }
        }

        expect(hasMaxChips(illegalPlayer)).toBeTruthy();
    })

    describe('validateChips', () => {
        test('is falsy when chips action is not active', () => {
            expect(validateChips(mockState)).toBeFalsy();
        })

        test('is falsy when more than three chips selected', () => {
            const illegalState = getChipsState;
            illegalState.actions.getChips.selection = ['ruby', 'diamond', 'onyx', 'sapphire']
            expect(validateChips(illegalState)).toBeFalsy();
        })

        test('proper handling of duplicates', () => {
            const illegalState = getChipsState;
            illegalState.actions.getChips.selection = ['ruby', 'ruby', 'ruby']
            
            const legalState = getChipsState;
            legalState.actions.getChips.selection = ['ruby', 'ruby']

            expect(validateChips(illegalState)).toBeFalsy();
            expect(validateChips(legalState)).toBeTruthy();
        })

        test('no pickup of unavailable resources', () => {
            const illegalState = {
                ...mockState,
                gameboard: {
                    ...getChipsState.gameboard,
                    tradingResources: {
                        ruby: 4,
                        sapphire: 4,
                        emerald: 1,
                        diamond: 4,
                        onyx: 2,
                        gold: 4
                    }
                },
                actions: {
                    ...initialActions,

                }
            }
        })
    })
})