import { CardData, StateProps } from '../../util/types';
import { v4 } from 'uuid';

interface CardProps extends StateProps {
    data: CardData
}

export default function Card({ data, state, setState }: CardProps) {
    return (
        <div className={`card`}>
            <div className="top-row">
                <p>Counts as: {data.gemValue}</p>
                <p>Point value: {data.points || 0}</p>
                <p>Cost:</p>
                {
                    Object.keys(data.resourceCost).map((key, value) => {
                        // @ts-ignore
                        return (data.resourceCost[key] > 0) && <p key={v4()}>{key}: {data.resourceCost[key]}</p>
                    })
                }
                { state.actions.buyCard.active && <button>Buy This Card</button> }
            </div>
        </div>
    )
}