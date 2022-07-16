/// <reference path="../../util/main.d.ts" />

export default function Card(data: Universals.Card) {
    return (
        <div className="card">
            <p>{data.gemValue}</p>
            <p>{data.tier}</p>
            <p>{data.points || 0}</p>
            <p>{data.cost}</p>
        </div>
    )
}