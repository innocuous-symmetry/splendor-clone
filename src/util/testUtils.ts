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
// playerOneMidGame buys high diamond cost card
export const playerOneMidGame = {
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
}

// playerTwoMidGame buys high ruby cost card
export const playerTwoMidGame = {
    ...mockPlayerTwo,
    cards: [
        ...mockPlayerTwo.cards,
        {
            gemValue: "ruby",
            tier: 1,
            points: 0,
            resourceCost: {
                ruby: 3,
                sapphire: 0,
                emerald: 0,
                diamond: 0,
                onyx: 0
            }
        },
        {
            gemValue: "ruby",
            tier: 1,
            points: 0,
            resourceCost: {
                ruby: 0,
                sapphire: 1,
                emerald: 1,
                diamond: 1,
                onyx: 1
            }
        }
    ],
    inventory: {
        ruby: 4,
        sapphire: 0,
        emerald: 0,
        diamond: 0,
        onyx: 0
    }
}

export const midGameState: AppState = {
    ...initialState,
    gameboard: {
        ...initialState.gameboard,
        tradingResources: {
            ruby: 0,
            sapphire: 1,
            emerald: 1,
            onyx: 1,
            diamond: 1,
            gold: 3
        }
    },
    round: 4,
    players: [playerOneMidGame, playerTwoMidGame]
}

export const midGameCardOne: CardData = {
    gemValue: 'ruby',
    tier: 2,
    points: 2,
    resourceCost: {
        ruby: 0,
        sapphire: 0,
        emerald: 0,
        diamond: 5,
        onyx: 0
    }
}

export const midGameCardTwo: CardData = {
    gemValue: 'diamond',
    tier: 2,
    points: 2,
    resourceCost: {
        ruby: 5,
        sapphire: 0,
        emerald: 0,
        diamond: 0,
        onyx: 0
    }
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