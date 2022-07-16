/// <reference path="Gameboard.d.ts" />
/// <reference path="../Card/Card.d.ts" />

import { useState, useEffect } from "react"

export default function Gameboard() {
    const [cards, setCards] = useState();

    const exampleCard: CardInfo.Card = {
        gemValue: "ruby",
        tier: 1,
        cost: 5
    }

    return (
        <div>
            <h1>Gameboard</h1>
            <p>Name: {exampleCard.gemValue}</p>
            <p>Tier: {exampleCard.tier}</p>
            <p>Cost: {exampleCard.cost}</p>
        </div>
    )
}