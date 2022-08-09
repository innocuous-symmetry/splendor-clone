import { describe, expect, test } from "vitest"
import { initialState } from "../../../../hooks/stateSetters"
import { mockPlayerTwo } from "../../../../util/testUtils"
import { AppState, CardData, PlayerData } from "../../../../util/types"
import { tooExpensive } from "../buyCardActions"

describe("buy card methods", () => {
    test("tooExpensive", () => {
        const card: CardData = {
            gemValue: 'ruby',
            tier: 3,
            points: 0,
            resourceCost: {
                ruby: 0,
                sapphire: 0,
                emerald: 0,
                diamond: 0,
                onyx: 3
            }
        }

        const testPlayer: PlayerData = {
            name: "Test Player",
            id: 1,
            starter: true,
            turnActive: true,
            points: 0,
            cards: [],
            nobles: [],
            inventory: {
                ruby: 1,
                sapphire: 1,
                emerald: 1,
                diamond: 1,
                onyx: 1
            }
        }

        const sampleState: AppState = {
            ...initialState,
            players: [testPlayer, mockPlayerTwo]
        }

        expect(tooExpensive(card, sampleState)).toBeTruthy();
    })

    test('tooExpensive accounts for gold chips', () => {
        const card: CardData = {
            gemValue: 'ruby',
            tier: 3,
            points: 0,
            resourceCost: {
                ruby: 0,
                sapphire: 0,
                emerald: 0,
                diamond: 0,
                onyx: 3
            }
        }

        const testPlayer: PlayerData = {
            name: "Test Player",
            id: 1,
            starter: true,
            turnActive: true,
            points: 0,
            cards: [],
            nobles: [],
            inventory: {
                ruby: 1,
                sapphire: 1,
                emerald: 1,
                diamond: 1,
                onyx: 2,
                gold: 1
            }
        }

        const sampleState: AppState = {
            ...initialState,
            players: [testPlayer, mockPlayerTwo]
        }

        expect(tooExpensive(card, sampleState)).toBeFalsy();
    })
})

export default {}