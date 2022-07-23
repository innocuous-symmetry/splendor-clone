import { Dispatch, SetStateAction } from "react"
import { AppState } from "../context/types"

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
    players: Array<PlayerData>
}

export interface StateProps {
    state: AppState,
    setState: Dispatch<SetStateAction<AppState>>
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
