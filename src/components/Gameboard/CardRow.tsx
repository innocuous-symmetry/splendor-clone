import { CardData } from "../../util/types"
import Card from "../Card/Card"

export default function CardRow(tier: number, cards: CardData[]) {
    return (
        <>
        <p>Tier: {tier}</p>
        <div>
            <p>Cards:</p>
            { cards.map((cardData: CardData) => <Card data={cardData} />) }
        </div>
        </>
    )
}