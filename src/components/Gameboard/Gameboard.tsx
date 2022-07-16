/// <reference path="Gameboard.d.ts" />
/// <reference path="../../util/main.d.ts" />

export default function Gameboard() {
    const exampleCard: Universals.Card = {
        gemValue: Universals.GemValue.Ruby,
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