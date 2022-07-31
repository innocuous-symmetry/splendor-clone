import { initialState } from "./stateSetters"
import { AppState, CardData, NobleData, PlayerData } from "./types"

// mock data for early game
export const mockPlayerOne: PlayerData = {
    name: "Player One",
    id: 1,
    starter: true,
    turnActive: true,
    points: 0,
    nobles: new Array<NobleData>,
    cards: new Array<CardData>,
    inventory: {
        ruby: 0,
        sapphire: 0,
        emerald: 0,
        onyx: 0,
        diamond: 0,
        gold: 0
    }
}

export const mockPlayerTwo: PlayerData = {
    name: "Player Two",
    id: 2,
    starter: false,
    turnActive: false,
    points: 0,
    nobles: new Array<NobleData>,
    cards: new Array<CardData>,
    inventory: {
        ruby: 0,
        sapphire: 0,
        emerald: 0,
        onyx: 0,
        diamond: 0,
        gold: 0
    }
}

export const mockState: AppState = {
    ...initialState,
    players: [mockPlayerOne, mockPlayerTwo]
}

// mock data for midgame
export const midGameState: AppState = {
    ...initialState,
    gameboard: {
        ...initialState.gameboard,
        tradingResources: {
            ruby: 1,
            sapphire: 1,
            emerald: 1,
            onyx: 1,
            diamond: 1,
            gold: 3
        }
    },
    round: 4,
    players: [
        {
            ...mockPlayerOne,
            cards: [
                ...mockPlayerOne.cards,
                {
                    gemValue: "diamond",
                    tier: 1,
                    points: 0,
                    resourceCost: {
                        ruby: 0,
                        sapphire: 0,
                        emerald: 2,
                        diamond: 2,
                        onyx: 0
                    }
                },
                {
                    gemValue: "diamond",
                    tier: 1,
                    points: 0,
                    resourceCost: {
                        ruby: 0,
                        sapphire: 3,
                        emerald: 0,
                        diamond: 0,
                        onyx: 0
                    }
                }
            ],
            inventory: {
                ruby: 0,
                sapphire: 0,
                emerald: 1,
                diamond: 3,
                onyx: 1,
                gold: 1
            }
        },
        {
            ...mockPlayerTwo
        }
    ]
}

// miscellaneous mock data
export const expensiveCard: CardData = {
    gemValue: 'diamond',
    tier: 3,
    points: 5,
    resourceCost: {
        ruby: 0,
        sapphire: 0,
        emerald: 7,
        onyx: 0,
        diamond: 0
    }
}