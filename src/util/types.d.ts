export interface GameInformation {
    players: PlayerData[],
    nobles: NobleData[],
    cardsInPlay: CardData[],
    fullDeck: FullDeck
}

export interface PlayerData {
    name: string,
    starter: boolean,
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
    points: number,
    resourceCost: ResourceCost
}

export enum GemValue {
    Ruby,
    Sapphire,
    Emerald,
    Diamond,
    Onyx,
    Gold,
}