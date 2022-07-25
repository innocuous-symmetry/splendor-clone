import { v4 } from 'uuid';
import { CardData, StateProps } from "../../util/types"
import Card from "../Card/Card"

interface CardRowProps extends StateProps {
    tier: number
}

export default function CardRow({tier, state, setState}: CardRowProps) {
    let cards: Array<CardData>
    switch (tier) {
        case 1:
            cards = state.gameboard.cardRows.tierOne;
            break;
        case 2:
            cards = state.gameboard.cardRows.tierTwo;
            break;
        case 3:
            cards = state.gameboard.cardRows.tierThree;
            break;
        default:
            cards = new Array<CardData>;
            break;
    }

    return (
        <div className={`card-row tier-${tier}`}>
            <p>Tier: {tier}</p>
            <div className="card-row-cards-visible">
                { cards && cards.map((cardData: CardData) => {
                    return <Card key={v4()} data={cardData} state={state} setState={setState} />
                })}
            </div>
        </div>
    )
}