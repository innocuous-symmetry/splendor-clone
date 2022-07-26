import { CardData } from "../../util/types"

export const MiniCard = ({ data }: {data: CardData}) => {
    return (
        <div className="mini-card" style={{backgroundColor: 'white'}}>
            <p>{data.gemValue} card</p>
            <p>{data.points || null}</p>
        </div>
    )
}