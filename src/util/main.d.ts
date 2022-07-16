declare namespace Universals {
    export interface Card {
        gemValue: GemValue
        tier: number
        points?: number
        cost: any
    }

    export interface Nobles {
        points: 3

    }

    export enum GemValue {
        Ruby,
        Sapphire,
        Emerald,
        Diamond,
        Onyx,
        Gol,
    }
}