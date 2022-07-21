import { CardData } from '../../util/types';
import { v4 } from 'uuid';

type CardProps = {
    data: CardData
}

export default function Card({ data }: CardProps) {
    return (
        <div className={`card`}>
            <div className="top-row">
                <p>Counts as: {data.gemValue}</p>
                <p>Point value: {data.points || 0}</p>
                <p>Cost:</p>
                { Object.keys(data.resourceCost).map((key, value) => {
                    return (
                        // @ts-ignore
                        <p key={v4()}>{key}: {data.resourceCost[key]}</p>
                    )
                }) }
            </div>
        </div>
    )
}