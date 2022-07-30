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
    actions: StateActions
}

interface StateActions {
    setAction?: (arg: SetActionType) => void
    getChips: {
        active: boolean
        selection?: Array<keyof ResourceCost>
        valid?: boolean
        confirm?: () => void
    }
    buyCard: {
        active: boolean
        selection?: CardData
        valid?: boolean
        confirm?: () => void
    }
    reserveCard: {
        active: boolean
        selection?: CardData
        includeGold?: boolean
        valid?: boolean
        confirm?: () => void
    }
}

export enum SetActionType {
    GETCHIPS,
    BUYCARD,
    RESERVECARD,
    AWAIT
}

export type setStateType = Dispatch<SetStateAction<AppState>>

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
    reservedCards?: CardData[],
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
