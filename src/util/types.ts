export interface FullDeck {
    tierOne: CardData[],
    tierTwo: CardData[],
    tierThree: CardData[]
}

export interface CardData {
    gemValue: GemValue
    tier: number
    points?: number
    cost: ResourceCost
}

export interface ResourceCost {
    ruby: number,
    sapphire: number,
    emerald: number,
    diamond: number,
    onyx: number,
}

export interface NobleData {
    points: 3,
    cost: ResourceCost
}

export enum GemValue {
    Ruby,
    Sapphire,
    Emerald,
    Diamond,
    Onyx,
    Gold,
}