/// <reference path="Card.d.ts" />

export default function Card(data: CardInfo.Card) {
    return (
        <div className="card">
            <p>{data.gemValue}</p>
            <p>{data.tier}</p>
            <p>{data.points || 0}</p>
            <p>{data.cost}</p>
        </div>
    )
}