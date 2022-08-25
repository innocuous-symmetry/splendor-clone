import { v4 } from 'uuid';
import { CardProps } from '../../util/propTypes';
import { ResourceCost } from '../../util/types';
import { useCurrentPlayer } from '../../hooks/useCurrentPlayer';
import { buyCardActions } from '../Player/ActionMethods';
import { hasMaxReserved, reserveCard } from '../Player/ActionMethods/reserveCardActions';
const { buyCard, tooExpensive } = buyCardActions;

export default function Card({ data, state, setState }: CardProps) {
    const currentPlayer = useCurrentPlayer(state);
    if (!data) return <div className="card"></div>;

    return (
        <div className="card" key={v4()} style={{backgroundImage: `url(${data.image})`}}>
            <p>Counts as: {data.gemValue}</p>
            { (data.points && data.points > 0) ? <p>{data.points} points</p> : null }
            <div className="total-card-cost">
            {
                Object.keys(data.resourceCost).map((key: keyof ResourceCost | string) => {
                    // @ts-ignore
                    return (data.resourceCost[key as keyof ResourceCost] > 0) && (
                        <p key={v4()} className={`card-cost-${key}`}>
                            {data.resourceCost[key as keyof ResourceCost]}
                        </p>
                    )
                })
            }
            </div>
            { state.actions.buyCard.active &&
                <button
                    onClick={() => buyCard(state, setState, data)}
                    disabled={tooExpensive(data, state)}>
                    Buy This Card
                </button>
            }
            { state.actions.reserveCard.active &&
                <button
                    onClick={() => reserveCard(state, setState, data)}
                    disabled={hasMaxReserved(currentPlayer)}>
                    Reserve This Card
                </button>
            }
        </div>
    )
}