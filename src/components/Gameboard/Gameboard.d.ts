/// <reference path="../Card/Card.d.ts" />

declare namespace Gameboard {
    export interface CardRow {
        tier: number
        displayedCards: Card[3]
        remainingCards: Card[]
    }
}