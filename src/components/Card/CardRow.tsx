import { v4 } from 'uuid';
import { CardData } from "../../util/types"
import Card from "../Card/Card"

interface CardRowProps {
    tier: number,
    cards: CardData[]
}

export default function CardRow({tier, cards}: CardRowProps) {
    return (
        <div className={`card-row tier-${tier}`}>
            <p>Tier: {tier}</p>
            <div className="card-row-cards-visible">
                { cards && cards.map((cardData: CardData) => <Card key={v4()} data={cardData} />) }
            </div>
        </div>
    )
}