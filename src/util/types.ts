import { Dispatch, SetStateAction } from "react"

export interface AppState {
    gameboard: {
        nobles: Array<NobleData>,
        cardRows: {
            tierOne: Array<CardData>
            tierTwo: Array<CardData>
            tierThree: Array<CardData>
        },
        tradingResources: ResourceCost
        deck: FullDeck,
    },
    round: number,
    players: Array<PlayerData>,
    actions: ActionTypes
}

export interface StateProps {
    state: AppState,
    setState: Dispatch<SetStateAction<AppState>>
}

export enum GameActions {
    GETCHIPS,
    BUYCARD,
    RESERVECARD,
    AWAIT
}

export interface ActionTypes {
    getChips: {
        active: boolean
        chips?: Array<keyof ResourceCost>
        valid?: boolean
    }
    buyCard: {
        active: boolean
        card?: CardData | null
    }
    reserveCard: {
        active: boolean
        card?: CardData | null
        includeGold?: boolean
    }
}

export enum ActionPrompts {
    "Choose your action type below:",
    "Make a selection of three different available resources, or two of the same.",
    "Choose a card to purchase above.",
    "Select any card above to reserve. You will also automatically take a gold chip.",
    "Select any card above to reserve. You have the maximum allowed number of chips, so you cannnot take a gold chip.",
    "It is not your turn."
}

export interface GameInformation {
    players: PlayerData[],
    nobles: NobleData[],
    cardsInPlay: CardData[],
    fullDeck: FullDeck
}

export interface PlayerData {
    name: string,
    id: number,
    starter: boolean,
    turnActive?: boolean,
    points: number,
    nobles: NobleData[],
    cards: CardData[],
    inventory: {
        [Property in keyof ResourceCost]: number
    }
}

export interface FullDeck {
    tierOne: CardData[],
    tierTwo: CardData[],
    tierThree: CardData[]
}

export interface CardData {
    gemValue: GemValue | string
    tier?: number
    points?: number
    resourceCost: ResourceCost
}

export interface ResourceCost {
    ruby: number,
    sapphire: number,
    emerald: number,
    diamond: number,
    onyx: number,
    gold?: number
}

export interface NobleData {
    nobleid?: number,
    points: number,
    resourceCost: ResourceCost
}

export enum GemValue {
    ruby,
    sapphire,
    emerald,
    diamond,
    onyx,
    gold,
}
