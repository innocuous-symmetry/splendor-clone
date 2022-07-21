import { CardData, FullDeck, NobleData, PlayerData, ResourceCost } from "../util/types"

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