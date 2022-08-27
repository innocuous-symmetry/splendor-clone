import { useState } from 'react';
import { v4 } from 'uuid';
import cardTierToKey from '../../util/cardTierToKey';
import { CardRowProps } from '../../util/propTypes';
import { CardData } from "../../util/types"
import Card from "../Card/Card"
import "./CardRow.scss";

export default function CardRow({tier, state, setState}: CardRowProps) {
    const [collapsed, setCollapsed] = useState(true);
    const typedTier = cardTierToKey(tier);

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
        <div className={`card-row tier-${tier} ${collapsed && 'collapsed'}`}>
            <div className="card-row-top-bar">
                <p>Tier: {tier}</p>
                <button onClick={() => setCollapsed(!collapsed)}>{collapsed ? "Show" : "Hide"}</button>
            </div>
            <div className={`card-row-cards-visible ${collapsed && 'hidden'}`}>
                <div className={`card-count cc-tier-${tier}`}>
                    <p>Remaining: {state.gameboard.deck[typedTier].length}</p>
                </div>
                { cards && cards.map((cardData: CardData) => {
                    return <Card key={v4()} data={cardData} state={state} setState={setState} />
                })}
            </div>
        </div>
    )
}