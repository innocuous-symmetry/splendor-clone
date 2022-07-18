import { CardData } from '../../util/types';

type CardProps = {
    data: CardData
}

export default function Card({ data }: CardProps) {
    return (
        <div className="card">
            <p>{data.gemValue}</p>
            <p>{data.tier}</p>
            <p>{data.points || 0}</p>
        </div>
    )
}